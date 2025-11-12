#!/usr/bin/env bash
# Create a .env.local from .env.example if one does not exist.
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
EXAMPLE="$ROOT_DIR/.env.example"
TARGET="$ROOT_DIR/.env.local"

if [ ! -f "$EXAMPLE" ]; then
  echo "Error: .env.example not found at $EXAMPLE"
  exit 1
fi

if [ -f "$TARGET" ]; then
  echo ".env.local already exists at $TARGET — leaving it unchanged."
  exit 0
fi

cp "$EXAMPLE" "$TARGET"
echo "Created .env.local from .env.example at $TARGET"
echo "Please open .env.local and fill in any secret values (SANITY tokens, NEXTAUTH_SECRET, etc.)."
