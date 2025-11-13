import { useFrame } from "@react-three/fiber";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

interface FloatingFoodProps {
  texture: THREE.Texture;
  index: number;
  initialPos: { x: number; y: number; z: number };
  positionsRef: React.MutableRefObject<Map<number, { x: number; y: number }>>;
  minDistance: number;
}

const FloatingFood = ({ texture, index, initialPos, positionsRef, minDistance }: FloatingFoodProps) => {
  const mesh = useRef<THREE.Mesh>(null!);

  const {
    baseX,
    baseY,
    baseZ,
    floatSpeed,
    driftX,
    driftY,
    rotationSpeed,
  } = useMemo(() => ({
    baseX: initialPos.x,
    baseY: initialPos.y,
    baseZ: initialPos.z,
    floatSpeed: 0.001 + Math.random() * 0.0015,
    driftX: Math.random() * 0.002 - 0.001,
    driftY: Math.random() * 0.002 - 0.001,
    rotationSpeed: 0.002 + Math.random() * 0.002,
  }), [initialPos]);

  // Register/unregister position for collision detection
  useEffect(() => {
    positionsRef.current.set(index, { x: baseX, y: baseY });
    return () => {
      positionsRef.current.delete(index);
    };
  }, [index, baseX, baseY, positionsRef]);

  useFrame(({ mouse, clock }) => {
    if (!mesh.current) return;
    const pos = mesh.current.position;
    const t = clock.getElapsedTime();

    // Gentle idle float with independent drift
    let floatX = baseX + Math.sin(t * 0.6 + index) * 0.3 + driftX * t;
    let floatY = baseY + Math.cos(t * 0.4 + index) * 0.3 + driftY * t;

    // Subtle repel from cursor
    const mouseDx = mouse.x * 4 - floatX;
    const mouseDy = mouse.y * 2 - floatY;
    const mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
    if (mouseDist < 1.2 && mouseDist > 0) {
      const repelStrength = 0.03 * (1.2 - mouseDist);
      floatX -= mouseDx * repelStrength;
      floatY -= mouseDy * repelStrength;
    }

    // Collision avoidance with other food items
    let avoidX = 0;
    let avoidY = 0;
    positionsRef.current.forEach((otherPos, otherIndex) => {
      if (otherIndex === index) return;
      
      const dx = floatX - otherPos.x;
      const dy = floatY - otherPos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < minDistance && dist > 0) {
        // Push away from overlapping item
        const pushStrength = (minDistance - dist) / minDistance;
        avoidX += (dx / dist) * pushStrength * 0.1;
        avoidY += (dy / dist) * pushStrength * 0.1;
      }
    });

    // Apply final position with collision avoidance
    pos.x = floatX + avoidX;
    pos.y = floatY + avoidY;

    // Update shared position for next frame
    positionsRef.current.set(index, { x: pos.x, y: pos.y });

    // Gentle rotation
    mesh.current.rotation.z = (t * rotationSpeed * 0.5) % (Math.PI * 2);
  });

  return (
    <mesh ref={mesh} position={[baseX, baseY, baseZ]}>
      <planeGeometry args={[0.8, 0.8]} />
      <meshBasicMaterial 
        map={texture} 
        transparent 
        opacity={1}
        color={0xffffff}
      />
    </mesh>
  );
};

export default FloatingFood;
