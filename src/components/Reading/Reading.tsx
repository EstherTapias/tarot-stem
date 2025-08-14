// Componente que muestra la lectura de 3 cartas seleccionadas

import React from 'react';
import type { SelectedCard, TarotCard, Position } from '../../types/tarot';
import { Card } from '../Card/Card';
import './Reading.module.css';

// Props que recibe el componente Reading
interface ReadingProps {
  selectedCards: SelectedCard[];                    // Cartas seleccionadas con sus posiciones
  isComplete?: boolean;                             // Si la lectura está completa (3 cartas)
  onCardClick?: (card: TarotCard) => void;         // Función al hacer click en una carta
  showInterpretation?: boolean;                     // Si mostrar interpretación de la lectura
  title?: string;                                   // Título personalizado para la lectura
}

/**
 * Componente Reading - Muestra la lectura de 3 cartas en formato Pasado-Presente-Futuro
 * Organiza las cartas seleccionadas y puede mostrar interpretaciones
 */
export const Reading: React.FC<ReadingProps> = ({
  selectedCards,
  isComplete = false,
  onCardClick,
  showInterpretation = false,
  title = "Tu Lectura de Tarot STEM"
}) => {

  /**
   * Organiza las cartas por posición para mostrarlas en orden correcto
   */
  const getCardsByPosition = (): Record<Position, SelectedCard | null> => {
    const positions: Record<Position, SelectedCard | null> = {
      past: null,
      present: null,
      future: null
    };

    selectedCards.forEach(selectedCard => {
      positions[selectedCard.position] = selectedCard;
    });

    return positions;
  };

  /**
   * Obtiene las etiquetas en español para cada posición
   */
  const getPositionLabels = (): Record<Position, string> => {
    return {
      past: 'Pasado',
      present: 'Presente',
      future: 'Futuro'
    };
  };

  /**
   * Obtiene la descripción de cada posición
   */
  const getPositionDescriptions = (): Record<Position, string> => {
    return {
      past: 'Los eventos y experiencias que te han moldeado',
      present: 'Tu situación actual y las energías que te rodean',
      future: 'Las posibilidades y el camino que se abre ante ti'
    };
  };

  /**
   * Genera una interpretación general de la lectura
   */
  const generateReadingInterpretation = (): string => {
    if (!isComplete) return '';

    const cardsByPosition = getCardsByPosition();
    const pastCard = cardsByPosition.past?.card;
    const presentCard = cardsByPosition.present?.card;
    const futureCard = cardsByPosition.future?.card;

    return `Tu lectura revela un viaje fascinante a través del conocimiento científico. 
    En tu pasado, la sabiduría de ${pastCard?.goddessName} con "${pastCard?.arcaneName}" 
    ha sentado las bases de tu comprensión. En el presente, ${presentCard?.goddessName} 
    te guía con "${presentCard?.arcaneName}", mostrándote el poder del momento actual. 
    Tu futuro se ilumina con la inspiración de ${futureCard?.goddessName} y 
    "${futureCard?.arcaneName}", prometiendo nuevos descubrimientos y crecimiento.`;
  };

  /**
   * Maneja el click en una carta específica
   */
  const handleCardClick = (card: TarotCard): void => {
    console.log(`🎯 Click en carta de lectura: ${card.arcaneName}`);
    if (onCardClick) {
      onCardClick(card);
    }
  };

  /**
   * Renderiza un placeholder para posición vacía
   */
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

  /**
   * Renderiza una posición con su carta
   */
  const renderPositionWithCard = (selectedCard: SelectedCard): React.JSX.Element => {
    const labels = getPositionLabels();
    const descriptions = getPositionDescriptions();
    const { position, card } = selectedCard;

    return (
      <div className="reading-position filled">
        <div className="position-header">
          <h3 className="position-label">{labels[position]}</h3>
          <p className="position-description">{descriptions[position]}</p>
        </div>

        <div className="position-card">
          <Card
            card={card}
            isFlipped={true}
            size="medium"
            onClick={onCardClick ? handleCardClick : undefined}
            position={labels[position]}
          />
        </div>

        <div className="card-summary">
          <h4 className="card-title">{card.arcaneName}</h4>
          <h5 className="goddess-name">✨ {card.goddessName}</h5>
          <p className="card-meaning">
            {card.arcaneDescription.substring(0, 120)}...
          </p>
        </div>
      </div>
    );
  };

  /**
   * Renderiza la interpretación completa de la lectura
   */
  const renderInterpretation = (): React.JSX.Element | null => {
    if (!showInterpretation || !isComplete) return null;

    return (
      <section className="reading-interpretation mystical-container">
        <h3 className="mystical-title medium">🌟 Interpretación de tu Lectura</h3>
        
        <div className="interpretation-content">
          <p className="mystical-text interpretation-text">
            {generateReadingInterpretation()}
          </p>
          
          <div className="interpretation-insights">
            <div className="insight-item">
              <span className="insight-icon">🔬</span>
              <p className="insight-text">
                Las científicas representadas en tus cartas han revolucionado sus campos, 
                igual que tú tienes el potencial de transformar tu realidad.
              </p>
            </div>
            
            <div className="insight-item">
              <span className="insight-icon">🌌</span>
              <p className="insight-text">
                Cada arcano revela aspectos del conocimiento universal que resuenan 
                con tu camino personal de descubrimiento.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  };

  /**
   * Renderiza estadísticas de la lectura
   */
  const renderReadingStats = (): React.JSX.Element => {
    const cardsByPosition = getCardsByPosition();
    const filledPositions = Object.values(cardsByPosition).filter(card => card !== null).length;

    return (
      <div className="reading-stats">
        <div className="stat-item">
          <span className="stat-number">{filledPositions}</span>
          <span className="stat-label">de 3 cartas</span>
        </div>
        
        <div className="stat-item">
          <span className="stat-number">{isComplete ? '✓' : '○'}</span>
          <span className="stat-label">{isComplete ? 'Completa' : 'En progreso'}</span>
        </div>
        
        {isComplete && (
          <div className="stat-item">
            <span className="stat-number">∞</span>
            <span className="stat-label">Posibilidades</span>
          </div>
        )}
      </div>
    );
  };

  const cardsByPosition = getCardsByPosition();
  const positions: Position[] = ['past', 'present', 'future'];

  return (
    <div className="reading-container">
      {/* Header de la lectura */}
      <header className="reading-header">
        <h2 className="mystical-title medium">{title}</h2>
        {renderReadingStats()}
      </header>

      {/* Grid principal de las 3 posiciones */}
      <main className="reading-main">
        <div className="reading-positions">
          {positions.map((position) => {
            const selectedCard = cardsByPosition[position];
            
            return (
              <div key={position} className={`position-container ${position}`}>
                {selectedCard 
                  ? renderPositionWithCard(selectedCard)
                  : renderEmptyPosition(position)
                }
              </div>
            );
          })}
        </div>
      </main>

      {/* Interpretación (si está habilitada y completa) */}
      {renderInterpretation()}

      {/* Mensaje de estado si no está completa */}
      {!isComplete && selectedCards.length > 0 && (
        <footer className="reading-footer">
          <div className="progress-message mystical-container">
            <p className="mystical-text">
              Continúa seleccionando cartas para completar tu lectura cósmica...
            </p>
            <div className="cosmic-animation">✨🔮✨</div>
          </div>
        </footer>
      )}

      {/* Mensaje de lectura completa */}
      {isComplete && (
        <footer className="reading-footer">
          <div className="completion-message mystical-container">
            <h3 className="mystical-title small">🌟 Lectura Completada</h3>
            <p className="mystical-text">
              Las cartas han hablado. Haz clic en cualquier carta para explorar más detalles 
              sobre su significado y la científica que representa.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
};