import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import sessionConfig from './.config/session.config.js';
import indexRoutes from './routes/index.routes.js'





const app = express();

dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors(
  {
    origin: 'https://project-manager-app-russell.netlify.app',
    // origin : 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true

  }

));

// required for the app when deployed to Heroku (in production)
app.set('trust proxy', 1)
app.use(sessionConfig);



//TODO INVESTIGAR HARDCODEO

app.use('/', indexRoutes);
app.use(function (err, req, res, next) {
  console.log("Global Error handler,some thing didnt work:", err.message)
  res.status(500).json({ devMesg: "global Error Handler", ErrorMessage: err.message })
})

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port': ${PORT}`)))
  .catch((error) => console.log(error.message));

