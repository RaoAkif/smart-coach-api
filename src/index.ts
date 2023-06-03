import express, { Express } from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoute from "./routes/auth";
import userRoute from "./routes/users";
import postsRoute from "./routes/posts";
import corsOptions from './config/corsOptions';

const app: Express = express();

app.use(cors(corsOptions))

app.use(express.json());

app.use(cookieParser())

dotenv.config();

// ROUTES PRISMA
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postsRoute);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(colors.green.bold.underline(`[Server]: Server running at PORT ${PORT} | http://localhost:${PORT}/`))
})