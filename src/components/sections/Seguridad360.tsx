import React, { useEffect, useState, useRef } from "react";

const hexItems = [
  { title: "Equipo Defensivo", desc: "Protection proactiva con un equipo especializado." },
  { title: "DevSecOps", desc: "Integración de seguridad en el ciclo de desarrollo." },
  { title: "Infraestructura Segura", desc: "Implementación de medidas de seguridad efectivas." },
  { title: "Monitoreo 24/7", desc: "Vigilancia constante para detectar amenazas." },
  { title: "Flexibilidad", desc: "Planes modulares según tus necesidades." },
  { title: "Cobertura Global", desc: "Servicios en LATAM y EE.UU." },
];

// Calculate polar positions for hex items
function getHexPolarPos(index: number, total: number, radius: number) {
  const angle = (2 * Math.PI * index) / total - Math.PI / 2;
  return {
    left: `calc(50% + ${radius * Math.cos(angle)}px - 80px)`,
    top: `calc(50% + ${radius * Math.sin(angle)}px - 92px)`,
  };
}

export default function Seguridad360() {
  const [animationFinished, setAnimationFinished] = useState(false);
  const sectionRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState<number|null>(null);
  const shownIndex = hoveredIndex !== null ? hoveredIndex : 0;

  // Prevent scroll during animation
  useEffect(() => {
    const preventScroll = (e: Event) => {
      if (!animationFinished) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };
    
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    
    return () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, [animationFinished]);

  // Finish animation after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationFinished(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        .seguridad-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(135deg, #18122B 0%, #23235b 60%, #1B1A55 100%);
          color: white;
          padding: 6rem 2rem 6rem 2rem;
          min-height: 120vh;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          border: none;
          box-shadow: none;
          transition: background 0.6s;
          position: relative;
          overflow: hidden;
        }
        .particles-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .particles-bg span {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, #0ffb 0%, #1B6FFF00 100%);
          opacity: 0.18;
          filter: blur(1.5px);
          animation: particleMove 8s linear infinite;
        }
        @keyframes particleMove {
          0% { transform: translateY(0) scale(1); opacity: 0.18; }
          50% { opacity: 0.32; }
          100% { transform: translateY(-40px) scale(1.1); opacity: 0.18; }
        }
        .left-content {
          flex: 1;
          max-width: 480px;
        }
        .left-content h1 {
          font-size: 3.5rem;
          font-weight: 900;
          color: #ff6600;
          margin-bottom: 1.2rem;
        }
        .left-content p {
          font-size: 1.2rem;
          line-height: 1.6;
          color: #cfd9e9;
          margin-bottom: 1.8rem;
        }
        .left-content .about-section {
          margin: 2rem 0;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          padding: 1.5rem;
          box-shadow: 0 6px 18px rgba(30, 144, 255, 0.3);
        }
        .left-content button {
          background: linear-gradient(90deg, #ff6600 0%, #ff9900 100%);
          color: #fff;
          border: none;
          padding: 0.75rem 2rem;
          border-radius: 25px;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background 0.3s, box-shadow 0.3s, transform 0.2s;
          box-shadow: 0 0 16px #ff990088, 0 0 32px #ff660044;
          position: relative;
          overflow: hidden;
          outline: none;
        }
        .left-content button::after {
          content: '';
          position: absolute;
          left: 0; top: 0; right: 0; bottom: 0;
          border-radius: 25px;
          box-shadow: 0 0 32px #ff9900cc, 0 0 12px #fff2;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .left-content button:hover {
          background: linear-gradient(90deg, #ff9900 0%, #ff6600 100%);
          box-shadow: 0 0 32px #ff9900cc, 0 0 12px #fff2;
          transform: scale(1.06);
        }
        .left-content button:hover::after {
          opacity: 1;
        }
        .right-content {
          flex: 1;
          position: relative;
          width: 520px;
          height: 520px;
        }
        .hex-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 700px;
          height: 700px;
        }
        .hexagon {
          width: 180px;
          height: 170px;
          background: rgba(30,144,255,0.2);
          clip-path: polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%);
          position: absolute;
          text-align: center;
          padding: 0.7rem;
          transition: transform 0.3s cubic-bezier(.7,.2,.2,1), background 0.3s, box-shadow 0.3s;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          opacity: 0;
          animation: hexFadeIn 1s cubic-bezier(.7,.2,.2,1) forwards;
        }
        .hexagon:nth-child(1) { animation-delay: 0.1s; }
        .hexagon:nth-child(2) { animation-delay: 0.25s; }
        .hexagon:nth-child(3) { animation-delay: 0.4s; }
        .hexagon:nth-child(4) { animation-delay: 0.55s; }
        .hexagon:nth-child(5) { animation-delay: 0.7s; }
        .hexagon:nth-child(6) { animation-delay: 0.85s; }
        @keyframes hexFadeIn {
          from { opacity: 0; transform: scale(0.7); }
          to { opacity: 1; transform: scale(1); }
        }
        .hexagon:hover {
          transform: scale(1.1);
          background: rgba(30,144,255,0.35);
          box-shadow: 0 0 32px #0ffb, 0 2px 16px #1B1A55;
        }
        .hexagon strong {
          font-size: 1rem;
          color: #ff6600;
        }
        .hexagon p {
          font-size: 0.75rem;
          color: #d1eaff;
        }
        .hex-descbox {
          position: absolute;
          left: 110%;
          top: 50%;
          transform: translateY(-50%);
          width: 320px;
          background: rgba(20,20,30,0.97);
          color: #fff;
          border-radius: 18px;
          box-shadow: 0 4px 24px #1e90ff33, 0 0 32px #0ff6;
          padding: 1.1rem 1.2rem;
          text-align: left;
          font-size: 1.13rem;
          font-weight: 500;
          z-index: 10;
          border: 2px solid #1e90ff;
          min-height: 60px;
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.4s, transform 0.4s;
        }
        .hex-descbox.active {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(-50%) scale(1.03);
        }
        @media (max-width: 1100px) {
          .hex-descbox, .hex-descbox.active { left: 50%; top: 105%; transform: translate(-50%,0); width: 95vw; max-width: 340px; text-align: center; }
        }
        .center-logo {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 200px;
          height: 200px;
          background: #111a2c;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 60px #0ffb, 0 0 48px #1B6FFF99, 0 2px 36px #1B1A55;
          border: 6px solid #1e90ff;
          z-index: 2;
          animation: logoPulse 2.5s infinite;
        }
        .center-logo img {
          width: 110px;
          filter: drop-shadow(0 0 32px #0ffb);
        }
        @keyframes logoPulse {
          0% { box-shadow: 0 0 40px #0ffb, 0 0 32px #1B6FFF99, 0 2px 24px #1B1A55; }
          50% { box-shadow: 0 0 64px #0ffb, 0 0 44px #1B6FFFcc, 0 2px 36px #1B1A55; }
          100% { box-shadow: 0 0 40px #0ffb, 0 0 32px #1B6FFF99, 0 2px 24px #1B1A55; }
        }
        @media (max-width: 880px) {
          .seguridad-section {
            flex-direction: column;
            text-align: center;
          }
          .right-content {
            margin-top: 2rem;
            transform: scale(0.8);
          }
        }
      `}</style>

      <section className="seguridad-section" ref={sectionRef}>
        {/* Partículas animadas de fondo */}
        <div className="particles-bg">
          {[...Array(28)].map((_, i) => (
            <span key={i} style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: 4 + Math.random() * 6,
              height: 4 + Math.random() * 6,
              animationDelay: `${Math.random() * 8}s`,
            }} />
          ))}
        </div>
        <article className="left-content">
          <h1>Seguridad 360°</h1>
          <p className="strong">Desde el análisis de código hasta un virtual CISO.</p>
          <p>
            Contamos con una amplia gama de soluciones y planes pensados para diferentes tamaños de empresas.
          </p>
          <div className="about-section" style={{ minHeight: '120px', transition: 'all 0.3s' }}>
            <h2 style={{ color: '#ff9900', fontSize: '1.2rem', marginBottom: 8 }}>{hexItems[shownIndex].title}</h2>
            <p style={{ fontSize: '1.08rem', color: '#fff', lineHeight: 1.5 }}>
              {hexItems[shownIndex].desc}
            </p>
          </div>
          <button>Ver planes →</button>
        </article>
        <aside className="right-content">
          <div className="hex-container">
            {hexItems.map((item, i) => (
              <div
                className="hexagon"
                key={i}
                style={{
                  ...getHexPolarPos(i, hexItems.length, 210),
                  background: 'rgba(255,255,255,0.08)',
                  boxShadow: '0 0 24px #ff990055',
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <strong>{item.title}</strong>
              </div>
            ))}
            <div className="center-logo">
              <img src="/shield-logo.png" alt="Brotek logo" />
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}
