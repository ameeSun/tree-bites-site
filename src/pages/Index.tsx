import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import AppDemo from "@/components/AppDemo";
import JoinForm from "@/components/JoinForm";
import Mission from "@/components/Mission";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <HowItWorks />
      <AppDemo />
      <JoinForm />
      <Mission />
      <Footer />
    </div>
  );
};

export default Index;
