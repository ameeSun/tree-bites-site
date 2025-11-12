import { Leaf, Users, Smartphone } from "lucide-react";

const missionPoints = [
  {
    icon: Leaf,
    title: "Sustainability",
    description: "Preventing hundreds of pounds of food waste every week"
  },
  {
    icon: Users,
    title: "Community",
    description: "Building connections through shared resources"
  },
  {
    icon: Smartphone,
    title: "Accessibility",
    description: "Making free food easy to find for all students"
  }
];

const Mission = () => {
  return (
    <section id="mission" className="py-24 px-6 bg-gradient-to-b from-background to-secondary/30">
      <div className="container max-w-5xl">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold">
              Our Mission
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Built by Stanford students,<br />
            <span className="text-primary">for Stanford students</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Every week, Stanford events throw away hundreds of pounds of edible food. 
            Food Bites connects that food to students before it's wasted — one photo at a time.
          </p>
        </div>

        {/* Mission Icons Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {missionPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div 
                key={index}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 mb-4">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{point.title}</h3>
                <p className="text-muted-foreground">{point.description}</p>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="bg-card rounded-3xl p-8 md:p-12 shadow-lg animate-scale-in" style={{ animationDelay: "0.3s" }}>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Our Impact So Far</h3>
            <p className="text-muted-foreground">And we're just getting started</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">200+</div>
              <div className="text-sm text-muted-foreground">Pounds of Food Saved</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">1000+</div>
              <div className="text-sm text-muted-foreground">Students Fed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Campus Events</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">15+</div>
              <div className="text-sm text-muted-foreground">Partner Clubs</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
