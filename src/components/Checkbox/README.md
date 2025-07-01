# Checkbox

Komponent pola wyboru zgodny z Material Design 3, oferujący pełne wsparcie dla stanów checked, unchecked i indeterminate, wraz z zaawansowaną walidacją i możliwościami stylowania.

## Opis

`Checkbox` to komponent umożliwiający użytkownikom wielokrotny wybór opcji z listy. Obsługuje wszystkie stany Material Design 3, automatyczne zarządzanie fokusem, walidację oraz stany indeterminate dla hierarchicznych list. Komponent może działać w trybie kontrolowanym lub niekontrolowanym i zapewnia pełną dostępność.

## Przykłady użycia

### 1. Podstawowe checkboxy

Proste pola wyboru z etykietami i różnymi stanami.

```tsx
import { Checkbox } from 'preact-aurora-ui';

// Podstawowy checkbox
<Checkbox label="Zaakceptuj regulamin" />

// Z pomocniczym tekstem
<Checkbox
  label="Subskrybuj newsletter"
  helperText="Otrzymuj informacje o nowościach i promocjach"
/>

// Wymagany checkbox
<Checkbox
  required
  label="Akceptuję warunki użytkowania"
  helperText="To pole jest wymagane"
/>

// Checkbox z błędem
<Checkbox
  error
  label="Nieprawidłowa opcja"
  helperText="Proszę skorygować ten wybór"
/>
```

### 2. Kontrolowany vs niekontrolowany

Zarządzanie stanem checkboxa zewnętrznie lub wewnętrznie.

```tsx
// Niekontrolowany - komponent zarządza własnym stanem
<Checkbox
  defaultChecked={true}
  label="Zapamiętaj mnie"
  onChange={(e) => console.log('Changed:', e.currentTarget.checked)}
/>;

// Kontrolowany - stan zarządzany przez rodzica
function ControlledExample() {
  const [agreed, setAgreed] = useState(false);

  return (
    <Checkbox
      checked={agreed}
      onChange={(e) => setAgreed(e.currentTarget.checked)}
      label="Wyrażam zgodę na przetwarzanie danych"
      helperText={agreed ? 'Dziękujemy za zgodę' : 'Zgoda jest wymagana'}
    />
  );
}

// Grupa kontrolowanych checkboxów
function MultiSelectExample() {
  const [preferences, setPreferences] = useState({
    email: false,
    sms: false,
    push: false,
  });

  const handleChange = (key: keyof typeof preferences) => (e: Event) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: (e.currentTarget as HTMLInputElement).checked,
    }));
  };

  return (
    <div>
      <h3>Powiadomienia</h3>
      <Checkbox checked={preferences.email} onChange={handleChange('email')} label="Email" />
      <Checkbox checked={preferences.sms} onChange={handleChange('sms')} label="SMS" />
      <Checkbox
        checked={preferences.push}
        onChange={handleChange('push')}
        label="Push notifications"
      />
    </div>
  );
}
```

### 3. Rozmiary i kolory

Różne warianty wizualne dopasowane do kontekstu.

```tsx
// Różne rozmiary
<Checkbox size="small" label="Mały checkbox" />
<Checkbox size="medium" label="Średni checkbox (domyślny)" />
<Checkbox size="large" label="Duży checkbox" />

// Różne kolory
<Checkbox color="primary" label="Podstawowy (domyślny)" />
<Checkbox color="secondary" label="Drugorzędny" />
<Checkbox color="error" label="Błąd" />

// Kombinacje rozmiarów i kolorów
<Checkbox
  size="large"
  color="secondary"
  label="Duży checkbox drugorzędny"
/>
```

### 4. Stan indeterminate

Checkbox w stanie "częściowo zaznaczony" dla hierarchicznych list.

