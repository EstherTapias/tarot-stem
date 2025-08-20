import React from 'react';
import type { SelectedCard, Position } from '../../types/tarot';
import styles from './Reading.module.css';

interface ReadingProps {
  selectedCards: SelectedCard[];
  isComplete: boolean;
  onCardClick?: (card: any) => void;
  showInterpretation?: boolean;
  className?: string;
}

export const Reading: React.FC<ReadingProps> = ({
  selectedCards,
  isComplete,
  onCardClick,
  showInterpretation = false,
  className = ''
}) => {
  // Obtiene carta por posición
  const getCardByPosition = (position: Position) => {
    return selectedCards.find(sc => sc.position === position);
  };

  // Etiquetas de posición
  const getPositionLabel = (position: Position): string => ({
    past: 'Pasado',
    present: 'Presente', 
    future: 'Futuro'
  }[position]);

  // Descripciones de posición
  const getPositionDescription = (position: Position): string => ({
    past: 'Las energías que te han formado y las lecciones aprendidas',
    present: 'Tu situación actual y las fuerzas que te rodean',
    future: 'El camino que se abre ante ti y las posibilidades por venir'
  }[position]);

  // Interpretación general
  const getGeneralInterpretation = (): string => {
    if (!isComplete) return '';
    
    const pastCard = getCardByPosition('past');
    const presentCard = getCardByPosition('present');
    const futureCard = getCardByPosition('future');

    return `Tu lectura revela una conexión profunda entre la sabiduría ancestral del ${pastCard?.card.arcaneName}, 
    la energía presente de ${presentCard?.card.arcaneName}, y las posibilidades futuras que trae 
    ${futureCard?.card.arcaneName}. La ciencia y el misticismo se entrelazan en tu destino, 
    donde ${pastCard?.card.goddessName}, ${presentCard?.card.goddessName} y ${futureCard?.card.goddessName} 
    guían tu camino hacia el conocimiento y la transformación.`;
  };

  if (selectedCards.length === 0) {
    return (
      <div className={`${styles.readingContainer} ${className}`}>
        <div className={styles.emptyReading}>
          <div className={styles.emptyIcon}>🔮</div>
          <h3 className={styles.emptyTitle}>Lectura en Preparación</h3>
          <p className={styles.emptyText}>
            Las cartas están esperando ser seleccionadas para revelar tu destino
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.readingContainer} ${className}`}>
      {/* Título de la lectura */}
      <header className={styles.readingHeader}>
        <h2 className={styles.readingTitle}>
          {isComplete ? '🌟 Tu Lectura Completa 🌟' : '🔮 Lectura en Progreso'}
        </h2>
        <div className={styles.readingProgress}>
          <div className={styles.progressSteps}>
            {['past', 'present', 'future'].map((position, index) => {
              const hasCard = getCardByPosition(position as Position);
              return (
                <div 
                  key={position} 
                  className={`${styles.progressStep} ${hasCard ? styles.completed : ''}`}
                >
                  <div className={styles.stepNumber}>{index + 1}</div>
                  <div className={styles.stepLabel}>{getPositionLabel(position as Position)}</div>
                </div>
              );
            })}
          </div>
        </div>
      </header>

      {/* Spread de cartas */}
      <main className={styles.readingSpread}>
        <div className={styles.spreadLayout}>
          {['past', 'present', 'future'].map((position) => {
            const selectedCard = getCardByPosition(position as Position);
            
            return (
              <div key={position} className={styles.positionSlot}>
                <div className={styles.positionHeader}>
                  <h3 className={styles.positionTitle}>
                    {getPositionLabel(position as Position)}
                  </h3>
                  <p className={styles.positionDescription}>
                    {getPositionDescription(position as Position)}
                  </p>
                </div>

                <div className={`${styles.cardSlot} ${selectedCard ? styles.filled : styles.empty}`}>
                  {selectedCard ? (
                    <div 
                      className={styles.selectedCard}
                      onClick={() => onCardClick?.(selectedCard.card)}
                    >
                      {/* Imagen del Arcano */}
                      <div className={styles.cardImage}>
                        <img 
                          src={selectedCard.card.arcaneImage.imageSrc} 
                          alt={selectedCard.card.arcaneName}
                          className={styles.arcaneImage}
                        />
                        <div className={styles.cardOverlay}>
                          <div className={styles.cardInfo}>
                            <h4 className={styles.cardName}>{selectedCard.card.arcaneName}</h4>
                            <p className={styles.cardNumber}>#{selectedCard.card.id}</p>
                          </div>
                        </div>
                      </div>

                      {/* Información de la carta */}
                      <div className={styles.cardDetails}>
                        <div className={styles.cardTitle}>
                          <h4 className={styles.arcaneName}>{selectedCard.card.arcaneName}</h4>
                          <h5 className={styles.goddessName}>{selectedCard.card.goddessName}</h5>
                        </div>

                        {/* Vista científica pequeña */}
                        <div className={styles.scientificPreview}>
                          <img 
                            src={selectedCard.card.goddessImage.imageSrc} 
                            alt={selectedCard.card.goddessName}
                            className={styles.scientificImage}
                          />
                          <div className={styles.scientificLabel}>🔬 STEM Pioneer</div>
                        </div>
                      </div>

                      {/* Botón de detalles */}
                      <button 
                        className={styles.detailsButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          onCardClick?.(selectedCard.card);
                        }}
                      >
                        📖 Ver Detalles
                      </button>
                    </div>
                  ) : (
                    <div className={styles.emptySlot}>
                      <div className={styles.slotIcon}>
                        {position === 'past' && '⏳'}
                        {position === 'present' && '⭐'}
                        {position === 'future' && '🔮'}
                      </div>
                      <p className={styles.slotText}>
                        Esperando carta...
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Interpretación completa */}
      {isComplete && showInterpretation && (
        <section className={styles.interpretationSection}>
          <h3 className={styles.interpretationTitle}>
             Interpretación de tu Lectura
          </h3>
          
          <div className={styles.interpretationContent}>
            <div className={styles.generalInterpretation}>
              <h4 className={styles.interpretationSubtitle}>📜 Mensaje General</h4>
              <p className={styles.interpretationText}>
                {getGeneralInterpretation()}
              </p>
            </div>

            {/* Interpretaciones por posición */}
            <div className={styles.positionInterpretations}>
              {selectedCards.map((selectedCard) => (
                <div key={selectedCard.position} className={styles.positionInterpretation}>
                  <div className={styles.interpretationHeader}>
                    <h4 className={styles.interpretationPosition}>
                      {getPositionLabel(selectedCard.position)}
                    </h4>
                    <div className={styles.interpretationCard}>
                      <span className={styles.interpretationArcane}>
                        {selectedCard.card.arcaneName}
                      </span>
                      <span className={styles.interpretationGoddess}>
                        {selectedCard.card.goddessName}
                      </span>
                    </div>
                  </div>
                  
                  <div className={styles.interpretationBody}>
                    <p className={styles.arcaneInterpretation}>
                      <strong>🔮 Energía Mística:</strong> {selectedCard.card.arcaneDescription}
                    </p>
                    <p className={styles.goddessInterpretation}>
                      <strong>🔬 Sabiduría Científica:</strong> {selectedCard.card.goddessDescription}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Consejo final */}
            <div className={styles.finalAdvice}>
              <h4 className={styles.adviceTitle}>✨ Consejo del Cosmos ✨</h4>
              <p className={styles.adviceText}>
                La fusión entre misticismo y ciencia en tu lectura sugiere que el camino hacia 
                la sabiduría requiere tanto intuición como razón. Abraza tanto el misterio 
                como el conocimiento, pues en su equilibrio encontrarás tu verdadero poder.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Estado de completitud */}
      {isComplete && (
        <footer className={styles.readingFooter}>
          <div className={styles.completionBadge}>
            <span className={styles.badgeIcon}>🎉</span>
            <span className={styles.badgeText}>Lectura Completa</span>
          </div>
          <p className={styles.footerText}>
            Tu destino ha sido revelado. Las cartas han hablado.
          </p>
        </footer>
      )}
    </div>
  );
};