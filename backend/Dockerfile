FROM node:14-alpine

WORKDIR /src
COPY package*.json ./
RUN npm install

COPY . .

COPY ./dist ./dist

CMD ["npm", "run", "start:dev"]