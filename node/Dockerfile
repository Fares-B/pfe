FROM node:lts

WORKDIR /api

RUN npm install -g npm@latest

RUN npm ci

COPY ./api/package.json ./

COPY ./api ./

EXPOSE 5173

CMD ["npm", "run", "start:prod"]