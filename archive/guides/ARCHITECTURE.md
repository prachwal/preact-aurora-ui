# Architektura Projektu

Ta dokumentacja opisuje architekturę biblioteki Aurora UI, jej kluczowe koncepcje i wzorce projektowe.

## 🎯 Filozofia

- **Modularność:** Każdy komponent jest niezależną jednostką, co ułatwia jego utrzymanie i ponowne wykorzystanie.
- **Kompozycyjność:** Komponenty są zaprojektowane tak, aby można je było łatwo łączyć w bardziej złożone struktury.
- **Personalizacja:** Rozbudowany system themingu oparty na CSS Custom Properties pozwala na łatwe dostosowanie wyglądu do dowolnych wymagań.
- **Developer Experience:** Skupienie na prostocie API, automatyzacji i czytelnej dokumentacji, aby praca z biblioteką była jak najbardziej efektywna.

## 📂 Struktura Projektu

- **`src/components`**: Główny katalog z komponentami. Każdy komponent ma swój własny folder z plikami `.tsx`, `.module.scss`, `.test.tsx` i `.stories.tsx`.
- **`src/styles`**: Globalne style, zmienne SCSS i custom properties (kolory, typografia, spacing).
- **`src/hooks`**: Hooki ułatwiające pracę z biblioteką, np. `useThemeColors`.
- **`src/utils`**: Funkcje pomocnicze, np. generator klas CSS.
- **`docs`**: Cała dokumentacja projektu, w tym przewodniki, API i przykłady.
- **`tests`**: Testy integracyjne i end-to-end (Playwright).
- **`stories`**: Pliki Storybooka, które nie są bezpośrednio powiązane z komponentami (np. paleta kolorów).
