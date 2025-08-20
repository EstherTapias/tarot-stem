import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { TarotCard } from '../types/tarot';
import { getCardById } from '../services/api';

export const CardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [card, setCard] = useState<TarotCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return (
      <div className="card-detail-page fade-in">
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
      <div className="card-detail-page fade-in">
        <div className="mystical-container">
          <h2 className="mystical-title medium">💀 Carta No Encontrada</h2>
          <p className="mystical-text">{error}</p>
          <button className="mystical-button" onClick={handleGoBack}>
            ← Regresar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card-detail-page fade-in">
      {/* 🧭 Navegación Superior - Solo botón Regresar */}
      <nav className="detail-navigation" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        padding: 'var(--space-lg)', 
        marginBottom: 'var(--space-xl)' 
      }}>
        <button className="mystical-button" onClick={handleGoBack}>
          ← Regresar
        </button>
      </nav>

      {/* 🎯 Dos cartas lado a lado en la parte superior */}
      <header className="detail-header mystical-container" style={{ marginBottom: 'var(--space-xxl)' }}>
        <div className="cards-display" style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'var(--space-xl)',
          alignItems: 'flex-start',
          flexWrap: 'wrap'
        }}>
          {/* Carta del Arcano */}
          <div className="card-wrapper" style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            gap: 'var(--space-md)'
          }}>
            <div className="detail-card" style={{
              position: 'relative',
              width: '200px',
              height: '350px',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-enchanted)',
              border: 'var(--border-golden)'
            }}>
              <div className="card-number" style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                zIndex: 10,
                padding: '4px 8px',
                background: 'rgba(0,0,0,0.7)',
                borderRadius: '12px',
                fontFamily: 'var(--font-heading)',
                fontWeight: 'bold',
                color: 'var(--gold-mystical)'
              }}>
                {toRoman(Number(card.id))}
              </div>
              <img 
                src={card.arcaneImage.imageSrc} 
                alt={card.arcaneName}
                className="detail-card-image"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            <p className="card-label mystical-text" style={{ 
              textAlign: 'center', 
              fontFamily: 'var(--font-heading)',
              fontWeight: '600',
              color: 'var(--gold-mystical)'
            }}>
              {card.arcaneName}
            </p>
          </div>
          
          {/* Carta de la Científica */}
          <div className="card-wrapper" style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            gap: 'var(--space-md)'
          }}>
            <div className="detail-card" style={{
              position: 'relative',
              width: '200px',
              height: '350px',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-enchanted)',
              border: 'var(--border-golden)'
            }}>
              <div className="card-number" style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                zIndex: 10,
                padding: '4px 8px',
                background: 'rgba(0,0,0,0.7)',
                borderRadius: '12px',
                fontFamily: 'var(--font-heading)',
                fontWeight: 'bold',
                color: 'var(--gold-mystical)'
              }}>
                {toRoman(Number(card.id))}
              </div>
              <img 
                src={card.goddessImage.imageSrc} 
                alt={card.goddessName}
                className="detail-card-image"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            <p className="card-label mystical-text" style={{ 
              textAlign: 'center', 
              fontFamily: 'var(--font-heading)',
              fontWeight: '600',
              color: 'var(--gold-mystical)'
            }}>
              {card.goddessName}
            </p>
          </div>
        </div>
      </header>

      {/* 📖 Descripción debajo de las cartas */}
      <main className="detail-main">
        <section className="description-section mystical-container">
          <div className="content-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-xl)',
            marginBottom: 'var(--space-xl)'
          }}>
            {/* 🔮 Sección del Arcano */}
            <div className="content-section">
              <div className="section-header" style={{ marginBottom: 'var(--space-lg)' }}>
                <h3 className="mystical-title medium">El Arcano</h3>
              </div>
              <div className="section-content">
                <p className="mystical-text description" style={{ 
                  lineHeight: '1.7',
                  marginBottom: 'var(--space-lg)',
                  textAlign: 'justify'
                }}>
                  {card.arcaneDescription}
                </p>
                
                {/* Elementos simbólicos */}
                <div className="symbolic-elements">
                  <h4 className="sub-title" style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.2rem',
                    color: 'var(--gold-mystical)',
                    marginBottom: 'var(--space-md)'
                  }}>Elementos Simbólicos</h4>
                  <div className="symbol-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                    gap: 'var(--space-md)'
                  }}>
                    <div className="symbol-item" style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 'var(--space-xs)',
                      padding: 'var(--space-md)',
                      background: 'var(--bg-glass)',
                      borderRadius: '8px',
                      border: 'var(--border-golden)'
                    }}>
                      <span className="symbol" style={{ fontSize: '1.5rem' }}>🌟</span>
                      <span className="mystical-text" style={{ fontSize: '0.9rem' }}>Inspiración</span>
                    </div>
                    <div className="symbol-item" style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 'var(--space-xs)',
                      padding: 'var(--space-md)',
                      background: 'var(--bg-glass)',
                      borderRadius: '8px',
                      border: 'var(--border-golden)'
                    }}>
                      <span className="symbol" style={{ fontSize: '1.5rem' }}>⚡</span>
                      <span className="mystical-text" style={{ fontSize: '0.9rem' }}>Poder</span>
                    </div>
                    <div className="symbol-item" style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 'var(--space-xs)',
                      padding: 'var(--space-md)',
                      background: 'var(--bg-glass)',
                      borderRadius: '8px',
                      border: 'var(--border-golden)'
                    }}>
                      <span className="symbol" style={{ fontSize: '1.5rem' }}>🔮</span>
                      <span className="mystical-text" style={{ fontSize: '0.9rem' }}>Sabiduría</span>
                    </div>
                    <div className="symbol-item" style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 'var(--space-xs)',
                      padding: 'var(--space-md)',
                      background: 'var(--bg-glass)',
                      borderRadius: '8px',
                      border: 'var(--border-golden)'
                    }}>
                      <span className="symbol" style={{ fontSize: '1.5rem' }}>✨</span>
                      <span className="mystical-text" style={{ fontSize: '0.9rem' }}>Transformación</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 🔬 Sección de la Científica */}
            <div className="content-section">
              <div className="section-header" style={{ marginBottom: 'var(--space-lg)' }}>
                <h3 className="mystical-title medium">La Diosa Contemporánea</h3>
              </div>
              <div className="section-content">
                <p className="mystical-text description" style={{ 
                  lineHeight: '1.7',
                  marginBottom: 'var(--space-lg)',
                  textAlign: 'justify'
                }}>
                  {card.goddessDescription}
                </p>
                
                {/* Logros científicos */}
                <div className="achievements">
                  <h4 className="sub-title" style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.2rem',
                    color: 'var(--gold-mystical)',
                    marginBottom: 'var(--space-md)'
                  }}>Logros Destacados</h4>
                  <div className="achievement-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                    gap: 'var(--space-md)'
                  }}>
                    <div className="achievement-item" style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 'var(--space-xs)',
                      padding: 'var(--space-md)',
                      background: 'var(--bg-glass)',
                      borderRadius: '8px',
                      border: 'var(--border-golden)'
                    }}>
                      <span className="achievement-icon" style={{ fontSize: '1.5rem' }}>🧬</span>
                      <span className="mystical-text" style={{ fontSize: '0.9rem' }}>Investigación Pionera</span>
                    </div>
                    <div className="achievement-item" style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 'var(--space-xs)',
                      padding: 'var(--space-md)',
                      background: 'var(--bg-glass)',
                      borderRadius: '8px',
                      border: 'var(--border-golden)'
                    }}>
                      <span className="achievement-icon" style={{ fontSize: '1.5rem' }}>🏅</span>
                      <span className="mystical-text" style={{ fontSize: '0.9rem' }}>Reconocimientos</span>
                    </div>
                    <div className="achievement-item" style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 'var(--space-xs)',
                      padding: 'var(--space-md)',
                      background: 'var(--bg-glass)',
                      borderRadius: '8px',
                      border: 'var(--border-golden)'
                    }}>
                      <span className="achievement-icon" style={{ fontSize: '1.5rem' }}>📚</span>
                      <span className="mystical-text" style={{ fontSize: '0.9rem' }}>Publicaciones</span>
                    </div>
                    <div className="achievement-item" style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 'var(--space-xs)',
                      padding: 'var(--space-md)',
                      background: 'var(--bg-glass)',
                      borderRadius: '8px',
                      border: 'var(--border-golden)'
                    }}>
                      <span className="achievement-icon" style={{ fontSize: '1.5rem' }}>🌍</span>
                      <span className="mystical-text" style={{ fontSize: '0.9rem' }}>Impacto Global</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 🎯 Conexión Arcano-Científica */}
        <section className="connection-section mystical-carpet">
          <h3 className="mystical-title medium">La Conexión Sagrada</h3>
          <div className="connection-content">
            <div className="connection-visual" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-lg)',
              marginBottom: 'var(--space-lg)',
              flexWrap: 'wrap'
            }}>

            </div>
            <p className="mystical-text connection-text" style={{
              lineHeight: '1.7',
              textAlign: 'justify',
              fontSize: '1.1rem'
            }}>
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