import express from 'express';
import * as userLogic from '../controllers/auth.controller.js'


const router = express.Router();

router.post('/signup', async (req, res, next) => {
  const { userName, password } = req.body;
  //TODO ADD validation on recived data
  try {
    const newUser = await userLogic.signup({ userName, password })
    console.log("message got from controler on signup:", newUser)
    res.status(201).json({ message: 'OK', data: newUser })
  } catch (error) {
    next(error)
  }
})
router.post('/login', async (req, res, next) => {
  const { userName, password } = req.body;

  try {
    const user = await userLogic.login({ userName, password })
    if (user) {
      req.session.currentUser = user;
      res.json({ message: 'OK', data: user })
    }
    else {
      req.session.currentUser = null;
      res.json({ message: 'Incorrect User-name/password' })
    }
  } catch (error) {
    next(error)
  }
})
router.get('/logout', async (req, res, next) => {
  console.log("trying loging out")
  req.session.destroy(err => {
    if (err) next(err);
    res.status(200).json({ message: "ok" });
  })

})

router.get('/islogedin', (req, res, next) => {
  console.log("checking if loged In")
  try {
    (req.session.currentUser) ?
      res.json({ message: 'OK', data: req.session.currentUser }) :
      res.json({ message: 'Unauthorized', data:null })
  } catch (error) {
    next(error)
  }
})

export default router;
