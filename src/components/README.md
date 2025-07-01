# Aurora UI – Dokumentacja komponentów

Ta sekcja zawiera szczegółową dokumentację wszystkich komponentów biblioteki Aurora UI (Preact, Material Design 3).

Każdy komponent posiada własny plik README z opisem API, przykładami, informacjami o stylach, accessibility, testach i FAQ.

---

## 📚 Spis komponentów

| Komponent        | Status | Dokumentacja                                                                                           |
| ---------------- | :----: | ------------------------------------------------------------------------------------------------------ |
| AppLayout        |   ✅   | [Dokumentacja](https://github.com/prachwal/preact-aurora-ui/tree/main/src/components/AppLayout)        |
| Badge            |   ✅   | [Dokumentacja](https://github.com/prachwal/preact-aurora-ui/tree/main/src/components/Badge)            |
| Banner           |   ✅   | [Dokumentacja](https://github.com/prachwal/preact-aurora-ui/tree/main/src/components/Banner)           |
| Button           |   ✅   | [Dokumentacja](https://github.com/prachwal/preact-aurora-ui/tree/main/src/components/Button)           |
| Text             |   ✅   | [Dokumentacja](https://github.com/prachwal/preact-aurora-ui/tree/main/src/components/Text)             |
| TextField        |   ✅   | [Dokumentacja](https://github.com/prachwal/preact-aurora-ui/tree/main/src/components/TextField)        |
| Checkbox         |   ✅   | [Dokumentacja](https://github.com/prachwal/preact-aurora-ui/tree/main/src/components/Checkbox)         |
| Radio            |   ✅   | [Dokumentacja](https://github.com/prachwal/preact-aurora-ui/tree/main/src/components/Radio)            |
| Switch           |   ✅   | [Dokumentacja](https://github.com/prachwal/preact-aurora-ui/tree/main/src/components/Switch)           |
| Slider           |   ✅   | [Dokumentacja](https://github.com/prachwal/preact-aurora-ui/tree/main/src/components/Slider)           |
| Snackbar         |   ✅   | [Dokumentacja](https://github.com/prachwal/preact-aurora-ui/tree/main/src/components/Snackbar)         |
| Tooltip          |   ✅   | [Dokumentacja](https://github.com/prachwal/preact-aurora-ui/tree/main/src/components/Tooltip)          |
| Tabs             |   ✅   | [Dokumentacja](https://github.com/prachwal/preact-aurora-ui/tree/main/src/components/Tabs)             |
| DataTable        |   ✅   | [Dokumentacja](https://github.com/prachwal/preact-aurora-ui/tree/main/src/components/DataTable)        |
| Select           |   ✅   | [Dokumentacja](https://github.com/prachwal/preact-aurora-ui/tree/main/src/components/Select)           |
| FAB              |   ✅   | [Dokumentacja](https://github.com/prachwal/preact-aurora-ui/tree/main/src/components/FAB)              |
| Dialog           |   ✅   | [Dokumentacja](https://github.com/prachwal/preact-aurora-ui/tree/main/src/components/Dialog)           |
| Drawer           |   ✅   | [Dokumentacja](https://github.com/prachwal/preact-aurora-ui/tree/main/src/components/Drawer)           |
| Layout           |   ✅   | [Dokumentacja](https://github.com/prachwal/preact-aurora-ui/tree/main/src/components/Layout)           |
| Loader           |   ✅   | [Dokumentacja](https://github.com/prachwal/preact-aurora-ui/tree/main/src/components/Loader)           |
| Header           |   ✅   | [Dokumentacja](https://github.com/prachwal/preact-aurora-ui/tree/main/src/components/Header)           |
| Sidebar          |   ✅   | [Dokumentacja](https://github.com/prachwal/preact-aurora-ui/tree/main/src/components/Sidebar)          |
| Content          |   ✅   | [Dokumentacja](https://github.com/prachwal/preact-aurora-ui/tree/main/src/components/Content)          |
| Footer           |   ✅   | [Dokumentacja](https://github.com/prachwal/preact-aurora-ui/tree/main/src/components/Footer)           |
| Card             |   ✅   | [Dokumentacja](https://github.com/prachwal/preact-aurora-ui/tree/main/src/components/Card)             |
| Grid             |   ✅   | [Dokumentacja](https://github.com/prachwal/preact-aurora-ui/tree/main/src/components/Grid)             |
| Breadcrumbs      |   ✅   | [Dokumentacja](https://github.com/prachwal/preact-aurora-ui/tree/main/src/components/Breadcrumbs)      |
| PageHeader       |   ✅   | [Dokumentacja](https://github.com/prachwal/preact-aurora-ui/tree/main/src/components/PageHeader)       |
| Menu             |   ✅   | [Dokumentacja](https://github.com/prachwal/preact-aurora-ui/tree/main/src/components/Menu)             |
| ThemeProvider    |   ✅   | [Dokumentacja](https://github.com/prachwal/preact-aurora-ui/tree/main/src/components/ThemeProvider)    |
| IconButton       |   ✅   | [Dokumentacja](https://github.com/prachwal/preact-aurora-ui/tree/main/src/components/IconButton)       |
| Chip             |   ✅   | [Dokumentacja](https://github.com/prachwal/preact-aurora-ui/tree/main/src/components/Chip)             |
| Container        |   ✅   | [Dokumentacja](https://github.com/prachwal/preact-aurora-ui/tree/main/src/components/Container)        |
| BottomNavigation |   ✅   | [Dokumentacja](https://github.com/prachwal/preact-aurora-ui/tree/main/src/components/BottomNavigation) |
| Stepper          |   ✅   | [Dokumentacja](https://github.com/prachwal/preact-aurora-ui/tree/main/src/components/Stepper)          |

**Legenda statusu:**  
✅ – gotowe | ⏳ – w trakcie | ❌ – brak

**Dokumentacja lokalnie:**  
Pełna dokumentacja każdego komponentu jest dostępna w folderach komponentów:

- `node_modules/preact-aurora-ui/Badge/README.md`
- `node_modules/preact-aurora-ui/Button/README.md`
- itp.

---

## Jak procesować komponent?

**Prompt do generowania dokumentacji dla pojedynczego komponentu:**

> Przygotuj plik `README.md` dla komponentu `[NazwaKomponentu]` zgodnie z szablonem Aurora UI. Uwzględnij: opis, przykłady użycia, API (propsy i typy), informacje o stylach i themingu, accessibility, testy, link do Storybooka/dema, FAQ, wkład i licencję. Wykorzystaj kod, typy, testy i plan komponentu.

---

## Jak śledzić postęp?

- Oznaczaj status przy każdym komponencie po przygotowaniu dokumentacji.
- Po ukończeniu wszystkich komponentów, cała tabela powinna mieć status ✅.

---

> Dokumentacja generowana automatycznie na podstawie kodu, testów i planów komponentów Aurora UI.
