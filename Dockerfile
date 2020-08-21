FROM node:10.16.0-alpine

ENV NODE_ENV=production

RUN mkdir /app
WORKDIR /app
RUN apk --update add graphicsmagick
RUN apk --update add ghostscript
COPY package.json package-lock.json ./

RUN npm install --production

COPY . .

CMD ["npm", "run", "dev"]