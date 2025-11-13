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
    baseZ,
    floatSpeed,
    driftX,
    driftY,
    rotationSpeed,
  } = useMemo(
    () => ({
      baseX: Math.random() * 8 - 4,
      baseY: Math.random() * 6 - 3,
      baseZ: Math.random() * 0.4 - 0.2,
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

    // Calculate base floating position with time-based drift
    const floatX = baseX + Math.sin(t * 0.6 + index) * 0.3 + driftX * t;
    const floatY = baseY + Math.cos(t * 0.4 + index) * 0.3 + driftY * t;

    // Mouse repel
    const dx = mouse.x * 4 - floatX;
    const dy = mouse.y * 2 - floatY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    // Apply mouse repel if close enough, otherwise use float position
    if (dist < 1.2 && dist > 0) {
      const repelStrength = 0.03 * (1.2 - dist);
      pos.x = floatX - dx * repelStrength;
      pos.y = floatY - dy * repelStrength;
    } else {
      pos.x = floatX;
      pos.y = floatY;
    }

    // Subtle rotation (bounded to prevent overflow)
    mesh.current.rotation.z = (t * rotationSpeed * 0.5) % (Math.PI * 2);
  });

  return (
    <mesh ref={mesh} position={[baseX, baseY, baseZ]}>
      <planeGeometry args={[0.8, 0.8]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
};

export default FloatingFood;
