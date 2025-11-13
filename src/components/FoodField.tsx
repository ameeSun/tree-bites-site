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

const MIN_DISTANCE = 0.6; // Minimum distance between food items in pile

// Generate positions spread across the bottom of the screen with more at edges
const generateBottomPositions = (count: number) => {
  const positions: Array<{ x: number; y: number; z: number }> = [];
  const bottomY = -2.5; // Bottom of screen in 3D space
  const spreadWidth = 8; // Width to spread items across
  const edgeWidth = 1.5; // Width of edge clusters
  
  // Allocate items: some at left edge, some at right edge, rest in middle
  const leftEdgeCount = Math.floor(count * 0.25); // 25% at left edge
  const rightEdgeCount = Math.floor(count * 0.25); // 25% at right edge
  const middleCount = count - leftEdgeCount - rightEdgeCount; // Rest in middle
  
  // Left edge positions
  for (let i = 0; i < leftEdgeCount; i++) {
    const x = -spreadWidth / 2 - edgeWidth / 2 + Math.random() * edgeWidth;
    const y = bottomY + Math.random() * 0.3;
    const z = (Math.random() - 0.5) * 0.4;
    positions.push({ x, y, z });
  }
  
  // Middle positions
  const middleWidth = spreadWidth - edgeWidth;
  const middleSpacing = middleCount > 1 ? middleWidth / (middleCount - 1) : 0;
  for (let i = 0; i < middleCount; i++) {
    const baseX = -middleWidth / 2 + (i * middleSpacing);
    const x = baseX + (Math.random() - 0.5) * 0.3;
    const y = bottomY + Math.random() * 0.2;
    const z = (Math.random() - 0.5) * 0.4;
    positions.push({ x, y, z });
  }
  
  // Right edge positions
  for (let i = 0; i < rightEdgeCount; i++) {
    const x = spreadWidth / 2 - edgeWidth / 2 + Math.random() * edgeWidth;
    const y = bottomY + Math.random() * 0.3;
    const z = (Math.random() - 0.5) * 0.4;
    positions.push({ x, y, z });
  }

  return positions;
};

interface FoodParticlesProps {
  mouseStateRef: React.MutableRefObject<{
    isDown: boolean;
    dragStart: { x: number; y: number };
    dragCurrent: { x: number; y: number };
    dragDirection: { x: number; y: number };
  }>;
}

const FoodParticles = ({ mouseStateRef }: FoodParticlesProps) => {
  // Load textures safely
  const textures = useLoader(TextureLoader, foods);
  
  // Shared ref to track all positions for collision detection
  const positionsRef = useRef<Map<number, { x: number; y: number }>>(new Map());

  // Generate initial positions spread across the bottom
  const initialPositions = useMemo(
    () => generateBottomPositions(25),
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
          mouseStateRef={mouseStateRef}
        />
      ))}
    </>
  );
};

const FoodField = () => {
  const mouseStateRef = useRef({
    isDown: false,
    dragStart: { x: 0, y: 0 },
    dragCurrent: { x: 0, y: 0 },
    dragDirection: { x: 0, y: 0 }
  });

  return (
    <Canvas
      camera={{ position: [0, 0, 5] }}
      style={{ width: "100%", height: "100%", userSelect: 'none', WebkitUserSelect: 'none' }}
      gl={{ alpha: true }}
      className="pointer-events-auto select-none"
      onPointerDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        const rect = e.currentTarget.getBoundingClientRect();
        const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        mouseStateRef.current.isDown = true;
        mouseStateRef.current.dragStart = { x: mouseX * 4, y: mouseY * 2 };
        mouseStateRef.current.dragCurrent = { x: mouseX * 4, y: mouseY * 2 };
        mouseStateRef.current.dragDirection = { x: 0, y: 0 };
      }}
      onPointerMove={(e) => {
        if (mouseStateRef.current.isDown) {
          e.preventDefault();
          const rect = e.currentTarget.getBoundingClientRect();
          const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
          mouseStateRef.current.dragCurrent = { x: mouseX * 4, y: mouseY * 2 };
          // Calculate drag direction
          mouseStateRef.current.dragDirection = {
            x: mouseStateRef.current.dragCurrent.x - mouseStateRef.current.dragStart.x,
            y: mouseStateRef.current.dragCurrent.y - mouseStateRef.current.dragStart.y
          };
        }
      }}
      onPointerUp={(e) => {
        e.preventDefault();
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
        mouseStateRef.current.isDown = false;
        mouseStateRef.current.dragDirection = { x: 0, y: 0 };
      }}
      onPointerCancel={(e) => {
        e.preventDefault();
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
        mouseStateRef.current.isDown = false;
        mouseStateRef.current.dragDirection = { x: 0, y: 0 };
      }}
    >
      <Suspense fallback={null}>
        <FoodParticles mouseStateRef={mouseStateRef} />
      </Suspense>
    </Canvas>
  );
};

export default FoodField;
