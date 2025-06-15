
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
import { ThemeToggle } from '@/components/ThemeToggle';
import CallToAction from '@/components/landing/CallToAction';

const Landing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth relative flex flex-col">
      <div className="absolute top-6 right-6 z-10">
        <ThemeToggle />
      </div>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <HowItWorks />
        <Features />
        <IdeaFormSection />
        <WhyCofounderAI />
        <Testimonials />
        <WhosItFor />
        <FAQ />
        <CallToAction />
      </main>
      <FinalCTA />
    </div>
  );
};

export default Landing;
