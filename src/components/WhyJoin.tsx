import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Users, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: Leaf,
    title: "Reduce Waste",
    description: "Help the environment by preventing food from going to landfills"
  },
  {
    icon: Users,
    title: "Build Community",
    description: "Connect with students and boost event turnout"
  },
  {
    icon: TrendingUp,
    title: "Make Impact",
    description: "Track your positive contribution to campus sustainability"
  }
];

const WhyJoin = () => {
  const scrollToJoin = () => {
    const element = document.getElementById("join");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="why-join" className="py-24 px-6 bg-gradient-to-br from-accent/5 via-background to-primary/5">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Visual Content */}
          <div className="relative animate-fade-in-up">
            <div className="relative">
              {/* Main Card */}
              <div className="bg-card rounded-3xl p-8 shadow-2xl transition-transform hover:-translate-y-2 hover:shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                      <span className="text-2xl">♻️</span>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary">200+</div>
                      <div className="text-sm text-muted-foreground">pounds saved</div>
                    </div>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-2xl">🍕</span>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary">1000+</div>
                      <div className="text-sm text-muted-foreground">students fed</div>
                    </div>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                      <span className="text-2xl">🎉</span>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary">50+</div>
                      <div className="text-sm text-muted-foreground">campus events</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Emoji */}
              <div className="absolute -top-8 -right-8 text-6xl animate-float">🥗</div>
              <div className="absolute -bottom-8 -left-8 text-6xl animate-float" style={{ animationDelay: "1s" }}>🌮</div>
            </div>
          </div>

          {/* Right - Text Content */}
          <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Feed students, not <span className="text-primary">landfills</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Reduce waste, boost event turnout, and make your club's gatherings more impactful. Join the network of Stanford organizations making a difference.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Button 
              variant="hero" 
              size="lg"
              onClick={scrollToJoin}
              className="group"
            >
              Join the Network
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyJoin;
