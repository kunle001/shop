# Build Stage
FROM node:16-alpine AS build
WORKDIR /app
COPY package*.json ./

# Install dependencies
RUN npm install

# Transpile TypeScript code using Babel
RUN npx babel src --out-dir dist --extensions .ts

# Runtime Stage
FROM node:16-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package*.json ./
RUN npm ci --only=production
CMD ["npm", "start"]
