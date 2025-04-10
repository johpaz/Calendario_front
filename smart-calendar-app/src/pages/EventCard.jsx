import React from 'react';

const EventCards = ({ events = [] }) => {
  // Filtramos eventos nulos y verificamos que sean objetos válidos
  const validEvents = events?.filter(event => 
    event && 
    typeof event === 'object' && 
    'nombre' in event
  ) || [];

  // Si no hay eventos válidos después del filtrado
  if (!validEvents.length) {
    return (
      <div className="p-4 text-center text-gray-600">
        No hay eventos disponibles o existen conflictos de horarios.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {validEvents.map((event, index) => {
          // Fecha segura con valor por defecto
          const safeDate = event.fecha ? `${event.fecha}T05:00:00` : new Date().toISOString();
          
          return (
            <div
              key={event._id || `event-${index}`}
              className="p-4 border-l-4 border-blue-500 bg-gray-50 hover:bg-gray-100 transition-colors rounded"
            >
              <div className="flex flex-col">
                <h4 className="text-xl font-medium text-gray-800 mb-2">
                  {event.nombre || 'Evento sin nombre'}
                </h4>
                
                <p className="text-sm text-gray-600 mb-2">
                  {new Date(safeDate).toLocaleDateString('es-CO', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>

                <p className="text-sm text-gray-600 mb-2">
                  {event.hora_inicio || '--:--'} - {event.hora_fin || '--:--'}
                </p>

                {event._id && (
                  <span className="self-start text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                    ID: {event._id}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventCards;