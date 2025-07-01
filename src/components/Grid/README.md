# Grid

Responsywny system siatki oparty na CSS Grid, zapewniający elastyczne układy kolumnowe zgodne z Material Design 3.

## 🎯 Kiedy używać

- **Układy kolumnowe** - karty, produkty, galerie zdjęć
- **Dashboardy** - siatki widgetów i paneli
- **Listy responsywne** - treść dostosowująca się do rozmiaru ekranu
- **Layout kompozycji** - złożone układy z różnymi proporcjami

## 📱 Podstawowe użycie

```tsx
import { Grid, Row, Col } from 'preact-aurora-ui';

function BasicGrid() {
  return (
    <Grid columns={3} gap="16px">
      <div>Element 1</div>
      <div>Element 2</div>
      <div>Element 3</div>
    </Grid>
  );
}
```

## 🔧 System Row/Col

### Podstawowy layout 12-kolumnowy

```tsx
function ColumnLayout() {
  return (
    <Row gap="16px">
      <Col span={6}>Połowa szerokości</Col>
      <Col span={6}>Druga połowa</Col>
    </Row>
  );
}
```

### Responsywne kolumny

```tsx
function ResponsiveGrid() {
  return (
    <Row gap="16px">
      <Col xs={12} sm={6} md={4} lg={3}>
        Responsywna kolumna
      </Col>
      <Col xs={12} sm={6} md={4} lg={3}>
        Druga kolumna
      </Col>
      <Col xs={12} sm={12} md={4} lg={6}>
        Trzecia kolumna
      </Col>
    </Row>
  );
}
```

### Z offsetem i kolejnością

```tsx
function AdvancedColumns() {
  return (
    <Row>
      <Col span={4} offset={2} order={2}>
        Druga w kolejności, z offsetem
      </Col>
      <Col span={4} order={1}>
        Pierwsza w kolejności
      </Col>
    </Row>
  );
}
```

## 🎨 Warianty Grid

### Grid z niestandardową liczbą kolumn

```tsx
// 4 kolumny
<Grid columns={4} gap="20px">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</Grid>

// Custom template
<Grid columns="1fr 2fr 1fr" gap="12px">
  <div>Narrow</div>
  <div>Wide</div>
  <div>Narrow</div>
</Grid>
```

### Grid z gutter (różne odstępy)

```tsx
// Jednakowy odstęp
<Grid columns={3} gutter={16}>
  <div>Equal spacing</div>
</Grid>

// Różne odstępy [horizontal, vertical]
<Grid columns={2} gutter={[24, 12]}>
  <div>Custom spacing</div>
</Grid>
```

### Wyrównanie elementów

```tsx
// Centrowanie
<Grid
  columns={3}
  justify="center"
  align="center"
  style={{ minHeight: '200px' }}
>
  <div>Centered item</div>
</Grid>

// Rozprostowanie
<Grid
  columns={2}
  justify="between"
  align="stretch"
>
  <div>Item 1</div>
  <div>Item 2</div>
</Grid>
```

## 🧩 Wzorce layoutu

### Dashboard z widgetami

```tsx
function Dashboard() {
  return (
    <Grid columns={12} gap="24px" responsive>
      {/* Header - pełna szerokość */}
      <div style={{ gridColumn: 'span 12' }}>
        <h1>Dashboard</h1>
      </div>

      {/* Główne metryki */}
      <div style={{ gridColumn: 'span 3' }}>
        <MetricCard title="Users" value="1,234" />
      </div>
      <div style={{ gridColumn: 'span 3' }}>
        <MetricCard title="Sales" value="$56.7k" />
      </div>
      <div style={{ gridColumn: 'span 3' }}>
        <MetricCard title="Orders" value="892" />
      </div>
      <div style={{ gridColumn: 'span 3' }}>
        <MetricCard title="Growth" value="+12%" />
      </div>

      {/* Wykresy */}
      <div style={{ gridColumn: 'span 8' }}>
        <ChartWidget />
      </div>
      <div style={{ gridColumn: 'span 4' }}>
        <StatsWidget />
      </div>
    </Grid>
  );
}
```

### Galeria zdjęć

