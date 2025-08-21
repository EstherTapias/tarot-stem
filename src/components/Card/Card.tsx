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
  // Hook para navegación programática
  const navigate = useNavigate();

  // Estado si la carta está volteada o no
  const currentlyFlipped = isFlipped;

  // Dependiendo del estado, muestra imagen y nombre de la diosa o del arcano mayor
  const displayImage = currentlyFlipped ? card.goddessImage : card.arcaneImage;
  const displayName = currentlyFlipped ? card.goddessName : card.arcaneName;

  // Maneja click en la carta: llama a la función pasada por props si hay
  const handleCardClick = () => {
    if (onClick) {
      onClick(card);
    }
  };

  // Maneja click en botón "Saber más": evita propagación y navega a detalle de la carta
  const handleLearnMore = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/card/${card.id}`);
  };

  // Función para convertir un número a romano (1 → I, 4 → IV, etc)
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
        {/* Número del arcano romano arriba a la derecha */}
        <div className={styles.cardNumber}>
          <span className={styles.numberText}>{toRoman(Number(card.id))}</span>
        </div>

        {/* Imagen principal de la carta */}
        <div className={styles.cardImage}>
          <img 
            src={displayImage.imageSrc} 
            alt={displayName} 
            className={styles.image} 
          />
        </div>

        {/* Botón "Saber más" visible si showControls es true */}
        {showControls && (
          <div className={styles.cardControls}>
            <button 
              className={styles.saberMasButton} 
              onClick={handleLearnMore} 
              title="Saber más"
            >
              📖 Saber más
            </button>
          </div>
        )}
      </div>

      {/* Nombre de la carta debajo */}
      <div className={styles.cardName}>
        <h4 className={styles.nameText}>{displayName}</h4>
        <p className={styles.nameSubtext}>
          {currentlyFlipped ? 'Científica' : 'Arcano Mayor'}
        </p>
      </div>
    </div>
  );
};
