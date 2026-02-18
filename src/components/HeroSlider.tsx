import { useState, useEffect, useRef } from 'react';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  tag?: string;
  cta?: {
    text: string;
    href: string;
  };
}

const slides: Slide[] = [
  {
    image: '/imagenes/clinica/frenteims.jpg',
    tag: 'Disponible las 24 horas',
    title: 'Guardia Médica 24 Horas',
    subtitle: 'Atención de excelencia cuando más lo necesitas',
    cta: { text: 'Solicitar Turno', href: '/turnos' }
  },
  {
    image: '/imagenes/clinica/ims1.jpg',
    tag: 'Diagnóstico avanzado',
    title: 'Tecnología de Vanguardia',
    subtitle: 'Equipamiento de última generación para diagnósticos precisos',
    cta: { text: 'Nuestros Servicios', href: '/servicios' }
  },
  {
    image: '/imagenes/clinica/ims3.jpg',
    tag: 'Trayectoria institucional',
    title: 'Más de 30 Años de Experiencia',
    subtitle: 'Profesionales comprometidos con tu salud y bienestar',
    cta: { text: 'Conocer Profesionales', href: '/profesionales' }
  },
  {
    image: '/imagenes/clinica/ims2.jpg',
    tag: 'Privacidad garantizada',
    title: 'Confidencialidad y Seguridad',
    subtitle: 'Máxima privacidad y seguridad de tus datos médicos',
    cta: { text: 'Solicitar Turno', href: '/turnos' }
  },
  {
    image: '/imagenes/clinica/imsrecepcion.jpg',
    tag: 'Urgencias inmediatas',
    title: 'Respuesta Inmediata',
    subtitle: 'Guardia médica 24/7 los 365 días del año',
    cta: { text: 'Solicitar Turno', href: '/turnos' }
  },
  {
    image: '/imagenes/clinica/ims4.jpg',
    tag: 'Centrados en el paciente',
    title: 'Atención Humanizada',
    subtitle: 'Trato cálido y personalizado para cada paciente',
    cta: { text: 'Solicitar Turno', href: '/turnos' }
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const SLIDE_DURATION = 6000;

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      advanceSlide((prev: number) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentSlide]);

  const advanceSlide = (getNext: (prev: number) => number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setPrevSlide(currentSlide);
    setCurrentSlide(getNext(currentSlide));
    setTimeout(() => {
      setPrevSlide(null);
      setIsAnimating(false);
    }, 800);
  };

  const goToSlide = (index: number) => {
    if (index === currentSlide || isAnimating) return;
    setIsAnimating(true);
    setPrevSlide(currentSlide);
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
    autoPlayRef.current = setTimeout(() => setIsAutoPlaying(true), 12000);
    setTimeout(() => {
      setPrevSlide(null);
      setIsAnimating(false);
    }, 800);
  };

  return (
    <>
      <style>{`
        .hero-slider {
          position: relative;
          height: 100svh;
          min-height: 620px;
          max-height: 860px;
          overflow: hidden;
          font-family: 'Inter', system-ui, sans-serif;
          background: #020c1a;
        }

        /* ── SLIDE LAYERS ── */
        .slide-layer {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .slide-layer.active   { z-index: 10; }
        .slide-layer.exiting  { z-index: 5;  }

        .slide-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transition: opacity 0.9s ease, transform 7s ease;
        }
        .slide-layer.active   .slide-bg { opacity: 1;   transform: scale(1.07); }
        .slide-layer.exiting  .slide-bg { opacity: 0;   transform: scale(1.12); }
        .slide-layer:not(.active):not(.exiting) .slide-bg { opacity: 0; transform: scale(1); }

        /* deep cinematic overlay */
        .slide-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(105deg, rgba(1,12,30,0.88) 0%, rgba(1,20,40,0.65) 45%, rgba(0,0,0,0.15) 100%),
            linear-gradient(0deg, rgba(1,8,22,0.6) 0%, transparent 50%);
        }

        /* decorative grid lines */
        .grid-lines {
          position: absolute;
          inset: 0;
          z-index: 12;
          pointer-events: none;
          opacity: 0.06;
          background-image:
            linear-gradient(to right, #a8d8ea 1px, transparent 1px),
            linear-gradient(to bottom, #a8d8ea 1px, transparent 1px);
          background-size: 80px 80px;
        }

        /* ── CONTENT ── */
        .hero-content {
          position: absolute;
          inset: 0;
          z-index: 20;
          display: flex;
          align-items: center;
          padding: 0 5%;
          max-width: 1400px;
          margin: 0 auto;
          left: 0; right: 0;
        }

        .content-block {
          max-width: 700px;
          color: #fff;
        }

        .slide-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(0,116,183,0.18);
          border: 1px solid rgba(0,168,225,0.35);
          backdrop-filter: blur(10px);
          color: #00A8E1;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 7px 16px;
          border-radius: 100px;
          margin-bottom: 24px;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s;
        }
        .slide-tag::before {
          content: '';
          width: 6px; height: 6px;
          background: #00A8E1;
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(0,168,225,0.8);
        }
        .slide-layer.active .slide-tag {
          opacity: 1; transform: translateY(0);
        }

        .slide-title {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: clamp(2.4rem, 5.5vw, 5rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.03em;
          margin: 0 0 20px;
          color: #fff;
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s;
        }
        .slide-layer.active .slide-title {
          opacity: 1; transform: translateY(0);
        }

        .slide-subtitle {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: clamp(0.95rem, 1.5vw, 1.1rem);
          font-weight: 400;
          color: rgba(255,255,255,0.68);
          max-width: 480px;
          line-height: 1.7;
          margin: 0 0 36px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s;
        }
        .slide-layer.active .slide-subtitle {
          opacity: 1; transform: translateY(0);
        }

        .cta-group {
          display: flex;
          gap: 14px;
          align-items: center;
          flex-wrap: wrap;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s ease 0.55s, transform 0.7s ease 0.55s;
        }
        .slide-layer.active .cta-group {
          opacity: 1; transform: translateY(0);
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, #0074B7 0%, #00A8E1 100%);
          color: #fff;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 15px 28px;
          border-radius: 6px;
          text-decoration: none;
          transition: opacity 0.25s, transform 0.2s, box-shadow 0.25s;
          box-shadow: 0 8px 28px rgba(0,116,183,0.45);
          position: relative;
          overflow: hidden;
        }
        .btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #00A8E1 0%, #005A8C 100%);
          opacity: 0;
          transition: opacity 0.25s;
        }
        .btn-primary:hover::before { opacity: 1; }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 36px rgba(0,116,183,0.55);
        }
        .btn-primary span, .btn-primary svg { position: relative; z-index: 1; }
        .btn-primary svg { transition: transform 0.25s; }
        .btn-primary:hover svg { transform: translateX(4px); }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: rgba(255,255,255,0.75);
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.2);
          padding: 14px 22px;
          border-radius: 6px;
          backdrop-filter: blur(6px);
          background: rgba(255,255,255,0.06);
          transition: color 0.2s, border-color 0.2s, background 0.2s, transform 0.2s;
        }
        .btn-secondary:hover {
          color: #fff;
          border-color: rgba(0,168,225,0.5);
          background: rgba(0,116,183,0.15);
          transform: translateY(-2px);
        }

        /* ── SIDE PANEL ── */
        .side-panel {
          position: absolute;
          right: 5%;
          top: 50%;
          transform: translateY(-50%);
          z-index: 25;
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: flex-end;
        }

        .side-dot-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px 0;
        }
        .dot-label {
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0);
          transition: color 0.3s;
          white-space: nowrap;
        }
        .side-dot-btn:hover .dot-label,
        .side-dot-btn.active-dot .dot-label { color: rgba(255,255,255,0.5); }

        .dot-mark {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.3);
          border: 1px solid rgba(255,255,255,0.4);
          transition: all 0.35s;
          flex-shrink: 0;
        }
        .side-dot-btn.active-dot .dot-mark {
          background: #00A8E1;
          border-color: #00A8E1;
          box-shadow: 0 0 12px rgba(0,168,225,0.6);
          width: 10px;
          height: 10px;
        }

        /* ── EMERGENCY BADGE ── */
        .emergency-badge {
          position: absolute;
          top: 40px;
          right: 5%;
          z-index: 30;
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(180,0,0,0.85);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,60,60,0.4);
          color: #fff;
          padding: 10px 20px;
          border-radius: 4px;
          box-shadow: 0 4px 24px rgba(200,0,0,0.4);
        }
        .emergency-badge .pulse-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #ff6b6b;
          position: relative;
        }
        .pulse-dot::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2px solid #ff6b6b;
          animation: pulse-ring 1.5s ease-out infinite;
        }
        @keyframes pulse-ring {
          0%   { opacity: 0.8; transform: scale(0.8); }
          100% { opacity: 0;   transform: scale(2); }
        }
        .emergency-text { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; font-family: 'Inter', system-ui, sans-serif; }
        .emergency-number { font-family: 'Inter', system-ui, sans-serif; font-size: 1rem; font-weight: 700; letter-spacing: 0.04em; opacity: 0.9; }

        /* ── DECORATIVE LINE ── */
        .deco-line {
          position: absolute;
          top: 0; bottom: 0;
          left: 5%;
          width: 1px;
          z-index: 15;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0.12) 70%, transparent);
          pointer-events: none;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .side-panel { display: none; }
          .emergency-badge { top: 20px; right: 20px; padding: 8px 14px; }
          .emergency-number { display: none; }
          .hero-content { padding: 0 6%; align-items: flex-end; padding-bottom: 40px; }
          .slide-title { font-size: clamp(2.2rem, 9vw, 3.5rem); }
          .btn-secondary { display: none; }
        }
      `}</style>

      <section className="hero-slider" aria-label="Slider principal IMS">
        {/* Decorative vertical line */}
        <div className="deco-line" aria-hidden="true" />

        {/* Subtle grid overlay */}
        <div className="grid-lines" aria-hidden="true" />

        {/* ── SLIDES ── */}
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`slide-layer ${i === currentSlide ? 'active' : i === prevSlide ? 'exiting' : ''}`}
            aria-hidden={i !== currentSlide}
          >
            <div
              className="slide-bg"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="slide-overlay" />

            {/* Content */}
            <div className="hero-content">
              <div className="content-block">
                {slide.tag && <div className="slide-tag">{slide.tag}</div>}

                <h1 className="slide-title">{slide.title}</h1>
                <p className="slide-subtitle">{slide.subtitle}</p>

                {slide.cta && (
                  <div className="cta-group">
                    <a href={slide.cta.href} className="btn-primary">
                      <span>{slide.cta.text}</span>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </a>
                    <a href="/nosotros" className="btn-secondary">
                      Conocer más
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* ── EMERGENCY BADGE ── */}
        <div className="emergency-badge" role="status">
          <div className="pulse-dot" />
          <div>
            <div className="emergency-text">Guardia Activa</div>
            <div className="emergency-number">24 / 7 / 365</div>
          </div>
        </div>

        {/* ── SIDE DOTS ── */}
        <nav className="side-panel" aria-label="Navegación de slides">
          {slides.map((slide, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`side-dot-btn ${i === currentSlide ? 'active-dot' : ''}`}
              aria-label={`Ir a: ${slide.title}`}
              aria-current={i === currentSlide}
            >
              <span className="dot-label">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="dot-mark" />
            </button>
          ))}
        </nav>


      </section>
    </>
  );
}