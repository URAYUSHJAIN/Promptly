import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Hero from './Hero';
import AudienceCards from './AudienceCards';
import Problem from './Problem';
import SocialProof from './SocialProof';
import Features from './Features';
import Testimonials from './Testimonials';
import CTA from './CTA';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <AudienceCards />
      <Problem />
      <SocialProof />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}
