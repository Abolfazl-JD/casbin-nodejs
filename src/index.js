require('reflect-metadata');
const express = require('express');
const { createConnection } = require('typeorm');
const articleRoutes = require('./routes/articleRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
const casbinMiddleware = require('./casbinMiddleware');
const { AppDataSource } = require('../data-source')
const { initCasbin } = require("./casbin")

const app = express();

app.use(express.json());


AppDataSource.initialize().then(async () => {
  console.log('Database connected');

  await initCasbin()
  app.use(casbinMiddleware);

  app.use('/api', articleRoutes);
  app.use('/api', mediaRoutes);

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}).catch(error => console.log(error));
