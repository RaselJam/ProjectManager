import express from 'express';
import tikcetsRoutes from '../routes/ticket.routes.js'


const router = express.Router();
//Nested router:Profile/tikets
router.use('/tickets', tikcetsRoutes);
router.get('/', (req, res) => {
  console.log('profile')
  res.status(200).json({ message: "ok" })
})

router.post('/', (req, res) => {
  const bdy = req.body.test;
  let body = JSON.parse(bdy);
  console.log(bdy)
  console.log(body.subTasks[0])

})
export default router;
