// src/hooks/useTarotCards.ts

import { useState, useEffect, useCallback } from 'react';
import type { TarotCard, LoadingState } from '../types/tarot';
import { fetchAllTarotCards, fetchTarotCardById } from '../services/api';

/**
 * 🔮 Hook mágico para gestionar las cartas del tarot
 * Este hechizo personalizado maneja toda la lógica de estado de nuestras cartas sagradas
 */

export const useTarotCards = () => {
  // 🌟 Estados místicos del componente
  const [cards, setCards] = useState<TarotCard[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  /**
   * 🌙 Ritual para cargar todas las cartas
   * Invoca el poder de la API para obtener todas las cartas
   */
  const loadAllCards = useCallback(async () => {
    setLoadingState('loading');
    setError(null);
    
    try {
      console.log('🔮 Iniciando invocación de todas las cartas...');
      const fetchedCards = await fetchAllTarotCards();
      
      setCards(fetchedCards);
      setLoadingState('success');
      console.log('✨ Todas las cartas han sido cargadas exitosamente');
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido en el ritual';
      console.error('💀 Error al cargar las cartas:', errorMessage);
      
      setError(errorMessage);
      setLoadingState('error');
      setCards([]); // Limpiamos las cartas en caso de error
    }
  }, []);

  /**
   * 🎭 Efecto secundario para cargar las cartas al montar el componente
   * Se ejecuta automáticamente cuando el hook es invocado por primera vez
   */
  useEffect(() => {
    loadAllCards();
  }, [loadAllCards]);

  /**
   * 🔄 Función para reiniciar el estado y recargar las cartas
   * Útil cuando queremos comenzar una nueva sesión mística
   */
  const refreshCards = useCallback(() => {
    console.log('🔄 Reiniciando el ritual de cartas...');
    loadAllCards();
  }, [loadAllCards]);

  /**
   * 🎴 Función para encontrar una carta por su ID
   * Busca en el estado local primero, luego en la API si es necesario
   */
  const findCardById = useCallback((cardId: string): TarotCard | undefined => {
    return cards.find(card => card.id === cardId);
  }, [cards]);

  // 📊 Información derivada del estado
  const hasCards = cards.length > 0;
  const isLoading = loadingState === 'loading';
  const hasError = loadingState === 'error';
  const isSuccess = loadingState === 'success';

  // 🌟 Retornamos el objeto mágico con toda la funcionalidad
  return {
    // 📚 Datos
    cards,
    cardsCount: cards.length,
    
    // 🚦 Estados
    isLoading,
    hasError,
    isSuccess,
    hasCards,
    error,
    loadingState,
    
    // 🛠️ Acciones
    refreshCards,
    findCardById,
    
    // 🔍 Métodos de utilidad
    getCardByIndex: (index: number) => cards[index],
    getRandomCard: () => {
      if (cards.length === 0) return undefined;
      const randomIndex = Math.floor(Math.random() * cards.length);
      return cards[randomIndex];
    }
  };
};

/**
 * 🎴 Hook especializado para obtener una carta específica por ID
 * Ideal para páginas de detalle de carta
 */
export const useTarotCard = (cardId: string | undefined) => {
  const [card, setCard] = useState<TarotCard | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  /**
   * 🌟 Efecto para cargar la carta específica
   */
  useEffect(() => {
    if (!cardId) {
      setCard(null);
      setLoadingState('idle');
      return;
    }

    const loadCard = async () => {
      setLoadingState('loading');
      setError(null);
      
      try {
        console.log(`🔍 Buscando carta con ID: ${cardId}`);
        const fetchedCard = await fetchTarotCardById(cardId);
        
        setCard(fetchedCard);
        setLoadingState('success');
        console.log(`✨ Carta encontrada: ${fetchedCard.arcaneName}`);
        
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error al buscar la carta';
        console.error('💀 Error al cargar la carta:', errorMessage);
        
        setError(errorMessage);
        setLoadingState('error');
        setCard(null);
      }
    };

    loadCard();
  }, [cardId]);

  return {
    card,
    isLoading: loadingState === 'loading',
    hasError: loadingState === 'error',
    isSuccess: loadingState === 'success',
    error,
    loadingState
  };
};