// Lógica centralizada para hacer peticiones a la API
import type { TarotCard } from '../types/tarot';

// URL base de nuestro oráculo digital
const API_BASE_URL = 'https://6872278c76a5723aacd3cbb3.mockapi.io/api/v1/tarot';

/**
 * Realiza una consulta a la API para obtener todas las cartas 
 * @returns Promise con el array de cartas místicas
 */
export const fetchAllTarotCards = async (): Promise<TarotCard[]> => {
  try {
    console.log('🌙 Iniciando ritual de invocación de todas las cartas...');
    
    const response = await fetch(API_BASE_URL);
    
    if (!response.ok) {
      throw new Error(`Error en el ritual: ${response.status} - ${response.statusText}`);
    }
    
    const cards: TarotCard[] = await response.json();
    console.log(`✨ ¡${cards.length} cartas han sido invocadas exitosamente!`);
    
    return cards;
    
  } catch (error) {
    console.error('💀 El ritual ha fallado:', error);
    throw new Error('No se pudo conectar con el oráculo. Las energías están perturbadas.');
  }
};

/**
 * 🎴 Consulta una carta específica por su ID
 * Realiza una búsqueda dirigida en el reino de los arcanos
 * @param cardId - El identificador único de la carta deseada
 * @returns Promise con la carta específica
 */
export const fetchTarotCardById = async (cardId: string): Promise<TarotCard> => {
  try {
    console.log(`🔍 Buscando la carta con ID sagrado: ${cardId}...`);
    
    const response = await fetch(`${API_BASE_URL}/${cardId}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('La carta solicitada no existe en este plano de realidad');
      }
      throw new Error(`Error en la consulta: ${response.status} - ${response.statusText}`);
    }
    
    const card: TarotCard = await response.json();
    console.log(`🌟 Carta encontrada: ${card.arcaneName} - ${card.goddessName}`);
    
    return card;
    
  } catch (error) {
    console.error('💫 Error en la búsqueda:', error);
    throw error instanceof Error 
      ? error 
      : new Error('Error desconocido al consultar la carta');
  }
};

/**
 * 🎲 Selecciona cartas aleatorias para la lectura
 * @param count - Número de cartas a seleccionar (máximo recomendado: 3)
 * @returns Promise con array de cartas seleccionadas aleatoriamente
 */
export const fetchRandomCards = async (count: number = 3): Promise<TarotCard[]> => {
  try {
    console.log(`🎯 Preparando lectura mística con ${count} cartas...`);
    
    // Primero obtenemos todas las cartas
    const allCards = await fetchAllTarotCards();
    
    // Mezclamos las cartas usando el algoritmo de Fisher-Yates 
    const shuffledCards = [...allCards];
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
    }
    
    // Seleccionamos las primeras 'count' cartas
    const selectedCards = shuffledCards.slice(0, count);
    
    console.log(`🌟 ${selectedCards.length} cartas han sido elegidas por el destino`);
    return selectedCards;
    
  } catch (error) {
    console.error('🌑 Error en la selección aleatoria:', error);
    throw new Error('Las fuerzas cósmicas están en desorden. No se pudieron seleccionar las cartas.');
  }
};

/**
 * 🧙‍♀️ Valida si una carta es válida según nuestra estructura
 * Verifica que la carta contenga todos los elementos necesarios
 * @param card - La carta a validar
 * @returns boolean indicando si la carta es válida
 */
export const validateTarotCard = (card: any): card is TarotCard => {
  return (
    card &&
    typeof card.id === 'string' &&
    typeof card.arcaneName === 'string' &&
    typeof card.arcaneNumber === 'string' &&
    typeof card.arcaneDescription === 'string' &&
    typeof card.goddessName === 'string' &&
    typeof card.goddessDescription === 'string' &&
    card.arcaneImage &&
    typeof card.arcaneImage.imageSrc === 'string' &&
    typeof card.arcaneImage.author === 'string' &&
    card.goddessImage &&
    typeof card.goddessImage.imageSrc === 'string' &&
    typeof card.goddessImage.author === 'string'
  );
};

// ⚡ ALIAS PARA COMPATIBILIDAD
// Estas funciones son alias para mantener compatibilidad con importaciones existentes

/**
 * Alias para fetchTarotCardById - mantiene compatibilidad con imports existentes
 */
export const getCardById = fetchTarotCardById;

/**
 * Alias para fetchAllTarotCards - mantiene compatibilidad con imports existentes
 */
export const getAllCards = fetchAllTarotCards;

/**
 * Alias para fetchRandomCards - mantiene compatibilidad con imports existentes
 */
export const getRandomCards = fetchRandomCards;
