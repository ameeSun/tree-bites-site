import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useRef, useMemo, useEffect } from "react";
import { TextureLoader } from "three";
import FloatingFood from "@/components/FloatingFood";

const foods = [
    new URL("@/assets/food/soup.png", import.meta.url).href,
    new URL("@/assets/food/persimmon.png", import.meta.url).href,
    new URL("@/assets/food/onigiri.png", import.meta.url).href,
    new URL("@/assets/food/broccoli.png", import.meta.url).href,
    new URL("@/assets/food/egg.png", import.meta.url).href,
    new URL("@/assets/food/lemon.png", import.meta.url).href,
    new URL("@/assets/food/sashimi.png", import.meta.url).href,
    new URL("@/assets/food/tomato.png", import.meta.url).href,
    new URL("@/assets/food/candy.png", import.meta.url).href,
    new URL("@/assets/food/onion.png", import.meta.url).href,
    new URL("@/assets/food/cheese.png", import.meta.url).href,
    new URL("@/assets/food/leek.png", import.meta.url).href,
    new URL("@/assets/food/watermelon.png", import.meta.url).href,
    new URL("@/assets/food/cake.png", import.meta.url).href,
  ];
  
const MIN_DISTANCE = 0.6; // Minimum distance between food items in pile

// Generate positions spread across the bottom of the screen with more at edges
// Avoids center area where text is displayed
const generateBottomPositions = (count: number) => {
  const positions: Array<{ x: number; y: number; z: number }> = [];
  const bottomY = -2.5; // Bottom of screen in 3D space
  const spreadWidth = 8; // Width to spread items across
  const edgeWidth = 2.5; // Wider edge clusters for corners
  const centerAvoidance = 2.0; // Width of center area to avoid (where text is)
  
  // Allocate items: more at left edge, more at right edge, fewer in middle
  const leftEdgeCount = Math.floor(count * 0.25); // 45% at left edge/corner
  const rightEdgeCount = Math.floor(count * 0.25); // 45% at right edge/corner
  const middleCount = count - leftEdgeCount - rightEdgeCount; // Rest in middle (but avoiding center)
  
  // Left edge/corner positions - push towards far left
  for (let i = 0; i < leftEdgeCount; i++) {
    // Push further left and spread vertically for corner effect
    const x = -spreadWidth / 2 - edgeWidth / 2 - Math.random() * edgeWidth * 0.5;
    const y = bottomY + Math.random() * 0.4; // More vertical spread
    const z = (Math.random() - 0.5) * 0.5;
    positions.push({ x, y, z });
  }
  
  // Middle positions - but avoiding center area
  const middleWidth = spreadWidth - centerAvoidance; // Exclude center
  const middleSpacing = middleCount > 1 ? middleWidth / (middleCount - 1) : 0;
  for (let i = 0; i < middleCount; i++) {
    // Split middle into left-middle and right-middle, avoiding center
    const halfMiddle = middleCount / 2;
    let baseX;
    if (i < halfMiddle) {
      // Left side of middle (but not center)
      baseX = -middleWidth / 2 + (i * middleSpacing);
    } else {
      // Right side of middle (but not center)
      baseX = centerAvoidance / 2 + ((i - halfMiddle) * middleSpacing);
    }
    const x = baseX + (Math.random() - 0.5) * 0.2;
    const y = bottomY + Math.random() * 0.2;
    const z = (Math.random() - 0.5) * 0.4;
    positions.push({ x, y, z });
  }
  
  // Right edge/corner positions - push towards far right
  for (let i = 0; i < rightEdgeCount; i++) {
    // Push further right and spread vertically for corner effect
    const x = spreadWidth / 2 + edgeWidth / 2 + Math.random() * edgeWidth * 0.5;
    const y = bottomY + Math.random() * 0.4; // More vertical spread
    const z = (Math.random() - 0.5) * 0.5;
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

// Camera controller component to make camera dynamic
const CameraController = () => {
  const { camera, size } = useThree();
  
  useEffect(() => {
    // Set camera position to show full screen
    // Calculate appropriate Z distance based on FOV and screen size
    const fov = 75; // degrees
    const fovRad = (fov * Math.PI) / 180;
    const aspect = size.width / size.height;
    
    // Calculate distance to show full screen
    // visibleHeight = 2 * tan(fov/2) * distance
    // We want to show the full screen, so set distance appropriately
    const visibleHeight = 10; // Desired visible height in world units
    const distance = visibleHeight / (2 * Math.tan(fovRad / 2));
    
    camera.position.set(0, 0, distance);
    
    // Type guard to ensure it's a PerspectiveCamera
    if ('fov' in camera && 'aspect' in camera) {
      (camera as THREE.PerspectiveCamera).fov = fov;
      (camera as THREE.PerspectiveCamera).aspect = aspect;
      camera.updateProjectionMatrix();
    }
  }, [camera, size.width, size.height]);
  
  return null;
};

const FoodParticles = ({ mouseStateRef }: FoodParticlesProps) => {
  // Load textures safely
  const textures = useLoader(TextureLoader, foods);
  const { size: viewportSize } = useThree();
  
  // Calculate dynamic size based on screen dimensions
  // Base size scales with viewport height, with minimum and maximum bounds
  // Larger screens get bigger images, smaller screens get appropriately sized images
  const baseSize = Math.max(0.5, Math.min(1.2, viewportSize.height * 0.08));
  
  // Shared ref to track all positions for collision detection
  const positionsRef = useRef<Map<number, { x: number; y: number }>>(new Map());

  // Generate initial positions spread across the bottom
  const initialPositions = useMemo(
    () => generateBottomPositions(30),
    []
  );

  // Generate multiple floating items
  const particles = Array.from({ length: 30 }, (_, i) => ({
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
          size={baseSize}
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
      camera={{ fov: 75, position: [0, 0, 7] }}
      style={{ width: "100%", height: "100%", userSelect: 'none', WebkitUserSelect: 'none' }}
      gl={{ alpha: true }}
      className="pointer-events-auto select-none"
      onPointerDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        const rect = e.currentTarget.getBoundingClientRect();
        // Convert to normalized device coordinates (-1 to 1)
        const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        
        // Convert to 3D world space coordinates
        // Using dynamic camera settings (FOV 75, calculated distance)
        const aspect = rect.width / rect.height;
        const fov = 75; // degrees (matches CameraController)
        const fovRad = (fov * Math.PI) / 180;
        const visibleHeight = 10; // matches CameraController
        const distance = visibleHeight / (2 * Math.tan(fovRad / 2));
        const worldHeight = 2 * Math.tan(fovRad / 2) * distance;
        const worldWidth = worldHeight * aspect;
        
        const worldX = (mouseX * worldWidth) / 2;
        const worldY = (mouseY * worldHeight) / 2;
        
        mouseStateRef.current.isDown = true;
        mouseStateRef.current.dragStart = { x: worldX, y: worldY };
        mouseStateRef.current.dragCurrent = { x: worldX, y: worldY };
        mouseStateRef.current.dragDirection = { x: 0, y: 0 };
      }}
      onPointerMove={(e) => {
        if (mouseStateRef.current.isDown) {
          e.preventDefault();
          const rect = e.currentTarget.getBoundingClientRect();
          // Convert to normalized device coordinates (-1 to 1)
          const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
          
          // Convert to 3D world space coordinates
          // Using dynamic camera settings (FOV 75, calculated distance)
          const aspect = rect.width / rect.height;
          const fov = 75; // degrees (matches CameraController)
          const fovRad = (fov * Math.PI) / 180;
          const visibleHeight = 10; // matches CameraController
          const distance = visibleHeight / (2 * Math.tan(fovRad / 2));
          const worldHeight = 2 * Math.tan(fovRad / 2) * distance;
          const worldWidth = worldHeight * aspect;
          
          const worldX = (mouseX * worldWidth) / 2;
          const worldY = (mouseY * worldHeight) / 2;
          
          mouseStateRef.current.dragCurrent = { x: worldX, y: worldY };
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
      <CameraController />
      <Suspense fallback={null}>
        <FoodParticles mouseStateRef={mouseStateRef} />
      </Suspense>
    </Canvas>
  );
};

export default FoodField;
