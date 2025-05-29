# Makefile for web_api backend

.PHONY: install build start dev clean

# Default goal
all: install build start

# Install dependencies using pnpm
install:
	pnpm install

# Build the TypeScript code
build:
	pnpm run build

# Start the application
start:
	pnpm start

# Start the application in development mode (with hot-reloading if configured)
dev:
	pnpm run dev

# Clean build artifacts
clean:
	rm -rf dist 