FROM node:14 as servidor_mapas

WORKDIR /usr/src/app

COPY package.json ./
COPY tsconfig.json ./

COPY ./src ./src
COPY ./prisma ./prisma
COPY ./@types ./@types

RUN npm install --force
RUN npm run prisma:gen
RUN npm run build

ENV DATABASE_URL="mysql://root:@Cj08310799@127.0.0.1:3306/servidor_mapas"
ENV PORT=8888

EXPOSE 80
EXPOSE 443
EXPOSE 8080

CMD ["npm", "start"]