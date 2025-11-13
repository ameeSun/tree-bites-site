import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, useMotionValue } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import soup from "@/assets/food/soup.png";
import persimmon from "@/assets/food/persimmon.png";
import onigiri from "@/assets/food/onigiri.png";

const foods = [soup, persimmon, onigiri];

// --- 3D Food Particle ---
const FoodParticle = ({ texture, index }: any) => {
  const mesh = useRef<THREE.Mesh>(null!);
  const speed = 0.001 + Math.random() * 0.002;
  const direction = Math.random() > 0.5 ? 1 : -1;

  useFrame(({ mouse }) => {
    if (!mesh.current) return;

    const pos = mesh.current.position;
    // gentle idle float
    pos.y += Math.sin(Date.now() * speed + index) * 0.001;
    pos.x += Math.cos(Date.now() * speed + index) * 0.001;

    // simple repel from cursor
    const dx = mouse.x * 4 - pos.x;
    const dy = mouse.y * 2 - pos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 0.8) {
      pos.x -= dx * 0.02;
      pos.y -= dy * 0.02;
    }
  });

  return (
    <mesh ref={mesh} position={[Math.random() * 4 - 2, Math.random() * 2 - 1, 0]}>
      <planeGeometry args={[0.6, 0.6]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
};

// --- Food Field Canvas ---
const FoodField = () => {
  const loader = new THREE.TextureLoader();
  const textures = foods.map(f => loader.load(f));

  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      {textures.map((t, i) => (
        <FoodParticle key={i} texture={t} index={i} />
      ))}
    </Canvas>
  );
};

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Soft gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#8C1515]/10 via-white to-[#2FB16A]/10" />

      <div className="container relative z-10 px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className="space-y-8 animate-fade-in-up">
            <span className="px-4 py-2 rounded-full bg-[#2FB16A]/10 text-[#2FB16A] text-sm font-semibold">
              🌲 Built at Stanford
            </span>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Find free food. <br />
              <span className="text-[#8C1515]">End campus waste.</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-xl">
              Tree Bites connects Stanford clubs and students to share leftover
              food after events — reducing waste and building community one
              meal at a time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                variant="hero"
                size="lg"
                onClick={() => scrollToSection("join")}
                className="group"
              >
                Join the Waitlist
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection("how-it-works")}
                className="rounded-full font-semibold"
              >
                Learn How It Works
              </Button>
            </div>
          </div>

          {/* Right Column - Image */}
          <div
            className="relative animate-scale-in"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Students sharing food after a Stanford event"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent" />
            </div>

            {/* Floating Emojis */}
            <div className="absolute -top-6 -right-6 bg-card p-4 rounded-2xl shadow-lg animate-float transition-transform hover:-translate-y-2 hover:shadow-xl">
              <div className="text-4xl">🍕</div>
            </div>
            <div
              className="absolute -bottom-6 -left-6 bg-card p-4 rounded-2xl shadow-lg animate-float transition-transform hover:-translate-y-2 hover:shadow-xl"
              style={{ animationDelay: "1s" }}
            >
              <div className="text-4xl">🥗</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
