import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import FoodField from "@/components/FoodField";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Soft gradient backdrop - behind food images */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#8C1515]/5 via-transparent to-[#2FB16A]/5 z-0" />

      {/* Floating Food Images Background */}
      <div className="absolute inset-0 z-[1]">
        <FoodField />
      </div>

      {/* Centered Content */}
      <div className="container relative z-10 px-6 py-20 pointer-events-none">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="space-y-8 animate-fade-in-up">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
