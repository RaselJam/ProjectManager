import session from 'express-session';
import dotenv from 'dotenv';

dotenv.config();
export default session({
  secret: process.env.SESS_SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: {
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60000 * 60  // 60 * 1000 ms === 1 min *60 : 1h
  }
})