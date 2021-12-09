import express from 'express';
import tikcetsRoutes from '../routes/ticket.routes.js'


const router = express.Router();
//Nested router:Profile/tikets
router.use('/tickets', tikcetsRoutes);
router.get('/', (req, res) => {
  console.log('profile')
  res.json({ message: "ok" })
})


export default router;
