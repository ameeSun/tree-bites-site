import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import confetti from "canvas-confetti";

const JoinForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    clubName: "",
    contactPerson: "",
    email: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!formData.clubName || !formData.contactPerson || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const googleFormURL =
        "https://docs.google.com/forms/u/3/d/e/1FAIpQLSfs3MCeqE72ahGdUc4TzAm74xXUtpklr32Kg5rF5Jkx6mA0CA/formResponse";

      const params = new URLSearchParams({
        "entry.1029101787": formData.clubName,
        "entry.751299023": formData.contactPerson,
        "entry.1769690342": formData.email,
        "entry.58283671": formData.message,
      });

      await fetch(googleFormURL, {
        method: "POST",
        mode: "no-cors",
        body: params,
      });

      // Launch confetti with green and cardinal (red) particles
      const duration = 3000;
      const end = Date.now() + duration;

      const colors = ['#2FB16A', '#8C1515']; // Green and Cardinal red

      (function frame() {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());

      toast({
        title: "🎉 Thanks for signing up!",
        description: "You're on the Tree Bites waitlist — we'll reach out before launch.",
      });

      setFormData({
        clubName: "",
        contactPerson: "",
        email: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }

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
            Get early access to Tree Bites and start making an impact
          </p>
        </div>

        <div className="bg-card rounded-3xl shadow-2xl p-8 md:p-12 animate-scale-in transition-transform hover:-translate-y-2 hover:shadow-2xl" style={{ animationDelay: "0.2s" }}>
          <form onSubmit={handleSubmit} className="space-y-6">
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
                Contact Name <span className="text-primary">*</span>
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

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold">
                Email <span className="text-primary">*</span>
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-semibold">
                Message <span className="text-muted-foreground">(optional)</span>
              </label>
              <Textarea
                id="message"
                placeholder="Tell us anything else we should know..."
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                className="rounded-xl min-h-[120px]"
              />
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
