# Instituto Médico del Sur - Sitio Web Institucional

Sitio web oficial del Instituto Médico del Sur - Trelew, Chubut, Argentina.

## 🏥 Descripción

Sitio web institucional desarrollado con **Astro 5**, **React** y **Tailwind CSS** para informar sobre servicios médicos, profesionales y facilitar la solicitud de turnos mediante WhatsApp.

### Características Principales

- ✅ Guardia médica 24 horas
- ✅ Información completa de servicios y profesionales
- ✅ Formulario de solicitud de turnos (integrado con WhatsApp)
- ✅ Responsive design optimizado para móviles
- ✅ SEO configurado con meta tags Open Graph
- ✅ Botón flotante de WhatsApp
- ✅ Mapas de ubicación integrados
- ✅ Sin almacenamiento de datos personales

## 🚀 Stack Tecnológico

- **Framework**: Astro 5
- **Islands**: React 18 (solo donde hay interacción)
- **Estilos**: Tailwind CSS 4
- **Build Tool**: Vite
- **Deploy**: Compatible con Vercel

## 📁 Estructura del Proyecto

```
DemoIMS/
├── public/              # Archivos estáticos
├── src/
│   ├── components/      # Componentes Astro y React
│   │   ├── Layout.astro
│   │   ├── Navbar.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── ServiceCard.astro
│   │   ├── DoctorCard.astro
│   │   ├── MapEmbed.astro
│   │   ├── SEO.astro
│   │   ├── WhatsAppButton.tsx (React)
│   │   └── TurnoForm.tsx (React)
│   ├── pages/          # Páginas del sitio
│   │   ├── index.astro
│   │   ├── servicios.astro
│   │   ├── profesionales.astro
│   │   ├── turnos.astro
│   │   └── horarios.astro
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
├── tsconfig.json
└── README.md
```

## 🎨 Paleta de Colores

```css
primary: #37bee5    /* Azul claro */
secondary: #2e2db9  /* Azul oscuro */
accent: #2828a9     /* Azul profundo */
dark: #12144d       /* Azul muy oscuro */
textDark: #050713   /* Negro azulado */
light: #fcfdfe      /* Blanco */
```

## 🛠️ Instalación y Uso

### Requisitos Previos

- Node.js 18+ 
- npm o pnpm

### Instalación

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

El servidor de desarrollo se ejecutará en `http://localhost:4321`

## 📱 Funcionalidades

### Formulario de Turnos

El formulario de turnos **NO almacena datos personales**. Al enviar:

1. Genera un mensaje formateado con los datos del paciente
2. Abre WhatsApp del servicio correspondiente
3. El usuario confirma y envía el mensaje
4. No hay backend ni base de datos

### Servicios Destacados

- **Guardia Médica**: 24 horas, 365 días
- **Ginecología y Obstetricia**: 6 profesionales
- **Neonatología**: 4 profesionales con MP
- **Diagnóstico por Imágenes**: Radiología, Ecografía, Resonador, Densitometría
- **Internación**: Clínica y Quirúrgica

## 📞 Contacto del Instituto

- **Dirección**: Moreno 333, Trelew, Chubut
- **Teléfono**: 280 4421121
- **WhatsApp Ginecología**: 280 4666745
- **WhatsApp Ecografía**: 280 4692909

## 🚀 Deploy en Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy a producción
vercel --prod
```

O conectar el repositorio directamente desde el dashboard de Vercel.

### Configuración de Vercel

El proyecto está configurado como sitio estático (`output: 'static'`):

- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

## 📄 Licencia

© 2026 Instituto Médico del Sur. Todos los derechos reservados.

## 👨‍💻 Desarrollo

Proyecto desarrollado como sitio institucional profesional para portfolio.

---

**Nota**: Este sitio no almacena, procesa ni transmite datos médicos personales. Es un sitio informativo con integración de WhatsApp para comunicación directa.

