// Define la estructura de datos que viene de la API

// Estructura para las imágenes (tanto de arcano como de diosa)
export interface ImageData {
    imageSrc: string;      // URL de la imagen
    author: string;        // Autor de la imagen
    license?: string;      // Licencia de uso (opcional para arcanos)
    licenseUrl?: string;   // URL de la licencia (opcional para diosas)
  }
  
  // Estructura principal de cada carta de tarot
  export interface TarotCard {
    id: string;                          // ID único de la carta
    arcaneNumber: string;                // Número del arcano (ej: "0", "1", "2")
    arcaneName: string;                  // Nombre del arcano (ej: "El Loco")
    arcaneDescription: string;           // Descripción detallada del significado
    arcaneImage: ImageData;              // Datos de la imagen del arcano
    goddessName: string;                 // Nombre de la científica asociada
    goddessDescription: string;          // Biografía o información de la científica
    goddessImage: ImageData;             // Datos de la imagen de la científica
  }
  
  // Tipos para la funcionalidad de lectura de cartas
  export type Position = 'past' | 'present' | 'future';
  
  // Estructura para las cartas seleccionadas en una lectura
  export interface SelectedCard {
    position: Position;    // Posición asignada (pasado, presente, futuro)
    card: TarotCard;      // Datos completos de la carta seleccionada
  }
  
  // Estado para manejar la lectura de cartas
  export interface ReadingState {
    selectedCards: SelectedCard[];     // Array de cartas seleccionadas
    availableCards: TarotCard[];       // Cartas disponibles para seleccionar
    currentPosition: Position | null;   // Posición actual siendo seleccionada
    isComplete: boolean;               // Si la lectura está completa (3 cartas)
  }