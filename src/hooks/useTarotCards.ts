import { useState, useEffect } from 'react';
import type { TarotCard } from '../types/tarot';
import { getAllCards } from '../services/api';

export const useTarotCards = () => {
  const [cards, setCards] = useState<TarotCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);

  const fetchCards = async () => {
    try {
      setIsLoading(true);
      const result = await getAllCards();
      setCards(result);
      setError(null);
    } catch (err) {
      setError('Error cargando cartas.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  // Mezcla las cartas para tiradas (shuffle)
  const shuffleForReading = (): void => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
  };

  // Refrescar cartas desde la API
  const refreshCards = () => fetchCards();

  return {
    cards,
    isLoading,
    error,
    refreshCards,
    shuffleForReading,
  };
};
