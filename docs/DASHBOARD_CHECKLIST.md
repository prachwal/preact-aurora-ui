# Dashboard – Czeklista komponentów

Aby stworzyć w pełni responsywny layout typu dashboard zgodny z podejściem antd/MUI oraz instrukcjami SCSS, należy zaimplementować następujące komponenty (każdy w osobnym folderze wg wzorca):

## Podstawowe komponenty layoutu

- [x] **Layout**  
       Główny kontener layoutu (flex row/column, obsługa direction, fullHeight, przekazywanie children, className, style)
  - Layout.tsx
  - Layout.module.scss
  - Layout.test.tsx
  - Layout.stories.tsx
  - index.ts
  - [Plan implementacji](./PLAN_LAYOUT.md)

- [x] **Header**  
       Pasek górny (logo, nawigacja, akcje użytkownika)
  - Header.tsx
  - Header.module.scss
  - Header.test.tsx
  - Header.stories.tsx
  - index.ts
  - [Plan implementacji](./PLAN_HEADER.md)

- [x] **Sider / Sidebar**  
       Nawigacja boczna (menu, ikony, collapse)
  - Sidebar.tsx
  - Sidebar.module.scss
  - Sidebar.test.tsx
  - Sidebar.stories.tsx
  - index.ts
  - [Plan implementacji](./PLAN_SIDEBAR.md)

- [x] **Content**  
       Główna część na treść dashboardu
  - Content.tsx
  - Content.module.scss
  - Content.test.tsx
  - Content.stories.tsx
  - index.ts
  - [Plan implementacji](./PLAN_CONTENT.md)

- [x] **Footer**  
       Pasek dolny (opcjonalnie)
  - Footer.tsx
  - Footer.module.scss
  - Footer.test.tsx
  - Footer.stories.tsx
  - index.ts
  - [Plan implementacji](./PLAN_FOOTER.md)

## Komponenty wspierające

- [x] **Breadcrumbs**  
       Ścieżka nawigacji
  - Breadcrumbs.tsx
  - Breadcrumbs.module.scss
  - Breadcrumbs.test.tsx
  - Breadcrumbs.stories.tsx
  - index.ts
  - [Plan implementacji](./PLAN_BREADCRUMBS.md)

- [ ] **PageHeader**  
       Nagłówek sekcji/strony (tytuł, akcje, opis)
  - PageHeader.tsx
  - PageHeader.module.scss
  - PageHeader.test.tsx
  - PageHeader.stories.tsx
  - index.ts
  - [Plan implementacji](./PLAN_PAGEHEADER.md)

- [ ] **Grid / Row / Col**  
       System siatki do responsywnego układu
  - Grid.tsx
  - Row.tsx
  - Col.tsx
  - Grid.module.scss
  - Row.module.scss
  - Col.module.scss
  - testy, stories, index
  - [Plan implementacji](./PLAN_GRID_ROW_COL.md)

- [ ] **Card**  
       Kafelek na dane/statystyki
  - Card.tsx
  - Card.module.scss
  - Card.test.tsx
  - Card.stories.tsx
  - index.ts
  - [Plan implementacji](./PLAN_CARD.md)

- [ ] **Menu**  
       Komponent menu (sidebar/topbar)
  - Menu.tsx
  - Menu.module.scss
  - Menu.test.tsx
  - Menu.stories.tsx
  - index.ts
  - [Plan implementacji](./PLAN_MENU.md)

- [ ] **Drawer / Modal**  
       Panel wysuwany/modalny (opcjonalnie)
  - Drawer.tsx
  - Drawer.module.scss
  - Drawer.test.tsx
  - Drawer.stories.tsx
  - index.ts
  - [Plan implementacji](./PLAN_DRAWER.md)

- [ ] **Loader / Spinner**  
       Komponent ładowania
  - Loader.tsx
  - Loader.module.scss
  - Loader.test.tsx
  - Loader.stories.tsx
  - index.ts
  - [Plan implementacji](./PLAN_LOADER.md)

- [ ] **Responsive utilities**  
       Hooki/utilsy do obsługi responsywności (np. useBreakpoint)
  - [Plan implementacji](./PLAN_RESPONSIVE.md)

---

Każdy komponent zgodnie z instrukcją: SCSS Modules, zmienne lokalne na bazie custom properties, testy, stories, index.ts.

Zacznij od Layout, Header, Sidebar, Content, Footer, Grid/Row/Col – to podstawa dashboardu. Pozostałe komponenty (Card, Breadcrumbs, Menu, Loader) dodawaj wg potrzeb projektu.
