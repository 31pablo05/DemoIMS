import { useState, useEffect, useRef } from 'react';

interface Slide {
  image?: string;
  title: string;
  subtitle: string;
  tag?: string;
  cta?: { text: string; href: string };
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
      <section className="hero-slider" aria-label="Slider principal IMS">

        {slides.map((slide, i) => (
          <div
            key={i}
            className={`slide-layer${i === current ? ' active' : ''}`}
            aria-hidden={i !== current}
          >
            <div className="slide-bg" style={{ backgroundImage: `url(${slide.image})` }} />
            <div className="slide-overlay" />

            <div className="hero-content">
              <div className="content-block">
                {slide.tag && <div className="slide-tag">{slide.tag}</div>}
                <h1 className="slide-title">{slide.title}</h1>
                <p className="slide-subtitle">{slide.subtitle}</p>
                {slide.cta && (
                  <div className="cta-group">
                    <a href={slide.cta.href} className="slider-btn">
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
  );
}