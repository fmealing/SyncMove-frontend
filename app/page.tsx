import React from "react";
import Hero from "./components/LandingPage/Hero";
import Features from "./components/LandingPage/Features";
import HowItWorks from "./components/LandingPage/HowItWorks";
import FinalCTA from "./components/LandingPage/FinalCTA";
export default function HomePage() {
  return (
    <div>
      <Hero />
      <Features />
      <HowItWorks />
      <FinalCTA />
    </div>
  );
}
