#!/bin/bash
# Konwertuj wszystkie pliki .md w docs/ na .html (prosty markdown -> html)
# Wymaga: markdown-cli (npm install -g markdown-cli)

for file in docs/*.md; do
  [ -e "$file" ] || continue
  base="${file%.md}"
  markdown "$file" > "$base.html"
done
