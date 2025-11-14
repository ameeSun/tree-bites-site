import FoodMap from "@/components/mockup/components/FoodMap";

const features = [
  {
    icon: "📸",
    title: "Instant Upload",
    description: "Photos appear on the map within seconds"
  },
  {
    icon: "📍",
    title: "Location-Based",
    description: "Students find food near them instantly"
  },
  {
    icon: "🔔",
    title: "Push Notifications",
    description: "Nearby students get notified immediately"
  },
  {
    icon: "⏱️",
    title: "Real-Time Updates",
    description: "Food availability updates live"
  }
];

const AppDemo = () => {
  return (
    <section id="demo" className="py-24 px-6 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">See It in Action</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Students see your post instantly on their Tree Bites map
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-[3rem] blur-3xl" />
            
            {/* Main Content */}
            <div className="relative bg-card rounded-3xl shadow-2xl p-8 md:p-12 transition-transform hover:-translate-y-2 hover:shadow-2xl">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left - Phone Mockup with Interactive Map */}
                <div className="relative animate-scale-in mx-auto">
                  <div className="relative w-[390px] mx-auto">
                    {/* Phone Frame - iPhone 16 size */}
                    <div className="relative bg-black rounded-[3.5rem] p-[10px] shadow-2xl">
                      {/* Notch */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-b-[20px] z-10" />
                      
                      {/* Screen - iPhone 16 dimensions (390px x 844px) */}
                      <div className="relative bg-background rounded-[3rem] overflow-hidden" style={{ width: '370px', height: '844px' }}>
                        <div className="w-full h-full">
                          <FoodMap />
                        </div>
                      </div>
                    </div>

                    {/* Floating Notification */}
                    <div className="absolute -right-8 top-1/4 bg-card rounded-2xl p-4 shadow-xl animate-float border border-border max-w-[180px]">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-lg">🍕</span>
                        </div>
                        <span className="font-semibold text-sm">New Food Alert!</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Pizza at Tresidder</p>
                    </div>
                  </div>
                </div>

                {/* Right - Features List */}
                <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                  <div className="space-y-4">
                    {features.map((feature) => (
                      <div key={feature.title} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                          <span className="text-xl">{feature.icon}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                          <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      Join <span className="font-semibold text-primary">50+ clubs</span> already using Tree Bites to make an impact
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDemo;
