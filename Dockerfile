# Usa a imagem oficial do Node.js
FROM node:20

# Define o diretório de trabalho no container
WORKDIR /usr/src/app

# Copia apenas arquivos de dependências primeiro (para cache de build)
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Expõe a porta usada pelo servidor Express
EXPOSE 3000

# Define variáveis padrão (podem ser sobrescritas no docker-compose ou .env)
ENV PORT=3000
ENV POSTGRES_HOST=postgres-db
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=policia_db

# Comando para iniciar a aplicação
CMD ["sh", "-c", "npx knex migrate:latest && npx knex seed:run --specific=agentes.js && npx knex seed:run --specific=casos.js && node server.js"]