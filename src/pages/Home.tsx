// Página principal que muestra todas las cartas boca abajo

import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { TarotCard } from '../types/tarot';
import type { CardGrid } from '../components/CardGrid/CardGrid';
import { useTarotCards } from '../hooks/useTarotCards';

/**
 * Componente Home - Página principal de la aplicación
 * Muestra todas las cartas boca abajo y permite navegar al detalle
 */
export const Home: React.FC = () => {
  const navigate = useNavigate();
  
  // Hook personalizado para manejar las cartas
  const { 
    cards, 
    loading, 
    error, 
    refreshCards 
  } = useTarotCards();

  /**
   * Manejador del click en una carta
   * Navega a la página de detalle de la carta seleccionada
   */
  const handleCardClick = (card: TarotCard): void => {
    console.log(`🎯 Navegando al detalle de: ${card.arcaneName}`);
    navigate(`/card/${card.id}`);
  };

  /**
   * Manejador para refrescar las cartas
   * Útil si hay algún error en la carga
   */
  const handleRefresh = async (): Promise<void> => {
    console.log('🔄 Refrescando cartas desde Home...');
    await refreshCards();
  };

  /**
   * Renderiza el estado de error con opción de recargar
   */
  const renderError = (): React.JSX.Element => (
    <div className="error-container mystical-container">
      <div className="error-icon">⚠️</div>
      <h3 className="mystical-title small">Error al Conectar con el Cosmos</h3>
      <p className="mystical-text">{error}</p>
      <button 
        className="mystical-button"
        onClick={handleRefresh}
        type="button"
      >
        🔮 Intentar de Nuevo
      </button>
    </div>
  );

  /**
   * Renderiza los botones de acción principales
   */
  const renderActionButtons = (): React.JSX.Element => (
    <div className="home-actions">
      <button
        className="mystical-button"
        onClick={() => navigate('/reading')}
        type="button"
        disabled={cards.length === 0}
      >
        🔮 Realizar Lectura
      </button>
      
      <button
        className="mystical-button"
        onClick={handleRefresh}
        type="button"
        disabled={loading}
      >
        ✨ Mezclar Cartas
      </button>
    </div>
  );

  /**
   * Renderiza información sobre la aplicación
   */
  const renderIntroduction = (): React.JSX.Element => (
    <div className="home-introduction mystical-container">
      <h2 className="mystical-title medium">Las Diosas Contemporáneas</h2>
      <p className="mystical-text">
        Descubre a las mujeres pioneras de la ciencia y tecnología a través del 
        misticismo del tarot. Cada carta representa tanto un arcano tradicional 
        como una científica que cambió el mundo con sus descubrimientos.
      </p>
      <div className="introduction-features">
        <div className="feature">
          <span className="feature-icon">🔬</span>
          <span className="feature-text">Científicas Pioneras</span>
        </div>
        <div className="feature">
          <span className="feature-icon">🃏</span>
          <span className="feature-text">Arcanos del Tarot</span>
        </div>
        <div className="feature">
          <span className="feature-icon">🔮</span>
          <span className="feature-text">Lectura Mística</span>
        </div>
      </div>
    </div>
  );

  /**
   * Renderiza estadísticas de las cartas
   */
  const renderStats = (): React.JSX.Element => {
    if (cards.length === 0) return <></>;

    return (
      <div className="home-stats">
        <div className="stat-item">
          <span className="stat-number">{cards.length}</span>
          <span className="stat-label">Cartas Disponibles</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">∞</span>
          <span className="stat-label">Posibilidades</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">✨</span>
          <span className="stat-label">Sabiduría Ancestral</span>
        </div>
      </div>
    );
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <header className="home-hero">
        <h1 className="mystical-title large">🔮 Tarot STEM 🔬</h1>
        <p className="hero-subtitle mystical-text">
          Conecta con la sabiduría de las pioneras de la ciencia
        </p>
        {renderStats()}
      </header>

      {/* Introducción */}
      {renderIntroduction()}

      {/* Botones de acción */}
      {!loading && !error && renderActionButtons()}

      {/* Manejo de errores */}
      {error && renderError()}

      {/* Grid principal de cartas */}
      {!error && (
        <main className="home-main">
          <CardGrid
            cards={cards}
            onCardClick={handleCardClick}
            loading={loading}
            title="Explora las Cartas del Conocimiento"
            subtitle="Haz clic en cualquier carta para conocer su significado y la científica asociada"
            emptyMessage="Las cartas están consultando a las musas... Intenta recargar la página."
            cardSize="medium"
          />
        </main>
      )}

      {/* Footer informativo */}
      <footer className="home-footer">
        <div className="mystical-container">
          <p className="mystical-text">
            Un proyecto colaborativo con FactoriaF5 Barcelona 🌟
          </p>
          <p className="mystical-text quote">
            "La ciencia es una forma de pensar mucho más que un cuerpo de conocimientos"
          </p>
        </div>
      </footer>
    </div>
  );
};