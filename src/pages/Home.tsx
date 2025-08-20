import React from 'react';
import type { TarotCard } from '../types/tarot';
import { CardGrid } from '../components/CardGrid/CardGrid';
import { useTarotCards } from '../hooks/useTarotCards';

export const Home: React.FC = () => {
  const { cards, isLoading, error, refreshCards } = useTarotCards();

  // Estado local para cartas que están volteadas (giradas)
  const [flippedCards, setFlippedCards] = React.useState<string[]>([]);

  // Maneja clic en carta para girarla (solo voltear, no navegar)
  const handleCardClick = (card: TarotCard): void => {
    // Solo gira la carta agregándola o quitándola de flippedCards
    setFlippedCards(prev => 
      prev.includes(card.id) 
        ? prev.filter(id => id !== card.id)
        : [...prev, card.id]
    );
  };

  return (
    <div className="home-page fade-in">
      {/* ⚠️ Error Handler */}
      {error && (
        <section className="error-container mystical-container">
          <h3 className="mystical-title small">💀 Error al conectar con el cosmos</h3>
          <p className="mystical-text">{error}</p>
          <button className="mystical-button" onClick={refreshCards}>
            🔮 Intentar de Nuevo
          </button>
        </section>
      )}

      {/* 🃏 Grid Principal de Cartas - 4 por fila */}
      {!error && (
        <main className="home-main">
          <CardGrid
            cards={cards}
            flippedCards={flippedCards}
            onCardClick={handleCardClick}
            loading={isLoading}        
            cardSize="medium"
            showGridStats={true}
          />
        </main>
      )}
    </div>
  );
};