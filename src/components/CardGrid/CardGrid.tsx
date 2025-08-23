import React, { useEffect, useState } from 'react';
import type { TarotCard } from '../../types/tarot';
import { Card } from '../Card/Card';
import styles from './CardGrid.module.css';

interface CardGridProps {
  cards: TarotCard[];
  flippedCards?: string[];
  onCardClick?: (card: TarotCard) => void;
  loading?: boolean;
  cardSize?: 'small' | 'medium' | 'large';
  showGridStats?: boolean;
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
  // Estado para manejar si estamos en cliente (evita problemas de hydratación)
  const [isClient, setIsClient] = useState(false);
  
  // Estado para detectar móvil real
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Detectar si realmente estamos en móvil
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isSmallScreen = window.innerWidth <= 768;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      return isMobileDevice || (isSmallScreen && isTouchDevice);
    };

    setIsMobile(checkMobile());

    const handleResize = () => {
      setIsMobile(checkMobile());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // No renderizar en servidor para evitar hydratación mismatch
  if (!isClient) {
    return (
      <div className={`${styles.gridContainer} ${className}`}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}>🔮</div>
          <p className={styles.loadingText}>Cargando...</p>
        </div>
      </div>
    );
  }

  // Si está cargando, mostrar spinner
  if (loading) {
    return (
      <div className={`${styles.gridContainer} ${className}`}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}>🔮</div>
          <p className={styles.loadingText}>Invocando las cartas del destino...</p>
          <div className={styles.loadingSkeleton}>
            {[...Array(isMobile ? 4 : 8)].map((_, index) => (
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

  // Si no hay cartas
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

  // Cálculo seguro del progreso
  const progress = cards.length > 0 ? Math.round((flippedCards.length / cards.length) * 100) : 0;

  return (
    <div className={`${styles.gridContainer} ${className}`}>
      {/* Estadísticas mejoradas para móvil */}
      {showGridStats && (
        <div className={styles.gridStats}>
          <div className={`${styles.statsContent} ${isMobile ? styles.mobileStats : ''}`}>
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
          
          {/* Barra de progreso con animación segura */}
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ 
                width: `${progress}%`,
                transition: 'width 0.8s ease-out'
              }}
            />
          </div>
          
          <p className={styles.progressText}>
            Progreso de exploración: {progress}%
          </p>
        </div>
      )}

      {/* Grid responsivo */}
      <div className={`${styles.cardsGrid} ${styles[cardSize]} ${isMobile ? styles.mobileGrid : ''}`}>
        {cards.map((card, index) => {
          const isFlipped = flippedCards.includes(card.id);

          return (
            <div 
              key={card.id} 
              className={`${styles.cardWrapper} ${isMobile ? styles.mobileCardWrapper : ''}`}
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