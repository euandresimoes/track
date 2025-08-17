import Header from "@/components/HeaderHome";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import AppPreview from "@/components/AppPreview";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <AppPreview />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
