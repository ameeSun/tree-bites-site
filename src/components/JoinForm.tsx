import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const JoinForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    clubName: "",
    contactPerson: "",
    email: "",
    socialMedia: "",
    eventsPerQuarter: "",
    message: "",
    hostsCateredEvents: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!formData.clubName || !formData.contactPerson || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Show success with confetti effect
    toast({
      title: "🎉 Welcome to Food Bites!",
      description: "We'll be in touch soon with early access details.",
    });

    // Reset form
    setFormData({
      clubName: "",
      contactPerson: "",
      email: "",
      socialMedia: "",
      eventsPerQuarter: "",
      message: "",
      hostsCateredEvents: false
    });
    
    setIsSubmitting(false);
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="join" className="py-24 px-6 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container max-w-3xl">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Join as a Club</h2>
          <p className="text-xl text-muted-foreground">
            Get early access to Food Bites and start making an impact
          </p>
        </div>

        <div className="bg-card rounded-3xl shadow-2xl p-8 md:p-12 animate-scale-in" style={{ animationDelay: "0.2s" }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="clubName" className="text-sm font-semibold">
                  Club Name <span className="text-primary">*</span>
                </label>
                <Input
                  id="clubName"
                  placeholder="Stanford Sustainability Club"
                  value={formData.clubName}
                  onChange={(e) => handleChange("clubName", e.target.value)}
                  required
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="contactPerson" className="text-sm font-semibold">
                  Contact Person <span className="text-primary">*</span>
                </label>
                <Input
                  id="contactPerson"
                  placeholder="Jane Doe"
                  value={formData.contactPerson}
                  onChange={(e) => handleChange("contactPerson", e.target.value)}
                  required
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold">
                Email Address <span className="text-primary">*</span>
              </label>
              <Input
                id="email"
                type="email"
                placeholder="club@stanford.edu"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
                className="rounded-xl"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="socialMedia" className="text-sm font-semibold">
                  Instagram / Website
                </label>
                <Input
                  id="socialMedia"
                  placeholder="@your_club"
                  value={formData.socialMedia}
                  onChange={(e) => handleChange("socialMedia", e.target.value)}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="eventsPerQuarter" className="text-sm font-semibold">
                  Events per Quarter
                </label>
                <Input
                  id="eventsPerQuarter"
                  placeholder="5-10"
                  value={formData.eventsPerQuarter}
                  onChange={(e) => handleChange("eventsPerQuarter", e.target.value)}
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-semibold">
                Tell us about your club
              </label>
              <Textarea
                id="message"
                placeholder="What kind of events do you host? How much food typically goes to waste?"
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                className="rounded-xl min-h-[120px]"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="hostsCateredEvents"
                checked={formData.hostsCateredEvents}
                onCheckedChange={(checked) => handleChange("hostsCateredEvents", checked as boolean)}
              />
              <label
                htmlFor="hostsCateredEvents"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                We regularly host catered events
              </label>
            </div>

            <Button 
              type="submit" 
              variant="hero" 
              size="lg" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Get Early Access 🎉"
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              By joining, you agree to help reduce food waste on campus
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default JoinForm;
