# Frontend built with React

## Project Structure

### Public
- Contains assets that are directly placed into the 'dist' folder when built.
- **Currently only being used for the logo in the head of the webpage**

--- 

### App
- Contains files related to the structuring of the application.
#### App.tsx
- The top-level component for the application.
- Wraps the application with a fallback error boundary in case page-level error boundaries fail to catch errors.
- Wraps the application with providers.
#### Layout.tsx
- Structures the layout of the webpage.
- Wraps each page with an error boundary.
#### Provider.tsx
- Initializes providers that are used throughout the application.
#### Router.tsx
- Initializes routing for the application.
#### app.scss
- Contains styles and variables used in highest-level components.
- Class names defined here should be prefixed with the name of the component the class is being used in.
#### global.scss
- Contains global styles and variables.
- Class names defined here should start with the **global** prefix.
#### layout
- Contains components used in Layout.tsx.

--- 

### Assets
- Contains assets that are imported throughout the application.

---

### Components
- Contains global components that are used throughout the application.
- Contains a single style sheet that is shared by the components in this folder.

---

### Pages
- Contains React pages used throughout the application.
- Each component has a .tsx file and a .css file.

---

### Other Files
#### App.tsx and App.css
- The parent component and style sheet that holds all other components.
#### index.css
- Contains global styles that are used throughout the application.
- All classes defined in this file must start with 'global'.
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
