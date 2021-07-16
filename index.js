const express = require('express');

require('dotenv').config()

const app = express();

const PORT = process.env.PORT || 3000;

const labsRouter = require('./routes/labsRoutes');
const examesRouter = require('./routes/examesRoutes');

app.get('/', (_req, res) => {
  res.send('ola')
})

app.use('/labs', labsRouter);

app.use('/exames', examesRouter);

app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`))