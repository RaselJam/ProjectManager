import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
 import sessionConfig from './.config/session.config.js';
import indexRoutes from './routes/index.routes.js'

import path from 'path';
//const {pathname: root} = new URL('../src', import.meta.url)


const app = express();

dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// required for the app when deployed to Heroku (in production)
app.set('trust proxy', 1)
app.use(sessionConfig);


app.set('view engine', 'hbs');
//TODO INVESTIGAR HARDCODEO
app.set('views', ('./views'));
app.use(express.static('public'))
app.use('/', indexRoutes);
app.use(function (err, req, res, next) {
  console.log("Global Error handler,some thing didnt work:", err.message)
  res.status(500).json({ devMesg:"global Error Handler",ErrorMessage: err.message })
})






const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port': ${PORT}`)))
  .catch((error) => console.log(error.message));

