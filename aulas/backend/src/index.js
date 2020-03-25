const express = require('express');

const app = express();

const routes = require('./routes'); //recebe as rotas do routes.js

app.use(express.json());
app.use(routes);

/**
 * Metodos HTTP:
 *  GET - Buscar uma informação do back-end
 *  POST - Criar uma informação do back-end
 *  PUT - Alterar informação no back-end
 *  DELETE - Deletar uma informação no back-end
 */

 /*
 tipos de parametros

 QUERY: parametros nomeados enviados na rota apos o simbolo de ? servem para (filtros, paginação)
 Route: parametros utilizados para identificar recursos

 request Body: Corpo da requisição, utilizado apra criar ou alterar recursos
 */

/**
 * comunicação com o banco de dados
 * 
 * Driver: SELECT * FROM users
 * 
 * Query Builder: table('users').select() etc
 */



app.listen(3333);