import React from 'react';
import Hero from '../components/sections/Hero.tsx';
import Services from '../components/sections/Services.tsx';
import About from '../components/sections/About.tsx';
import VideoSection from '../components/sections/VideoSection.tsx';

const Home: React.FC = () => {
  return (
    <main className="relative">
      <Hero />
      <div className="space-y-24 pb-24">
        <Services />
        <About />
        <VideoSection />
      </div>
    </main>
  );
};

export default Home;
