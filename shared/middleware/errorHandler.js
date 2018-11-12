import { ValidationError } from '../ValidationError';

export default function errorHandler(err, req, res, next) {
  const msg = (err.response && err.response.data) || err.message || err;
  console.error(msg);
  if (res.headersSent) {
    return next(err);
  }
  if (err instanceof ValidationError) {
    return res.status(400).send(msg);
  }
  // Handle multer error
  if (err.code && err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).send('FILE_TOO_LARGE');
  }
  return res.sendStatus(500);
}
