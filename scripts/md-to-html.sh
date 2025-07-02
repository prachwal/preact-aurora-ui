#!/bin/bash
# Konwertuj wszystkie pliki .md w docs/ na .html (prosty markdown -> html)
# Wymaga: markdown-cli (jako devDependency)

for file in docs/*.md; do
  [ -e "$file" ] || continue
  base="${file%.md}"
  npx markdown-cli "$file" > "$base.html"
done
