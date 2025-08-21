import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navigation from "./Navigation";

describe("Navigation Component", () => {
  // Verifica que el logo principal "Aethra TAROT" esté presente
  it("debería mostrar el logo Aethra TAROT", () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );
    expect(screen.getByText("Aethra")).toBeInTheDocument();
    expect(screen.getByText("TAROT")).toBeInTheDocument();
  });

  // Verifica que los enlaces "Home" y "Tirada" aparezcan en la navegación
  it("debería tener enlaces a Home y Tirada", () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Tirada")).toBeInTheDocument();
  });
});
