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
#### config.ts
- Global configuration varaibles used throughout the application.
#### global.scss
- Contains global styles.
- Class names defined here should start with the **global** prefix.
#### globalvars.scss
- Contains global variables.
- Variables defined here should start with the **global** prefix.
#### Provider.tsx
- Initializes providers that are used throughout the application.
#### Router.tsx
- Initializes routing for the application.

--- 

### Assets
- Contains assets that are imported throughout the application.

---

### Components
- Contains global components that are used throughout the application.
- Each component has its own style file.

---

### Features
- Contains separate folders for application sections.
- Each folder can have its own pages, components, and lib folders.
- Each file in a **pages** folder should be the component location of a route.
- Each folder has its own service file. **All API calls must be made from inside this folder.**
- **These folders should not reference each other and should be completely independent from one another.**

---

### Layout
- Contains components and styles related to the layout of the application.

---

### Lib
- Contains global hooks, contexts, providers, or utils used throughout the application.

---

### Other Files
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
