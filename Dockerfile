FROM node:alpine

WORKDIR /app
COPY package.json ./
RUN npm install --only=prod

COPY ./ ./

# Install TypeScript globally
RUN npm install -g typescript

# Add a build step
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
