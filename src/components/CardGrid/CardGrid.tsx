import React from 'react';
import type { TarotCard } from '../../types/tarot';
import { Card } from '../Card/Card';
import styles from './CardGrid.module.css';

interface CardGridProps {
  cards: TarotCard[];
  flippedCards?: string[]; // Lista de cartas volteadas por id
  onCardClick?: (card: TarotCard) => void;
  loading?: boolean; // Muestra estado carga si es true
  cardSize?: 'small' | 'medium' | 'large';
  showGridStats?: boolean; // Muestra estadísticas si es true
  className?: string;
}

export const CardGrid: React.FC<CardGridProps> = ({
  cards,
  flippedCards = [],
  onCardClick,
  loading = false,
  cardSize = 'medium',
  showGridStats = false,
  className = ''
}) => {
  // Si está cargando, mostrar spinner y esqueleto
  if (loading) {
    return (
      <div className={`${styles.gridContainer} ${className}`}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}>🔮</div>
          <p className={styles.loadingText}>Invocando las cartas del destino...</p>
          {/* Skeleton cards animadas */}
          <div className={styles.loadingSkeleton}>
            {[...Array(8)].map((_, index) => (
              <div 
                key={index} 
                className={styles.skeletonCard}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.skeletonImage}></div>
                <div className={styles.skeletonText}></div>
                <div className={styles.skeletonSubtext}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Si no hay cartas, mostrar estado vacío
  if (cards.length === 0) {
    return (
      <div className={`${styles.gridContainer} ${className}`}>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🌟</div>
          <h3 className={styles.emptyTitle}>No hay cartas disponibles</h3>
          <p className={styles.emptyText}>
            El cosmos aún no ha revelado sus secretos. Intenta recargar la página.
          </p>
        </div>
      </div>
    );
  }

  // Renderizamos las cartas normalmente
  return (
    <div className={`${styles.gridContainer} ${className}`}>
      {/* Mostrar estadísticas si se pide */}
      {showGridStats && (
        <div className={styles.gridStats}>
          <div className={styles.statsContent}>
            <div className={styles.statItem}>
              <span className={styles.statIcon}>🃏</span>
              <span className={styles.statLabel}>{cards.length} Cartas</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statIcon}>🔮</span>
              <span className={styles.statLabel}>{cards.length - flippedCards.length} Místicas</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statIcon}>🔬</span>
              <span className={styles.statLabel}>{flippedCards.length} Científicas</span>
            </div>
          </div>
          {/* Barra de progreso basada en cartas volteadas */}
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${(flippedCards.length / cards.length) * 100}%` }}
            ></div>
          </div>
          <p className={styles.progressText}>
            Progreso de exploración: {Math.round((flippedCards.length / cards.length) * 100)}%
          </p>
        </div>
      )}

      {/* Grid con las cartas renderizadas */}
      <div className={`${styles.cardsGrid} ${styles[cardSize]}`}>
        {cards.map((card, index) => {
          const isFlipped = flippedCards.includes(card.id);

          return (
            <div 
              key={card.id} 
              className={styles.cardWrapper}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                '--card-index': index
              } as React.CSSProperties}
            >
              <Card
                card={card}
                isFlipped={isFlipped}
                onClick={onCardClick}
                size={cardSize}
                className={`${styles.gridCard} ${isFlipped ? styles.flipped : ''}`}  
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
