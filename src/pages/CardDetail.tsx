// Página que muestra el detalle completo de una carta específica

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import type { TarotCard } from '../types/tarot';
import { Card } from '../components/Card/Card';
import { getCardById } from '../services/api';

/**
 * Componente CardDetail - Página de detalle de una carta específica
 * Muestra información completa del arcano y la científica asociada
 */
export const CardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Estados locales para el detalle de la carta
  const [card, setCard] = useState<TarotCard | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Carga los datos de la carta específica por ID
   */
  useEffect(() => {
    const loadCardDetail = async (): Promise<void> => {
      if (!id) {
        console.error('❌ No se proporcionó ID de carta');
        setError('ID de carta no válido');
        setLoading(false);
        return;
      }

      try {
        console.log(`🔮 Cargando detalle de carta ID: ${id}`);
        setLoading(true);
        setError(null);
        
        const cardData = await getCardById(id);
        setCard(cardData);
        
        console.log(`✨ Carta "${cardData.arcaneName}" cargada exitosamente`);
        
      } catch (err) {
        console.error('❌ Error al cargar detalle de carta:', err);
        const errorMessage = err instanceof Error ? err.message : 'Error al cargar la carta';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadCardDetail();
  }, [id]);

  /**
   * Navega a la página anterior
   */
  const handleGoBack = (): void => {
    navigate(-1);
  };

  /**
   * Navega a una lectura nueva incluyendo esta carta
   */
  const handleStartReading = (): void => {
    if (card) {
      console.log(`🔮 Iniciando lectura con carta: ${card.arcaneName}`);
      navigate('/reading', { state: { preselectedCard: card } });
    }
  };

  /**
   * Renderiza el estado de carga
   */
  const renderLoading = (): React.JSX.Element => (
    <div className="detail-loading">
      <div className="mystical-loading">
        <div className="loading-spinner"></div>
      </div>
      <p className="loading-text">Revelando los secretos de la carta...</p>
    </div>
  );

  /**
   * Renderiza el estado de error
   */
  const renderError = (): React.JSX.Element => (
    <div className="detail-error mystical-container">
      <div className="error-icon">🔮💔</div>
      <h2 className="mystical-title medium">Carta No Encontrada</h2>
      <p className="mystical-text">{error}</p>
      <div className="error-actions">
        <button className="mystical-button" onClick={handleGoBack}>
          ← Regresar
        </button>
        <Link to="/" className="mystical-button">
          🏠 Inicio
        </Link>
      </div>
    </div>
  );

  /**
   * Renderiza la navegación superior
   */
  const renderNavigation = (): React.JSX.Element => (
    <nav className="detail-navigation">
      <button 
        className="nav-button mystical-button"
        onClick={handleGoBack}
        type="button"
      >
        ← Regresar
      </button>
      
      <div className="nav-links">
        <Link to="/" className="nav-link">
          🏠 Inicio
        </Link>
        <Link to="/reading" className="nav-link">
          🔮 Nueva Lectura
        </Link>
      </div>
    </nav>
  );

  /**
   * Renderiza información del arcano
   */
  const renderArcaneInfo = (card: TarotCard): React.JSX.Element => (
    <section className="detail-section arcane-section">
      <div className="section-header">
        <h2 className="mystical-title medium">El Arcano</h2>
        <div className="arcane-number-display">
          <span className="arcane-number-large">{card.arcaneNumber}</span>
          <span className="arcane-name-large">{card.arcaneName}</span>
        </div>
      </div>
      
      <div className="section-content">
        <div className="arcane-image-container">
          <img 
            src={card.arcaneImage.imageSrc}
            alt={card.arcaneName}
            className="detail-arcane-image"
          />
          <div className="image-attribution">
            <small>Imagen por: {card.arcaneImage.author}</small>
            {card.arcaneImage.license && (
              <small className="license-info">Licencia: {card.arcaneImage.license}</small>
            )}
          </div>
        </div>
        
        <div className="arcane-description">
          <h3>Significado y Simbolismo</h3>
          <p className="mystical-text">{card.arcaneDescription}</p>
        </div>
      </div>
    </section>
  );

  /**
   * Renderiza información de la científica
   */
  const renderGoddessInfo = (card: TarotCard): React.JSX.Element => (
    <section className="detail-section goddess-section">
      <div className="section-header">
        <h2 className="mystical-title medium">La Diosa Contemporánea</h2>
        <h3 className="goddess-name-display">{card.goddessName}</h3>
      </div>
      
      <div className="section-content">
        <div className="goddess-image-container">
          <img 
            src={card.goddessImage.imageSrc}
            alt={card.goddessName}
            className="detail-goddess-image"
          />
          <div className="image-attribution">
            <small>Imagen por: {card.goddessImage.author}</small>
            {card.goddessImage.licenseUrl && (
              <small className="license-info">
                <a href={card.goddessImage.licenseUrl} target="_blank" rel="noopener noreferrer">
                  Ver licencia
                </a>
              </small>
            )}
          </div>
        </div>
        
        <div className="goddess-biography">
          <h3>Su Legado Científico</h3>
          <p className="mystical-text">{card.goddessDescription}</p>
        </div>
      </div>
    </section>
  );

  /**
   * Renderiza las acciones disponibles
   */
  const renderActions = (card: TarotCard): React.JSX.Element => (
    <section className="detail-actions">
      <div className="actions-container mystical-container">
        <h3 className="mystical-title small">¿Qué deseas hacer ahora?</h3>
        
        <div className="action-buttons">
          <button 
            className="mystical-button"
            onClick={handleStartReading}
            type="button"
          >
            🔮 Incluir en Lectura
          </button>
          
          <Link to="/reading" className="mystical-button">
            🃏 Nueva Lectura Completa
          </Link>
          
          <Link to="/" className="mystical-button">
            🏠 Ver Todas las Cartas
          </Link>
        </div>
        
        <div className="mystical-quote">
          <p className="mystical-text quote">
            "Cada carta es un portal hacia el conocimiento infinito"
          </p>
        </div>
      </div>
    </section>
  );

  // Estados de carga y error
  if (loading) {
    return (
      <div className="card-detail-page">
        {renderNavigation()}
        {renderLoading()}
      </div>
    );
  }

  if (error || !card) {
    return (
      <div className="card-detail-page">
        {renderNavigation()}
        {renderError()}
      </div>
    );
  }

  return (
    <div className="card-detail-page">
      {renderNavigation()}
      
      {/* Hero con la carta */}
      <header className="detail-hero">
        <div className="hero-card-container">
          <Card
            card={card}
            isFlipped={true}
            size="large"
            showDetails={false}
          />
        </div>
        
        <div className="hero-info">
          <h1 className="mystical-title large">{card.arcaneName}</h1>
          <p className="hero-subtitle mystical-text">
            Representada por {card.goddessName}
          </p>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="detail-main">
        {renderArcaneInfo(card)}
        {renderGoddessInfo(card)}
        {renderActions(card)}
      </main>
    </div>
  );
};