import express from 'express';
import * as ticketLogic from '../controllers/ticket.controller.js'



const router = express.Router();

router.get('/all', async (req, res, next) => {
  console.log("got in nested route")
  try {
    if (req.session.currentUser.isSuper) {
      const allTickets = await ticketLogic.getAllticket()
      res.json({ message: "OK", data: allTickets })
    }
    throw new Error("Not Authorized, Contact Web master")

  } catch (error) {
    next(error)
  }
})

router.get('/my-tickets', async (req, res, next) => {
  try {
    const userTickets = await ticketLogic.getallUserTickets(req.session.currentUser._id);
    console.log(userTickets)
    return res.json({ message: "OK", data: userTickets })
  } catch (error) {
    next(error)
  }


})


router.post('/', async(req, res, next)=>{
 const{number,description,project,Predecessor} = req.body


})



export default router;
