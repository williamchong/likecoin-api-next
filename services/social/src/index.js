import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import api from './api/social';
import internalApi from './api/internal/social';
import errorHandler from '../shared/middleware/errorHandler';

const app = express();
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;

app.set('port', port);

if (process.env.NODE_ENV === 'production') app.disable('x-powered-by');

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/internal', internalApi);
app.use(api);

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.use(errorHandler);

app.listen(port, host);

console.log(`Server listening on ${host}:${port}`); // eslint-disable-line no-console
