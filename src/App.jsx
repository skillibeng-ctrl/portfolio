import { useState } from "react";
import NavBar from "./components/Navbar";
import StarsBG from "./components/StarsBG";
import Hero from "./components/Home";
import TechStack from "./components/TechStack";
import ProjectSlider from "./components/ProjectSlider";
import TestimonialCard from "./components/TestimonialCard";
import ProcessOverview from "./components/ProcessOverView";
import StrategySection from "./components/StrategySectiom";
import WhatIDeliver from "./components/WhatIDeliver";
import Footer from "./components/Footer";

export default function App() {
  const [clicked, setClicked] = useState(false);

  return (
    <>
      {/* <StarsBG /> */}
      <NavBar />
      <Hero />
      <TechStack />
      <ProjectSlider/>
      <TestimonialCard/>
      <ProcessOverview/>
      <StrategySection/>
      <WhatIDeliver/>
      <Footer/>
    </>
  );
}


{/* <div className="mt-0.2 relative h-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent" />
        <svg 
          className="absolute bottom-0 w-full" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            fill="rgba(30,58,138,0.5)" 
            className="opacity-20"
          />
          <path 
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
            fill="rgba(37,99,235,0.3)" 
            className="opacity-30"
          />
        </svg>
      </div> */}
      {/* Scroll indicator */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-scroll" />
        </div>
      </div> */}