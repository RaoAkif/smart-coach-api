import express, { Express } from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import corsOptions from './config/corsOptions';

import authRoute from "./routes/auth";
import coachRoute from "./routes/coaches";
import playerRoute from "./routes/players";
import teamRoute from "./routes/teams";
import eventRoute from "./routes/events";

import swagger from './swagger'; // Import the Swagger module

const app: Express = express();

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

swagger(app); // Invoke the Swagger module passing the app instance

dotenv.config();

// ROUTES PRISMA
app.use(authRoute);
app.use("/api/coaches", coachRoute);
app.use("/api/players", playerRoute);
app.use("/api/teams", teamRoute);
app.use("/api/events", eventRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(colors.green.bold.underline(`[Server]: Server running at PORT ${PORT} | http://localhost:${PORT}/`));
});

export default app;
