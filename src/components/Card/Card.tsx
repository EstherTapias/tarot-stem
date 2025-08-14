// Componente para mostrar una carta individual de tarot

import React from 'react';
import type { TarotCard } from '../../types/tarot';
import './Card.module.css';

// Props que recibe el componente Card
interface CardProps {
  card: TarotCard;                    // Datos de la carta a mostrar
  isFlipped?: boolean;                // Si la carta está volteada (mostrando contenido)
  isSelected?: boolean;               // Si la carta está seleccionada en una lectura
  onClick?: (card: TarotCard) => void; // Función a ejecutar al hacer click
  size?: 'small' | 'medium' | 'large'; // Tamaño de la carta
  showDetails?: boolean;              // Si mostrar detalles completos
  position?: string;                  // Posición en la lectura (Pasado, Presente, Futuro)
}

/**
 * Componente Card - Representa una carta de tarot individual
 * Puede mostrarse boca abajo, volteada, seleccionada, etc.
 */
export const Card: React.FC<CardProps> = ({
  card,
  isFlipped = false,
  isSelected = false,
  onClick,
  size = 'medium',
  showDetails = false,
  position
}) => {

  /**
   * Manejador del click en la carta
   * Solo ejecuta onClick si se proporciona la función
   */
  const handleClick = (): void => {
    if (onClick) {
      console.log(`🎯 Click en carta: ${card.arcaneName} (ID: ${card.id})`);
      onClick(card);
    }
  };

  /**
   * Genera las clases CSS dinámicamente según el estado
   */
  const getCardClasses = (): string => {
    const baseClass = 'tarot-card';
    const classes = [baseClass];

    // Agregar clase de tamaño
    classes.push(`tarot-card--${size}`);

    // Estados de la carta
    if (isFlipped) classes.push('tarot-card--flipped');
    if (isSelected) classes.push('tarot-card--selected');
    if (onClick) classes.push('tarot-card--clickable');

    return classes.join(' ');
  };

  /**
   * Renderizar el reverso de la carta (boca abajo)
   * Muestra un diseño místico genérico
   */
  const renderCardBack = (): React.JSX.Element => (
    <div className="card-back">
      <div className="card-back__pattern">
        <div className="mystical-symbol">🔮</div>
        <div className="mystical-border"></div>
        <div className="card-back__text">TAROT STEM</div>
      </div>
    </div>
  );

  /**
   * Renderizar el frente de la carta (volteada)
   * Muestra la información del arcano y la científica
   */
  const renderCardFront = (): React.JSX.Element => (
    <div className="card-front">
      {/* Header con número y nombre del arcano */}
      <div className="card-front__header">
        <span className="arcane-number">{card.arcaneNumber}</span>
        <h3 className="arcane-name">{card.arcaneName}</h3>
      </div>

      {/* Imagen del arcano */}
      <div className="card-front__image-container">
        <img 
          src={card.arcaneImage.imageSrc} 
          alt={card.arcaneName}
          className="arcane-image"
          onError={(e) => {
            // Manejo de error si la imagen no carga
            console.warn(`⚠️ Error cargando imagen de ${card.arcaneName}`);
            (e.target as HTMLImageElement).src = '/placeholder-card.jpg';
          }}
        />
        
        {/* Créditos de la imagen */}
        <div className="image-credits">
          <small>Por: {card.arcaneImage.author}</small>
        </div>
      </div>

      {/* Información de la científica (Diosa) */}
      <div className="card-front__goddess">
        <div className="goddess-avatar">
          <img 
            src={card.goddessImage.imageSrc} 
            alt={card.goddessName}
            className="goddess-image"
            onError={(e) => {
              console.warn(`⚠️ Error cargando imagen de ${card.goddessName}`);
              (e.target as HTMLImageElement).src = '/placeholder-goddess.jpg';
            }}
          />
        </div>
        <h4 className="goddess-name">{card.goddessName}</h4>
      </div>

      {/* Posición en la lectura si aplica */}
      {position && (
        <div className="card-position">
          <span className="position-label">{position}</span>
        </div>
      )}
    </div>
  );

  /**
   * Renderizar vista detallada de la carta
   * Para la página de detalle individual
   */
  const renderDetailedView = (): React.JSX.Element => (
    <div className="card-detailed">
      <div className="detailed-header">
        <span className="arcane-number-large">{card.arcaneNumber}</span>
        <h2 className="arcane-name-large">{card.arcaneName}</h2>
      </div>

      <div className="detailed-content">
        {/* Sección del Arcano */}
        <div className="detailed-section">
          <div className="detailed-image-container">
            <img 
              src={card.arcaneImage.imageSrc} 
              alt={card.arcaneName}
              className="detailed-arcane-image"
            />
            <p className="image-credit">
              Imagen por: {card.arcaneImage.author}
            </p>
          </div>
          
          <div className="detailed-description">
            <h3>Significado del Arcano</h3>
            <p className="mystical-text">{card.arcaneDescription}</p>
          </div>
        </div>

        {/* Sección de la Científica */}
        <div className="detailed-section">
          <div className="detailed-goddess-container">
            <img 
              src={card.goddessImage.imageSrc} 
              alt={card.goddessName}
              className="detailed-goddess-image"
            />
            <p className="image-credit">
              Imagen por: {card.goddessImage.author}
            </p>
          </div>
          
          <div className="detailed-goddess-info">
            <h3>La Diosa Contemporánea</h3>
            <h4 className="goddess-name-detailed">{card.goddessName}</h4>
            <p className="mystical-text">{card.goddessDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div 
      className={getCardClasses()}
      onClick={handleClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        // Accesibilidad: permitir activar con Enter o Space
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`Carta ${card.arcaneName}, ${card.goddessName}`}
    >
      {showDetails 
        ? renderDetailedView()
        : isFlipped 
          ? renderCardFront() 
          : renderCardBack()
      }
      
      {/* Efecto de brillo en hover */}
      <div className="card-shine"></div>
    </div>
  );
};