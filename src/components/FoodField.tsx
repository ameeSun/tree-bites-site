import { Canvas, useLoader } from "@react-three/fiber";
import { Suspense } from "react";
import { TextureLoader } from "three";
import soup from "@/assets/food/soup.png";
import persimmon from "@/assets/food/persimmon.png";
import onigiri from "@/assets/food/onigiri.png";
import FloatingFood from "@/components/FloatingFood";

const foods = [soup, persimmon, onigiri];

const FoodParticles = () => {
  const textures = useLoader(TextureLoader, foods);

  const particles = Array.from({ length: 12 }, (_, i) => ({
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
    <Canvas camera={{ position: [0, 0, 5] }} style={{ width: "100%", height: "100%" }}>
      <Suspense fallback={null}>
        <FoodParticles />
      </Suspense>
    </Canvas>
  );
};

export default FoodField;
