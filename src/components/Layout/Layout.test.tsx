import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Layout from "./Layout";

// Mock de Outlet para evitar errores al testear el layout
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    Outlet: () => <div data-testid="outlet-mock">Outlet content here</div>,
  };
});

describe("Layout Component", () => {
  it("debería renderizar Navigation, Outlet y Footer con enlaces sociales", () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );

    // Comprobamos que se renderiza el logo y texto del footer
    expect(screen.getByText("Aethra")).toBeInTheDocument();
    expect(screen.getByTestId("outlet-mock")).toBeInTheDocument();
    expect(screen.getByText("Conectando la sabiduría ancestral con la ciencia moderna")).toBeInTheDocument();

    // Verificamos enlaces a LinkedIn y GitHub con URL correctas
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/esther-tapias-paez-camino/"
    );
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/EstherTapias"
    );

    // Chequeamos la firma del footer
    expect(screen.getByText(/Creado con 💜/)).toBeInTheDocument();
  });
});