```tsx
function PhotoGallery() {
  const photos = [...]; // tablica zdjęć

  return (
    <Grid
      columns={6}
      gap="8px"
      responsive
      style={{
        '@media (max-width: 768px)': {
          gridTemplateColumns: 'repeat(2, 1fr)'
        }
      }}
    >
      {photos.map((photo, index) => (
        <div
          key={index}
          style={{
            gridColumn: photo.featured ? 'span 2' : 'span 1',
            gridRow: photo.featured ? 'span 2' : 'span 1'
          }}
        >
          <img src={photo.src} alt={photo.alt} />
        </div>
      ))}
    </Grid>
  );
}
```

### Karty produktów

```tsx
function ProductGrid() {
  return (
    <Row gap="20px">
      {products.map((product) => (
        <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
          <Card>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <Button>Add to Cart</Button>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
```

### Asymetryczny layout

```tsx
function AsymmetricLayout() {
  return (
    <Grid columns="2fr 1fr 1fr" gap="20px">
      {/* Główny artykuł */}
      <article style={{ gridRow: 'span 2' }}>
        <h2>Featured Article</h2>
        <p>Long content...</p>
      </article>

      {/* Sidebar items */}
      <aside>
        <h3>Related</h3>
        <p>Short content</p>
      </aside>

      <aside>
        <h3>Popular</h3>
        <p>Short content</p>
      </aside>

      {/* Bottom items */}
      <div style={{ gridColumn: 'span 2' }}>
        <Newsletter />
      </div>
    </Grid>
  );
}
```

## 📋 API Reference

### Grid Props

| Prop         | Typ                                                     | Domyślnie   | Opis                                        |
| ------------ | ------------------------------------------------------- | ----------- | ------------------------------------------- |
| `children`   | `ComponentChildren`                                     | -           | **Wymagane.** Elementy siatki               |
| `columns`    | `number \| string`                                      | `12`        | Liczba kolumn lub CSS grid-template-columns |
| `responsive` | `boolean`                                               | `true`      | Automatyczne breakpointy responsywne        |
| `gutter`     | `number \| [number, number]`                            | -           | Odstęp między elementami                    |
| `gap`        | `string`                                                | -           | CSS gap property                            |
| `justify`    | `'start' \| 'center' \| 'end' \| 'between' \| 'around'` | `'start'`   | Justyfikacja elementów                      |
| `align`      | `'start' \| 'center' \| 'end' \| 'stretch'`             | `'stretch'` | Wyrównanie elementów                        |
| `className`  | `string`                                                | -           | Dodatkowe klasy CSS                         |
| `style`      | `JSX.CSSProperties`                                     | -           | Inline style                                |

### Row Props

| Prop        | Typ                                                     | Domyślnie   | Opis                        |
| ----------- | ------------------------------------------------------- | ----------- | --------------------------- |
| `children`  | `ComponentChildren`                                     | -           | **Wymagane.** Kolumny (Col) |
| `align`     | `'start' \| 'center' \| 'end' \| 'stretch'`             | `'stretch'` | Wyrównanie kolumn w pionie  |
| `justify`   | `'start' \| 'center' \| 'end' \| 'between' \| 'around'` | `'start'`   | Justyfikacja kolumn         |
| `gap`       | `string`                                                | -           | Odstęp między kolumnami     |
| `className` | `string`                                                | -           | Dodatkowe klasy CSS         |
| `style`     | `JSX.CSSProperties`                                     | -           | Inline style                |

### Col Props

| Prop        | Typ                 | Domyślnie | Opis                                  |
| ----------- | ------------------- | --------- | ------------------------------------- |
| `children`  | `ComponentChildren` | -         | **Wymagane.** Treść kolumny           |
| `span`      | `number`            | `1`       | Liczba kolumn do zajęcia (1-12)       |
| `offset`    | `number`            | `0`       | Przesunięcie kolumny (0-11)           |
| `xs`        | `number`            | -         | Szerokość na ekranach XS (0-575px)    |
| `sm`        | `number`            | -         | Szerokość na ekranach SM (576-767px)  |
| `md`        | `number`            | -         | Szerokość na ekranach MD (768-991px)  |
| `lg`        | `number`            | -         | Szerokość na ekranach LG (992-1199px) |
| `xl`        | `number`            | -         | Szerokość na ekranach XL (1200px+)    |
| `order`     | `number`            | -         | Kolejność wyświetlania (1-12)         |
| `className` | `string`            | -         | Dodatkowe klasy CSS                   |
| `style`     | `JSX.CSSProperties` | -         | Inline style                          |

## 🎨 Stylowanie

### CSS Custom Properties

