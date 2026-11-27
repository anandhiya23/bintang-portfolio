import Header from "./components/Header";
import Intro from "./components/landing/Intro";
import SmoothScroll from "./components/landing/SmoothScroll";
import HeroZoom from "./components/landing/HeroZoom";
import Ticker from "./components/landing/Ticker";
import Manifesto from "./components/landing/Manifesto";
import WorkRail from "./components/landing/WorkRail";
import Stack from "./components/landing/Stack";
import ProcessCube from "./components/landing/ProcessCube";
import ContactBlock from "./components/landing/ContactBlock";
import RevealFooter from "./components/landing/RevealFooter";

export default function Home() {
  return (
    <div className="lp">
      <a href="#work" className="lp-skip">
        Skip to work
      </a>
      <Intro />
      <SmoothScroll />
      <Header />
      <main className="lp-main">
        <HeroZoom />
        <Ticker />
        <Manifesto />
        <WorkRail />
        <ProcessCube />
        <Stack />
        <ContactBlock />
      </main>
      <RevealFooter />
    </div>
  );
}
