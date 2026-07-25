import SEO from '../components/SEO';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Experiences from '../components/Experiences/Experiences';
import Resort from '../components/Resort/Resort';
import Statistics from '../components/Statistics/Statistics';
import Testimonials from '../components/Testimonials/Testimonials';
import FAQ from '../components/FAQ/FAQ';
import Contact from '../components/Contact/Contact';

export default function Home() {
  return (
    <>
      <SEO />
      <Hero />
      <About />
      <Experiences />
      <Resort />
      <Statistics />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}
