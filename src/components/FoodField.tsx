import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";
import FloatingFood from "@/components/FloatingFood";
import soup from "@/assets/food/soup.png";
import persimmon from "@/assets/food/persimmon.png";
import onigiri from "@/assets/food/onigiri.png";

const foods = [soup, persimmon, onigiri];

const FoodField = () => {
  const loader = new THREE.TextureLoader();
  const textures = foods.map((f) => loader.load(f)); // ✅ simplified, works with Vite

  const particles = Array.from({ length: 9 }, (_, i) => ({
    texture: textures[i % textures.length],
    index: i,
  }));

  return (
    <Canvas
      camera={{ position: [0, 0, 5] }}
      style={{ width: "100%", height: "100%" }}
      gl={{ alpha: true }}
      className="pointer-events-none"
    >
      <Suspense fallback={null}>
        {particles.map((p, i) => (
          <FloatingFood key={i} texture={p.texture} index={p.index} />
        ))}
      </Suspense>
    </Canvas>
  );
};

export default FoodField;
