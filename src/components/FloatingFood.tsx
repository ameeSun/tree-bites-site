import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

interface FloatingFoodProps {
  texture: THREE.Texture;
  index: number;
}

const FloatingFood = ({ texture, index }: FloatingFoodProps) => {
  const mesh = useRef<THREE.Mesh>(null!);

  // Each item has randomized behavior (so they don't all move together)
  const {
    baseX,
    baseY,
    floatSpeed,
    driftX,
    driftY,
    rotationSpeed,
  } = useMemo(
    () => ({
      baseX: Math.random() * 8 - 4,
      baseY: Math.random() * 6 - 3,
      floatSpeed: 0.001 + Math.random() * 0.0015,
      driftX: Math.random() * 0.002 - 0.001,
      driftY: Math.random() * 0.002 - 0.001,
      rotationSpeed: 0.002 + Math.random() * 0.002,
    }),
    []
  );

  useFrame(({ mouse, clock }) => {
    if (!mesh.current) return;
    const pos = mesh.current.position;

    // time-based floating, smoother and more stable than Date.now()
    const t = clock.getElapsedTime();

    // Smooth idle float
    pos.x = baseX + Math.sin(t * 0.6 + index) * 0.3 + driftX;
    pos.y = baseY + Math.cos(t * 0.4 + index) * 0.3 + driftY;

    // Mouse repel
    const dx = mouse.x * 4 - pos.x;
    const dy = mouse.y * 2 - pos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 1.2) {
      pos.x -= dx * 0.03 * (1.2 - dist);
      pos.y -= dy * 0.03 * (1.2 - dist);
    }

    // Subtle rotation
    mesh.current.rotation.z += rotationSpeed * 0.5;
  });

  return (
    <mesh ref={mesh} position={[baseX, baseY, Math.random() * 0.4 - 0.2]}>
      <planeGeometry args={[0.8, 0.8]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
};

export default FloatingFood;
