import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import type { TarotCard, SelectedCard, Position, ReadingState } from '../types/tarot';
import { Reading } from '../components/Reading/Reading';
import { useTarotCards } from '../hooks/useTarotCards';

/**
 * 🔮 CardReading con Reverso tarot-back.jpg
 * 
 * CARACTERÍSTICAS NUEVAS:
 * ✅ Reverso usando public/tarot-back.jpg
 * ✅ Mazo de cartas con 10 cartas (dos filas de 5)
 * ✅ Selección de 3 cartas para Pasado/Presente/Futuro
 * ✅ Modal con interpretación completa
 * ✅ Botón claro "Reiniciar tirada / Nueva baraja"
 * ✅ Estilos unificados con CardDetail
 * ✅ Errores de TypeScript corregidos
 */
export const CardReading: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cards, isLoading, error, shuffleForReading } = useTarotCards();

  // Estados principales
  const [readingState, setReadingState] = useState<ReadingState>({
    selectedCards: [],
    availableCards: [],
    currentPosition: 'past',
    isComplete: false
  });

  // Corección del tipo: ahora solo incluye las fases válidas
  const [gamePhase, setGamePhase] = useState<'intro' | 'dealing' | 'selecting' | 'complete'>('intro');
  const [dealtCards, setDealtCards] = useState<TarotCard[]>([]);
  const [animatingCards, setAnimatingCards] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  // Inicialización
  useEffect(() => {
    if (cards.length > 0) {
      shuffleForReading();
      setReadingState(prev => ({
        ...prev,
        availableCards: [...cards]
      }));
    }
  }, [cards]);

  // Manejar preselección
  useEffect(() => {
    const preselect = location.state?.preselectedCard as TarotCard;
    if (preselect && gamePhase === 'intro') {
      handleCardSelection(preselect);
      setGamePhase('selecting');
    }
  }, [location.state, gamePhase]);

  /**
   * 🎴 Inicia el reparto de cartas desde el mazo
   */
  const startCardDealing = async (): Promise<void> => {
    if (cards.length < 10) return;
    
    setGamePhase('dealing');
    setAnimatingCards(true);
    
    // Selecciona 10 cartas aleatorias
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    const selected10 = shuffled.slice(0, 10);
    
    // Simula el reparto con delay
    for (let i = 0; i < selected10.length; i++) {
      setTimeout(() => {
        setDealtCards(prev => [...prev, selected10[i]]);
      }, i * 200);
    }
    
    // Finaliza animación
    setTimeout(() => {
      setAnimatingCards(false);
      setGamePhase('selecting');
    }, 10 * 200 + 500);
  };

  /**
   * 🎯 Obtiene la próxima posición disponible
   */
  const getNextPosition = (): Position | null => {
    const positions: Position[] = ['past', 'present', 'future'];
    const selectedPositions = readingState.selectedCards.map(sc => sc.position);
    return positions.find(pos => !selectedPositions.includes(pos)) ?? null;
  };

  /**
   * 🃏 Maneja la selección de una carta
   */
  const handleCardSelection = (card: TarotCard): void => {
    const nextPos = getNextPosition();
    if (!nextPos) return;

    const newSelected: SelectedCard = { position: nextPos, card };

    setReadingState(prev => {
      const newSelectedCards = [...prev.selectedCards, newSelected];
      const isComplete = newSelectedCards.length === 3;
      
      return {
        selectedCards: newSelectedCards,
        availableCards: prev.availableCards.filter(c => c.id !== card.id),
        currentPosition: isComplete ? null : getNextPosition(),
        isComplete
      };
    });

    // Remueve la carta del spread
    setDealtCards(prev => prev.filter(c => c.id !== card.id));

    // Si completamos la lectura
    if (readingState.selectedCards.length === 2) { // Will be 3 after this selection
      setTimeout(() => {
        setGamePhase('complete');
        setShowModal(true);
      }, 1000);
    }
  };

  /**
   * 🔄 Reinicia completamente la lectura
   */
  const handleResetReading = (): void => {
    shuffleForReading();
    setReadingState({
      selectedCards: [],
      availableCards: [...cards],
      currentPosition: 'past',
      isComplete: false,
    });
    setGamePhase('intro');
    setDealtCards([]);
    setAnimatingCards(false);
    setShowModal(false);
  };

  /**
   * 🎲 Nueva baraja
   */
  const handleShuffleCards = (): void => {
    shuffleForReading();
    setDealtCards([]);
    setGamePhase('intro');
  };

  /**
   * 📍 Etiquetas de posición
   */
  const getPositionLabel = (position: Position): string => ({
    past: 'Pasado',
    present: 'Presente',
    future: 'Futuro',
  }[position]);

  /**
   * 🎭 Renderiza las instrucciones iniciales
   */
  const renderIntroduction = () => (
    <div className="reading-intro mystical-carpet" style={{
      textAlign: 'center',
      padding: 'var(--space-xxl)',
      marginBottom: 'var(--space-xl)'
    }}>
      <h2 className="mystical-title medium">Lectura del AETHRA TAROT</h2>
      <div className="intro-content" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <p className="mystical-text" style={{ 
          marginBottom: 'var(--space-xl)', 
          fontSize: '1.1rem',
          lineHeight: '1.7'
        }}>
          Prepárate para una experiencia mística única donde la ciencia encuentra la sabiduría ancestral.
        </p>
        <div className="intro-steps" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 'var(--space-lg)',
          marginBottom: 'var(--space-xl)'
        }}>
          <div className="step mystical-container" style={{ padding: 'var(--space-lg)', textAlign: 'center' }}>
            <div className="step-icon" style={{ fontSize: '2rem', marginBottom: 'var(--space-md)' }}>1️⃣</div>
            <p className="mystical-text">Las cartas saldrán del mazo hacia el centro</p>
          </div>
          <div className="step mystical-container" style={{ padding: 'var(--space-lg)', textAlign: 'center' }}>
            <div className="step-icon" style={{ fontSize: '2rem', marginBottom: 'var(--space-md)' }}>2️⃣</div>
            <p className="mystical-text">Selecciona 3 cartas que te llamen la atención</p>
          </div>
          <div className="step mystical-container" style={{ padding: 'var(--space-lg)', textAlign: 'center' }}>
            <div className="step-icon" style={{ fontSize: '2rem', marginBottom: 'var(--space-md)' }}>3️⃣</div>
            <p className="mystical-text">Descubre tu Pasado, Presente y Futuro</p>
          </div>
        </div>
        <button 
          className="mystical-button large-button"
          onClick={startCardDealing}
          disabled={isLoading || cards.length === 0}
        >
           Comenzar Lectura Mística
        </button>
      </div>
    </div>
  );

  /**
   * 🃏 Renderiza el mazo de cartas en esquina
   */
  const renderDeck = () => {
    if (gamePhase === 'intro' || gamePhase === 'complete') return null;
    
    return (
      <div className="card-deck" style={{
        position: 'fixed',
        top: '100px',
        right: '20px',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--space-sm)'
      }}>
        <div className="deck-info mystical-container" style={{
          padding: 'var(--space-sm)',
          textAlign: 'center',
          minWidth: '80px'
        }}>
          <div className="deck-counter mystical-text" style={{ 
            fontFamily: 'var(--font-heading)', 
            fontWeight: '600',
            color: 'var(--gold-mystical)'
          }}>
            {Math.max(0, cards.length - dealtCards.length)}
          </div>
          <div className="mystical-text" style={{ fontSize: '0.8rem' }}>Cartas</div>
        </div>
        <div style={{ position: 'relative' }}>
          {[...Array(3)].map((_, index) => (
            <div 
              key={index} 
              className={`deck-card ${animatingCards ? 'dealing' : ''}`}
              style={{ 
                position: index > 0 ? 'absolute' : 'relative',
                top: index > 0 ? `${-index * 2}px` : '0',
                left: index > 0 ? `${-index * 2}px` : '0',
                zIndex: 3 - index,
                width: '60px',
                height: '90px',
                background: `url('/tarot-back.jpg') center/cover`,
                borderRadius: '8px',
                border: '2px solid var(--gold-mystical)',
                boxShadow: 'var(--shadow-enchanted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--gold-mystical)',
                fontSize: '1.2rem',
                fontWeight: 'bold'
              }}
            >
              
            </div>
          ))}
        </div>
      </div>
    );
  };

  /**
   * 🎯 Renderiza el spread de cartas (5 arriba, 5 abajo)
   */
  const renderCardSpread = () => {
    if (gamePhase !== 'selecting' || dealtCards.length === 0) return null;

    const topRow = dealtCards.slice(0, 5);
    const bottomRow = dealtCards.slice(5, 10);

    return (
      <div className="card-spread-area" style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
        {readingState.currentPosition && (
          <h3 className="mystical-title small" style={{ marginBottom: 'var(--space-xl)' }}>
            Selecciona la carta para: <span style={{ color: 'var(--fairy-light)' }}>
              {getPositionLabel(readingState.currentPosition)}
            </span>
          </h3>
        )}
        
        <div className="spread-container" style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-lg)'
        }}>
          <div className="card-row top-row" style={{
            display: 'flex',
            gap: 'var(--space-md)',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            {topRow.map((card, index) => (
              <div 
                key={card.id}
                className="spread-card"
                style={{ 
                  width: '100px',
                  height: '150px',
                  background: `url('/tarot-back.jpg') center/cover`,
                  borderRadius: '12px',
                  border: '2px solid var(--gold-mystical)',
                  boxShadow: 'var(--shadow-enchanted)',
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                  position: 'relative',
                  animation: `slideFromDeck 0.8s ease-out ${index * 0.2}s both`
                }}
                onClick={() => handleCardSelection(card)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)';
                  e.currentTarget.style.boxShadow = 'var(--glow-mystical)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-enchanted)';
                }}
              >

              </div>
            ))}
          </div>
          
          <div className="card-row bottom-row" style={{
            display: 'flex',
            gap: 'var(--space-md)',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            {bottomRow.map((card, index) => (
              <div 
                key={card.id}
                className="spread-card"
                style={{ 
                  width: '100px',
                  height: '150px',
                  background: `url('/tarot-back.jpg') center/cover`,
                  borderRadius: '12px',
                  border: '2px solid var(--gold-mystical)',
                  boxShadow: 'var(--shadow-enchanted)',
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                  position: 'relative',
                  animation: `slideFromDeck 0.8s ease-out ${(index + 5) * 0.2}s both`
                }}
                onClick={() => handleCardSelection(card)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)';
                  e.currentTarget.style.boxShadow = 'var(--glow-mystical)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-enchanted)';
                }}
              >
                <div className="card-pattern" style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: '1.5rem',
                  color: 'var(--gold-mystical)',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
                }}>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  /**
   * 🎭 Renderiza los espacios de Pasado, Presente, Futuro
   */
  const renderPositionSlots = () => {
    if (gamePhase === 'intro') return null;

    return (
      <div className="position-slots" style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 'var(--space-xl)',
        marginBottom: 'var(--space-xl)',
        flexWrap: 'wrap'
      }}>
        {['past', 'present', 'future'].map((position) => {
          const selectedCard = readingState.selectedCards.find(sc => sc.position === position);
          
          return (
            <div key={position} className="position-slot" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--space-md)',
              minWidth: '180px'
            }}>
              <div className="position-label mystical-text" style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.2rem',
                fontWeight: '600',
                color: 'var(--gold-mystical)'
              }}>
                {getPositionLabel(position as Position)}
              </div>
              <div className={`card-slot ${selectedCard ? 'filled' : 'empty'}`} style={{
                width: '120px',
                height: '180px',
                border: selectedCard ? '2px solid var(--gold-mystical)' : '2px dashed var(--gold-mystical)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: selectedCard ? 'transparent' : 'var(--bg-glass)',
                boxShadow: selectedCard ? 'var(--shadow-enchanted)' : 'none',
                cursor: selectedCard ? 'pointer' : 'default',
                transition: 'var(--transition)',
                position: 'relative'
              }}>
                {selectedCard ? (
                  <div 
                    className="selected-card"
                    onClick={() => navigate(`/card/${selectedCard.card.id}`)}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      position: 'relative'
                    }}
                  >
                    <img 
                      src={selectedCard.card.arcaneImage.imageSrc} 
                      alt={selectedCard.card.arcaneName}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    <div className="card-overlay" style={{
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      right: '0',
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                      padding: 'var(--space-sm)',
                      color: 'white',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>
                        {selectedCard.card.arcaneName}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="empty-slot" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 'var(--space-sm)',
                    color: 'var(--gold-mystical)',
                    opacity: position === readingState.currentPosition ? 1 : 0.5
                  }}>
                    <div className="slot-placeholder" style={{ fontSize: '2rem' }}>
                      {position === readingState.currentPosition ? '✨' : '◯'}
                    </div>
                    <div className="mystical-text" style={{ fontSize: '0.8rem' }}>
                      {position === readingState.currentPosition ? 'Selecciona' : 'Esperando'}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  /**
   * 🎉 Modal de lectura completa - ESTILO UNIFICADO CON CardDetail
   */
  const renderCompletionModal = () => {
    if (!showModal || !readingState.isComplete) return null;

    return (
      <div className="reading-modal-overlay" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: 'var(--space-lg)'
      }} onClick={() => setShowModal(false)}>
        <div className="reading-modal mystical-container" style={{
          maxWidth: '800px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative'
        }} onClick={(e) => e.stopPropagation()}>
          <div className="modal-header" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 'var(--space-xl)',
            borderBottom: '1px solid var(--gold-mystical)',
            paddingBottom: 'var(--space-lg)'
          }}>
            <h3 className="mystical-title medium">Tu Lectura Está Completa</h3>
            <button 
              className="close-modal"
              onClick={() => setShowModal(false)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '2rem',
                color: 'var(--gold-mystical)',
                cursor: 'pointer',
                padding: 'var(--space-sm)',
                transition: 'var(--transition)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--fairy-light)';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--gold-mystical)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              ×
            </button>
          </div>
          
          <div className="modal-content">
            <div className="reading-summary" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'var(--space-lg)',
              marginBottom: 'var(--space-xl)'
            }}>
              {readingState.selectedCards.map((selectedCard) => (
                <div key={selectedCard.position} className="summary-card mystical-container" style={{
                  padding: 'var(--space-lg)',
                  textAlign: 'center',
                  background: 'var(--bg-glass)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '16px',
                  border: 'var(--border-golden)',
                  boxShadow: 'var(--shadow-enchanted)'
                }}>
                  <div className="summary-position" style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.1rem',
                    color: 'var(--gold-mystical)',
                    marginBottom: 'var(--space-md)',
                    fontWeight: '600'
                  }}>
                    {getPositionLabel(selectedCard.position)}
                  </div>
                  <div className="summary-card-info" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 'var(--space-md)'
                  }}>
                    <img 
                      src={selectedCard.card.arcaneImage.imageSrc} 
                      alt={selectedCard.card.arcaneName}
                      style={{
                        width: '80px',
                        height: '120px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        border: '2px solid var(--gold-mystical)',
                        boxShadow: 'var(--shadow-enchanted)'
                      }}
                    />
                    <div>
                      <div className="summary-name" style={{
                        fontWeight: 'bold',
                        marginBottom: 'var(--space-xs)',
                        color: 'var(--pearl-white)',
                        fontFamily: 'var(--font-heading)'
                      }}>
                        {selectedCard.card.arcaneName}
                      </div>
                      <div className="summary-scientist mystical-text" style={{
                        color: 'var(--gold-mystical)',
                        fontSize: '0.9rem'
                      }}>
                        {selectedCard.card.goddessName}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Interpretación rápida - ESTILO UNIFICADO */}
            <div className="quick-interpretation mystical-carpet" style={{
              padding: 'var(--space-xl)',
              textAlign: 'center',
              marginBottom: 'var(--space-xl)',
              background: 'var(--bg-mystical)',
              borderRadius: '20px',
              border: 'var(--border-golden)',
              boxShadow: 'var(--shadow-hover)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <h4 className="mystical-title small" style={{
                color: 'var(--gold-mystical)',
                marginBottom: 'var(--space-lg)'
              }}> Mensaje del Cosmos</h4>
              <p className="mystical-text" style={{
                fontSize: '1.1rem',
                lineHeight: '1.7',
                fontStyle: 'italic',
                color: 'var(--pearl-white)'
              }}>
                Tu lectura revela una conexión profunda entre la sabiduría ancestral y la ciencia moderna. 
                Las cartas han hablado y muestran un camino de conocimiento y transformación.
              </p>
            </div>
          </div>
          
          <div className="modal-actions" style={{
            display: 'flex',
            gap: 'var(--space-md)',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button 
              className="mystical-button"
              onClick={() => {
                setShowModal(false);
                // Aquí podrías mostrar la interpretación completa
              }}
            >
              🔮 Ver Interpretación Completa
            </button>
            <button 
              className="mystical-button"
              onClick={() => {
                setShowModal(false);
                handleResetReading();
              }}
            >
              🔄 Nueva Lectura
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Definir animación CSS en el head del documento
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideFromDeck {
        from {
          transform: translateX(300px) translateY(-200px) rotate(180deg);
          opacity: 0;
        }
        to {
          transform: translateX(0) translateY(0) rotate(0deg);
          opacity: 1;
        }
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-10px) rotate(2deg); }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="card-reading-page">
        <div className="mystical-container">
          <div className="loading-content" style={{ textAlign: 'center', padding: 'var(--space-xxl)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem', animation: 'float 2s ease-in-out infinite' }}>🔮</div>
            <p className="mystical-text">Preparando las cartas del destino...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="card-reading-page">
        <div className="mystical-container">
          <h3 className="mystical-title medium">💀 Error en la consulta</h3>
          <p className="mystical-text">{error}</p>
          <Link to="/" className="mystical-button">🏠 Volver al Inicio</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="card-reading-page fade-in" style={{ minHeight: '100vh', padding: 'var(--space-lg)' }}>
      {/* 🎮 Controles superiores */}
      <div className="reading-controls" style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 'var(--space-md)',
        marginBottom: 'var(--space-xl)',
        flexWrap: 'wrap'
      }}>
        <button 
          className="mystical-button"
          onClick={handleResetReading}
        >
          🔄 Reiniciar Tirada
        </button>        
      </div>

      {/* 🎭 Contenido principal según la fase */}
      <main className="reading-main">
        {gamePhase === 'intro' && renderIntroduction()}
        
        {(gamePhase === 'dealing' || gamePhase === 'selecting' || gamePhase === 'complete') && (
          <>
            {/* Estado del progreso - CON COLORES ARMONIZADOS */}
            <div className="progress-indicator" style={{
              marginBottom: 'var(--space-xl)'
            }}>
              <div className="progress-steps" style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 'var(--space-lg)',
                marginBottom: 'var(--space-md)'
              }}>
                <div className={`step ${gamePhase !== 'intro' ? 'completed' : ''}`} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-sm)',
                  opacity: gamePhase !== 'intro' ? 1 : 0.5
                }}>
                  <span className="step-number" style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: gamePhase !== 'intro' ? 'var(--gold-mystical)' : 'transparent',
                    border: '2px solid var(--gold-mystical)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    color: gamePhase !== 'intro' ? 'var(--forest-deep)' : 'var(--gold-mystical)',
                    fontFamily: 'var(--font-heading)'
                  }}>1</span>
                  <span className="step-label mystical-text">Reparto</span>
                </div>
                <div className={`step ${gamePhase === 'selecting' || gamePhase === 'complete' ? 'completed' : ''}`} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-sm)',
                  opacity: (gamePhase === 'selecting' || gamePhase === 'complete') ? 1 : 0.5
                }}>
                  <span className="step-number" style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: (gamePhase === 'selecting' || gamePhase === 'complete') ? 'var(--gold-mystical)' : 'transparent',
                    border: '2px solid var(--gold-mystical)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    color: (gamePhase === 'selecting' || gamePhase === 'complete') ? 'var(--forest-deep)' : 'var(--gold-mystical)',
                    fontFamily: 'var(--font-heading)'
                  }}>2</span>
                  <span className="step-label mystical-text">Selección</span>
                </div>
                <div className={`step ${gamePhase === 'complete' ? 'completed' : ''}`} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-sm)',
                  opacity: gamePhase === 'complete' ? 1 : 0.5
                }}>
                  <span className="step-number" style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: gamePhase === 'complete' ? 'var(--gold-mystical)' : 'transparent',
                    border: '2px solid var(--gold-mystical)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    color: gamePhase === 'complete' ? 'var(--forest-deep)' : 'var(--gold-mystical)',
                    fontFamily: 'var(--font-heading)'
                  }}>3</span>
                  <span className="step-label mystical-text">Lectura</span>
                </div>
              </div>
              <div className="progress-bar" style={{
                width: '300px',
                height: '4px',
                background: 'var(--bg-glass)',
                borderRadius: '2px',
                margin: '0 auto',
                overflow: 'hidden',
                border: '1px solid var(--gold-mystical)'
              }}>
                <div 
                  className="progress-fill"
                  style={{ 
                    height: '100%',
                    background: 'linear-gradient(90deg, var(--gold-mystical), var(--gold-copper))',
                    borderRadius: '2px',
                    transition: 'width 0.5s ease',
                    width: gamePhase === 'dealing' ? '33%' : 
                           gamePhase === 'selecting' ? '66%' : 
                           gamePhase === 'complete' ? '100%' : '0%',
                    boxShadow: 'var(--glow-mystical)'
                  }}
                ></div>
              </div>
            </div>

            {/* Espacios de posición */}
            {renderPositionSlots()}

            {/* Spread de cartas */}
            {renderCardSpread()}

            {/* Estado de dealing */}
            {gamePhase === 'dealing' && (
              <div className="dealing-status mystical-container" style={{
                textAlign: 'center',
                padding: 'var(--space-xl)',
                maxWidth: '400px',
                margin: '0 auto'
              }}>
                <h3 className="mystical-title small">🎴 Repartiendo cartas...</h3>
                <div className="dealing-progress" style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'var(--space-md)'
                }}>
                  <div className="dealing-counter" style={{
                    fontSize: '2rem',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 'bold',
                    color: 'var(--gold-mystical)'
                  }}>
                    {dealtCards.length}/10
                  </div>
                  <div className="mystical-text">Cartas en el tapete</div>
                </div>
              </div>
            )}

            {/* Lectura completa */}
            {readingState.isComplete && gamePhase === 'complete' && (
              <div className="completed-reading mystical-carpet">
                <Reading
                  selectedCards={readingState.selectedCards}
                  isComplete={true}
                  onCardClick={(card) => navigate(`/card/${card.id}`)}
                  showInterpretation={true}
                />
              </div>
            )}
          </>
        )}
      </main>

      {/* 🃏 Mazo de cartas */}
      {renderDeck()}

      {/* 🎉 Modal de finalización */}
      {renderCompletionModal()}

    </div>
  );
};