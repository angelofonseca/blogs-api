# Este arquivo foi criado pela Trybe.
# Editado dia 7 de setembro de 2024.

FROM node:16.14
RUN apt update
RUN apt install lsof
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY src src
COPY .eslintignore .
COPY .eslintrc.json .
COPY .sequelizerc .
COPY jest.config.js .