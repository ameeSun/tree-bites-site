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
    role: "student",
    clubName: "",
    contactPerson: "",
    studentName: "",
    studentPhone: "",
    email: "",
    message: "",
    interests: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    const isClub = formData.role === "club";
    if (
      (isClub && (!formData.clubName || !formData.contactPerson || !formData.email)) ||
      (!isClub && (!formData.studentName || !formData.email))
    ) {
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
      const clubFormURL = "https://docs.google.com/forms/u/3/d/e/1FAIpQLSfs3MCeqE72ahGdUc4TzAm74xXUtpklr32Kg5rF5Jkx6mA0CA/formResponse";

      const studentFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSduHomGTnQdouXo4VwrQi5aRutJsJPqZgS8GFqzaxNMkKxqiw/formResponse";

      const googleFormURL = formData.role === "club" ? clubFormURL : studentFormURL;

      const params = new URLSearchParams(
        isClub
          ? {
              // Club form fields
              "entry.1029101787": formData.clubName,
              "entry.751299023": formData.contactPerson,
              "entry.1769690342": formData.email,
              "entry.58283671": formData.message || "N/A",
            }
          : {
              // Student form fields (Tree Bites Student Sign-Up)
              "entry.906181567": formData.studentName,
              "entry.1295786383": formData.email,
              "entry.245907361": formData.studentPhone || "",
              "entry.80460510": formData.interests || "",
            }
      );

      params.append("submit", "Submit");
    

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
        role: formData.role,
        clubName: "",
        contactPerson: "",
        studentName: "",
        studentPhone: "",
        email: "",
        message: "",
        interests: ""
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
    <section id="join" className="py-24 px-4 sm:px-6 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container max-w-4xl">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Join the Tree Bites waitlist</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Clubs, event organizers, and hungry Stanford students can all sign up now to be the first to know when Tree Bites launches.
          </p>
        </div>

        <div className="bg-card rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 animate-scale-in transition-transform hover:-translate-y-2 hover:shadow-2xl space-y-8" style={{ animationDelay: "0.2s" }}>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                id: "student",
                title: "Student",
                description: "Get notified when free food pops up near you.",
              },
              {
                id: "club",
                title: "Club / Organizer",
                description: "Share leftover food after your event and reduce waste.",
              }
            ].map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, role: option.id }))}
                className={`rounded-2xl border p-4 text-left transition-all ${formData.role === option.id
                  ? "border-primary bg-primary/5 shadow-lg"
                  : "border-border hover:border-foreground/40"}`}
              >
                <p className="text-sm font-semibold text-primary mb-1">
                  {formData.role === option.id ? "Selected" : "Option"}
                </p>
                <h3 className="text-2xl font-bold mb-1">{option.title}</h3>
                <p className="text-muted-foreground">{option.description}</p>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {formData.role === "club" ? (
              <>
                <div className="space-y-2">
                  <label htmlFor="clubName" className="text-sm font-semibold">
                    Club / Organization <span className="text-primary">*</span>
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
                    placeholder="contact@stanford.edu"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold">
                    Upcoming events or needs <span className="text-muted-foreground">(optional)</span>
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about the food you usually have left over..."
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    className="rounded-xl min-h-[120px]"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <label htmlFor="studentName" className="text-sm font-semibold">
                    Full Name <span className="text-primary">*</span>
                  </label>
                  <Input
                    id="studentName"
                    placeholder="John Doe"
                    value={formData.studentName}
                    onChange={(e) => handleChange("studentName", e.target.value)}
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
                    placeholder="sunet@stanford.edu"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="studentPhone" className="text-sm font-semibold">
                    Phone Number <span className="text-muted-foreground">(optional)</span>
                  </label>
                  <Input
                    id="studentPhone"
                    type="tel"
                    placeholder="(650) 555-1234"
                    value={formData.studentPhone}
                    onChange={(e) => handleChange("studentPhone", e.target.value)}
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="interests" className="text-sm font-semibold">
                    Food preferences <span className="text-muted-foreground">(optional)</span>
                  </label>
                  <Textarea
                    id="interests"
                    placeholder="I love post-event pizza, boba, sushi, pastries, etc..."
                    value={formData.interests}
                    onChange={(e) => handleChange("interests", e.target.value)}
                    className="rounded-xl min-h-[120px]"
                  />
                </div>
              </>
            )}

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
