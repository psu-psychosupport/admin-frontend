FROM node:18

RUN mkdir /admin
WORKDIR /admin

COPY . .

RUN npm install
RUN npx remix vite:build
RUN mv ./build/client /var/www/stoboi.damego.ru/html