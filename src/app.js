const express = require('express');
const { userController, categoryController, blogPostController } = require('./controllers');
const authorizationMiddleware = require('./middlewares/authorization.middleware');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.post('/login', userController.login);
app.post('/user', userController.create);

app.use(authorizationMiddleware);

app.get('/user', userController.findAll);
app.get('/user/:id', userController.find);

// Category
app.post('/categories', categoryController.create);
app.get('/categories', categoryController.findAll);

// Post
app.post('/post', blogPostController.create);
app.get('/post', blogPostController.findAll);
app.get('/post/:id', blogPostController.find);
app.put('/post/:id', blogPostController.update);
app.delete('/post/:id', blogPostController.remove);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
