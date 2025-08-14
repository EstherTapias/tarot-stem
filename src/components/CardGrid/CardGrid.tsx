// Componente para mostrar una cuadrícula de cartas de tarot

import React from 'react';
import type { TarotCard } from '../../types/tarot';
import { Card } from '../Card/Card';
import './CardGrid.module.css';

// Props que recibe el componente CardGrid
interface CardGridProps {
  cards: TarotCard[];                           // Array de cartas a mostrar
  onCardClick?: (card: TarotCard) => void;     // Función al hacer click en una carta
  flippedCards?: string[];                      // IDs de cartas que están volteadas
  selectedCards?: string[];                     // IDs de cartas que están seleccionadas
  cardSize?: 'small' | 'medium' | 'large';    // Tamaño de las cartas
  maxCards?: number;                            // Número máximo de cartas a mostrar
  title?: string;                               // Título opcional para el grid
  subtitle?: string;                            // Subtítulo opcional
  loading?: boolean;                            // Estado de carga
  emptyMessage?: string;                        // Mensaje cuando no hay cartas
  gridColumns?: number;                         // Número de columnas personalizadas
}

/**
 * Componente CardGrid - Muestra una cuadrícula de cartas de tarot
 * Maneja el estado visual de cada carta y las interacciones
 */
export const CardGrid: React.FC<CardGridProps> = ({
  cards,
  onCardClick,
  flippedCards = [],
  selectedCards = [],
  cardSize = 'medium',
  maxCards,
  title,
  subtitle,
  loading = false,
  emptyMessage = 'No hay cartas disponibles en este momento.',
  gridColumns
}) => {

  /**
   * Procesa las cartas según las limitaciones
   * Aplica filtros de cantidad máxima si se especifica
   */
  const getDisplayCards = (): TarotCard[] => {
    if (maxCards && maxCards > 0) {
      return cards.slice(0, maxCards);
    }
    return cards;
  };

  /**
   * Verifica si una carta está volteada
   */
  const isCardFlipped = (cardId: string): boolean => {
    return flippedCards.includes(cardId);
  };

  /**
   * Verifica si una carta está seleccionada
   */
  const isCardSelected = (cardId: string): boolean => {
    return selectedCards.includes(cardId);
  };

  /**
   * Genera las clases CSS para el contenedor del grid
   */
  const getGridClasses = (): string => {
    const baseClass = 'card-grid';
    const classes = [baseClass];

    // Agregar clase de tamaño
    classes.push(`card-grid--${cardSize}`);

    // Si hay columnas personalizadas
    if (gridColumns) {
      classes.push(`card-grid--columns-${gridColumns}`);
    }

    return classes.join(' ');
  };

  /**
   * Manejador del click en una carta
   * Agrega logs para debugging
   */
  const handleCardClick = (card: TarotCard): void => {
    console.log(`🎯 Click en carta desde grid: ${card.arcaneName}`);
    
    if (onCardClick) {
      onCardClick(card);
    }
  };

  /**
   * Renderiza el estado de carga
   */
  const renderLoading = (): React.JSX.Element => (
    <div className="card-grid-loading">
      <div className="mystical-loading">
        <div className="loading-spinner"></div>
      </div>
      <p className="loading-text">Consultando a las musas de la ciencia...</p>
    </div>
  );

  /**
   * Renderiza el mensaje cuando no hay cartas
   */
  const renderEmptyState = (): React.JSX.Element => (
    <div className="card-grid-empty">
      <div className="empty-icon">🔮</div>
      <p className="empty-message">{emptyMessage}</p>
      <p className="empty-suggestion">
        Las cartas pueden estar descansando. Intenta recargar la página.
      </p>
    </div>
  );

  /**
   * Renderiza el header del grid (título y subtítulo)
   */
  const renderHeader = (): React.JSX.Element | null => {
    if (!title && !subtitle) return null;

    return (
      <div className="card-grid-header">
        {title && (
          <h2 className="mystical-title medium">{title}</h2>
        )}
        {subtitle && (
          <p className="grid-subtitle mystical-text">{subtitle}</p>
        )}
      </div>
    );
  };

  /**
   * Renderiza información adicional del grid
   */
  const renderGridInfo = (): React.JSX.Element => {
    const displayCards = getDisplayCards();
    const totalCards = cards.length;
    
    return (
      <div className="card-grid-info">
        <span className="card-count">
          {displayCards.length} {displayCards.length === 1 ? 'carta' : 'cartas'}
          {maxCards && totalCards > maxCards && (
            <span className="total-count"> de {totalCards} disponibles</span>
          )}
        </span>
        
        {selectedCards.length > 0 && (
          <span className="selected-count">
            {selectedCards.length} seleccionada{selectedCards.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>
    );
  };

  // Estados especiales
  if (loading) {
    return (
      <div className="card-grid-container">
        {renderHeader()}
        {renderLoading()}
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="card-grid-container">
        {renderHeader()}
        {renderEmptyState()}
      </div>
    );
  }

  const displayCards = getDisplayCards();

  return (
    <div className="card-grid-container">
      {renderHeader()}
      {renderGridInfo()}
      
      <div 
        className={getGridClasses()}
        style={gridColumns ? { gridTemplateColumns: `repeat(${gridColumns}, 1fr)` } : undefined}
      >
        {displayCards.map((card, index) => (
          <div 
            key={card.id} 
            className="card-grid-item"
            style={{
              // Animación escalonada al cargar
              animationDelay: `${index * 0.1}s`
            }}
          >
            <Card
              card={card}
              isFlipped={isCardFlipped(card.id)}
              isSelected={isCardSelected(card.id)}
              onClick={onCardClick ? handleCardClick : undefined}
              size={cardSize}
            />
            
            {/* Indicador de posición si la carta está seleccionada */}
            {isCardSelected(card.id) && (
              <div className="card-selection-indicator">
                <span className="selection-glow"></span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mensaje si hay más cartas disponibles */}
      {maxCards && cards.length > maxCards && (
        <div className="card-grid-footer">
          <p className="more-cards-message">
            ✨ Hay {cards.length - maxCards} cartas más esperando ser descubiertas
          </p>
        </div>
      )}
    </div>
  );
};