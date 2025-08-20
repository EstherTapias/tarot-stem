# 🌙🔮 Proyecto Tarot STEM

Bienvenida/o a **AETHRA TAROT**, una aplicación web mística donde se unen el **tarot** y las **mujeres científicas** ✨.  

---

## 📖 Descripción del Proyecto

La aplicación combina la estética mística del tarot con un enfoque educativo:  
- Podrás **explorar cartas** que representan científicas y arcanos.  
- Realizar una **tirada de cartas** con interpretación de pasado, presente y futuro.  
- Descubrir la historia detrás de cada carta con un estilo visual mágico y envolvente.  

El objetivo es ofrecer una experiencia interactiva y educativa que mezcla **sabiduría, ciencia y misterio** 🔮.

---

## 🗂️ Estructura del Proyecto

```bash
src
 ┣ components
 ┃ ┣ Card
 ┃ ┃ ┣ Card.module.css       # Estilos de las cartas
 ┃ ┃ ┗ Card.tsx              # Componente de carta individual
 ┃ ┣ CardGrid
 ┃ ┃ ┣ CardGrid.module.css   # Estilos del grid de cartas
 ┃ ┃ ┗ CardGrid.tsx          # Vista en cuadrícula de las cartas
 ┃ ┣ Layout
 ┃ ┃ ┣ Layout.module.css     # Estilos del layout general
 ┃ ┃ ┗ Layout.tsx            # Layout principal
 ┃ ┣ Navigation
 ┃ ┃ ┣ Navigation.module.css # Estilos del menú de navegación
 ┃ ┃ ┗ Navigation.tsx        # Barra de navegación
 ┃ ┗ Reading
 ┃ ┃ ┣ Reading.module.css    # Estilos de la tirada de cartas
 ┃ ┃ ┗ Reading.tsx           # Lógica de la lectura
 ┣ pages
 ┃ ┣ CardDetail.tsx          # Detalle de cada carta
 ┃ ┣ CardReading.tsx         # Tirada completa y su interpretación
 ┃ ┗ Home.tsx                # Página principal
 ┣ router
 ┃ ┗ useTarotCards.ts        # Hook personalizado para gestionar cartas
 ┣ services
 ┃ ┗ api.ts                  # Servicios de conexión a API
 ┣ styles
 ┃ ┗ mystical-theme.css      # Tema de estilos global místico
 ┣ types
 ┃ ┗ tarot.ts                # Tipado de las cartas
 ┣ App.tsx                   # Punto de entrada de la app
 ┗ main.tsx                  # Renderizado de la aplicación
 ```

## 🚀 Cómo Clonar y Ejecutar el Proyecto
Clona el repositorio:

```bash

git clone https://github.com/EstherTapias/tarot-stem.git
```
Accede a la carpeta del proyecto:

```bash
cd tarot-stem
```
Instala las dependencias:
```bash
npm install
```
Ejecuta el servidor de desarrollo:
```bash
npm run dev
```
Abre en tu navegador:
```adruino
http://localhost:5173
```
## ⚙️ Funcionalidades

🃏 Exploración de cartas → Descubre científicas y arcanos con animaciones místicas.

🔮 Tirada de tarot → Pasado, presente y futuro con interpretación.

✨ Estilo visual místico → Basado en colores y diseño de tarot.

📚 Información educativa → Biografías de científicas y referencias.

## 👩‍💻 Desarrollado por
*Esther Tapias*

🌟 Fullstack Developer en formación (con DevOps e IA).

✨ Apasionada por la mezcla de ciencia, tecnología y creatividad.

## 🛠️ Tecnologías Utilizadas
⚛️ React.js

🎨 CSS Modules + mystical-theme.css

🧩 TypeScript

⚡ Vite

🔗 Axios (para servicios/API)

---
*💫 "La ciencia y el misterio pueden caminar de la mano." 🔮*