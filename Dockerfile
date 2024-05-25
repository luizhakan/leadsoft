FROM node:20

RUN apt-get update && apt-get install -y postgresql postgresql-contrib

USER root

WORKDIR /usr/src/app/frontend
COPY frontend/package*.json ./
RUN npm install

RUN npx vite --version

WORKDIR /usr/src/app/backend
COPY backend/package*.json ./
RUN npm install

WORKDIR /usr/src/app
COPY . .

EXPOSE 5173 5000 5432

CMD ["/bin/bash", "-c", "service postgresql start && cd /usr/src/app/backend && npm start & cd /usr/src/app/frontend && npm run dev"]