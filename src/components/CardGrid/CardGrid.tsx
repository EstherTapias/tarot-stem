import React from 'react';
import type { TarotCard } from '../../types/tarot';
import { Card } from '../Card/Card';

/**
 * 🎴 Props para el componente CardGrid
 */
interface CardGridProps {
  cards: TarotCard[];
  onCardClick?: (card: TarotCard) => void;
  flippedCards?: string[]; // IDs de cartas que están volteadas (mostrar científica)
  title?: string;
  subtitle?: string;
  loading?: boolean;
  cardSize?: 'small' | 'medium' | 'large';
  maxCards?: number;
  showBackside?: boolean; // NUEVO: Si true, muestra reverso de cartas
}

/**
 * 🎴 Componente CardGrid - Rejilla de cartas del tarot
 * 
 * FUNCIONALIDADES:
 * ✅ Muestra cartas en formato rejilla (tapete místico)
 * ✅ Maneja efectos de volteo (arcano ↔ científica) 
 * ✅ Modo "boca abajo" para tiradas (showBackside=true)
 * ✅ Estados de carga con animaciones
 * ✅ Responsive para diferentes tamaños de pantalla
 * ✅ Efectos hover místicos
 * 
 * @param cards - Array de cartas a mostrar
 * @param onCardClick - Función llamada al hacer clic en una carta
 * @param flippedCards - IDs de cartas volteadas (para mostrar científica)
 * @param showBackside - Si true, muestra todas las cartas boca abajo
 */
export const CardGrid: React.FC<CardGridProps> = ({
  cards,
  onCardClick,
  flippedCards = [],
  title,
  subtitle,
  loading = false,
  cardSize = 'medium',
  maxCards,
  showBackside = false
}) => {
  // 🎯 Limitar número de cartas si se especifica maxCards
  const displayCards = maxCards ? cards.slice(0, maxCards) : cards;

  /**
   * 🎭 Maneja el clic en una carta
   */
  const handleCardClick = (card: TarotCard) => {
    if (onCardClick && !loading) {
      onCardClick(card);
    }
  };

  /**
   * 🔄 Verifica si una carta está volteada (mostrando científica)
   */
  const isCardFlipped = (cardId: string): boolean => {
    return !showBackside && flippedCards.includes(cardId);
  };

  /**
   * 🎨 Obtiene la clase CSS para el tamaño de carta
   */
  const getSizeClass = (size: string): string => {
    const sizeMap = {
      small: 'card-small',
      medium: 'card-medium', 
      large: 'card-large'
    };
    return sizeMap[size as keyof typeof sizeMap] || 'card-medium';
  };

  /**
   * 🎴 Renderiza una carta individual con todos sus efectos
   */
  const renderCard = (card: TarotCard, index: number) => {
    const isFlipped = isCardFlipped(card.id);
    const isClickable = !loading && onCardClick;
    
    return (
      <div
        key={card.id}
        className={`card-grid-item ${getSizeClass(cardSize)} ${isClickable ? 'clickable' : ''} mystical-hover`}
        onClick={() => handleCardClick(card)}
        style={{
          // ✨ Animación escalonada de entrada
          animationDelay: `${index * 0.1}s`
        }}
      >
        <Card
          card={card}
          isFlipped={isFlipped}
          size={cardSize}
          showBackside={showBackside} // Pasar el prop de reverso
        />
        
        {/* 🏷️ Nombre de la carta (solo si no está boca abajo) */}
        {!showBackside && (
          <div className="card-info">
            <h4 className="card-name">
              {isFlipped ? card.goddessName : card.arcaneName}
            </h4>
            {isClickable && !isFlipped && (
              <p className="card-hint mystical-text">Clic para voltear</p>
            )}
            {isClickable && isFlipped && (
              <p className="card-hint mystical-text">Clic para ver detalle</p>
            )}
          </div>
        )}
        
        {/* 💫 Efecto de selección para tiradas */}
        {showBackside && isClickable && (
          <div className="selection-overlay">
            <span className="selection-text">✨ Elegir ✨</span>
          </div>
        )}
      </div>
    );
  };

  /**
   * 🔄 Renderiza estado de carga con cartas fantasma
   */
  const renderLoadingCards = () => {
    return Array.from({ length: 6 }, (_, index) => (
      <div key={`loading-${index}`} className={`card-grid-item ${getSizeClass(cardSize)} loading`}>
        <div className="loading-card mystical-container">
          <div className="loading-spinner">🔮</div>
        </div>
      </div>
    ));
  };

  return (
    <section className="card-grid-section">
      {/* 📋 Título y subtítulo de la sección */}
      {(title || subtitle) && (
        <header className="grid-header">
          {title && <h2 className="grid-title mystical-title medium">{title}</h2>}
          {subtitle && <p className="grid-subtitle mystical-text">{subtitle}</p>}
        </header>
      )}

      {/* 🎴 Rejilla principal de cartas */}
      <div className={`card-grid ${getSizeClass(cardSize)}`}>
        {loading ? (
          renderLoadingCards()
        ) : displayCards.length > 0 ? (
          displayCards.map((card, index) => renderCard(card, index))
        ) : (
          <div className="empty-grid mystical-container">
            <p className="mystical-text">No hay cartas disponibles en este momento</p>
            <span className="empty-icon">🌙</span>
          </div>
        )}
      </div>

      {/* 📊 Información adicional */}
      {!loading && displayCards.length > 0 && maxCards && cards.length > maxCards && (
        <div className="grid-footer">
          <p className="cards-count mystical-text">
            Mostrando {displayCards.length} de {cards.length} cartas
          </p>
        </div>
      )}
    </section>
  );
};