# Frontend built with React

## Project Structure

```
public/
src/
├── app/
├── assets/
├── components/
├── features/
│   └── auth/
│       ├── contexts/
│       ├── hooks/
│       ├── pages/
│       ├── providers/
│       ├── auth.ts
│       └── authService.ts
├── hooks/
├── layout/
├── utils/
└── main.tsx
index.html
```

### Public
- Contains assets that are directly placed into the 'dist' folder when built.
- **Currently only being used for the logo in the head of the webpage**

--- 

### app
- Contains files related to the structuring of the application.
#### App.tsx
- The top-level component for the application.
- Wraps the application with a fallback error boundary in case page-level error boundaries fail to catch errors.
- Wraps the application with providers.
#### config.ts
- Global configuration variables used throughout the application.
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

### assets
- Contains assets that are imported throughout the application.

---

### components
- Contains global components that are used throughout the application.
- Each component has its own SCSS file.

---

### features
- Contains folders acting as self-contained modules.
- Each of these folders represent a mini **src** folder.
- Below are the unique folders or files that are not found inside the **src** folder.
#### pages
- Components inside this folder are connected to a route and have their own SCSS file.
#### {folder_name}.ts
- This file contains all components from the feature that can be imported by other places in the application.
- **If an external part of the application must use an export from this feature, it must be imported from this file**
#### {folder_name}Service.ts
- All API calls must be made from inside this file.

---

### hooks
- Contains custom reusable React hooks used across the application.

---

### layout
- Contains components and styles related to the layout of the application.

---

### utils
- Contains utility functions and helpers used throughout the application.

---

### Other Folders
#### contexts
- Contains React context definitions and logic for managing global or shared state across the application.
#### providers
- Contains provider components that supply context, configuration, or third-party integrations to the app via React context.

---

### main.tsx
- The entry point of the application.
- Renders the App component.
- Sets up the React DOM.

---

### index.html
- The starting html of the application.
- Contains the head along with metadata.

---

## Commands (using npm run)
- **build** - Uses the TypeScript compiler and vite to build the project into the 'dist' folder.
- **start** - Uses vite to start the built project in the 'dist' folder.
- **start:dev** - Uses vite to build and start the project for testing in development.
- **lint** - Lints the application.
- **prettier** - Styles the application.
