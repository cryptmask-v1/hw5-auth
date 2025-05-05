import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    return res.status(err.status).send({
      message: err.message,
      status: err.status,
    });
  }

  res.status(500).send({
    message: 'Internal Server Error',
    status: 500,
  });
};
