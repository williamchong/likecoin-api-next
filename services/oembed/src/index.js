import express from 'express';
import cors from 'cors';

import api from './api/oembed';
import errorHandler from '../../../middleware/errorHandler';

const app = express();
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;

app.set('port', port);

if (process.env.NODE_ENV === 'production') app.disable('x-powered-by');

app.use(cors());

app.use(api);

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.use(errorHandler);

app.listen(port, host);

console.log(`Server listening on ${host}:${port}`); // eslint-disable-line no-console
