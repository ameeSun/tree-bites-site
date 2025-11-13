import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

interface FloatingFoodProps {
  texture: THREE.Texture;
  index: number;
}

const FloatingFood = ({ texture, index }: FloatingFoodProps) => {
  const mesh = useRef<THREE.Mesh>(null!);
  const speed = 0.001 + Math.random() * 0.002;
  const drift = Math.random() * Math.PI * 2;

  useFrame(({ mouse }) => {
    if (!mesh.current) return;
    const pos = mesh.current.position;

    // Gentle idle floating
    pos.y += Math.sin(Date.now() * speed + drift) * 0.001;
    pos.x += Math.cos(Date.now() * speed + drift) * 0.001;

    // Mouse repel
    const dx = mouse.x * 4 - pos.x;
    const dy = mouse.y * 2 - pos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 0.8) {
      pos.x -= dx * 0.02;
      pos.y -= dy * 0.02;
    }

    // Slight rotation for realism
    mesh.current.rotation.z += 0.002 * Math.sin(Date.now() * speed);
  });

  return (
    <mesh
      ref={mesh}
      position={[
        Math.random() * 8 - 4,
        Math.random() * 6 - 3,
        Math.random() * 0.4 - 0.2,
      ]}
    >
      <planeGeometry args={[0.8, 0.8]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
};

export default FloatingFood;
