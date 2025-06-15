
import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import HowItWorks from '@/components/landing/HowItWorks';
import Features from '@/components/landing/Features';
import IdeaFormSection from '@/components/landing/IdeaFormSection';
import WhyCofounderAI from '@/components/landing/WhyCofounderAI';
import Testimonials from '@/components/landing/Testimonials';
import WhosItFor from '@/components/landing/WhosItFor';
import FAQ from '@/components/landing/FAQ';
import FinalCTA from '@/components/landing/FinalCTA';
import Footer from '@/components/landing/Footer';

const Landing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <IdeaFormSection />
        <WhyCofounderAI />
        <Testimonials />
        <WhosItFor />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
