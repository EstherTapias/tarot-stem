import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { TarotCard } from '../types/tarot';
import { CardGrid } from '../components/CardGrid/CardGrid';
import { useTarotCards } from '../hooks/useTarotCards';

export const Home: React.FC = () => {
  const navigate = useNavigate();
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

  // Voltear todas las cartas para "resetear" el tapete
  const resetFlipped = (): void => setFlippedCards([]);

  return (
    <div className="home-page fade-in">
      {/* 🎮 Controles de Acción */}
      <section className="home-actions">
        <button
          className="mystical-button"
          disabled={isLoading || cards.length === 0}
          onClick={() => navigate('/reading')}
        >
          🔮 Realizar Lectura
        </button>

        <button
          className="mystical-button"
          onClick={resetFlipped}
          disabled={flippedCards.length === 0}
        >
          🔄 Resetear Progreso
        </button>
      </section>

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