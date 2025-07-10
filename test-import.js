// Test sprawdzający czy import renderWithTheme działa poprawnie
import { renderWithTheme } from './dist/test-utils/renderWithTheme.js';
import { Button } from './dist/Button/index.js';

console.log('✅ Import renderWithTheme działa!', typeof renderWithTheme);
console.log('✅ Import Button działa!', typeof Button);

// Test renderWithTheme
try {
  // Ten kod nie będzie działał bez DOM, ale sprawdzi czy import się udaje
  console.log('✅ Import test-utils zakończony sukcesem!');
} catch (error) {
  console.error('❌ Błąd:', error);
}
