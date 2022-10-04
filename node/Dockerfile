FROM node:lts

WORKDIR /api

COPY ./api/package.json ./

RUN npm install -g npm@latest

RUN yarn install

COPY ./api ./

EXPOSE 5173

CMD ["npm", "run", "start:nodemon"]