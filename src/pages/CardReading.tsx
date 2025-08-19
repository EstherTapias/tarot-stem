import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import type { TarotCard, SelectedCard, Position, ReadingState } from '../types/tarot';
import { Reading } from '../components/Reading/Reading';
import { useTarotCards } from '../hooks/useTarotCards';

/**
 * 🔮 CardReading Completamente Rediseñado
 * 
 * CARACTERÍSTICAS NUEVAS:
 * ✅ Mazo de cartas en esquina con animación
 * ✅ 10 cartas salen del mazo hacia el centro (5 arriba, 5 abajo)
 * ✅ Selección de 3 cartas con espacios Pasado/Presente/Futuro
 * ✅ Animaciones fluidas y experiencia inmersiva
 * ✅ Modal o redirección para lectura detallada
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
        currentPosition: getNextPosition(),
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
    <div className="reading-intro mystical-carpet">
      <h2 className="mystical-title medium">🔮 Lectura del Tarot STEM</h2>
      <div className="intro-content">
        <p className="mystical-text">
          Prepárate para una experiencia mística única donde la ciencia encuentra la sabiduría ancestral.
        </p>
        <div className="intro-steps">
          <div className="step">
            <div className="step-icon">1️⃣</div>
            <p>Las cartas saldrán del mazo hacia el centro</p>
          </div>
          <div className="step">
            <div className="step-icon">2️⃣</div>
            <p>Selecciona 3 cartas que te llamen la atención</p>
          </div>
          <div className="step">
            <div className="step-icon">3️⃣</div>
            <p>Descubre tu Pasado, Presente y Futuro</p>
          </div>
        </div>
        <button 
          className="mystical-button large-button"
          onClick={startCardDealing}
          disabled={isLoading || cards.length === 0}
        >
          ✨ Comenzar Lectura Mística
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
      <div className="card-deck">
        <div className="deck-info">
          <div className="deck-counter">{Math.max(0, cards.length - dealtCards.length)}</div>
        </div>
        {[...Array(3)].map((_, index) => (
          <div 
            key={index} 
            className={`deck-card ${animatingCards ? 'dealing' : ''}`}
            style={{ zIndex: 3 - index }}
          >
            🔮
          </div>
        ))}
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
      <div className="card-spread-area">
        <h3 className="mystical-title small">
          Selecciona la carta para: <span className="highlight">
            {getPositionLabel(readingState.currentPosition!)}
          </span>
        </h3>
        
        <div className="spread-container">
          <div className="card-row top-row">
            {topRow.map((card, index) => (
              <div 
                key={card.id}
                className="spread-card"
                style={{ 
                  animationDelay: `${index * 0.2}s`,
                  animationName: 'slideFromDeck'
                }}
                onClick={() => handleCardSelection(card)}
              >
                <div className="card-back">
                  <div className="card-pattern">🔮</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="card-row bottom-row">
            {bottomRow.map((card, index) => (
              <div 
                key={card.id}
                className="spread-card"
                style={{ 
                  animationDelay: `${(index + 5) * 0.2}s`,
                  animationName: 'slideFromDeck'
                }}
                onClick={() => handleCardSelection(card)}
              >
                <div className="card-back">
                  <div className="card-pattern">🔮</div>
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
      <div className="position-slots">
        {['past', 'present', 'future'].map((position) => {
          const selectedCard = readingState.selectedCards.find(sc => sc.position === position);
          
          return (
            <div key={position} className="position-slot">
              <div className="position-label">
                {getPositionLabel(position as Position)}
              </div>
              <div className={`card-slot ${selectedCard ? 'filled' : 'empty'}`}>
                {selectedCard ? (
                  <div 
                    className="selected-card"
                    onClick={() => navigate(`/card/${selectedCard.card.id}`)}
                  >
                    <img 
                      src={selectedCard.card.arcaneImage.imageSrc} 
                      alt={selectedCard.card.arcaneName}
                      className="slot-card-image"
                    />
                    <div className="card-overlay">
                      <div className="card-name">{selectedCard.card.arcaneName}</div>
                    </div>
                  </div>
                ) : (
                  <div className="empty-slot">
                    <div className="slot-placeholder">
                      {position === readingState.currentPosition ? '✨' : '◯'}
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
   * 🎉 Modal de lectura completa
   */
  const renderCompletionModal = () => {
    if (!showModal || !readingState.isComplete) return null;

    return (
      <div className="reading-modal-overlay" onClick={() => setShowModal(false)}>
        <div className="reading-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3 className="mystical-title medium">🌟 Tu Lectura Está Completa</h3>
            <button 
              className="close-modal"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
          </div>
          
          <div className="modal-content">
            <div className="reading-summary">
              {readingState.selectedCards.map((selectedCard) => (
                <div key={selectedCard.position} className="summary-card">
                  <div className="summary-position">{getPositionLabel(selectedCard.position)}</div>
                  <div className="summary-card-info">
                    <img 
                      src={selectedCard.card.arcaneImage.imageSrc} 
                      alt={selectedCard.card.arcaneName}
                      className="summary-image"
                    />
                    <div>
                      <div className="summary-name">{selectedCard.card.arcaneName}</div>
                      <div className="summary-scientist">{selectedCard.card.goddessName}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="modal-actions">
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
              onClick={handleResetReading}
            >
              🔄 Nueva Lectura
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="card-reading-page">
        <div className="mystical-container">
          <div className="loading-content">
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
    <div className="card-reading-page fade-in">
      {/* 🎮 Controles superiores */}
      <div className="reading-controls">
        <button 
          className="mystical-button"
          onClick={handleShuffleCards}
          disabled={gamePhase === 'dealing' || animatingCards}
        >
          🎲 Nueva Baraja
        </button>
        <button 
          className="mystical-button"
          onClick={handleResetReading}
        >
          🔄 Reiniciar Lectura
        </button>
        <Link className="mystical-button" to="/">
          🏠 Inicio
        </Link>
      </div>

      {/* 🎭 Contenido principal según la fase */}
      <main className="reading-main">
        {gamePhase === 'intro' && renderIntroduction()}
        
        {(gamePhase === 'dealing' || gamePhase === 'selecting' || gamePhase === 'complete') && (
          <>
            {/* Estado del progreso */}
            <div className="progress-indicator">
              <div className="progress-steps">
                <div className={`step ${gamePhase !== 'intro' ? 'completed' : ''}`}>
                  <span className="step-number">1</span>
                  <span className="step-label">Reparto</span>
                </div>
                <div className={`step ${gamePhase === 'selecting' || gamePhase === 'complete' ? 'completed' : ''}`}>
                  <span className="step-number">2</span>
                  <span className="step-label">Selección</span>
                </div>
                <div className={`step ${gamePhase === 'complete' ? 'completed' : ''}`}>
                  <span className="step-number">3</span>
                  <span className="step-label">Lectura</span>
                </div>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ 
                    width: gamePhase === 'dealing' ? '33%' : 
                           gamePhase === 'selecting' ? '66%' : 
                           gamePhase === 'complete' ? '100%' : '0%'
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
              <div className="dealing-status mystical-container">
                <h3 className="mystical-title small">🎴 Repartiendo cartas...</h3>
                <div className="dealing-progress">
                  <div className="dealing-counter">{dealtCards.length}/10</div>
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

      {/* 🌟 Elementos decorativos */}
      <div className="reading-decoration">
        <div className="floating-symbols">
          <span style={{ animationDelay: '0s' }}>✨</span>
          <span style={{ animationDelay: '1s' }}>🌟</span>
          <span style={{ animationDelay: '2s' }}>⭐</span>
          <span style={{ animationDelay: '3s' }}>💫</span>
        </div>
      </div>
    </div>
  );
};