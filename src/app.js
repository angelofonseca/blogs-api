/**
 * Este arquivo foi criado pela Trybe.
 * Modificado em 7 de Setembro de 2024.
 */

const express = require('express');
const { userController, categoryController, blogPostController } = require('./controllers');
const authorizationMiddleware = require('./middlewares/authorization.middleware');

const app = express();

app.get('/', (req, res) => {
  res.send();
});

app.use(express.json());

// User
app.post('/login', userController.login);
app.post('/user', userController.create);

// Authorizate
app.use(authorizationMiddleware);

app.get('/user', userController.findAll);
app.get('/user/:id', userController.find);
app.delete('/user/me', userController.remove);
// Category
app.post('/categories', categoryController.create);
app.get('/categories', categoryController.findAll);

// Post
app.get('/post/search', blogPostController.search);
app.post('/post', blogPostController.create);
app.get('/post', blogPostController.findAll);
app.get('/post/:id', blogPostController.find);
app.put('/post/:id', blogPostController.update);
app.delete('/post/:id', blogPostController.remove);

module.exports = app;
