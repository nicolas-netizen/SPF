import React from 'react';
import About from '../components/sections/About.tsx';

const Home: React.FC = () => {
  return (
    <main className="relative">
      <div className="space-y-24 pb-24">
        <About />
      </div>
    </main>
  );
};

export default Home;
