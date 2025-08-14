
/**
 * Tipos de datos para el Tarot STEM
 * Definimos las estructuras de nuestras cartas
 */

// Estructura para las imágenes con información de autor y licencia
export interface ImageData {
  imageSrc: string;      // URL de la imagen sagrada
  author: string;        // El artista que capturó la esencia
  license?: string;      // Licencia de uso (opcional)
  licenseUrl?: string;   // URL de la licencia (opcional)
}

// La carta de tarot completa - Portal entre lo arcano y lo científico
export interface TarotCard {
  id: string;                           // Identificador único de la carta
  arcaneNumber: string;                 // Número del arcano (0-21 para arcanos mayores)
  arcaneName: string;                   // Nombre místico del arcano
  arcaneDescription: string;            // Sabiduría antigua del arcano
  arcaneImage: ImageData;               // Imagen del arcano
  goddessName: string;                  // Nombre de la diosa contemporánea
  goddessDescription: string;           // Historia y logros de nuestra diosa STEM
  goddessImage: ImageData;              // Imagen de la diosa
}

// Posiciones en la lectura de tres cartas
export type ReadingPosition = 'pasado' | 'presente' | 'futuro';

// Carta seleccionada en una lectura con su posición temporal
export interface SelectedCard {
  card: TarotCard;
  position: ReadingPosition;
}

// Estado completo de una lectura mística
export interface TarotReading {
  pasado?: TarotCard;      // La carta que revela el pasado
  presente?: TarotCard;    // La carta del momento actual
  futuro?: TarotCard;      // La carta que vislumbra el futuro
  isComplete: boolean;     // ¿Está completa la lectura?
}

// Estados de carga para la experiencia del usuario
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Respuesta de la API (si necesitamos usarla más adelante)
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  loading: boolean;
};