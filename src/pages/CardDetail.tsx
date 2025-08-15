import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import type { TarotCard } from '../types/tarot';
import { Card } from '../components/Card/Card';
import { getCardById } from '../services/api';

/**
 * Página detalle que muestra el arcano y la científica asociada,
 * con navegación y acciones para iniciar lectura o ver todas.
 */
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
  const handleStartReading = () => {
    if (card) navigate('/reading', { state: { preselectedCard: card } });
  };

  if (loading)
    return (
      <div className="card-detail-page">
        <p>Cargando carta...</p>
      </div>
    );

  if (error || !card)
    return (
      <div className="card-detail-page">
        <p>Error: {error}</p>
        <button onClick={handleGoBack}>Regresar</button>
        <Link to="/">Inicio</Link>
      </div>
    );

  return (
    <div className="card-detail-page">
      <nav>
        <button onClick={handleGoBack}>← Regresar</button>
        <Link to="/">Inicio</Link>
        <Link to="/reading">Nueva Lectura</Link>
      </nav>

      <header>
        <Card card={card} isFlipped size="large" />
        <h1>{card.arcaneName}</h1>
        <p>Representada por {card.goddessName}</p>
      </header>

      <main>
        <section>
          <h2>El Arcano</h2>
          <img src={card.arcaneImage.imageSrc} alt={card.arcaneName} />
          <p>{card.arcaneDescription}</p>
        </section>

        <section>
          <h2>La Diosa Contemporánea</h2>
          <img src={card.goddessImage.imageSrc} alt={card.goddessName} />
          <p>{card.goddessDescription}</p>
        </section>

        <section>
          <h3>¿Qué deseas hacer ahora?</h3>
          <button onClick={handleStartReading}>Incluir en Lectura</button>
          <Link to="/reading">Nueva Lectura Completa</Link>
          <Link to="/">Ver Todas las Cartas</Link>
        </section>
      </main>
    </div>
  );
};
