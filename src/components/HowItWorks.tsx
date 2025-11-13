import { Camera, MapPin, Bell } from "lucide-react";

const steps = [
  {
    icon: Camera,
    title: "Snap a photo",
    description: "After your event, take a quick picture of leftover food",
    color: "text-primary"
  },
  {
    icon: MapPin,
    title: "Tag the spot",
    description: "Drop the location pin on campus",
    color: "text-accent"
  },
  {
    icon: Bell,
    title: "Notify students",
    description: "The post appears instantly on the Tree Bites map",
    color: "text-primary"
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-gradient-to-b from-background to-secondary/30">
      <div className="container">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to turn leftover food into campus joy
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index}
                className="relative animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Connector Line (hidden on mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
                
                <div className="relative bg-card rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 duration-300">
                  {/* Step Number */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6`}>
                    <Icon className={`w-8 h-8 ${step.color}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
