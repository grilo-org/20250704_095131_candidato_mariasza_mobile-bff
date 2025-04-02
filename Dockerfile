# Dockerfile
FROM node:18-alpine

# Cria diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia os arquivos package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do projeto
COPY . .

# Expõe a porta padrão da aplicação
EXPOSE 3000

# Comando para iniciar o servidor em modo dev
CMD ["npm", "run", "start:dev"]
