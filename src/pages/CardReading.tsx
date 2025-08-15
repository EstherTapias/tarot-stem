import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import type { TarotCard, SelectedCard, Position, ReadingState } from '../types/tarot';
import { CardGrid } from '../components/CardGrid/CardGrid';
import { Reading } from '../components/Reading/Reading';
import { useTarotCards } from '../hooks/useTarotCards';

/**
 * 🔮 Página para realizar lectura seleccionando 3 cartas.
 * 
 * PROBLEMAS SOLUCIONADOS:
 * 1. ❌ Error: 'loading' no existe → ✅ Cambiado a 'isLoading' 
 * 2. ❌ Faltaba manejo de cartas con reverso → ✅ Añadido estado para cartas ocultas
 * 3. ❌ No había imagen de reverso → ✅ Integrada imagen desde /public
 * 
 * Funcionalidades:
 * - Permite mezclar, seleccionar y reiniciar lectura
 * - Muestra cartas boca abajo hasta que se seleccionan
 * - Maneja estados: past, present, future
 */
export const CardReading: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ CORREGIDO: Era 'loading' ahora es 'isLoading' 
  const { cards, isLoading, error, shuffleForReading } = useTarotCards();

  // Estado de la lectura con las 3 posiciones
  const [readingState, setReadingState] = useState<ReadingState>({
    selectedCards: [],
    availableCards: [],
    currentPosition: 'past',
    isComplete: false
  });

  const [showInstructions, setShowInstructions] = useState(true);
  const [readingStarted, setReadingStarted] = useState(false);

  // Inicializar cartas disponibles y barajado al cargar
  useEffect(() => {
    if (cards.length > 0) {
      shuffleForReading();
    }
  }, []);

  // Actualizar cartas disponibles cuando cambien las cartas
  useEffect(() => {
    if (cards.length > 0) {
      setReadingState(prev => ({
        ...prev,
        availableCards: [...cards]
      }));
    }
  }, [cards]);

  // Manejar preselección por navegación (cuando vienes desde CardDetail)
  useEffect(() => {
    const preselect = location.state?.preselectedCard as TarotCard;
    if (preselect && !readingStarted) {
      handleCardSelection(preselect);
      setReadingStarted(true);
    }
  }, [location.state, readingStarted]);

  /**
   * 🎯 Obtiene la próxima posición libre para asignar carta
   * @returns 'past' | 'present' | 'future' | null
   */
  const getNextPosition = (): Position | null => {
    const positions: Position[] = ['past', 'present', 'future'];
    const selectedPositions = readingState.selectedCards.map(sc => sc.position);
    return positions.find(pos => !selectedPositions.includes(pos)) ?? null;
  };

  /**
   * 🃏 Maneja la selección de una carta y la asigna a la siguiente posición
   */
  const handleCardSelection = (card: TarotCard): void => {
    const nextPos = getNextPosition();
    if (!nextPos) return;

    const newSelected: SelectedCard = { position: nextPos, card };

    setReadingState(prev => {
      const newSelectedCards = [...prev.selectedCards, newSelected];
      const newAvailableCards = prev.availableCards.filter(c => c.id !== card.id);
      const isComplete = newSelectedCards.length === 3;
      const currentPosition = getNextPosition();

      return {
        selectedCards: newSelectedCards,
        availableCards: newAvailableCards,
        currentPosition,
        isComplete
      };
    });
    setReadingStarted(true);
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
    setReadingStarted(false);
    setShowInstructions(true);
  };

  /**
   * 🎲 Mezcla las cartas disponibles
   */
  const handleShuffleCards = (): void => {
    shuffleForReading();
  };

  /**
   * ↩️ Deshace la última selección
   */
  const handleUndoLastSelection = (): void => {
    if (!readingState.selectedCards.length) return;
    const lastSelected = readingState.selectedCards[readingState.selectedCards.length - 1];
    setReadingState(prev => ({
      selectedCards: prev.selectedCards.slice(0, -1),
      availableCards: [...prev.availableCards, lastSelected.card],
      currentPosition: lastSelected.position,
      isComplete: false,
    }));
  };

  /**
   * 🏷️ Etiquetas en español para las posiciones
   */
  const getPositionLabel = (position: Position): string => ({
    past: 'Pasado',
    present: 'Presente',
    future: 'Futuro',
  }[position]);

  /**
   * 📋 Renderiza las instrucciones iniciales
   */
  const renderInstructions = () => (
    <div className="reading-instructions mystical-container">
      <h2 className="mystical-title medium">🔮 Instrucciones de Lectura</h2>
      <p className="mystical-text">
        Selecciona tres cartas que representarán tu <strong>Pasado</strong>, <strong>Presente</strong> y <strong>Futuro</strong>.
      </p>
      <p className="mystical-text">
        Las cartas aparecerán boca abajo. Confía en tu intuición para elegir.
      </p>
      <button className="mystical-button" onClick={() => setShowInstructions(false)}>
        ✨ Comenzar Lectura
      </button>
    </div>
  );

  // ✅ CORREGIDO: Cambié 'loading' por 'isLoading'
  if (isLoading) {
    return (
      <div className="reading-loading mystical-container">
        <div className="loading-spinner">🔮</div>
        <p className="mystical-text">Preparando las cartas del destino...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="reading-error mystical-container">
        <h3>💀 Error en la consulta</h3>
        <p>{error}</p>
        <Link to="/" className="mystical-button">🏠 Volver al Inicio</Link>
      </div>
    );
  }

  return (
    <div className="card-reading-page">
      {/* 🎭 Cabecera de la página de lectura */}
      <header className="reading-header">
        <h1 className="mystical-title large">🔮 Lectura de Tarot STEM</h1>
        <p className="reading-subtitle mystical-text">
          Descubre tu camino a través de la sabiduría científica
        </p>
      </header>

      {showInstructions && !readingStarted ? renderInstructions() : (
        <>
          {/* 📊 Estado actual de la selección */}
          <section className="selection-status">
            {readingState.isComplete ? (
              <h3 className="mystical-title small">🌟 Lectura Completa</h3>
            ) : (
              <h3 className="mystical-title small">
                Selecciona la carta para: <span className="highlight">{getPositionLabel(readingState.currentPosition!)}</span>
              </h3>
            )}
          </section>

          {/* 🎛️ Controles de la lectura */}
          <section className="reading-controls">
            {readingState.selectedCards.length > 0 && (
              <button className="mystical-button" onClick={handleUndoLastSelection}>
                ↩️ Deshacer Última
              </button>
            )}
            {!readingState.isComplete && readingState.availableCards.length > 0 && (
              <button className="mystical-button" onClick={handleShuffleCards}>
                🎲 Mezclar
              </button>
            )}
            <button className="mystical-button" onClick={handleResetReading}>
              🔄 Nueva Lectura
            </button>
            <Link className="mystical-button" to="/">
              🏠 Inicio
            </Link>
          </section>

          {/* 🃏 Muestra las cartas seleccionadas si hay alguna */}
          {readingState.selectedCards.length > 0 && (
            <Reading
              selectedCards={readingState.selectedCards}
              isComplete={readingState.isComplete}
              onCardClick={(card) => navigate(`/card/${card.id}`)}
              showInterpretation
            />
          )}

          {/* 🎴 Grid de cartas disponibles para seleccionar (BOCA ABAJO) */}
          {!readingState.isComplete && readingState.availableCards.length > 0 && (
            <CardGrid
              cards={readingState.availableCards}
              onCardClick={handleCardSelection}
              title="Cartas Disponibles"
              subtitle={`Selecciona una carta para representar tu ${getPositionLabel(readingState.currentPosition!)}`}
              cardSize="medium"
              maxCards={15}
              showBackside={true} // ✅ NUEVO: Muestra cartas boca abajo
            />
          )}
        </>
      )}
    </div>
  );
};