```css
.custom-grid {
  /* Odstępy */
  --grid-gap: 16px;
  --col-padding: 8px;

  /* Breakpointy */
  --breakpoint-xs: 0px;
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
}
```

### Responsywne zachowanie

```scss
// Default mobile-first
.grid--responsive {
  grid-template-columns: 1fr;

  @media (min-width: $breakpoint-sm) {
    grid-template-columns: repeat(12, 1fr);
  }
}

// Custom breakpoints
.custom-grid {
  grid-template-columns: 1fr;

  @media (min-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### Auto-fit i auto-fill

```tsx
// Automatyczne dopasowanie kolumn
<Grid
  columns="repeat(auto-fit, minmax(250px, 1fr))"
  gap="20px"
>
  <Card>Auto-sizing card</Card>
  <Card>Another card</Card>
  <Card>Third card</Card>
</Grid>

// Zawsze wypełnij przestrzeń
<Grid
  columns="repeat(auto-fill, minmax(200px, 1fr))"
  gap="16px"
>
  <div>Item</div>
  <div>Item</div>
  <div>Item</div>
</Grid>
```

## ♿ Accessibility

### Role i struktura

```tsx
<Grid role="grid" aria-label="Product catalog">
  {products.map((product, index) => (
    <div
      key={product.id}
      role="gridcell"
      aria-rowindex={Math.floor(index / 3) + 1}
      aria-colindex={(index % 3) + 1}
    >
      <Card tabIndex={0}>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
      </Card>
    </div>
  ))}
</Grid>
```

### Nawigacja klawiaturą

```tsx
function AccessibleGrid() {
  const [focusedIndex, setFocusedIndex] = useState(0);

  const handleKeyDown = (event: KeyboardEvent, index: number) => {
    const columns = 3;
    const total = items.length;

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        setFocusedIndex(Math.min(index + 1, total - 1));
        break;
      case 'ArrowLeft':
        event.preventDefault();
        setFocusedIndex(Math.max(index - 1, 0));
        break;
      case 'ArrowDown':
        event.preventDefault();
        setFocusedIndex(Math.min(index + columns, total - 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setFocusedIndex(Math.max(index - columns, 0));
        break;
    }
  };

  return (
    <Grid columns={3}>
      {items.map((item, index) => (
        <div
          key={index}
          tabIndex={focusedIndex === index ? 0 : -1}
          onKeyDown={(e) => handleKeyDown(e, index)}
          aria-label={`Item ${index + 1} of ${items.length}`}
        >
          {item.content}
        </div>
      ))}
    </Grid>
  );
}
```

### Screen readers

```tsx
<Grid aria-label="Product grid with 12 items">
  <div aria-describedby="grid-instructions">Use arrow keys to navigate between items</div>
  <p id="grid-instructions" className="sr-only">
    Navigate using arrow keys. Press Enter to select an item.
  </p>

  {products.map((product, index) => (
    <div key={product.id} aria-label={`${product.name}, $${product.price}`} role="gridcell">
      <ProductCard product={product} />
    </div>
  ))}
</Grid>
```

## 🧪 Testowanie

### Testy podstawowe

```tsx
import { render, screen } from '@testing-library/preact';
import { Grid, Row, Col } from 'preact-aurora-ui';

test('renderuje grid z elementami', () => {
  render(
    <Grid data-testid="grid">
      <div>Item 1</div>
      <div>Item 2</div>
    </Grid>,
  );

  expect(screen.getByTestId('grid')).toBeInTheDocument();
  expect(screen.getByText('Item 1')).toBeInTheDocument();
  expect(screen.getByText('Item 2')).toBeInTheDocument();
});

test('aplikuje właściwą liczbę kolumn', () => {
  render(
    <Grid columns={4} data-testid="grid">
      <div>Item</div>
    </Grid>,
  );

  const grid = screen.getByTestId('grid');
  expect(grid).toHaveStyle('grid-template-columns: repeat(4, 1fr)');
});
```

### Testy responsywnych kolumn

```tsx
test('col renderuje z responsive props', () => {
  render(
    <Col xs={12} sm={6} md={4} data-testid="col">
      Content
    </Col>,
  );

  const col = screen.getByTestId('col');
  expect(col).toHaveClass('col--xs-12');
  expect(col).toHaveClass('col--sm-6');
  expect(col).toHaveClass('col--md-4');
});
```

### Testy układu

```tsx
test('row wyrównuje kolumny', () => {
  render(
    <Row align="center" justify="between" data-testid="row">
      <Col>Col 1</Col>
      <Col>Col 2</Col>
    </Row>,
  );

  const row = screen.getByTestId('row');
  expect(row).toHaveClass('align-center');
  expect(row).toHaveClass('justify-between');
});
```

### Testy accessibility

```tsx
test('ma poprawne role ARIA', () => {
  render(
    <Grid role="grid" aria-label="Test grid">
      <div role="gridcell">Cell 1</div>
      <div role="gridcell">Cell 2</div>
    </Grid>,
  );

  expect(screen.getByRole('grid')).toHaveAttribute('aria-label', 'Test grid');
  expect(screen.getAllByRole('gridcell')).toHaveLength(2);
});
```

## 📚 Przykłady zaawansowane

### Grid z masonry layout

```tsx
function MasonryGrid() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gridAutoRows: '10px',
        gap: '10px',
      }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            gridRowEnd: `span ${Math.ceil(item.height / 10)}`,
          }}
        >
          <Card>{item.content}</Card>
        </div>
      ))}
    </div>
  );
}
```

### Grid z infinite scroll

```tsx
import { useInfiniteScroll } from 'preact-aurora-ui';

