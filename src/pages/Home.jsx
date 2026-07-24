import { Helmet } from 'react-helmet-async';
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
 * Main landing page composing all sections.
 */
export default function Home() {
  return (
    <>
      <Helmet>
        <title>Patao Pocket Patio & Plant Sanctuary</title>
        <meta
          name="description"
          content="A peaceful eco-friendly nature destination with botanical gardens, resort pools, and unforgettable moments."
        />
      </Helmet>

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
