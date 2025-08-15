export interface TarotCard {
  id: string;
  arcaneNumber: string;
  arcaneName: string;
  arcaneDescription: string;
  arcaneImage: {
    imageSrc: string;
    author: string;
    license?: string;
    licenseUrl?: string;
  };
  goddessName: string;
  goddessDescription: string;
  goddessImage: {
    imageSrc: string;
    author: string;
    licenseUrl?: string;
  };
}

// Tipos para lectura y posiciones
export type Position = 'past' | 'present' | 'future';

export interface SelectedCard {
  position: Position;
  card: TarotCard;
}

export interface ReadingState {
  selectedCards: SelectedCard[];
  availableCards: TarotCard[];
  currentPosition: Position | null;
  isComplete: boolean;
}
