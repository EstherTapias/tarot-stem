import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import type { TarotCard } from '../types/tarot';
import { Card } from '../components/Card/Card';
import { getCardById } from '../services/api';

/**
 * 🔮 Página de Detalle Rediseñada
 * 
 * CARACTERÍSTICAS NUEVAS:
 * ✅ Cartas más pequeñas y compactas
 * ✅ Layout más estructurado y elegante
 * ✅ Mejor distribución del contenido
 * ✅ Navegación mejorada
 */
export const CardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [card, setCard] = useState<TarotCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showScientific, setShowScientific] = useState(false);

  useEffect(() => {
    const loadCard = async () => {
      if (!id) {
        setError('ID de carta no válido.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const cardData = await getCardById(id);
        setCard(cardData);
      } catch (err) {
        setError('Error al cargar la carta.');
      } finally {
        setLoading(false);
      }
    };
    loadCard();
  }, [id]);

  const handleGoBack = () => navigate(-1);
  const handleStartReading = () => {
    if (card) navigate('/reading', { state: { preselectedCard: card } });
  };

  if (loading) {
    return (
      <div className="card-detail-page">
        <div className="mystical-container">
          <div className="loading-content">
            <div style={{ fontSize: '3rem', marginBottom: '1rem', animation: 'float 2s ease-in-out infinite' }}>🔮</div>
            <p className="mystical-text">Canalizando la energía de la carta...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !card) {
    return (
      <div className="card-detail-page">
        <div className="mystical-container">
          <h2 className="mystical-title medium">💀 Carta No Encontrada</h2>
          <p className="mystical-text">{error}</p>
          <div className="action-buttons">
            <button className="mystical-button" onClick={handleGoBack}>
              ← Regresar
            </button>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-detail-page fade-in">
      {/* 🧭 Navegación Superior */}
      <nav className="detail-navigation">
        <button className="mystical-button" onClick={handleGoBack}>
          ← Regresar
        </button>
        <div className="nav-center">
          <span className="mystical-text">Carta {card.id} de 22</span>
        </div>
        <div className="nav-actions">
          
          <Link className="mystical-button" to="/reading">🔮 Nueva Lectura</Link>
        </div>
      </nav>

      {/* 🎯 Cabecera Principal */}
      <header className="detail-header mystical-container">
        <div className="header-content">
          <div className="card-showcase">
            {/* Cartas más pequeñas lado a lado */}
            <div className="card-display">
              <div className="card-wrapper">
                <Card 
                  card={card} 
                  isFlipped={false} 
                  size="small"
                  className="arcane-card"
                />
                <p className="card-label">Arcano</p>
              </div>
              
              <div className="card-toggle">
                <button 
                  className="toggle-button"
                  onClick={() => setShowScientific(!showScientific)}
                  title={showScientific ? 'Ver Arcano' : 'Ver Científica'}
                >
                  {showScientific ? '🔮' : '🔬'}
                </button>
              </div>

              <div className="card-wrapper">
                <Card 
                  card={card} 
                  isFlipped={true} 
                  size="small"
                  className="scientific-card"
                />
                <p className="card-label">Científica</p>
              </div>
            </div>
          </div>

          <div className="title-section">
            <h1 className="mystical-title large">{card.arcaneName}</h1>
            <h2 className="scientist-name">Representada por {card.goddessName}</h2>
            <div className="card-metadata">
              <span className="metadata-item">🔮 Arcano Mayor</span>
              <span className="metadata-item">🔬 STEM Pioneer</span>
              <span className="metadata-item">✨ #{card.id}</span>
            </div>
          </div>
        </div>
      </header>

      {/* 📖 Contenido Principal */}
      <main className="detail-main">
        <div className="content-grid">
          {/* 🔮 Sección del Arcano */}
          <section className="content-section mystical-container">
            <div className="section-header">
              <h3 className="mystical-title medium">🔮 El Arcano</h3>
              <div className="section-icon">
                <img 
                  src={card.arcaneImage.imageSrc} 
                  alt={card.arcaneName}
                  className="section-preview-image"
                />
              </div>
            </div>
            <div className="section-content">
              <p className="mystical-text description">
                {card.arcaneDescription}
              </p>
              
              {/* Elementos simbólicos */}
              <div className="symbolic-elements">
                <h4 className="sub-title">🎭 Elementos Simbólicos</h4>
                <div className="symbol-grid">
                  <div className="symbol-item">
                    <span className="symbol">🌟</span>
                    <span>Inspiración</span>
                  </div>
                  <div className="symbol-item">
                    <span className="symbol">⚡</span>
                    <span>Poder</span>
                  </div>
                  <div className="symbol-item">
                    <span className="symbol">🔮</span>
                    <span>Sabiduría</span>
                  </div>
                  <div className="symbol-item">
                    <span className="symbol">✨</span>
                    <span>Transformación</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 🔬 Sección de la Científica */}
          <section className="content-section mystical-container">
            <div className="section-header">
              <h3 className="mystical-title medium">🔬 La Diosa Contemporánea</h3>
              <div className="section-icon">
                <img 
                  src={card.goddessImage.imageSrc} 
                  alt={card.goddessName}
                  className="section-preview-image"
                />
              </div>
            </div>
            <div className="section-content">
              <p className="mystical-text description">
                {card.goddessDescription}
              </p>
              
              {/* Logros científicos */}
              <div className="achievements">
                <h4 className="sub-title">🏆 Logros Destacados</h4>
                <div className="achievement-grid">
                  <div className="achievement-item">
                    <span className="achievement-icon">🧬</span>
                    <span>Investigación Pionera</span>
                  </div>
                  <div className="achievement-item">
                    <span className="achievement-icon">🏅</span>
                    <span>Reconocimientos</span>
                  </div>
                  <div className="achievement-item">
                    <span className="achievement-icon">📚</span>
                    <span>Publicaciones</span>
                  </div>
                  <div className="achievement-item">
                    <span className="achievement-icon">🌍</span>
                    <span>Impacto Global</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* 🎯 Conexión Arcano-Científica */}
        <section className="connection-section mystical-carpet">
          <h3 className="mystical-title medium">🌟 La Conexión Sagrada</h3>
          <div className="connection-content">
            <div className="connection-visual">
              <div className="connection-element">🔮</div>
              <div className="connection-bridge">⚡✨⚡</div>
              <div className="connection-element">🔬</div>
            </div>
            <p className="mystical-text connection-text">
              <strong>{card.arcaneName}</strong> y <strong>{card.goddessName}</strong> comparten 
              la esencia de la exploración del conocimiento y la búsqueda de la verdad. 
              Ambas representan el poder de la mente curiosa y la determinación para 
              superar los límites establecidos.
            </p>
          </div>
        </section>

        
      </main>
    </div>
  );
};