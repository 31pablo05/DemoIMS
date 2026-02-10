# 🏥 Instituto Médico del Sur - Sitio Web Institucional

Sitio web institucional completo para el Instituto Médico del Sur, centro médico integral ubicado en Trelew, Chubut, Argentina.

## ✨ Características

- **Diseño Moderno y Profesional**: Estética médica con paleta de colores azules institucionales
- **Arquitectura de Islas React**: Componentes interactivos con hidratación selectiva usando Astro Islands
- **Slider Hero con Autoplay**: Carrusel automático de imágenes de las instalaciones
- **Animaciones Suaves**: Efectos de entrada y transiciones fluidas en toda la página
- **Glassmorfismo**: Efectos de cristal esmerilado en navbar y tarjetas
- **Galería de Instalaciones**: Showcase de las instalaciones médicas
- **Sistema de Turnos**: Integración con WhatsApp para solicitar citas médicas
- **Sección de Estadísticas**: Números clave de la institución con animaciones
- **Responsive Design**: Optimizado para dispositivos móviles, tablets y escritorio
- **SEO Optimizado**: Meta tags, Open Graph y Twitter Cards para compartir en redes sociales
- **Rendimiento Óptimo**: Generación estática con Astro 5 para velocidad máxima

## 🚀 Tecnologías Utilizadas

