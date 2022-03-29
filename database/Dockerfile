FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma migrate dev

CMD [ "npm", "start" ]