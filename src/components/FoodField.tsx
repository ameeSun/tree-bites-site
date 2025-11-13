import { Canvas, useLoader } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import { TextureLoader } from "three";
import FloatingFood from "@/components/FloatingFood";

// ✅ Guaranteed safe URLs for Vite + R3F
const foods = [
  new URL("@/assets/food/broccoli.png", import.meta.url).href,
  new URL("@/assets/food/candy.png", import.meta.url).href,
  new URL("@/assets/food/egg.png", import.meta.url).href,
  new URL("@/assets/food/lemon.png", import.meta.url).href,
  new URL("@/assets/food/onigiri.png", import.meta.url).href,
  new URL("@/assets/food/onion.png", import.meta.url).href,
  new URL("@/assets/food/persimmon.png", import.meta.url).href,
  new URL("@/assets/food/sashimi.png", import.meta.url).href,
  new URL("@/assets/food/soup.png", import.meta.url).href,
  new URL("@/assets/food/tomato.png", import.meta.url).href,
];

const MIN_DISTANCE = 1.2; // Minimum distance between food items

// Generate non-overlapping initial positions
const generateNonOverlappingPositions = (count: number) => {
  const positions: Array<{ x: number; y: number; z: number }> = [];
  const maxAttempts = 100;

  const edgeBias = (range: number) => {
    const r = Math.random() * 2 - 1;
    return Math.sign(r) * (Math.pow(Math.abs(r), 0.4) * range);
  };

  for (let i = 0; i < count; i++) {
    let attempts = 0;
    let valid = false;
    let x = 0, y = 0, z = 0;

    while (!valid && attempts < maxAttempts) {
      x = edgeBias(5);
      y = edgeBias(3);
      z = Math.random() * 0.4 - 0.2;

      // Check collision with existing positions
      valid = positions.every(pos => {
        const dx = x - pos.x;
        const dy = y - pos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        return dist >= MIN_DISTANCE;
      });

      attempts++;
    }

    positions.push({ x, y, z });
  }

  return positions;
};

const FoodParticles = () => {
  // Load textures safely
  const textures = useLoader(TextureLoader, foods);
  
  // Shared ref to track all positions for collision detection
  const positionsRef = useRef<Map<number, { x: number; y: number }>>(new Map());

  // Generate non-overlapping initial positions
  const initialPositions = useMemo(
    () => generateNonOverlappingPositions(25),
    []
  );

  // Generate multiple floating items
  const particles = Array.from({ length: 25 }, (_, i) => ({
    texture: textures[i % textures.length],
    index: i,
    initialPos: initialPositions[i],
  }));

  return (
    <>
      {particles.map((p, i) => (
        <FloatingFood
          key={i}
          texture={p.texture}
          index={p.index}
          initialPos={p.initialPos}
          positionsRef={positionsRef}
          minDistance={MIN_DISTANCE}
        />
      ))}
    </>
  );
};

const FoodField = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5] }}
      style={{ width: "100%", height: "100%" }}
      gl={{ alpha: true }}
      className="pointer-events-none"
    >

      <Suspense fallback={null}>
        <FoodParticles />
      </Suspense>
    </Canvas>
  );
};

export default FoodField;
