import React, { useEffect, useState, useRef } from "react";

const hexItems = [
  { title: "Equipo Defensivo", desc: "Protection proactiva con un equipo especializado." },
  { title: "DevSecOps", desc: "Integración de seguridad en el ciclo de desarrollo." },
  { title: "Infraestructura Segura", desc: "Implementación de medidas de seguridad efectivas." },
  { title: "Monitoreo 24/7", desc: "Vigilancia constante para detectar amenazas." },
  { title: "Flexibilidad", desc: "Planes modulares según tus necesidades." },
  { title: "Cobertura Global", desc: "Servicios en LATAM y EE.UU." },
];

// Función para calcular posiciones polares alrededor del logo
function getHexPolarPos(index: number, total: number, radius: number) {
  const angle = (2 * Math.PI * index) / total - Math.PI / 2;
  // Offset para hexágonos más grandes (ahora 80px y 92px)
  return {
    left: `calc(50% + ${radius * Math.cos(angle)}px - 80px)`,
    top: `calc(50% + ${radius * Math.sin(angle)}px - 92px)`,
  };
}

export default function Seguridad360() {
  const [animationFinished, setAnimationFinished] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const preventScroll = (e: any) => {
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
          background: linear-gradient(180deg, #0a111f 0%, #1b1d26 100%);
          color: white;
          padding: 3rem 2rem;
          min-height: 100vh;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
        .left-content p.strong {
          font-weight: 700;
          color: #1e90ff;
          margin-bottom: 1.2rem;
        }
        .left-content button {
          background: linear-gradient(90deg, #ff6600 0%, #ff9900 100%);
          color: #fff;
          border: none;
          padding: 0.75rem 2rem;
          border-radius: 25px;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background 0.3s ease, transform 0.3s ease;
          box-shadow: 0 4px 12px rgba(255,102,0,0.6);
        }
        .left-content button:hover {
          background: linear-gradient(90deg, #ff9900 0%, #ff6600 100%);
          box-shadow: 0 6px 18px rgba(255,102,0,0.8);
          transform: scale(1.05);
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
          width: 520px;
          height: 520px;
        }
        .hexagon {
          width: 180px;
          height: 200px;
          background: rgba(30,144,255,0.2);
          clip-path: polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%);
          position: absolute;
          text-align: center;
          padding: 0.7rem;
          transition: transform 0.3s ease, background 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .hexagon:hover {
          transform: scale(1.1);
          background: rgba(30,144,255,0.35);
        }
        .hexagon strong {
          font-size: 0.9rem;
          color: #ff6600;
        }
        .hexagon p {
          font-size: 0.75rem;
          color: #d1eaff;
        }
        .center-logo {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 140px;
          height: 140px;
          background: #111a2c;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 20px #1e90ff70;
          border: 4px solid #1e90ff;
          z-index: 2;
        }
        .center-logo img {
          width: 70px;
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
        <article className="left-content">
          <h1>Titulo</h1>
          <p className="strong">Subtitulo</p>
          <p>
            Descripcion
          </p>
          <button>Ver planes →</button>
        </article>
        <aside className="right-content">
          <div className="hex-container">
            {hexItems.map((item, i) => (
              <div
                className={`hexagon`}
                key={i}
                style={{
                  ...getHexPolarPos(i, hexItems.length, 210),
                  background: 'rgba(255,255,255,0.08)',
                  boxShadow: '0 0 24px #ff990055',
                }}
              >
                <strong style={{ color: '#ff9900' }}>{item.title}</strong>
                <p>{item.desc}</p>
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
