import 'reflect-metadata';

import express from 'express';
import routes from './routes';

import bodyParser from 'body-parser';
import './database';

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(routes);

app.listen(3333);

