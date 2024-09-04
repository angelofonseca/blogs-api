const express = require('express');
const { userController, categoryController } = require('./controllers');
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

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
