import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Card } from "./Card";
import type { TarotCard } from "../../types/tarot";

// Mock de TarotCard con todas las propiedades requeridas por la interfaz
const mockCard: TarotCard = {
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
};

describe("Card Component", () => {
  // Test: Renderización del nombre del arcano
  it("debería renderizar el nombre del arcano por defecto", () => {
    render(
      <MemoryRouter>
        <Card card={mockCard} />
      </MemoryRouter>
    );
    expect(screen.getByText("El Mago")).toBeInTheDocument();
  });

  // Test: Click en la carta
  it("debería llamar a la función onClick al hacer click", () => {
    const handleClick = vi.fn();
    render(
      <MemoryRouter>
        <Card card={mockCard} onClick={handleClick} />
      </MemoryRouter>
    );
    // Asumimos que la imagen principal tiene role="img"
    fireEvent.click(screen.getByRole("img"));
    expect(handleClick).toHaveBeenCalledWith(mockCard);
  });

  // Test: Renderizado volteado
  it("debería mostrar el nombre de la diosa si la carta está volteada", () => {
    render(
      <MemoryRouter>
        <Card card={mockCard} isFlipped />
      </MemoryRouter>
    );
    expect(screen.getByText("Ada Lovelace")).toBeInTheDocument();
  });
});
