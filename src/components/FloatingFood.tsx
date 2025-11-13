import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

interface FloatingFoodProps {
  texture: THREE.Texture;
  index: number;
}

const FloatingFood = ({ texture, index }: FloatingFoodProps) => {
  const mesh = useRef<THREE.Mesh>(null!);

  // 🧮 Edge-weighted spawn — foods spawn farther from the center
  const {
    baseX,
    baseY,
    baseZ,
    floatSpeed,
    driftX,
    driftY,
    rotationSpeed,
  } = useMemo(() => {
    // Helper: random number skewed toward edges
    const edgeBias = (range: number) => {
      const r = Math.random() * 2 - 1; // [-1, 1]
      return Math.sign(r) * (Math.pow(Math.abs(r), 0.4) * range);
    };

    return {
      baseX: edgeBias(5), // Wider horizontal spread
      baseY: edgeBias(3), // Taller vertical spread
      baseZ: Math.random() * 0.4 - 0.2,
      floatSpeed: 0.001 + Math.random() * 0.0015,
      driftX: Math.random() * 0.002 - 0.001,
      driftY: Math.random() * 0.002 - 0.001,
      rotationSpeed: 0.002 + Math.random() * 0.002,
    };
  }, []);

  useFrame(({ mouse, clock }) => {
    if (!mesh.current) return;
    const pos = mesh.current.position;
    const t = clock.getElapsedTime();

    // Gentle idle float with independent drift
    const floatX = baseX + Math.sin(t * 0.6 + index) * 0.3 + driftX * t;
    const floatY = baseY + Math.cos(t * 0.4 + index) * 0.3 + driftY * t;

    // Subtle repel from cursor
    const dx = mouse.x * 4 - floatX;
    const dy = mouse.y * 2 - floatY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 1.2 && dist > 0) {
      const repelStrength = 0.03 * (1.2 - dist);
      pos.x = floatX - dx * repelStrength;
      pos.y = floatY - dy * repelStrength;
    } else {
      pos.x = floatX;
      pos.y = floatY;
    }

    // Gentle rotation
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
