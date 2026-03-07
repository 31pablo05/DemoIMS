import { useState, useEffect, useRef } from 'react';

interface Slide {
  image?: string;
  video?: string;
  title: string;
  subtitle: string;
  tag?: string;
  cta?: { text: string; href: string };
}

const slides: Slide[] = [
  {
    video: '/video/ims1.mp4',
    tag: 'Instituto Médico del Sur',
    title: 'Tu salud, nuestra misión',
    subtitle: 'Más de 30 años acompañando a la comunidad de Trelew con atención médica integral',
    cta: { text: 'Solicitar Turno', href: '/turnos' }
  },
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
  const [current, setCurrent] = useState(0);
  const currentRef = useRef(0);
  const lockRef = useRef(false);

  // Autoplay using refs so the interval never reads stale state
  useEffect(() => {
    const iv = setInterval(() => {
      if (lockRef.current) return;
      lockRef.current = true;
      const next = (currentRef.current + 1) % slides.length;
      setCurrent(next);
      currentRef.current = next;
      setTimeout(() => { lockRef.current = false; }, 800);
    }, 6000);
    return () => clearInterval(iv);
  }, []);

  const goTo = (i: number) => {
    if (i === currentRef.current || lockRef.current) return;
    lockRef.current = true;
    setCurrent(i);
    currentRef.current = i;
    setTimeout(() => { lockRef.current = false; }, 800);
  };

  return (
    <>
      <style>{`
        .hero-slider {
          position: relative;
          height: 100svh;
          min-height: 580px;
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
          opacity: 0;
          transition: opacity 0.9s ease;
        }
        .slide-layer.active {
          opacity: 1;
          z-index: 10;
        }

        .slide-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
        }

        .slide-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
        }

        .slide-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(105deg, rgba(1,12,30,0.88) 0%, rgba(1,20,40,0.65) 45%, rgba(0,0,0,0.12) 100%),
            linear-gradient(0deg, rgba(1,8,22,0.55) 0%, transparent 50%);
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
          max-width: 680px;
          color: #fff;
        }

        .slide-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(0,116,183,0.20);
          border: 1px solid rgba(0,168,225,0.35);
          color: #00A8E1;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 7px 16px;
          border-radius: 100px;
          margin-bottom: 22px;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s;
        }
        .slide-tag::before {
          content: '';
          width: 6px; height: 6px;
          background: #00A8E1;
          border-radius: 50%;
        }
        .slide-layer.active .slide-tag {
          opacity: 1; transform: translateY(0);
        }

        .slide-title {
          font-size: clamp(2.2rem, 5.5vw, 4.6rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.03em;
          margin: 0 0 18px;
          color: #fff;
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.6s ease 0.22s, transform 0.6s ease 0.22s;
        }
        .slide-layer.active .slide-title {
          opacity: 1; transform: translateY(0);
        }

        .slide-subtitle {
          font-size: clamp(0.9rem, 1.4vw, 1.05rem);
          font-weight: 400;
          color: rgba(255,255,255,0.68);
          max-width: 460px;
          line-height: 1.7;
          margin: 0 0 32px;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.6s ease 0.38s, transform 0.6s ease 0.38s;
        }
        .slide-layer.active .slide-subtitle {
          opacity: 1; transform: translateY(0);
        }

        .cta-group {
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s;
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
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 14px 28px;
          border-radius: 6px;
          text-decoration: none;
          transition: opacity 0.2s, transform 0.2s;
          box-shadow: 0 6px 24px rgba(0,116,183,0.4);
        }
        .btn-primary:hover {
          opacity: 0.9;
          transform: translateY(-2px);
        }
        .btn-primary svg { transition: transform 0.2s; }
        .btn-primary:hover svg { transform: translateX(3px); }

        /* ── EMERGENCY BADGE ── */
        .emergency-badge {
          position: absolute;
          top: 36px;
          right: 5%;
          z-index: 30;
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(160,0,0,0.82);
          border: 1px solid rgba(255,60,60,0.35);
          color: #fff;
          padding: 10px 18px;
          border-radius: 4px;
        }
        .pulse-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #ff6b6b;
          position: relative;
          flex-shrink: 0;
        }
        .pulse-dot::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2px solid #ff6b6b;
          animation: pulse-ring 1.6s ease-out infinite;
        }
        @keyframes pulse-ring {
          0%   { opacity: 0.8; transform: scale(0.7); }
          100% { opacity: 0;   transform: scale(2); }
        }
        .emergency-text {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .emergency-number {
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          opacity: 0.9;
          margin-top: 1px;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .emergency-badge { top: 18px; right: 4%; padding: 8px 14px; }
          .emergency-number { display: none; }
          .hero-content { padding: 0 6%; align-items: flex-end; padding-bottom: 48px; }
          .slide-title { font-size: clamp(2rem, 9vw, 3.2rem); }
        }
      `}</style>

      <section className="hero-slider" aria-label="Slider principal IMS">

        {slides.map((slide, i) => (
          <div
            key={i}
            className={`slide-layer${i === current ? ' active' : ''}`}
            aria-hidden={i !== current}
          >
            {slide.video
              ? <video className="slide-video" src={slide.video} autoPlay muted playsInline loop />
              : <div className="slide-bg" style={{ backgroundImage: `url(${slide.image})` }} />
            }
            <div className="slide-overlay" />

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
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        <div className="emergency-badge" role="status">
          <div className="pulse-dot" />
          <div>
            <div className="emergency-text">Guardia Activa</div>
            <div className="emergency-number">24 / 7 / 365</div>
          </div>
        </div>

      </section>
    </>
  );
}