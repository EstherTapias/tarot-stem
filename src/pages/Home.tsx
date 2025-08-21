import React from 'react';
import type { TarotCard } from '../types/tarot';
import { CardGrid } from '../components/CardGrid/CardGrid';
import { useTarotCards } from '../hooks/useTarotCards';

// Componente principal de la página de inicio que muestra el grid de cartas
export const Home: React.FC = () => {
  // Usamos el hook personalizado para cargar cartas, estado carga y error
  const { cards, isLoading, error, refreshCards } = useTarotCards();

  // Estado local para almacenar las cartas volteadas (giradas) por su id
  const [flippedCards, setFlippedCards] = React.useState<string[]>([]);

  // Maneja el clic sobre una carta para girarla o girarla de vuelta
  const handleCardClick = (card: TarotCard): void => {
    setFlippedCards(prev => 
      prev.includes(card.id) 
        ? prev.filter(id => id !== card.id)  // Si ya está volteada, la quita
        : [...prev, card.id]                  // Si no, la agrega para voltear
    );
  };

  return (
    <div className="home-page fade-in">
      {/* Mostrar error si ocurre problemas al cargar las cartas */}
      {error && (
        <section className="error-container mystical-container">
          <h3 className="mystical-title small">💀 Error al conectar con el cosmos</h3>
          <p className="mystical-text">{error}</p>
          <button className="mystical-button" onClick={refreshCards}>
            🔮 Intentar de Nuevo
          </button>
        </section>
      )}

      {/* Mostrar grid principal sólo si no hay error */}
      {!error && (
        <main className="home-main">
          <CardGrid
            cards={cards}                // Lista de cartas cargadas
            flippedCards={flippedCards}  // IDs de cartas volteadas
            onCardClick={handleCardClick} // Función para manejar clic carta
            loading={isLoading}           // Mostrar estado de carga si aplica
            cardSize="medium"             // Tamaño de carta medio en grid
            showGridStats={true}          // Mostrar estadísticas del grid
          />
        </main>
      )}
    </div>
  );
};