```tsx
// Prosty indeterminate
<Checkbox indeterminate label="Częściowo wybrane" helperText="Niektóre opcje są zaznaczone" />;

// Checkbox nadrzędny z kontrolą podrzędnych
function HierarchicalList() {
  const [items, setItems] = useState([
    { id: 1, name: 'Opcja 1', checked: false },
    { id: 2, name: 'Opcja 2', checked: true },
    { id: 3, name: 'Opcja 3', checked: false },
  ]);

  const checkedCount = items.filter((item) => item.checked).length;
  const isAllChecked = checkedCount === items.length;
  const isIndeterminate = checkedCount > 0 && checkedCount < items.length;

  const handleParentChange = (e: Event) => {
    const checked = (e.currentTarget as HTMLInputElement).checked;
    setItems((prev) => prev.map((item) => ({ ...item, checked })));
  };

  const handleItemChange = (id: number) => (e: Event) => {
    const checked = (e.currentTarget as HTMLInputElement).checked;
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, checked } : item)));
  };

  return (
    <div>
      <Checkbox
        checked={isAllChecked}
        indeterminate={isIndeterminate}
        onChange={handleParentChange}
        label="Wybierz wszystkie"
      />
      <div style={{ marginLeft: '24px', marginTop: '8px' }}>
        {items.map((item) => (
          <Checkbox
            key={item.id}
            checked={item.checked}
            onChange={handleItemChange(item.id)}
            label={item.name}
          />
        ))}
      </div>
    </div>
  );
}
```

### 5. Stany disabled i readonly

Nieaktywne checkboxy w różnych stanach.

```tsx
// Disabled w różnych stanach
<Checkbox disabled label="Wyłączony (unchecked)" />
<Checkbox disabled checked label="Wyłączony (checked)" />
<Checkbox disabled indeterminate label="Wyłączony (indeterminate)" />

// Disabled z helper text
<Checkbox
  disabled
  checked
  label="Opcja niedostępna"
  helperText="Ta funkcja jest tymczasowo niedostępna"
/>

// Readonly behavior (visually disabled but accessible)
<Checkbox
  checked
  label="Tylko do odczytu"
  onChange={(e) => e.preventDefault()}
  style={{ pointerEvents: 'none', opacity: 0.6 }}
/>
```

### 6. Walidacja i formularze

Integracja z walidacją formularzy i komunikaty błędów.

```tsx
// Checkbox z walidacją
function ValidatedCheckbox() {
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: Event) => {
    const checked = (e.currentTarget as HTMLInputElement).checked;
    setAccepted(checked);

    if (checked) {
      setError('');
    } else {
      setError('Musisz zaakceptować regulamin');
    }
  };

  return (
    <Checkbox
      checked={accepted}
      onChange={handleChange}
      error={!!error}
      required
      label="Akceptuję regulamin"
      helperText={error || 'Przeczytaj i zaakceptuj regulamin'}
    />
  );
}

// Grupa checkboxów z walidacją
function PreferencesForm() {
  const [preferences, setPreferences] = useState({
    marketing: false,
    analytics: false,
    necessary: true, // zawsze wymagane
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!preferences.necessary) {
      newErrors.necessary = 'Niezbędne pliki cookie są wymagane';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form valid:', preferences);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <h3>Ustawienia plików cookie</h3>

      <Checkbox
        checked={preferences.necessary}
        onChange={(e) =>
          setPreferences((prev) => ({
            ...prev,
            necessary: (e.currentTarget as HTMLInputElement).checked,
          }))
        }
        error={!!errors.necessary}
        required
        label="Niezbędne"
        helperText={errors.necessary || 'Wymagane do działania strony'}
      />

      <Checkbox
        checked={preferences.analytics}
        onChange={(e) =>
          setPreferences((prev) => ({
            ...prev,
            analytics: (e.currentTarget as HTMLInputElement).checked,
          }))
        }
        label="Analityczne"
        helperText="Pomagają nam poprawić jakość strony"
      />

      <Checkbox
        checked={preferences.marketing}
        onChange={(e) =>
          setPreferences((prev) => ({
            ...prev,
            marketing: (e.currentTarget as HTMLInputElement).checked,
          }))
        }
        label="Marketingowe"
        helperText="Pozwalają na personalizację reklam"
      />

      <button type="submit">Zapisz preferencje</button>
    </form>
  );
}
```

### 7. Checkboxy w listach i tabelach

Zastosowania w strukturach danych i interfejsach zarządzania.

