// Definiciones de tipos TypeScript para las cartas de Tarot y lectura

// Representa la estructura de una carta de tarot con datos del arcano y la diosa
export interface TarotCard {
  id: string;                    // Identificador único de la carta
  arcaneNumber: string;          // Número del arcano en formato texto o romano
  arcaneName: string;            // Nombre del arcano mayor
  arcaneDescription: string;     // Descripción del arcano
  arcaneImage: {                 // Información de la imagen del arcano
    imageSrc: string;            // URL o ruta de la imagen
    author: string;              // Autor o fuente de la imagen
    license?: string;            // Opcional: tipo de licencia
    licenseUrl?: string;         // Opcional: URL de la licencia
  };
  goddessName: string;           // Nombre de la diosa científica asociada
  goddessDescription: string;    // Descripción de la diosa
  goddessImage: {                // Información de la imagen de la diosa
    imageSrc: string;            // URL o ruta de la imagen
    author: string;              // Autor o fuente de la imagen
    licenseUrl?: string;         // Opcional: URL de la licencia
  };
}

// Tipos para las posiciones en la tirada de cartas
export type Position = 'past' | 'present' | 'future';

// Carta seleccionada con asignación a una posición (pasado, presente o futuro)
export interface SelectedCard {
  position: Position;
  card: TarotCard;
}

// Estado completo de una lectura: cartas seleccionadas, disponibles, posición actual y si está completa
export interface ReadingState {
  selectedCards: SelectedCard[];       // Cartas ya seleccionadas y su posición
  availableCards: TarotCard[];          // Cartas aún disponibles para selección
  currentPosition: Position | null;     // Posición que se debe seleccionar a continuación (o null si completa)
  isComplete: boolean;                  // Marca si la lectura ya está completa
}
