const express = require('express');
const { userController, categoryController, blogPostController } = require('./controllers');
const authMiddleware = require('./middlewares/auth.middleware');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.post('/login', userController.login);
app.post('/user', userController.create);
app.get('/user', authMiddleware, userController.findAll);
app.get('/user/:id', authMiddleware, userController.find);

// Category
app.post('/categories', authMiddleware, categoryController.create);
app.get('/categories', authMiddleware, categoryController.findAll);

// Post
app.post('/post', authMiddleware, blogPostController.create);
app.get('/post', authMiddleware, blogPostController.findAll);
app.get('/post/:id', authMiddleware, blogPostController.find);
app.put('/post/:id', authMiddleware, blogPostController.update);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
