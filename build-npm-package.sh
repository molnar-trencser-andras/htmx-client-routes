#!/bin/bash

# Build script for htmx-client-routes npm package

# Ensure script exits on error
set -e

echo "Building htmx-client-routes npm package..."

# Install required dependencies
echo "Installing dependencies..."
pnpm install -D -w rimraf rollup rollup-plugin-terser rollup-plugin-typescript2

# Clean dist directory
echo "Cleaning dist directory..."
rm -rf dist

# Copy package.json for npm
echo "Copying package.json..."
cp package.npm.json package.json.tmp

# Build the package
echo "Building package..."
pnpm exec tsc --project tsconfig.npm.json
pnpm exec rollup -c

# Create a temporary directory for testing the package
echo "Creating test directory..."
mkdir -p tmp/test-package

# Copy the built files to the test directory
echo "Copying built files to test directory..."
cp -r dist tmp/test-package/
cp package.npm.json tmp/test-package/package.json
cp README.npm.md tmp/test-package/README.md

echo "Package built successfully!"
echo "Test package is available in tmp/test-package/"
echo ""
echo "To publish to npm:"
echo "1. Review the files in tmp/test-package/"
echo "2. Run: cd tmp/test-package && pnpm publish"
echo ""
echo "To test locally:"
echo "1. Run: cd tmp/test-package && pnpm link --global"
echo "2. In your project: pnpm link --global htmx-client-routes"
