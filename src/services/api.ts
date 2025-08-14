// Lógica centralizada para hacer peticiones a la API

import axios from 'axios';
import { TarotCard } from '../types/tarot';

// URL base de la API proporcionada en el briefing
const API_BASE_URL = 'https://6872278c76a5723aacd3cbb3.mockapi.io/api/v1/tarot';

// Crear instancia de axios con configuración base
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // Timeout de 10 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para obtener todas las cartas de tarot
export const getAllCards = async (): Promise<TarotCard[]> => {
  try {
    console.log('🔮 Obteniendo todas las cartas de tarot...');
    const response = await apiClient.get<TarotCard[]>('/');
    console.log(`✨ Se obtuvieron ${response.data.length} cartas exitosamente`);
    return response.data;
  } catch (error) {
    console.error('❌ Error al obtener las cartas:', error);
    throw new Error('No se pudieron cargar las cartas del tarot. Inténtalo más tarde.');
  }
};

// Función para obtener una carta específica por ID
export const getCardById = async (id: string): Promise<TarotCard> => {
  try {
    console.log(`🔮 Obteniendo carta con ID: ${id}...`);
    const response = await apiClient.get<TarotCard>(`/${id}`);
    console.log(`✨ Carta "${response.data.arcaneName}" obtenida exitosamente`);
    return response.data;
  } catch (error) {
    console.error(`❌ Error al obtener la carta con ID ${id}:`, error);
    throw new Error(`No se pudo cargar la carta solicitada.`);
  }
};

// Función utilitaria para mezclar cartas (útil para la funcionalidad de lectura)
export const shuffleCards = (cards: TarotCard[]): TarotCard[] => {
  console.log('🔀 Mezclando cartas para una nueva lectura...');
  const shuffled = [...cards];
  
  // Algoritmo Fisher-Yates para mezclar array
  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }
  
  console.log('✨ Cartas mezcladas exitosamente');
  return shuffled;
};

// Función para validar si una carta tiene toda la información necesaria
export const validateCard = (card: TarotCard): boolean => {
  return !!(
    card.id &&
    card.arcaneName &&
    card.arcaneDescription &&
    card.goddessName &&
    card.goddessDescription &&
    card.arcaneImage?.imageSrc &&
    card.goddessImage?.imageSrc
  );
};