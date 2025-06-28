# Linting and Formatting Configuration

This document describes the linting and formatting setup for the Aurora UI library.

## Overview

The project uses:

- **ESLint** for code linting and quality checks
- **Prettier** for code formatting
- **EditorConfig** for consistent editor settings across teams

## Configuration Files

### ESLint Configuration (`eslint.config.js`)

The project uses the new ESLint flat config format with the following setup:

- **TypeScript support** with `@typescript-eslint/eslint-plugin`
- **Preact/React rules** via `eslint-plugin-preact`
- **Import organization** with `eslint-plugin-import`
- **Unused imports removal** with `eslint-plugin-unused-imports`
- **Prettier integration** with `eslint-plugin-prettier`

Key features:

- Prettier rules are set to `warn` instead of `error` to allow auto-fixing
- Import ordering is enforced with proper grouping
- TypeScript-specific rules for better code quality
- Unused variables are warned (with `_` prefix exception)

### Prettier Configuration (`.prettierrc`)

Prettier is configured with the following settings:

```json
{
  "printWidth": 100,
  "tabWidth": 2,
  "singleQuote": true,
  "trailingComma": "all",
  "semi": true,
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

### EditorConfig (`.editorconfig`)

EditorConfig ensures consistent formatting across different editors:

- 2-space indentation
- LF line endings
- UTF-8 encoding
- Automatic trailing whitespace removal
- Final newline insertion

## Available Scripts

### Linting

```bash
# Check for linting errors
npm run lint

# Fix linting errors automatically
npm run lint:fix
```

### Formatting

```bash
# Format all files
npm run format

# Check if files are formatted correctly
npm run format:check
```

### Type Checking

```bash
# Run TypeScript type checking
npm run type-check
```

## IDE Integration

### VS Code

For optimal experience in VS Code, add these settings to your workspace or user settings:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "eslint.format.enable": true,
  "eslint.workingDirectories": ["./"],
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

Required extensions:

- ESLint (`dbaeumer.vscode-eslint`)
- Prettier (`esbenp.prettier-vscode`)
- EditorConfig (`editorconfig.editorconfig`)

## Troubleshooting

### Common Issues

1. **"Delete `·`" errors**: These indicate trailing whitespace. Run `npm run format` to fix automatically.

2. **Import order violations**: ESLint will warn about incorrect import ordering. Use `npm run lint:fix` to auto-fix.

3. **Unused imports**: The `unused-imports` plugin will automatically remove unused imports when running `npm run lint:fix`.

### Pre-commit Setup (Optional)

To automatically format and lint code before commits, you can add a pre-commit hook:

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run format && npm run lint:fix && npm run type-check"
    }
  }
}
```

## Integration with CI/CD

The linting and formatting checks should be part of your CI pipeline:

```yaml
- name: Lint and Format Check
  run: |
    npm run lint
    npm run format:check
    npm run type-check
```

This ensures code quality and consistency across all contributions.
