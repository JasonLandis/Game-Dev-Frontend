# Frontend built with React

## Project Structure

### Public
- Contains assets that are directly placed into the 'dist' folder when built.
- **Currently only being used for the logo in the head of the webpage**

--- 

### Assets
- Contains assets that are imported throughout the application.

---

### Components
- Contains React components used throughout the application.
- Each component has a .tsx file and a .css file.

---

### Other Files
#### App.tsx and App.css
- The parent component and style sheet that holds all other components.
#### index.css
- The global CSS style sheet for the application.
#### main.tsx
- The entry point of the application.
- Renders the App component.
- Sets up the React DOM.
#### index.html
- The starting html of the application.
- Contains the head along with metadata.

---

## Commands (using npm run)
- **build** - Uses the TypeScript compiler and vite to build the project into the 'dist' folder.
- **start** - Uses vite to start the built project in the 'dist' folder.
- **start:dev** - Uses vite to build and start the project for testing in development.
- **lint** - Lints the application.
- **prettier** - Styles the application.
