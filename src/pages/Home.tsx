import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { TarotCard } from '../types/tarot';
import { CardGrid } from '../components/CardGrid/CardGrid';
import { useTarotCards } from '../hooks/useTarotCards';

/**
 * Home Page - muestra todas las cartas boca abajo en un tapete místico.
 * Permite ver el arcano y nombre, girar carta para ver científica,
 * e ir a detalle con botón "Saber más".
 */
export const Home: React.FC = () => {
  const navigate = useNavigate();

  const { cards, isLoading, error, refreshCards } = useTarotCards();

  // Estado local para cartas que están volteadas (giradas)
  const [flippedCards, setFlippedCards] = React.useState<string[]>([]);

  // Maneja clic en carta para girarla o navegar a detalle si ya está girada
  const handleCardClick = (card: TarotCard): void => {
    if (flippedCards.includes(card.id)) {
      // Ya está girada, navega a detalle
      navigate(`/card/${card.id}`);
    } else {
      // Gira la carta agregándola a flippedCards
      setFlippedCards(prev => [...prev, card.id]);
    }
  };

  // Voltear todas las cartas para “resetear” el tapete
  const resetFlipped = (): void => setFlippedCards([]);

  return (
    <div className="home-page mystical-carpet fade-in">
      <header className="home-hero">
        <h1 className="mystical-title large glowing-text">🔮 Tarot STEM 🔬</h1>
        <p className="hero-subtitle mystical-text">
          Conecta con la sabiduría de las pioneras de la ciencia
        </p>
      </header>

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
          disabled={isLoading}
          onClick={() => {
            refreshCards();
            resetFlipped();
          }}
        >
          ✨ Mezclar Cartas
        </button>
      </section>

      {error && (
        <section className="error-container mystical-container">
          <h3 className="mystical-title small">Error al conectar con el cosmos</h3>
          <p className="mystical-text">{error}</p>
          <button className="mystical-button" onClick={refreshCards}>🔮 Intentar de Nuevo</button>
        </section>
      )}

      {!error && (
        <main className="home-main">
          <CardGrid
            cards={cards}
            flippedCards={flippedCards}
            onCardClick={handleCardClick}
            loading={isLoading}
            title="Explora las Cartas del Conocimiento"
            subtitle="Haz clic en una carta para girar y descubrir su científica"
            cardSize="medium"
          />
        </main>
      )}

      <footer className="home-footer mystical-container">
        <p>
          Un proyecto colaborativo con FactoriaF5 Barcelona 🌟
        </p>
        <p className="mystical-text quote">
          "La ciencia es una forma de pensar mucho más que un cuerpo de conocimientos"
        </p>
      </footer>
    </div>
  );
};
