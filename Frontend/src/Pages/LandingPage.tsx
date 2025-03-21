import { useRef } from "react";
import { FeaturesSection } from "../components/FeaturesSection";
import HeroSection from "../components/HeroSection";
import { Navbar } from "../components/Navbar";
import { HowItWorksSection } from "../components/HowItWorks";
import { AboutSection } from "../components/AboutSection";
import { CtaSection } from "../components/CtaSection";
import Footer from "../components/Footer";
import Background from "../components/Background";
import { FadeInOnScroll } from "../components/FadeInOnScroll";

export default function LandingPage(){
    const featuresRef = useRef(null);
    const howItWorksRef = useRef(null);
    const aboutRef = useRef(null);

    const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
        if (ref.current) {
          ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return <div>
        <Background />
        <Navbar 
            scrollToFeatures={()=>scrollToSection(featuresRef)}
            scrollToHowItWorks={()=>scrollToSection(howItWorksRef)}
            scrollToAbout={()=>scrollToSection(aboutRef)}
            featuresRef={featuresRef}
            howItWorksRef={howItWorksRef}
            aboutRef={aboutRef}
            scrollToSection={scrollToSection}
        />
        <HeroSection />
        <FadeInOnScroll><FeaturesSection ref={featuresRef}/></FadeInOnScroll>
        <FadeInOnScroll><HowItWorksSection ref={howItWorksRef}/></FadeInOnScroll>
        <FadeInOnScroll><AboutSection ref={aboutRef}/></FadeInOnScroll>
        <FadeInOnScroll><CtaSection/></FadeInOnScroll>
        <FadeInOnScroll><Footer/></FadeInOnScroll>
    </div>
}