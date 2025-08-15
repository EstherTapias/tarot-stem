import React from 'react';
import type { TarotCard } from '../../types/tarot';
import './Card.module.css';

interface CardProps {
  card: TarotCard;
  isFlipped?: boolean; // Determina si la carta muestra la científica (frente)
  isSelected?: boolean;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
  position?: string; // Opcional para mostrar etiqueta de posición en lectura (pasado, etc)
  showBackside?: boolean; //Para mostrar reverso en tiradas
}

/*
 * ESTADOS DE LA CARTA:
 * - showBackside=true: Muestra reverso místico (para tiradas)
 * - showBackside=false + isFlipped=false: Muestra arcano 
 * - showBackside=false + isFlipped=true: Muestra científica
 */
export const Card: React.FC<CardProps> = ({
  card,
  isFlipped = false,
  isSelected = false,
  onClick,
  size = 'medium',
  position,
  showBackside = false 
}) => {

  const sizeClass = `card-${size}`;

  /*Determina qué cara mostrar según el estado   */
  const getCardDisplay = () => {
    if (showBackside) {
      return 'backside'; // Reverso místico
    } else if (isFlipped) {
      return 'scientist'; // Científica (cara frontal original)
    } else {
      return 'arcane'; // Arcano
    }
  };

  const cardDisplay = getCardDisplay();

  return (
    <div
      className={`mystical-card ${sizeClass} ${isFlipped ? 'card-flipped' : ''} ${isSelected ? 'card-selected' : ''} ${showBackside ? 'card-backside' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`${card.arcaneName} - ${position || ''}`}
      onKeyPress={(e) => { if (e.key === 'Enter') onClick && onClick(); }}
    >

      {/*REVERSO MÍSTICO - Para tiradas (showBackside=true) */}
      {cardDisplay === 'backside' && (
        <div className="card-backside-face">
          {/* Intentar cargar imagen desde /public, fallback al patrón existente */}
          <div className="backside-image-container">
            <img 
              src="../public/tarot-back.jpg" 
              alt="Reverso místico del tarot"
              className="backside-image"
              onError={(e) => {
                // Si la imagen no existe, ocultar y mostrar patrón
                (e.target as HTMLImageElement).style.display = 'none';
                const fallback = (e.target as HTMLElement).nextElementSibling;
                if (fallback) (fallback as HTMLElement).style.display = 'block';
              }}
            />
            
            {/*  Patrón de fallback (tu diseño original) */}
            <div className="cosmic-pattern-fallback" style={{ display: 'none' }}>
              <div className="cosmic-circle">
                <div className="inner-circle">
                  <span className="mystical-symbol">🔮</span>
                </div>
              </div>
              <div className="constellation-pattern">
                {[...Array(12)].map((_, i) => (
                  <span key={i} className={`star star-${i + 1}`}>★</span>
                ))}
              </div>
            </div>
          </div>

          {/*  Efectos de selección para tiradas */}
          {onClick && (
            <div className="selection-overlay">
              <span className="selection-text">✨ Elegir ✨</span>
            </div>
          )}
        </div>
      )}

      {/* ARCANO - Imagen del tarot tradicional */}
      {cardDisplay === 'arcane' && (
        <div className="card-arcane-face">
          <div className="arcane-image-container">
            {card.arcaneImage?.imageSrc ? (
              <img src={card.arcaneImage.imageSrc} alt={card.arcaneName} className="arcane-image" />
            ) : (
              <div className="image-placeholder">
                <span className="placeholder-icon">🎴</span>
                <p className="placeholder-text">Arcano no disponible</p>
              </div>
            )}
            <div className="image-overlay" />
          </div>

          <div className="card-info">
            <div className="card-header">
              <span className="arcane-number">{card.arcaneNumber}</span>
              <h3 className="arcane-name">{card.arcaneName}</h3>
            </div>
            {position && (
              <div className="position-info">
                <span className="position-label">{position}</span>
              </div>
            )}
          </div>

          <div className="card-shine" />
          <div className="hover-effects">
            <div className="glow-ring" />
            <div className="energy-pulse" />
          </div>
        </div>
      )}

      {/* CIENTÍFICA - Tu diseño original (cara frontal) */}
      {cardDisplay === 'scientist' && (
        <div className="card-front">
          <div className="card-image-container">
            {card.goddessImage?.imageSrc ? (
              <img src={card.goddessImage.imageSrc} alt={card.goddessName} className="card-image" />
            ) : (
              <div className="image-placeholder">
                <span className="placeholder-icon">❓</span>
                <p className="placeholder-text">Imagen no disponible</p>
              </div>
            )}
            <div className="image-overlay" />
          </div>

          <div className="card-info">
            <div className="card-header">
              <span className="arcane-number">{card.arcaneNumber}</span>
              <h3 className="arcane-name">{card.arcaneName}</h3>
            </div>
            <div className="goddess-info">
              <span className="goddess-label">La Diosa Contemporánea</span>
              <h4 className="goddess-name">{card.goddessName}</h4>
            </div>
            <button
              type="button"
              className="mystical-button card-action"
              onClick={(e) => {
                e.stopPropagation();
                if (onClick) onClick();
              }}
            >
              Saber más →
            </button>
          </div>

          <div className="card-shine" />
          <div className="hover-effects">
            <div className="glow-ring" />
            <div className="energy-pulse" />
          </div>
        </div>
      )}
    </div>
  );
};