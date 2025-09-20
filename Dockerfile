FROM node:18-alpine

WORKDIR /src/app

COPY package*.json ./

RUN npm cache clean --force

RUN npm install --ignore-scripts

COPY . .

EXPOSE 3004

CMD ["npm", "run", "start:dev"]