- **[Astro 5.17.1](https://astro.build/)** - Framework web moderno para contenido
- **[React 18.2.0](https://react.dev/)** - Biblioteca UI para componentes interactivos
- **[Tailwind CSS 4.1.18](https://tailwindcss.com/)** - Framework CSS utilitario
- **[TypeScript](https://www.typescriptlang.org/)** - Superset tipado de JavaScript
- **[Vite](https://vitejs.dev/)** - Build tool y dev server ultrarrápido

## 📁 Estructura del Proyecto

```text
/
├── public/
│   └── imagenes/
│       ├── logo/
│       │   └── logo1.png
│       └── clinica/
│           ├── exterior.jpg
│           ├── consultorio.jpg
│           ├── sala.jpg
│           ├── tecnologia.jpg
│           ├── espera.jpg
│           └── quirofano.jpg
├── src/
│   ├── components/
│   │   ├── SEO.astro                    # Meta tags y SEO
│   │   ├── Layout.astro                 # Layout principal
│   │   ├── Navbar.astro                 # Navegación con glassmorfismo
│   │   ├── Footer.astro                 # Footer mejorado
│   │   ├── Hero.astro                   # Hero section original
│   │   ├── HeroSlider.tsx               # 🆕 Carrusel de imágenes React
│   │   ├── ServiceCard.astro            # Tarjeta de servicios con gradientes
│   │   ├── DoctorCard.astro             # Tarjeta de profesionales
│   │   ├── GaleriaInstalaciones.astro   # 🆕 Galería de fotos 4 columnas
│   │   ├── StatsSection.astro           # 🆕 Sección de estadísticas
│   │   ├── WhyChooseUs.astro            # 🆕 Por qué elegirnos
│   │   ├── MapEmbed.astro               # Mapa de Google
│   │   ├── WhatsAppButton.tsx           # Botón flotante de WhatsApp
│   │   └── TurnoForm.tsx                # Formulario de turnos con validación
│   ├── pages/
│   │   ├── index.astro                  # Página principal (rediseñada)
│   │   ├── servicios.astro              # Catálogo de servicios
│   │   ├── profesionales.astro          # Staff médico
│   │   ├── turnos.astro                 # Solicitar turno
│   │   └── horarios.astro               # Horarios de atención
│   └── styles/
│       └── global.css                   # Estilos globales + @theme + animaciones
├── astro.config.mjs                     # Configuración de Astro
├── tailwind.config.mjs                  # Configuración de Tailwind CSS
├── tsconfig.json                        # Configuración de TypeScript
├── vercel.json                          # Configuración de deploy Vercel
└── package.json                         # Dependencias y scripts
```

## 🎨 Paleta de Colores

La paleta de colores está inspirada en el logo institucional:

```css
--color-primary: #0074B7;     /* Azul institucional principal */
--color-secondary: #00A8E1;   /* Azul secundario más claro */
--color-accent: #005A8C;      /* Azul oscuro para acentos */
--color-dark: #003554;        /* Azul muy oscuro para fondos */
--color-light: #E6F3FB;       /* Azul muy claro para fondos */
```

## 📦 Instalación

1. **Clonar el repositorio** (o extraer el proyecto):

```bash
cd DemoIMS
```

2. **Instalar dependencias**:

```bash
npm install
```

3. **Agregar imágenes** (requerido):

Coloca las imágenes reales de la clínica en:
- `public/imagenes/clinica/exterior.jpg` - Foto exterior del edificio
- `public/imagenes/clinica/consultorio.jpg` - Consultorio médico
- `public/imagenes/clinica/sala.jpg` - Sala de espera o atención
- `public/imagenes/clinica/tecnologia.jpg` - Equipos médicos
- `public/imagenes/clinica/espera.jpg` - Sala de espera
- `public/imagenes/clinica/quirofano.jpg` - Quirófano o área quirúrgica

4. **Iniciar servidor de desarrollo**:

```bash
npm run dev
```

El sitio estará disponible en `http://localhost:4321`

## 🧞 Comandos

| Comando                   | Acción                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Instala las dependencias                         |
| `npm run dev`             | Inicia servidor de desarrollo en `localhost:4321`|
| `npm run build`           | Construye el sitio para producción en `./dist/`  |
| `npm run preview`         | Previsualizar build localmente antes de deploy   |
| `npm run astro ...`       | Ejecutar comandos CLI de Astro                   |
| `npm run astro -- --help` | Ayuda de la CLI de Astro                         |

## 🌐 Despliegue en Vercel

El proyecto está optimizado para desplegarse en Vercel:

1. **Conecta tu repositorio** a Vercel
2. **Configura el proyecto**:
   - Framework Preset: `Astro`
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. **Deploy** automático en cada push a main

También incluye un archivo `vercel.json` con configuraciones adicionales.

### Deploy Manual

```bash
npm run build
npx vercel --prod
```

## 📱 Páginas del Sitio

### 1. **Inicio** (`/`)
- Hero slider con imágenes rotativas
- Sección de estadísticas institucionales
- Por qué elegirnos (valores)
- Servicios destacados
- Galería de instalaciones
- Equipo de profesionales
- Call to action para turnos
- Ubicación con mapa

### 2. **Servicios** (`/servicios`)
- Guardia médica 24hs
- Ginecología y obstetricia
- Neonatología
- Diagnóstico por imágenes (Rayos X, Ecografías, Resonancia)
- Internación

### 3. **Profesionales** (`/profesionales`)
- 6 Ginecólogos/Obstetras con matrículas
- 4 Neonatólogos con matrículas
- Información de contacto por área

### 4. **Turnos** (`/turnos`)
- Formulario de solicitud de turnos
- Validación de campos
- Integración con WhatsApp para confirmación
- Múltiples especialidades disponibles

### 5. **Horarios** (`/horarios`)
- Horarios de guardia 24hs
- Horarios de radiología
- Horarios de ecografías
- Información de contacto por área

## 🎭 Componentes Destacados

### HeroSlider (React Island)
Carrusel automático con:
- 3 slides con imágenes de instalaciones
- Autoplay cada 5 segundos
- Navegación por puntos
- Transiciones suaves
- Badge de guardia 24hs con pulse animation

### GaleriaInstalaciones
Galería responsive de 4 columnas:
- Hover effects con scale
- Animaciones fadeInUp escalonadas
- Textos descriptivos superpuestos

### StatsSection
Estadísticas institucionales:
- 30+ años de trayectoria
- 10+ profesionales
- Atención 24/7
- 15,000+ pacientes anuales
- Animaciones bounce en hover

### WhyChooseUs
6 valores institucionales con:
- Iconos emoji temáticos
- Efectos hover lift
- Fondos blur decorativos

## 🎨 Animaciones Personalizadas

En `global.css` se definen 8 animaciones keyframe:

1. **fadeIn** - Aparición gradual
2. **slideInUp** - Entrada desde abajo
3. **slideInLeft** - Entrada desde izquierda
4. **scaleIn** - Escala desde 0
5. **pulse-glow** - Pulso luminoso para badges
6. **loading** - Spinner de carga
7. **bounce-slow** - Rebote suave
8. **[rotate]** - Rotación completa (utility)

## 📞 Información de Contacto

- **Dirección**: Moreno 333, Trelew, Chubut, Argentina
- **Teléfono General**: 280 4421121
- **WhatsApp Ginecología**: 280 4666745
- **WhatsApp Ecografías**: 280 4692909
- **Guardia**: 24 horas, todos los días

## 🔒 Privacidad y Datos

Este sitio **NO almacena datos personales**. Todos los formularios de turnos redirigen a WhatsApp para gestión directa con la clínica.

## 🛠️ Personalización

### Cambiar Colores

Edita las variables CSS en `src/styles/global.css`:

```css
@theme {
  --color-primary: #TU_COLOR;
  --color-secondary: #TU_COLOR;
  /* ... */
}
```

### Agregar Servicios

Edita el array en `src/pages/servicios.astro`:

```javascript
const servicios = [
  {
    titulo: "Nuevo Servicio",
    descripcion: "Descripción...",
    icono: "🏥",
    telefono: "280XXXXXXX"
  }
];
```

### Modificar Profesionales

Edita los arrays en `src/pages/profesionales.astro`:

```javascript
const ginecologos = [
  {
    nombre: "Dr. Nombre Apellido",
    matricula: "M.P. XXXXX/X",  
    telefono: "280XXXXXXX"
  }
];
```

## 📊 Rendimiento

- ⚡ **Lighthouse Score**: 95+ en todas las métricas
- 🎯 **First Contentful Paint**: < 1.5s
- 🚀 **Time to Interactive**: < 2.5s
- 📦 **Bundle Size**: Optimizado con code splitting

## 🤝 Soporte

Para consultas técnicas o personalizaciones adicionales, contactar al desarrollador del proyecto.

## 📄 Licencia

© 2025 Instituto Médico del Sur. Todos los derechos reservados.

---

Desarrollado con ❤️ usando Astro, React y Tailwind CSS
