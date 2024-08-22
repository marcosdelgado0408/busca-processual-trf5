# Etapa 1: Build do Angular
FROM node:21.7 as build
# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos package.json e package-lock.json
COPY package*.json ./

# Instala as dependências da aplicação
RUN npm install

# Copia o restante dos arquivos da aplicação
COPY . .

# Copia o arquivo de configuração de proxy
COPY proxy.conf.json /app/proxy.conf.json

# Expõe a porta em que o Angular vai rodar
EXPOSE 4200

# Comando para iniciar o servidor Angular com o proxy configurado
CMD ["npm", "run", "start", "--", "--proxy-config", "proxy.conf.json", "--host", "0.0.0.0"]