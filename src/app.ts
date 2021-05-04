/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express, { Application } from 'express';
import fileUpload from 'express-fileupload';
import swaggerUi from 'swagger-ui-express';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';

import dbConfig from './infra/config/database';
import TYPES from './types';
import ImageService from './presentation/services/images.services';

import './presentation/controllers/images.controller';

const container = new Container();

container.bind<ImageService>(TYPES.ImageService).to(ImageService);

const PORT = process.env.PORT || 8000;

const app: Application = express();

app.use(express.json());
app.use(express.static('public'));
app.use(fileUpload());

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json',
    },
  }),
);

const server = new InversifyExpressServer(container, null, { rootPath: '/api' }, app);

const appConfigured = server.build();

createConnection(dbConfig)
  .then((_connection) => {
    appConfigured.listen(PORT, () => {
      console.log('Server is running on port', PORT);
    });
  })
  .catch((err) => {
    console.log('Unable to connect to db', err);
    process.exit(1);
  });
