FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --production

COPY server ./server
EXPOSE 8080
CMD ["node", "server/index.js"]
