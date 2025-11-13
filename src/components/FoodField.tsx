import { Canvas, useLoader } from "@react-three/fiber";
import { Suspense } from "react";
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

const FoodParticles = () => {
  // Load textures safely
  const textures = useLoader(TextureLoader, foods);

  // Generate multiple floating items
  const particles = Array.from({ length: 25 }, (_, i) => ({
    texture: textures[i % textures.length],
    index: i,
  }));

  return (
    <>
      {particles.map((p, i) => (
        <FloatingFood key={i} texture={p.texture} index={p.index} />
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
      {/* Temporary background for visibility */}
      <color attach="background" args={["#ffffff"]} />

      <Suspense fallback={null}>
        <FoodParticles />
      </Suspense>
    </Canvas>
  );
};

export default FoodField;
