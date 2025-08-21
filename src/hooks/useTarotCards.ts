import { useState, useEffect } from 'react';
import type { TarotCard } from '../types/tarot';
import { getAllCards } from '../services/api';

// Hook personalizado para manejar la carga y gestión de cartas de tarot
export const useTarotCards = () => {
  // Estado para almacenar la lista de cartas
  const [cards, setCards] = useState<TarotCard[]>([]);
  // Estado para indicar si está cargando datos
  const [isLoading, setIsLoading] = useState(false);
  // Estado para almacenar errores que puedan ocurrir durante la carga
  const [error, setError] = useState<string|null>(null);

  // Función para obtener todas las cartas desde la API
  const fetchCards = async () => {
    try {
      setIsLoading(true);  // Indicar inicio de carga
      const result = await getAllCards(); // Llamada asíncrona a API para obtener cartas
      setCards(result);    // Guardar cartas en estado
      setError(null);      // Limpiar cualquier error previo
    } catch (err) {
      setError('Error cargando cartas.'); // Guardar mensaje de error si falla la llamada
    } finally {
      setIsLoading(false); // Indicar fin de carga, haya fallo o éxito
    }
  };

  // Ejecutar fetchCards una vez cuando el hook se monta el componente
  useEffect(() => {
    fetchCards();
  }, []);

  // Función para mezclar las cartas aleatoriamente (shuffle) para la tirada
  const shuffleForReading = (): void => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
  };

  // Función para refrescar las cartas (volver a cargar desde API)
  const refreshCards = () => fetchCards();

  // Exponer los estados y funciones para que el componente que use el hook pueda acceder
  return {
    cards,
    isLoading,
    error,
    refreshCards,
    shuffleForReading,
  };
};
