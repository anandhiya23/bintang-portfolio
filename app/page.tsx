import Header from "./components/Header";
import Hero from "./components/Hero";
import FeaturedWork from "./components/FeaturedWork";
import Values from "./components/Values";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-32">
        <Hero />
        <FeaturedWork />
        <Values />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
