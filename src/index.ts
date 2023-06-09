import express, { Express } from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import corsOptions from './config/corsOptions';
import path from 'path';

import authRoute from "./routes/auth";
import userRoute from "./routes/users";
import playerRoute from "./routes/players";
import rosterRoute from "./routes/rosters";
import eventRoute from "./routes/events";

const app: Express = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors(corsOptions))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(cookieParser())

dotenv.config();

// ROUTES PRISMA
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/players", playerRoute);
app.use("/api/rosters", rosterRoute);
app.use("/api/events", eventRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(colors.green.bold.underline(`[Server]: Server running at PORT ${PORT} | http://localhost:${PORT}/`))
})

module.exports = app