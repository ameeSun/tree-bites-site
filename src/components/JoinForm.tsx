import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const JoinForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    clubName: "",
    contactName: "",
    email: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!formData.clubName || !formData.contactName || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Stanford email validation
    const stanfordEmailRegex = /^[^\s@]+@stanford\.edu$/i;
    if (!stanfordEmailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid Stanford email address (@stanford.edu)",
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
      contactName: "",
      email: "",
      message: ""
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
              <label htmlFor="contactName" className="text-sm font-semibold">
                Contact Name <span className="text-primary">*</span>
              </label>
              <Input
                id="contactName"
                placeholder="Jane Doe"
                value={formData.contactName}
                onChange={(e) => handleChange("contactName", e.target.value)}
                required
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold">
                Stanford Email <span className="text-primary">*</span>
              </label>
              <Input
                id="email"
                type="email"
                placeholder="name@stanford.edu"
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
