#!/bin/bash

# Build the application
echo "Building the application..."
npm run build

# Run type checks
echo "Running type checks..."
npm run typecheck

# Run tests if you have them
# echo "Running tests..."
# npm run test

# Deploy to Vercel
echo "Deploying to Vercel..."
vercel --prod

# Run database migrations
echo "Running database migrations..."
npx prisma db push

echo "Deployment complete! 🚀" 