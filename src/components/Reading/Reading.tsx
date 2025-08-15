import React from 'react';
import type { SelectedCard, TarotCard, Position } from '../../types/tarot';
import { Card } from '../Card/Card';
import './Reading.module.css';

interface ReadingProps {
  selectedCards: SelectedCard[];
  isComplete?: boolean;
  onCardClick?: (card: TarotCard) => void;
  showInterpretation?: boolean;
  title?: string;
}

export const Reading: React.FC<ReadingProps> = ({
  selectedCards,
  isComplete = false,
  onCardClick,
  showInterpretation = false,
  title = "Tu Lectura de Tarot STEM"
}) => {

  // Ordena y asigna cartas según su posición para mostrar en orden
  const getCardsByPosition = (): Record<Position, SelectedCard | null> => {
    const positions: Record<Position, SelectedCard | null> = {
      past: null,
      present: null,
      future: null,
    };

    selectedCards.forEach((selectedCard) => {
      positions[selectedCard.position] = selectedCard;
    });

    return positions;
  };

  // Etiquetas para cada posición
  const getPositionLabels = (): Record<Position, string> => ({
    past: 'Pasado',
    present: 'Presente',
    future: 'Futuro'
  });

  // Descripciones de cada posición
  const getPositionDescriptions = (): Record<Position, string> => ({
    past: 'Los eventos y experiencias que te han moldeado',
    present: 'Tu situación actual y las energías que te rodean',
    future: 'Las posibilidades y el camino que se abre ante ti'
  });

  // Maneja el click para abrir detalle o acción extra
  const handleCardClick = (card: TarotCard): void => {
    if (onCardClick) {
      onCardClick(card);
    }
  };

  // Renderiza posición vacía con placeholder
  const renderEmptyPosition = (position: Position): React.JSX.Element => {
    const labels = getPositionLabels();
    const descriptions = getPositionDescriptions();

    return (
      <div className="reading-position empty">
        <div className="position-header">
          <h3 className="position-label">{labels[position]}</h3>
          <p className="position-description">{descriptions[position]}</p>
        </div>
        <div className="empty-card-placeholder">
          <div className="placeholder-icon">🔮</div>
          <p className="placeholder-text">Esperando carta...</p>
        </div>
      </div>
    );
  };

  // Renderiza posición con carta
  const renderPositionWithCard = (selectedCard: SelectedCard): React.JSX.Element => {
    const labels = getPositionLabels();
    const { position, card } = selectedCard;

    return (
      <div className="reading-position filled">
        <div className="position-header">
          <h3 className="position-label">{labels[position]}</h3>
          {/* La descripción puede ser añadida si quieres más detalle */}
        </div>
        <div className="position-card">
          <Card
            card={card}
            isFlipped={true}
            size="medium"
            onClick={() => handleCardClick(card)}
            position={labels[position]}
          />
        </div>
        <div className="card-summary">
          <h4 className="card-title">{card.arcaneName}</h4>
          <h5 className="goddess-name">✨ {card.goddessName}</h5>
          <p className="card-meaning">{card.arcaneDescription.substring(0, 120)}...</p>
        </div>
      </div>
    );
  };

  // Renderiza interpretación (opcional)
  const renderInterpretation = (): React.JSX.Element | null => {
    if (!showInterpretation || !isComplete) return null;
    const positions = getCardsByPosition();

    return (
      <section className="reading-interpretation mystical-container">
        <h3 className="mystical-title medium">🌟 Interpretación de tu Lectura</h3>
        <p className="mystical-text interpretation-text">
          Tu lectura revela un viaje fascinante a través del conocimiento científico. En tu pasado, la sabiduría de {positions.past?.card.goddessName} con "{positions.past?.card.arcaneName}" ha sentado las bases de tu comprensión. En el presente, {positions.present?.card.goddessName} te guía con "{positions.present?.card.arcaneName}", mostrándote el poder del momento actual. Tu futuro se ilumina con la inspiración de {positions.future?.card.goddessName} y "{positions.future?.card.arcaneName}", prometiendo nuevos descubrimientos y crecimiento.
        </p>
      </section>
    );
  };

  const positions = getCardsByPosition();

  return (
    <div className="reading-container">
      <header className="reading-header">
        <h2 className="mystical-title medium">{title}</h2>
      </header>

      <main className="reading-main">
        <div className="reading-positions">
          {(['past', 'present', 'future'] as Position[]).map((pos) =>
            positions[pos] ? renderPositionWithCard(positions[pos]!) : renderEmptyPosition(pos)
          )}
        </div>
      </main>

      {renderInterpretation()}
    </div>
  );
};
