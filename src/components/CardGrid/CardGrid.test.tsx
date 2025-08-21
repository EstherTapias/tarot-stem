import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CardGrid } from "./CardGrid";
import type { TarotCard } from "../../types/tarot";

// Dos cartas simuladas para pruebas
const mockCards: TarotCard[] = [
  {
    id: "1",
    arcaneNumber: "I",
    arcaneName: "El Mago",
    arcaneDescription: "Dominio de los elementos.",
    arcaneImage: {
      imageSrc: "arcano.png",
      author: "Autor Arcano",
      license: "CC BY",
      licenseUrl: "https://license.com",
    },
    goddessName: "Ada Lovelace",
    goddessDescription: "Pionera en programación.",
    goddessImage: {
      imageSrc: "ada.png",
      author: "Autor Diosa",
      licenseUrl: "https://license.com",
    },
  },
  {
    id: "2",
    arcaneNumber: "II",
    arcaneName: "La Sacerdotisa",
    arcaneDescription: "Sabiduría oculta.",
    arcaneImage: {
      imageSrc: "sacerdotisa.png",
      author: "Autor Arcano",
      license: "CC BY",
      licenseUrl: "https://license.com",
    },
    goddessName: "Marie Curie",
    goddessDescription: "Premio Nobel de Física y Química.",
    goddessImage: {
      imageSrc: "curie.png",
      author: "Autor Diosa",
      licenseUrl: "https://license.com",
    },
  },
];

describe("CardGrid Component", () => {
  // Prueba estado de carga: muestra spinner y texto
  it("debería mostrar estado de carga cuando loading=true", () => {
    render(<CardGrid cards={[]} loading />);
    expect(screen.getByText("Invocando las cartas del destino...")).toBeInTheDocument();
  });

  // Prueba estado sin cartas: muestra mensaje específico
  it("debería mostrar mensaje vacío si no hay cartas", () => {
    render(<CardGrid cards={[]} />);
    expect(screen.getByText("No hay cartas disponibles")).toBeInTheDocument();
  });

  // Prueba renderizado normal: muestra cartas con nombres
  it("debería renderizar las cartas cuando existen", () => {
    render(
      <MemoryRouter>
        <CardGrid cards={mockCards} />
      </MemoryRouter>
    );
    expect(screen.getByText("El Mago")).toBeInTheDocument();
    expect(screen.getByText("La Sacerdotisa")).toBeInTheDocument();
  });
});
