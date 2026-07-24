import SEO from '../components/SEO';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Experiences from '../components/Experiences/Experiences';
import Gallery from '../components/Gallery/Gallery';
import Resort from '../components/Resort/Resort';
import Statistics from '../components/Statistics/Statistics';
import Testimonials from '../components/Testimonials/Testimonials';
import FAQ from '../components/FAQ/FAQ';
import Contact from '../components/Contact/Contact';

/**
 * Main landing page composing all sections with full SEO.
 */
export default function Home() {
  return (
    <>
      <SEO />

      <Hero />
      <About />
      <Experiences />
      <Gallery />
      <Resort />
      <Statistics />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}