```tsx
// Lista z możliwością wielokrotnego wyboru
function TaskList() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Przygotować prezentację', completed: false },
    { id: 2, title: 'Wysłać email do klienta', completed: true },
    { id: 3, title: 'Zaktualizować dokumentację', completed: false },
  ]);

  const handleTaskToggle = (id: number) => (e: Event) => {
    const completed = (e.currentTarget as HTMLInputElement).checked;
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, completed } : task)));
  };

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <div>
      <h3>
        Lista zadań ({completedCount}/{tasks.length} ukończonych)
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {tasks.map((task) => (
          <div
            key={task.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px',
              backgroundColor: task.completed ? '#f0f8f0' : '#fff',
              borderRadius: '4px',
              border: '1px solid #e0e0e0',
            }}
          >
            <Checkbox
              checked={task.completed}
              onChange={handleTaskToggle(task.id)}
              aria-label={`Oznacz zadanie "${task.title}" jako ukończone`}
            />
            <span
              style={{
                marginLeft: '8px',
                textDecoration: task.completed ? 'line-through' : 'none',
                opacity: task.completed ? 0.6 : 1,
              }}
            >
              {task.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Tabela z zaznaczalnymi wierszami
function DataTable() {
  const [data] = useState([
    { id: 1, name: 'Jan Kowalski', email: 'jan@example.com', role: 'Admin' },
    { id: 2, name: 'Anna Nowak', email: 'anna@example.com', role: 'User' },
    { id: 3, name: 'Piotr Wiśniewski', email: 'piotr@example.com', role: 'Moderator' },
  ]);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const isAllSelected = selectedIds.length === data.length;
  const isIndeterminate = selectedIds.length > 0 && selectedIds.length < data.length;

  const handleSelectAll = (e: Event) => {
    const checked = (e.currentTarget as HTMLInputElement).checked;
    setSelectedIds(checked ? data.map((item) => item.id) : []);
  };

  const handleSelectRow = (id: number) => (e: Event) => {
    const checked = (e.currentTarget as HTMLInputElement).checked;
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((selectedId) => selectedId !== id),
    );
  };

  return (
    <div>
      <h3>Użytkownicy ({selectedIds.length} zaznaczonych)</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>
              <Checkbox
                checked={isAllSelected}
                indeterminate={isIndeterminate}
                onChange={handleSelectAll}
                aria-label="Zaznacz wszystkie wiersze"
              />
            </th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Imię</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Rola</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              style={{
                borderBottom: '1px solid #e0e0e0',
                backgroundColor: selectedIds.includes(item.id) ? '#f3f4f6' : 'transparent',
              }}
            >
              <td style={{ padding: '12px' }}>
                <Checkbox
                  checked={selectedIds.includes(item.id)}
                  onChange={handleSelectRow(item.id)}
                  aria-label={`Zaznacz wiersz ${item.name}`}
                />
              </td>
              <td style={{ padding: '12px' }}>{item.name}</td>
              <td style={{ padding: '12px' }}>{item.email}</td>
              <td style={{ padding: '12px' }}>{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedIds.length > 0 && (
        <div
          style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#e3f2fd',
            borderRadius: '4px',
          }}
        >
          Zaznaczono {selectedIds.length} element(ów).
          <button style={{ marginLeft: '8px' }}>Usuń zaznaczone</button>
        </div>
      )}
    </div>
  );
}
```

### 8. Integracja z formularzami HTML

Native HTML forms i obsługa danych formularza.

```tsx
// Formularz HTML z checkboxami
function NativeForm() {
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    // Checkbox values
    const newsletter = formData.has('newsletter');
    const terms = formData.has('terms');
    const categories = formData.getAll('categories');

    console.log({ newsletter, terms, categories });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Rejestracja</h3>

      <div style={{ marginBottom: '16px' }}>
        <TextField name="email" label="Email" type="email" required fullWidth />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <Checkbox name="newsletter" value="yes" label="Chcę otrzymywać newsletter" />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <h4>Interesujące kategorie:</h4>
        <Checkbox name="categories" value="tech" label="Technologia" />
        <Checkbox name="categories" value="business" label="Biznes" />
        <Checkbox name="categories" value="lifestyle" label="Lifestyle" />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <Checkbox
          name="terms"
          value="accepted"
          required
          error={false} // można dodać walidację
          label="Akceptuję regulamin"
        />
      </div>

      <button type="submit">Zarejestruj się</button>
    </form>
  );
}
```

## Storybook

[Link to Storybook story](https://your-storybook-url.com/checkbox)

## FAQ

**Q: How do I handle the checkbox state?**  
A: Use the `checked` and `onChange` props to manage the checkbox state in your component.

**Q: How do I disable the checkbox?**  
A: Use the `disabled` prop.

## Contribution

Contributions are welcome! Please follow the contribution guidelines in the repository.

## License

MIT
