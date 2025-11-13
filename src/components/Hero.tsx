import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import FoodField from "@/components/FoodField";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Parallax transforms for content
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Soft gradient backdrop - behind food images */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#8C1515]/5 via-transparent to-[#2FB16A]/5 z-0" />

      {/* Floating Food Images Background */}
      <div className="absolute inset-0 z-[1]">
        <FoodField />
      </div>

      {/* Centered Content with scroll animations */}
      <motion.div 
        className="container relative z-10 px-6 py-20 pointer-events-none"
        style={{
          y: contentY,
          opacity: contentOpacity,
          scale: contentScale
        }}
      >
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-[#2FB16A]/10 text-[#2FB16A] text-sm font-semibold">
              🌲 Built at Stanford
            </span>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Find free food. <br />
              <span className="text-[#8C1515]">End campus waste.</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tree Bites connects Stanford clubs and students to share leftover
              food after events — reducing waste and building community one
              meal at a time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center pointer-events-auto">
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
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-sm text-muted-foreground">Scroll to explore</span>
          <ArrowRight className="h-5 w-5 text-muted-foreground rotate-90" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
