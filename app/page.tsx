import Header from "./components/Header";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import FeaturedWork from "./components/FeaturedWork";
import Values from "./components/Values";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import RevealObserver from "./components/RevealObserver";

export default function Home() {
  return (
    <>
      <a href="#work" className="skip-link">
        Skip to work
      </a>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <FeaturedWork />
        <Values />
        <Contact />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