function InfiniteGrid() {
  const { items, isLoading, hasMore, loadMore } = useInfiniteScroll('/api/items');

  return (
    <div>
      <Grid columns={4} gap="20px">
        {items.map((item) => (
          <Card key={item.id}>{item.content}</Card>
        ))}
      </Grid>

      {isLoading && <div>Loading...</div>}

      <IntersectionObserver onIntersect={loadMore} disabled={!hasMore}>
        <div style={{ height: '20px' }} />
      </IntersectionObserver>
    </div>
  );
}
```

### Grid z drag & drop

```tsx
import { useSortable } from '@dnd-kit/sortable';

function SortableGrid() {
  const [items, setItems] = useState(initialItems);

  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <Grid columns={4} gap="16px">
          {items.map((item) => (
            <SortableItem key={item.id} id={item.id}>
              <Card>{item.content}</Card>
            </SortableItem>
          ))}
        </Grid>
      </SortableContext>
    </DndContext>
  );
}

function SortableItem({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}
```

## ❓ FAQ

**P: Jaka jest różnica między Grid a Row/Col?**  
O: Grid to nowoczesny CSS Grid, Row/Col to tradycyjny system 12-kolumnowy. Używaj Grid dla elastycznych układów, Row/Col dla standardowych layout'ów.

**P: Jak utworzyć równe wysokości w grid?**  
O: Użyj `align="stretch"` (domyślne) lub ustaw `grid-auto-rows: 1fr` w CSS.

**P: Czy mogę mieszać fixed i fluid kolumny?**  
O: Tak, użyj `columns="200px 1fr 100px"` lub podobnego CSS grid template.

**P: Jak obsłużyć overflow w grid?**  
O: Ustaw `min-width: 0` na grid items i używaj `overflow: hidden` lub `text-overflow: ellipsis`.

**P: Dlaczego grid nie jest responsywny?**  
O: Sprawdź czy `responsive={true}` jest ustawione lub zdefiniuj własne breakpointy w CSS.

**P: Jak utworzyć nested grid?**  
O: Po prostu umieść jeden Grid wewnątrz drugiego - każdy jest niezależny.

---

**Powiązane komponenty:**

- [Layout](../Layout/README.md) - Struktura aplikacji
- [Container](../Container/README.md) - Wrapper treści
- [Card](../Card/README.md) - Komponenty do grid layout
- [Row/Col](../Row/README.md) - Tradycyjny system kolumn

See [`Grid.module.scss`](./Grid.module.scss) for details.

## Accessibility

The `Grid` component provides basic accessibility features. Use ARIA attributes to provide more context.

## Testing

See [`Grid.test.tsx`](./Grid.test.tsx) for unit tests.

## Storybook

[Link to Storybook story](https://your-storybook-url.com/grid-component)

## FAQ

**Q: How do I create a grid container?**  
A: Set the `container` prop to `true`.

**Q: How do I create a grid item?**  
A: Set the `item` prop to `true`.

**Q: How do I control the spacing between grid items?**  
A: Use the `spacing` prop.

**Q: How do I control the number of columns spanned by a grid item on different screen sizes?**  
A: Use the `xs`, `sm`, `md`, `lg`, and `xl` props.

## Contribution

Contributions are welcome! Please follow the contribution guidelines in the repository.

## License

MIT
