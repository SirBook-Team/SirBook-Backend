#!/bin/bash

# Create main project directory
mkdir sirbook-backend

# Navigate into the project directory
cd sirbook-backend

# Create source directory and subdirectories
mkdir -p src/{controllers,models,routes,middleware,config,services,utils}

# Create tests directory
mkdir tests

# Create other necessary files
touch .env .gitignore package.json LICENSE

# Output success message
echo "Directory structure for SirBook backend created successfully!"
