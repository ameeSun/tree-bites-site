import { useFrame } from "@react-three/fiber";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

interface FloatingFoodProps {
  texture: THREE.Texture;
  index: number;
  initialPos: { x: number; y: number; z: number };
  positionsRef: React.MutableRefObject<Map<number, { x: number; y: number }>>;
  minDistance: number;
  mouseStateRef: React.MutableRefObject<{
    isDown: boolean;
    dragStart: { x: number; y: number };
    dragCurrent: { x: number; y: number };
    dragDirection: { x: number; y: number };
  }>;
  size: number;
}

const FloatingFood = ({ texture, index, initialPos, positionsRef, minDistance, mouseStateRef, size }: FloatingFoodProps) => {
  const mesh = useRef<THREE.Mesh>(null!);
  const velocity = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: initialPos.x, y: initialPos.y });

  const {
    baseX,
    baseY,
    baseZ,
    rotationSpeed,
  } = useMemo(() => ({
    baseX: initialPos.x,
    baseY: initialPos.y,
    baseZ: initialPos.z,
    rotationSpeed: 0.002 + Math.random() * 0.002,
  }), [initialPos]);

  // Register/unregister position for collision detection
  useEffect(() => {
    positionsRef.current.set(index, { x: baseX, y: baseY });
    return () => {
      positionsRef.current.delete(index);
    };
  }, [index, baseX, baseY, positionsRef]);

  useFrame(() => {
    if (!mesh.current) return;
    const pos = mesh.current.position;

    // Current position
    let currentX = pos.x;
    let currentY = pos.y;

    // Only interact when mouse is down (clicking/dragging)
    if (mouseStateRef.current.isDown) {
      const mouseX = mouseStateRef.current.dragCurrent.x;
      const mouseY = mouseStateRef.current.dragCurrent.y;
      const dragDir = mouseStateRef.current.dragDirection;
      
      // Distance from food item to mouse
      const mouseDx = mouseX - currentX;
      const mouseDy = mouseY - currentY;
      const mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
      
      // Expanded interaction radius (larger area)
      const interactionRadius = 2.0;
      
      // Only affect items near the mouse
      if (mouseDist < interactionRadius && mouseDist > 0) {
        // Calculate push strength based on distance (stronger closer to mouse)
        const pushStrength = (interactionRadius - mouseDist) / interactionRadius;
        
        // Calculate drag speed (capped to prevent excessive force)
        const dragSpeed = Math.min(
          Math.sqrt(dragDir.x * dragDir.x + dragDir.y * dragDir.y),
          2.0 // Max drag speed
        );
        
        // Normalize drag direction
        const dragLength = Math.sqrt(dragDir.x * dragDir.x + dragDir.y * dragDir.y);
        if (dragLength > 0) {
          const normalizedDrag = {
            x: dragDir.x / dragLength,
            y: dragDir.y / dragLength
          };
          
          // Push items in the drag direction (gentler force)
          const pushForce = pushStrength * dragSpeed * 0.12;
          velocity.current.x += normalizedDrag.x * pushForce;
          velocity.current.y += normalizedDrag.y * pushForce;
        }
      }
    }

    // Apply velocity to position (with max velocity limit)
    const maxVelocity = 0.5; // Limit maximum velocity to prevent items from being flung too far
    const velMagnitude = Math.sqrt(velocity.current.x * velocity.current.x + velocity.current.y * velocity.current.y);
    if (velMagnitude > maxVelocity) {
      velocity.current.x = (velocity.current.x / velMagnitude) * maxVelocity;
      velocity.current.y = (velocity.current.y / velMagnitude) * maxVelocity;
    }
    
    currentX += velocity.current.x;
    currentY += velocity.current.y;

    // Collision avoidance with other food items
    let avoidX = 0;
    let avoidY = 0;
    positionsRef.current.forEach((otherPos, otherIndex) => {
      if (otherIndex === index) return;
      
      const dx = currentX - otherPos.x;
      const dy = currentY - otherPos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < minDistance && dist > 0) {
        // Push away from overlapping item (smoother)
        const pushStrength = (minDistance - dist) / minDistance;
        avoidX += (dx / dist) * pushStrength * 0.15;
        avoidY += (dy / dist) * pushStrength * 0.15;
        
        // Transfer some velocity on collision (gentler)
        const transfer = 0.05;
        velocity.current.x += (dx / dist) * pushStrength * transfer;
        velocity.current.y += (dy / dist) * pushStrength * transfer;
      }
    });

    // Calculate target position
    targetPos.current.x = currentX + avoidX;
    targetPos.current.y = currentY + avoidY;

    // Smooth interpolation (lerp) to target position for jitter-free motion
    const lerpFactor = 0.15; // Higher = faster, lower = smoother
    pos.x = pos.x + (targetPos.current.x - pos.x) * lerpFactor;
    pos.y = pos.y + (targetPos.current.y - pos.y) * lerpFactor;

    // Dampen velocity (friction) - smoother decay
    velocity.current.x *= 0.97;
    velocity.current.y *= 0.97;

    // Update shared position for next frame
    positionsRef.current.set(index, { x: pos.x, y: pos.y });

    // Gentle, constant rotation (not based on velocity)
    mesh.current.rotation.z += rotationSpeed * 0.3;
  });

  return (
    <mesh ref={mesh} position={[baseX, baseY, baseZ]}>
      <planeGeometry args={[size, size]} />
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
