# AI-Assisted Development Guide for Aurora UI

This document provides context for AI tools to understand the Aurora UI project structure, key commands, and development patterns.

## Project Overview

- **Framework:** Preact
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** SCSS with CSS Modules
- **Component-Based Architecture:** Components are located in `src/components`. Each component has its own directory containing the component file (`*.tsx`), its styles (`*.module.scss`), and its Storybook story (`*.stories.tsx`).

## Key Commands

-   **`npm run dev`**: Starts the development server.
-   **`npm run build`**: Builds the project.
-   **`npm run storybook`**: Runs Storybook for component development and testing.
-   **`npm run test`**: Runs all tests.
-   **`npm run lint`**: Lints the codebase.
-   **`npm run format`**: Formats the codebase.

## Component Structure

-   **Component Logic:** `src/components/[ComponentName]/[ComponentName].tsx`
-   **Styles:** `src/components/[ComponentName]/[ComponentName].module.scss`
-   **Storybook:** `src/components/[ComponentName]/[ComponentName].stories.tsx`
-   **Tests:** `src/components/[ComponentName]/__tests__/[ComponentName].test.tsx`

When creating a new component, please follow this structure.
