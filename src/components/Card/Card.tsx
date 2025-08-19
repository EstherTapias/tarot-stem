import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { TarotCard } from '../../types/tarot';
import styles from './Card.module.css';

interface CardProps {
  card: TarotCard;
  isFlipped?: boolean;
  onClick?: (card: TarotCard) => void;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  showControls?: boolean;
}

export const Card: React.FC<CardProps> = ({
  card,
  isFlipped = false,
  onClick,
  size = 'medium',
  className = '',
  showControls = true
}) => {
  const navigate = useNavigate();
  const [localFlipped, setLocalFlipped] = useState(false);

  const currentlyFlipped = isFlipped || localFlipped;
  const displayImage = currentlyFlipped ? card.goddessImage : card.arcaneImage;
  const displayName = currentlyFlipped ? card.goddessName : card.arcaneName;

  const handleCardClick = () => {
    if (onClick) {
      onClick(card);
    } else {
      setLocalFlipped(!localFlipped);
    }
  };

  const handleLearnMore = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/card/${card.id}`);
  };

  const handleFlipToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLocalFlipped(!localFlipped);
  };

  // Función para convertir número a romano
  const toRoman = (num: number) => {
    const romanMap: [number, string][] = [
      [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
      [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
      [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
    ];
    let result = '';
    for (const [value, numeral] of romanMap) {
      while (num >= value) {
        result += numeral;
        num -= value;
      }
    }
    return result;
  };

  return (
    <div className={`${styles.cardWrapper} ${className}`}>
      <div 
        className={`${styles.card} ${styles[size]}`}
        onClick={handleCardClick}
      >
        {/* Número del arcano en romano */}
        <div className={styles.cardNumber}>
        <span className={styles.numberText}>{toRoman(Number(card.id))}</span>

        </div>

        {/* Imagen principal */}
        <div className={styles.cardImage}>
          <img 
            src={displayImage.imageSrc} 
            alt={displayName} 
            className={styles.image} 
          />
          <div className={styles.cardOverlay}>
            <div className={styles.overlayContent}>
              <h3 className={styles.cardTitle}>{displayName}</h3>
              {currentlyFlipped && <p className={styles.cardSubtitle}>STEM Pioneer</p>}
            </div>
          </div>
        </div>

        {/* Controles */}
        {showControls && (
          <div className={styles.cardControls}>
            <button 
              className={styles.flipButton} 
              onClick={handleFlipToggle} 
              title={currentlyFlipped ? 'Ver Arcano' : 'Ver Científica'}
            >
              {currentlyFlipped ? '🔮' : '🔬'}
            </button>
            <button 
              className={styles.detailButton} 
              onClick={handleLearnMore} 
              title="Saber más"
            >
              📖 Saber más
            </button>
          </div>
        )}

        {/* Indicador de tipo */}
        <div className={`${styles.typeIndicator} ${currentlyFlipped ? styles.scientific : styles.mystical}`}>
          <span className={styles.typeIcon}>
            {currentlyFlipped ? '⚗️' : '✨'}
          </span>
        </div>
      </div>

      {/* Nombre de la carta debajo de la carta */}
      <div className={styles.cardName}>
        <h4 className={styles.nameText}>{displayName}</h4>
        <p className={styles.nameSubtext}>
          {currentlyFlipped ? 'Científica' : 'Arcano Mayor'}
        </p>
      </div>
    </div>
  );
};
