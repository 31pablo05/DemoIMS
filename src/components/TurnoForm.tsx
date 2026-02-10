import { useState, type FormEvent } from 'react';

const servicios = [
  { id: 'ginecologia', nombre: 'Ginecología y Obstetricia', whatsapp: '2804666745' },
  { id: 'neonatologia', nombre: 'Neonatología', whatsapp: '2804421121' },
  { id: 'ecografia', nombre: 'Ecografía', whatsapp: '2804692909' },
  { id: 'radiologia', nombre: 'Radiología', whatsapp: '2804421121' },
  { id: 'resonador', nombre: 'Resonador Abierto', whatsapp: '2804421121' },
  { id: 'densitometria', nombre: 'Densitometría', whatsapp: '2804421121' },
  { id: 'guardia', nombre: 'Guardia Médica', whatsapp: '2804421121' },
  { id: 'consulta', nombre: 'Consulta General', whatsapp: '2804421121' },
];

export default function TurnoForm() {
  const [formData, setFormData] = useState({
    servicio: '',
    nombre: '',
    telefono: '',
    consulta: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.servicio) {
      newErrors.servicio = 'Por favor selecciona un servicio';
    }
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'Por favor ingresa tu nombre';
    }
    if (!formData.telefono.trim()) {
      newErrors.telefono = 'Por favor ingresa tu teléfono';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    const servicioSeleccionado = servicios.find(s => s.id === formData.servicio);
    
    if (!servicioSeleccionado) {
      return;
    }

    const mensaje = `Hola, quisiera solicitar un turno.

🏥 *Servicio:* ${servicioSeleccionado.nombre}
👤 *Paciente:* ${formData.nombre}
📱 *Teléfono:* ${formData.telefono}${formData.consulta ? `\n💬 *Consulta:* ${formData.consulta}` : ''}`;

    const encodedMessage = encodeURIComponent(mensaje);
    const whatsappUrl = `https://wa.me/549${servicioSeleccionado.whatsapp}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');

    setFormData({
      servicio: '',
      nombre: '',
      telefono: '',
      consulta: '',
    });
  };

  return (
    <div className="card max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-dark mb-2">Solicitar Turno</h2>
        <p className="text-gray-600 text-sm">
          🔒 Este formulario no almacena datos personales. Serás redirigido a WhatsApp para confirmar tu turno.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Servicio */}
        <div>
          <label htmlFor="servicio" className="block text-sm font-semibold text-dark mb-2">
            Servicio *
          </label>
          <select
            id="servicio"
            name="servicio"
            value={formData.servicio}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.servicio ? 'border-red-500' : 'border-gray-300 focus:border-primary'
            }`}
          >
            <option value="">Selecciona un servicio...</option>
            {servicios.map(servicio => (
              <option key={servicio.id} value={servicio.id}>
                {servicio.nombre}
              </option>
            ))}
          </select>
          {errors.servicio && (
            <p className="mt-1 text-sm text-red-500">{errors.servicio}</p>
          )}
        </div>

        {/* Nombre */}
        <div>
          <label htmlFor="nombre" className="block text-sm font-semibold text-dark mb-2">
            Nombre completo *
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Juan Pérez"
            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.nombre ? 'border-red-500' : 'border-gray-300 focus:border-primary'
            }`}
          />
          {errors.nombre && (
            <p className="mt-1 text-sm text-red-500">{errors.nombre}</p>
          )}
        </div>

        {/* Teléfono */}
        <div>
          <label htmlFor="telefono" className="block text-sm font-semibold text-dark mb-2">
            Teléfono de contacto *
          </label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="280 1234567"
            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.telefono ? 'border-red-500' : 'border-gray-300 focus:border-primary'
            }`}
          />
          {errors.telefono && (
            <p className="mt-1 text-sm text-red-500">{errors.telefono}</p>
          )}
        </div>

        {/* Consulta opcional */}
        <div>
          <label htmlFor="consulta" className="block text-sm font-semibold text-dark mb-2">
            Motivo de consulta (opcional)
          </label>
          <textarea
            id="consulta"
            name="consulta"
            value={formData.consulta}
            onChange={handleChange}
            rows={4}
            placeholder="Describe brevemente el motivo de tu consulta..."
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary transition-colors resize-none"
          />
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span>Enviar por WhatsApp</span>
        </button>

        <p className="text-center text-sm text-gray-500">
          Al enviar serás redirigido a WhatsApp para confirmar tu turno
        </p>
      </form>
    </div>
  );
}
