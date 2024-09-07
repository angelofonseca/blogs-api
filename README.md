# Blogs API

API e banco de dados para produção de conteúdo de um blog utilizando operações CRUD seguindo os princípios do REST.
É utilizado o JWT para verificar autoridade ao usar a API.

## Técnologias usadas

Back-end:
> Desenvolvido usando: NodeJS, ExpressJS, Sequelize, MYSQL, CommonJS.

## Créditos

Este projeto inclui arquivos e recursos desenvolvidos pela [Trybe](https://www.betrybe.com/).

Agradecimentos especiais à Trybe por fornecer a base para este projeto.


## Instalação

1. Clone o repositório e instale as dependências:

   ```bash
   git clone git@github.com:angelofonseca/blogs-api.git
   cd blogs-api
   npm i

## Iniciando a aplicação no Docker Compose

1. Inicie os containers do compose `blogs_api` e `blogs_api_db`.
2. O docker-compose deve estar na versão 1.29 ou superior.

 - A aplicação estará disponível em `http://localhost:3001` em modo de desenvolvimento
   
    ```bash
    docker-compose up -d --build
    docker exec -it blogs_api bash

3. Instale as dependências dentro do container.

  ```bash
    npm i