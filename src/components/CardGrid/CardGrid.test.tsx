import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CardGrid } from "./CardGrid";
import type { TarotCard } from "../../types/tarot";

// Dos mocks tipo TarotCard
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
  // Test: Estado de carga
  it("debería mostrar estado de carga cuando loading=true", () => {
    render(<CardGrid cards={[]} loading />);
    expect(screen.getByText("Invocando las cartas del destino...")).toBeInTheDocument();
  });

  // Test: Estado vacío
  it("debería mostrar mensaje vacío si no hay cartas", () => {
    render(<CardGrid cards={[]} />);
    expect(screen.getByText("No hay cartas disponibles")).toBeInTheDocument();
  });

  // Test: Renderización normal
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
