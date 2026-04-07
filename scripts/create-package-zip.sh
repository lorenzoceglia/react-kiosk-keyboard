#!/bin/bash

# Create a package tarball for local testing

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "🔨 Building library..."
cd "$PROJECT_ROOT"
pnpm build

echo "📦 Creating package tarball..."
mkdir -p "$PROJECT_ROOT/releases"

VERSION=$(node -p "require('./package.json').version")
PACKAGE_NAME="react-kiosk-keyboard-$VERSION.tgz"
TARBALL_PATH="$PROJECT_ROOT/releases/$PACKAGE_NAME"

# Create a temporary directory for packaging
TEMP_DIR=$(mktemp -d)
PACKAGE_DIR="$TEMP_DIR/package"
mkdir -p "$PACKAGE_DIR"

# Copy only what's needed
cp "$PROJECT_ROOT/package.json" "$PACKAGE_DIR/"
cp "$PROJECT_ROOT/README.md" "$PACKAGE_DIR/"
cp "$PROJECT_ROOT/LICENSE" "$PACKAGE_DIR/"
cp -r "$PROJECT_ROOT/dist" "$PACKAGE_DIR/"

# Create tarball
cd "$TEMP_DIR"
tar -czf "$PACKAGE_NAME" package/
mv "$PACKAGE_NAME" "$TARBALL_PATH"

# Cleanup
rm -rf "$TEMP_DIR"

echo "✅ Package created: $TARBALL_PATH"
echo ""
echo "📋 To install locally in another project:"
echo "  npm install $TARBALL_PATH"
echo ""
echo "Or use file: in package.json:"
echo '  "@lorenzo.ceglia/react-kiosk-keyboard": "file:'"$TARBALL_PATH"'"'
echo ""
echo "📦 Tarball contents:"
tar -tzf "$TARBALL_PATH"
