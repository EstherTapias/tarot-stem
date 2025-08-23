import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import type {
  TarotCard,
  Position,
  ReadingState,
  SelectedCard,
} from "../types/tarot";
import { Reading } from "../components/Reading/Reading";
import { useTarotCards } from "../hooks/useTarotCards";
import { useOutletContext } from "react-router-dom";
import type { ReadingOutletContext } from "../components/Layout/Layout";

// ========================================================================
// CONSTANTES Y TIPOS
// ========================================================================

const POSITIONS: Position[] = ["past", "present", "future"];
const POSITION_LABELS = {
  past: "Pasado",
  present: "Presente",
  future: "Futuro",
} as const;

type GamePhase = "intro" | "dealing" | "selecting" | "complete";

// ========================================================================
// COMPONENTE PRINCIPAL
// ========================================================================

export const CardReading: React.FC = () => {
  // Contexto compartido entre rutas
  const { selectedCards, setSelectedCards, isComplete, setIsComplete } =
    useOutletContext<ReadingOutletContext>();
  
  // Hooks de navegación
  const location = useLocation();
  const navigate = useNavigate();
  
  // Hook personalizado para cartas del tarot
  const { cards, isLoading, error, shuffleForReading } = useTarotCards();

  // Estados locales del componente
  const [readingState, setReadingState] = useState<ReadingState>({
    selectedCards: [],
    availableCards: [],
    currentPosition: "past",
    isComplete: false,
  });
  
  const [gamePhase, setGamePhase] = useState<GamePhase>("intro");
  const [dealtCards, setDealtCards] = useState<TarotCard[]>([]);
  const [animatingCards, setAnimatingCards] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  // ========================================================================
  // EFFECTS
  // ========================================================================

  // Inicializar cartas disponibles cuando se cargan
  useEffect(() => {
    if (cards.length > 0) {
      shuffleForReading();
      setReadingState((prev) => ({
        ...prev,
        availableCards: [...cards],
      }));
    }
  }, [cards, shuffleForReading]);

  // Sincronizar estado local con contexto compartido
  useEffect(() => {
    setReadingState((prev) => {
      const nextCurrentPosition = selectedCards.length >= 3 
        ? null 
        : POSITIONS.find(p => !selectedCards.map(sc => sc.position).includes(p)) ?? "past";

      return {
        ...prev,
        selectedCards: selectedCards as any,
        isComplete,
        currentPosition: nextCurrentPosition as any,
      };
    });

    // Actualizar fase del juego según progreso
    if (selectedCards.length === 0) {
      setGamePhase("intro");
    } else if (selectedCards.length < 3) {
      setGamePhase("selecting");
    } else {
      setGamePhase("complete");
    }
  }, [selectedCards, isComplete]);

  // Manejar preselección desde otras rutas
  useEffect(() => {
    const preselect = location.state?.preselectedCard as TarotCard;
    if (preselect && gamePhase === "intro") {
      handleCardSelection(preselect);
      setGamePhase("selecting");
    }
  }, [location.state, gamePhase]);

  // Inyectar estilos CSS para animaciones
  useEffect(() => {
    const style = document.createElement("style");
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
    
    // Función de limpieza que se ejecuta al desmontar
    return () => {
      if (style.parentNode) {
        document.head.removeChild(style);
      }
    };
  }, []);

  // ========================================================================
  // HANDLERS
  // ========================================================================

  // Iniciar el reparto animado de cartas
  const startCardDealing = async (): Promise<void> => {
    if (cards.length < 10) return;

    setGamePhase("dealing");
    setAnimatingCards(true);

    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    const selected10 = shuffled.slice(0, 10);

    // Animar reparto con delays escalonados
    for (let i = 0; i < selected10.length; i++) {
      setTimeout(() => {
        setDealtCards((prev) => [...prev, selected10[i]]);
      }, i * 200);
    }

    // Finalizar animación
    setTimeout(() => {
      setAnimatingCards(false);
      setGamePhase("selecting");
    }, 10 * 200 + 500);
  };

  // Seleccionar una carta y asignarla a la posición correspondiente
  const handleCardSelection = (card: TarotCard): void => {
    setReadingState((prev) => {
      const selectedPositions = prev.selectedCards.map(sc => sc.position);
      const nextPosition = POSITIONS.find(pos => !selectedPositions.includes(pos));
      
      if (!nextPosition) return prev;

      const newSelectedCards = [
        ...prev.selectedCards,
        { position: nextPosition, card }
      ];
      
      const isComplete = newSelectedCards.length === 3;
      const nextCurrentPosition = isComplete 
        ? null 
        : POSITIONS.find(pos => !newSelectedCards.map(sc => sc.position).includes(pos)) ?? null;

      // Actualizar contexto compartido
      setSelectedCards(newSelectedCards as SelectedCard[]);
      setIsComplete(isComplete);

      return {
        selectedCards: newSelectedCards,
        availableCards: prev.availableCards.filter(c => c.id !== card.id),
        currentPosition: nextCurrentPosition,
        isComplete,
      };
    });

    // Remover carta del spread
    setDealtCards(prev => prev.filter(c => c.id !== card.id));

    // Si completó la lectura, mostrar modal
    if (readingState.selectedCards.length === 2) {
      setTimeout(() => {
        setGamePhase("complete");
        setShowModal(true);
      }, 1000);
    }
  };

  // Reiniciar toda la lectura
  const handleResetReading = (): void => {
    shuffleForReading();
    
    setReadingState({
      selectedCards: [],
      availableCards: [...cards],
      currentPosition: "past",
      isComplete: false,
    });

    setSelectedCards([]);
    setIsComplete(false);
    setGamePhase("intro");
    setDealtCards([]);
    setAnimatingCards(false);
    setShowModal(false);
  };

  // ========================================================================
  // COMPONENTES DE RENDERIZADO
  // ========================================================================

  // Pantalla de introducción
  const renderIntroduction = () => (
    <div className="reading-intro mystical-carpet">
      <h2 className="mystical-title medium">Lectura del AETHRA TAROT</h2>
      <div className="intro-content">
        <p className="mystical-text intro-text">
          Prepárate para una experiencia mística única donde la ciencia
          encuentra la sabiduría ancestral.
        </p>
        
        <div className="intro-steps">
          {[
            { icon: "1️⃣", text: "Las cartas saldrán del mazo hacia el centro" },
            { icon: "2️⃣", text: "Selecciona 3 cartas que te llamen la atención" },
            { icon: "3️⃣", text: "Descubre tu Pasado, Presente y Futuro" }
          ].map((step, index) => (
            <div key={index} className="step mystical-container">
              <div className="step-icon">{step.icon}</div>
              <p className="mystical-text">{step.text}</p>
            </div>
          ))}
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

  // Mazo de cartas en la esquina
  const renderDeck = () => {
    if (gamePhase === "intro" || gamePhase === "complete") return null;

    return (
      <div className="card-deck">
        <div className="deck-info mystical-container">
          <div className="deck-counter mystical-text">
            {Math.max(0, cards.length - dealtCards.length)}
          </div>
          <div className="mystical-text deck-label">Cartas</div>
        </div>
        
        <div className="deck-cards-container">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className={`deck-card ${animatingCards ? "dealing" : ""}`}
              style={{
                position: index > 0 ? "absolute" : "relative",
                top: index > 0 ? `${-index * 2}px` : "0",
                left: index > 0 ? `${-index * 2}px` : "0",
                zIndex: 3 - index,
              }}
            />
          ))}
        </div>
      </div>
    );
  };

  // Spread de cartas para seleccionar
  const renderCardSpread = () => {
    if (gamePhase !== "selecting" || dealtCards.length === 0) return null;

    const topRow = dealtCards.slice(0, 5);
    const bottomRow = dealtCards.slice(5, 10);

    return (
      <div className="card-spread-area">
        {readingState.currentPosition && (
          <h3 className="mystical-title small spread-title">
            Selecciona la carta para:{" "}
            <span className="current-position">
              {POSITION_LABELS[readingState.currentPosition]}
            </span>
          </h3>
        )}
        
        <div className="spread-container">
          {[topRow, bottomRow].map((row, rowIndex) => (
            <div key={rowIndex} className="card-row">
              {row.map((card, cardIndex) => {
                const animationDelay = (rowIndex * 5 + cardIndex) * 0.2;
                return (
                  <div
                    key={card.id}
                    className="spread-card"
                    style={{
                      animation: `slideFromDeck 0.8s ease-out ${animationDelay}s both`,
                    }}
                    onClick={() => handleCardSelection(card)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Slots para las posiciones (Pasado, Presente, Futuro)
  const renderPositionSlots = () => {
    if (gamePhase === "intro") return null;

    return (
      <div className="position-slots">
        {POSITIONS.map((position) => {
          const selectedCard = selectedCards.find(sc => sc.position === position);
          const isCurrentPosition = position === readingState.currentPosition;

          return (
            <div key={position} className="position-slot">
              <div className="position-label mystical-text">
                {POSITION_LABELS[position]}
              </div>
              
              <div className={`card-slot ${selectedCard ? "filled" : "empty"}`}>
                {selectedCard ? (
                  <div
                    className="selected-card"
                    onClick={() => navigate(`/card/${selectedCard.card.id}`, {
                      state: { from: "/reading" },
                    })}
                  >
                    <img
                      src={selectedCard.card.arcaneImage.imageSrc}
                      alt={selectedCard.card.arcaneName}
                      className="selected-card-image"
                    />
                    <div className="card-overlay">
                      <div className="card-name">
                        {selectedCard.card.arcaneName}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={`empty-slot ${isCurrentPosition ? "current" : ""}`}>
                    <div className="slot-placeholder">
                      {isCurrentPosition ? "✨" : "◯"}
                    </div>
                    <div className="mystical-text slot-text">
                      {isCurrentPosition ? "Selecciona" : "Esperando"}
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

  // Indicador de progreso
  const renderProgressIndicator = () => {
    const steps = [
      { phase: "dealing", label: "Reparto" },
      { phase: "selecting", label: "Selección" },
      { phase: "complete", label: "Lectura" }
    ];

    return (
      <div className="progress-indicator">
        <div className="progress-steps">
          {steps.map((step, index) => {
            const isCompleted = 
              (step.phase === "dealing" && ["dealing", "selecting", "complete"].includes(gamePhase)) ||
              (step.phase === "selecting" && ["selecting", "complete"].includes(gamePhase)) ||
              (step.phase === "complete" && gamePhase === "complete");

            return (
              <div key={step.phase} className={`progress-step ${isCompleted ? "completed" : ""}`}>
                <span className="step-number">{index + 1}</span>
                <span className="step-label mystical-text">{step.label}</span>
              </div>
            );
          })}
        </div>
        
        <div className="progress-bar">
          <div 
            className="progress-fill"
            data-phase={gamePhase}
          />
        </div>
      </div>
    );
  };

  // Modal de finalización
  const renderCompletionModal = () => {
    if (!showModal || !isComplete) return null;

    return (
      <div className="reading-modal-overlay" onClick={() => setShowModal(false)}>
        <div className="reading-modal mystical-container" onClick={(e) => e.stopPropagation()}>
          {/* Header del modal */}
          <div className="modal-header">
            <h3 className="mystical-title medium">Tu Lectura Está Completa</h3>
            <button
              className="close-modal"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
          </div>

          {/* Resumen de cartas */}
          <div className="modal-content">
            <div className="reading-summary">
              {selectedCards.map((selectedCard) => (
                <div key={selectedCard.position} className="summary-card mystical-container">
                  <div className="summary-position">
                    {POSITION_LABELS[selectedCard.position]}
                  </div>
                  <div className="summary-card-info">
                    <img
                      src={selectedCard.card.arcaneImage.imageSrc}
                      alt={selectedCard.card.arcaneName}
                      className="summary-card-image"
                    />
                    <div>
                      <div className="summary-name">
                        {selectedCard.card.arcaneName}
                      </div>
                      <div className="summary-scientist mystical-text">
                        {selectedCard.card.goddessName}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mensaje del cosmos */}
            <div className="quick-interpretation mystical-carpet">
              <h4 className="mystical-title small interpretation-title">
                Mensaje del Cosmos
              </h4>
              <p className="mystical-text interpretation-text">
                Tu lectura revela una conexión profunda entre la sabiduría
                ancestral y la ciencia moderna. Las cartas han hablado y
                muestran un camino de conocimiento y transformación.
              </p>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="modal-actions">
            <button
              className="mystical-button"
              onClick={() => setShowModal(false)}
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

  // Estado de reparto
  const renderDealingStatus = () => {
    if (gamePhase !== "dealing") return null;

    return (
      <div className="dealing-status mystical-container">
        <h3 className="mystical-title small">🎴 Repartiendo cartas...</h3>
        <div className="dealing-progress">
          <div className="dealing-counter">
            {dealtCards.length}/10
          </div>
          <div className="mystical-text">Cartas en el tapete</div>
        </div>
      </div>
    );
  };

  // ========================================================================
  // RENDER PRINCIPAL
  // ========================================================================

  if (isLoading) {
    return (
      <div className="card-reading-page">
        <div className="mystical-container">
          <div className="loading-content">
            <div className="loading-icon">🔮</div>
            <p className="mystical-text">Preparando las cartas del destino...</p>
          </div>
        </div>
      </div>
    );
  }

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
      {/* Controles principales */}
      <div className="reading-controls">
        <button className="mystical-button" onClick={handleResetReading}>
          🔄 Reiniciar Tirada
        </button>
      </div>

      <main className="reading-main">
        {/* Fase de introducción */}
        {gamePhase === "intro" && renderIntroduction()}

        {/* Fases activas (reparto, selección, completo) */}
        {["dealing", "selecting", "complete"].includes(gamePhase) && (
          <>
            {renderProgressIndicator()}
            {renderPositionSlots()}
            {renderCardSpread()}
            {renderDealingStatus()}
            
            {/* Lectura completa */}
            {isComplete && gamePhase === "complete" && (
              <div className="completed-reading mystical-carpet">
                <Reading
                  selectedCards={selectedCards}
                  isComplete={true}
                  showInterpretation={true}
                />
              </div>
            )}
          </>
        )}
      </main>

      {/* Elementos flotantes */}
      {renderDeck()}
      {renderCompletionModal()}
    </div>
  );
};