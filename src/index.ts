import express, { Express, Request, Response } from 'express';
const app: Express = express();

import dotenv from 'dotenv';
dotenv.config();

import colors from 'colors';


app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(colors.green.bold.underline(`[Server]: Server running at PORT ${PORT} | http://localhost:${PORT}/`))
})