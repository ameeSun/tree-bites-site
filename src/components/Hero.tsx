import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-food.jpg";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#8C1515]/10 via-white to-[#2FB16A]/10" />

      {/* Animated Background Blobs */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#2FB16A]/10 rounded-full blur-3xl animate-pulse-soft" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#8C1515]/10 rounded-full blur-3xl animate-pulse-soft"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Main Content */}
      <div className="container relative z-10 px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full bg-[#2FB16A]/10 text-[#2FB16A] text-sm font-semibold">
                🌲 Built at Stanford
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Find free food. <br />
              <span className="text-[#8C1515]">End campus waste.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-muted-foreground max-w-xl">
              Tree Bites connects Stanford clubs and students to share leftover
              food after events — reducing waste and building community one
              meal at a time.
            </p>

            {/* CTA Buttons */}
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
            <div className="absolute -top-6 -right-6 bg-card p-4 rounded-2xl shadow-lg animate-float">
              <div className="text-4xl">🍕</div>
            </div>
            <div
              className="absolute -bottom-6 -left-6 bg-card p-4 rounded-2xl shadow-lg animate-float"
              style={{ animationDelay: "1s" }}
            >
              <div className="text-4xl">🥗</div>
            </div>
          </div>
        </div>
      </div>

      {/* Fade Bottom Edge */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
};

export default Hero;
