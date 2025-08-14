// Página para realizar una lectura de 3 cartas (Pasado, Presente, Futuro)

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import type { TarotCard, Position, SelectedCard, ReadingState } from '../types/tarot';
import { CardGrid } from '../components/CardGrid/CardGrid';
import { Reading } from '../components/Reading/Reading';
import { useTarotCards } from '../hooks/useTarotCards';

/**
 * Componente CardReading - Página para realizar lecturas de tarot
 * Permite seleccionar exactamente 3 cartas para Pasado, Presente y Futuro
 */
export const CardReading: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Hook para obtener las cartas
  const { 
    shuffledCards, 
    loading, 
    error, 
    shuffleForReading 
  } = useTarotCards();

  // Estado de la lectura
  const [readingState, setReadingState] = useState<ReadingState>({
    selectedCards: [],
    availableCards: [],
    currentPosition: 'past',
    isComplete: false
  });

  // Estado de la interfaz
  const [showInstructions, setShowInstructions] = useState<boolean>(true);
  const [readingStarted, setReadingStarted] = useState<boolean>(false);

  /**
   * Inicializa las cartas disponibles cuando se cargan
   */
  useEffect(() => {
    if (shuffledCards.length > 0) {
      setReadingState(prev => ({
        ...prev,
        availableCards: [...shuffledCards]
      }));
    }
  }, [shuffledCards]);

  /**
   * Maneja carta preseleccionada desde navegación
   */
  useEffect(() => {
    const preselectedCard = location.state?.preselectedCard as TarotCard;
    if (preselectedCard && !readingStarted) {
      console.log(`🔮 Carta preseleccionada: ${preselectedCard.arcaneName}`);
      handleCardSelection(preselectedCard);
      setReadingStarted(true);
    }
  }, [location.state, readingStarted]);

  /**
   * Obtiene la siguiente posición a seleccionar
   */
  const getNextPosition = (): Position | null => {
    const positions: Position[] = ['past', 'present', 'future'];
    const selectedPositions = readingState.selectedCards.map(sc => sc.position);
    
    return positions.find(pos => !selectedPositions.includes(pos)) || null;
  };

  /**
   * Maneja la selección de una carta
   */
  const handleCardSelection = (card: TarotCard): void => {
    const nextPosition = getNextPosition();
    
    if (!nextPosition) {
      console.warn('⚠️ No hay más posiciones disponibles para seleccionar');
      return;
    }

    console.log(`🎯 Seleccionando carta ${card.arcaneName} para posición: ${nextPosition}`);

    const newSelectedCard: SelectedCard = {
      position: nextPosition,
      card
    };

    setReadingState(prev => {
      const newSelectedCards = [...prev.selectedCards, newSelectedCard];
      const newAvailableCards = prev.availableCards.filter(c => c.id !== card.id);
      const newCurrentPosition = getNextPosition();
      const isComplete = newSelectedCards.length === 3;

      return {
        selectedCards: newSelectedCards,
        availableCards: newAvailableCards,
        currentPosition: newCurrentPosition,
        isComplete
      };
    });

    setReadingStarted(true);
  };

  /**
   * Reinicia la lectura completa
   */
  const handleResetReading = (): void => {
    console.log('🔄 Reiniciando lectura...');
    
    setReadingState({
      selectedCards: [],
      availableCards: [...shuffledCards],
      currentPosition: 'past',
      isComplete: false
    });
    
    setReadingStarted(false);
    setShowInstructions(true);
    shuffleForReading();
  };

  /**
   * Mezcla las cartas sin reiniciar la selección
   */
  const handleShuffleCards = (): void => {
    console.log('🎲 Mezclando cartas disponibles...');
    shuffleForReading();
  };

  /**
   * Elimina la última carta seleccionada
   */
  const handleUndoLastSelection = (): void => {
    if (readingState.selectedCards.length === 0) return;

    const lastSelected = readingState.selectedCards[readingState.selectedCards.length - 1];
    console.log(`↩️ Deshaciendo selección de: ${lastSelected.card.arcaneName}`);

    setReadingState(prev => ({
      selectedCards: prev.selectedCards.slice(0, -1),
      availableCards: [...prev.availableCards, lastSelected.card],
      currentPosition: lastSelected.position,
      isComplete: false
    }));
  };

  /**
   * Traduce posición a español
   */
  const getPositionLabel = (position: Position): string => {
    const labels = {
      past: 'Pasado',
      present: 'Presente', 
      future: 'Futuro'
    };
    return labels[position];
  };

  /**
   * Renderiza las instrucciones
   */
  const renderInstructions = (): React.JSX.Element => (
    <div className="reading-instructions mystical-container">
      <h2 className="mystical-title medium">🔮 Instrucciones de Lectura</h2>
      
      <div className="instructions-content">
        <div className="instruction-step">
          <span className="step-number">1</span>
          <div className="step-content">
            <h4>Selecciona tu primera carta</h4>
            <p>Esta representará tu <strong>Pasado</strong> - los eventos que te trajeron hasta aquí</p>
          </div>
        </div>
        
        <div className="instruction-step">
          <span className="step-number">2</span>
          <div className="step-content">
            <h4>Elige la segunda carta</h4>
            <p>Esta simbolizará tu <strong>Presente</strong> - tu situación actual</p>
          </div>
        </div>
        
        <div className="instruction-step">
          <span className="step-number">3</span>
          <div className="step-content">
            <h4>Completa con la tercera carta</h4>
            <p>Esta revelará tu <strong>Futuro</strong> - las posibilidades que te esperan</p>
          </div>
        </div>
      </div>
      
      <button 
        className="mystical-button"
        onClick={() => setShowInstructions(false)}
      >
        ✨ Comenzar Lectura
      </button>
    </div>
  );

  /**
   * Renderiza el estado actual de la selección
   */
  const renderSelectionStatus = (): React.JSX.Element => {
    const currentPos = readingState.currentPosition;
    const selectedCount = readingState.selectedCards.length;
    
    if (readingState.isComplete) {
      return (
        <div className="selection-status complete">
          <h3 className="mystical-title small">🌟 Lectura Completa</h3>
          <p className="mystical-text">Las cartas han sido reveladas. Descubre su mensaje.</p>
        </div>
      );
    }

    return (
      <div className="selection-status active">
        <h3 className="mystical-title small">
          Selecciona la carta para: <span className="highlight">{currentPos && getPositionLabel(currentPos)}</span>
        </h3>
        <div className="progress-indicator">
          <span className="progress-text">{selectedCount}/3 cartas seleccionadas</span>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(selectedCount / 3) * 100}%` }}
            />
          </div>
        </div>
      </div>
    );
  };

  /**
   * Renderiza los controles de la lectura
   */
  const renderReadingControls = (): React.JSX.Element => (
    <div className="reading-controls">
      {readingState.selectedCards.length > 0 && (
        <button 
          className="control-button mystical-button"
          onClick={handleUndoLastSelection}
          type="button"
        >
          ↩️ Deshacer Última
        </button>
      )}
      
      {!readingState.isComplete && readingState.availableCards.length > 0 && (
        <button 
          className="control-button mystical-button"
          onClick={handleShuffleCards}
          type="button"
        >
          🎲 Mezclar
        </button>
      )}
      
      <button 
        className="control-button mystical-button"
        onClick={handleResetReading}
        type="button"
      >
        🔄 Nueva Lectura
      </button>
      
      <Link to="/" className="control-button mystical-button">
        🏠 Inicio
      </Link>
    </div>
  );

  /**
   * Renderiza el estado de error
   */
  const renderError = (): React.JSX.Element => (
    <div className="reading-error mystical-container">
      <div className="error-icon">🔮💔</div>
      <h2 className="mystical-title medium">Error en la Conexión Cósmica</h2>
      <p className="mystical-text">{error}</p>
      <Link to="/" className="mystical-button">
        🏠 Regresar al Inicio
      </Link>
    </div>
  );

  // Manejo de estados especiales
  if (loading) {
    return (
      <div className="card-reading-page">
        <div className="mystical-loading">
          <div className="loading-spinner"></div>
          <p className="loading-text">Preparando las cartas para tu lectura...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card-reading-page">
        {renderError()}
      </div>
    );
  }

  return (
    <div className="card-reading-page">
      {/* Header de la página */}
      <header className="reading-header">
        <h1 className="mystical-title large">🔮 Lectura de Tarot STEM</h1>
        <p className="reading-subtitle mystical-text">
          Descubre tu camino a través de la sabiduría científica
        </p>
      </header>

      {/* Mostrar instrucciones si no ha empezado */}
      {showInstructions && !readingStarted && renderInstructions()}

      {/* Contenido principal de la lectura */}
      {!showInstructions && (
        <>
          {/* Estado de selección */}
          {renderSelectionStatus()}

          {/* Controles */}
          {renderReadingControls()}

          {/* Lectura actual (cartas seleccionadas) */}
          {readingState.selectedCards.length > 0 && (
            <Reading 
              selectedCards={readingState.selectedCards}
              isComplete={readingState.isComplete}
              onCardClick={(card) => navigate(`/card/${card.id}`)}
            />
          )}

          {/* Grid de cartas disponibles */}
          {!readingState.isComplete && readingState.availableCards.length > 0 && (
            <section className="available-cards">
              <CardGrid
                cards={readingState.availableCards}
                onCardClick={handleCardSelection}
                title="Cartas Disponibles"
                subtitle={`Selecciona una carta para representar tu ${readingState.currentPosition && getPositionLabel(readingState.currentPosition)}`}
                cardSize="medium"
                maxCards={15} // Limitar para mejor UX
              />
            </section>
          )}
        </>
      )}
    </div>
  );
};