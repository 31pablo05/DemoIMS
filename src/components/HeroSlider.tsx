import { useState, useEffect } from 'react';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  cta?: {
    text: string;
    href: string;
  };
}

const slides: Slide[] = [
  {
    image: '/imagenes/clinica/frenteims.jpg',
    title: 'Guardia Médica 24 Horas',
    subtitle: 'Atención de excelencia cuando más lo necesitas',
    cta: { text: 'Solicitar Turno', href: '/turnos' }
  },
  {
    image: '/imagenes/clinica/ims1.jpg',
    title: 'Tecnología de Vanguardia',
    subtitle: 'Equipamiento de última generación para diagnósticos precisos',
    cta: { text: 'Nuestros Servicios', href: '/servicios' }
  },
  { 
    image: '/imagenes/clinica/ims3.jpg',
    title: 'Más de 30 Años de Experiencia',
    subtitle: 'Profesionales comprometidos con tu salud y bienestar',
    cta: { text: 'Conocer Profesionales', href: '/profesionales' }
  },
  {
    image: '/imagenes/clinica/ims2.jpg',
    title: 'Confidencialidad y Seguridad',
    subtitle: 'Máxima privacidad y seguridad de tus datos médicos',
    cta: { text: 'Solicitar Turno', href: '/turnos' }
  },
  {
    image: '/imagenes/clinica/imsrecepcion.jpg',
    title: 'Respuesta Inmediata',
    subtitle: 'Guardia médica 24/7 los 365 días del año',
    cta: { text: 'Solicitar Turno', href: '/turnos' }
  },
  {
    image: '/imagenes/clinica/ims4.jpg',
    title: 'Atención Humanizada',
    subtitle: 'Trato cálido y personalizado para cada paciente',
    cta: { text: 'Solicitar Turno', href: '/turnos' }
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative h-[600px] md:h-[700px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl text-white">
              <div className="overflow-hidden">
                <h1 
                  className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight transition-all duration-700 ${
                    index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: '200ms' }}
                >
                  {slide.title}
                </h1>
              </div>
              <div className="overflow-hidden">
                <p 
                  className={`text-xl md:text-2xl mb-8 text-gray-200 transition-all duration-700 ${
                    index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: '400ms' }}
                >
                  {slide.subtitle}
                </p>
              </div>
              {slide.cta && (
                <div className="overflow-hidden">
                  <a
                    href={slide.cta.href}
                    className={`inline-block bg-white text-primary hover:bg-primary hover:text-white font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 ${
                      index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}
                    style={{ transitionDelay: '600ms' }}
                  >
                    {slide.cta.text}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'w-12 h-3 bg-white'
                : 'w-3 h-3 bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Emergency Badge */}
      <div className="absolute top-8 right-8 z-30 bg-red-600 text-white px-6 py-3 rounded-full shadow-2xl animate-pulse">
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
          </svg>
          <span className="font-bold">Guardia 24hs</span>
        </div>
      </div>
    </div>
  );
}
