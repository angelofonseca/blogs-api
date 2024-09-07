/**
 * Este arquivo foi criado pela Trybe.
 * Modificado em 7 de Setembro de 2024.
 */

const app = require('./app');

const port = process.env.API_PORT;

app.listen(port, () => console.log('ouvindo porta', port));
