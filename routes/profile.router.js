import express from 'express';
import tikcetsRoutes from '../routes/ticket.routes.js'
import * as userLogic from '../controllers/auth.controller.js';
import * as tikcetLogic from '../controllers/ticket.controller.js';
import * as projectLogic from '../controllers/project.controller.js'
import * as helper from '../helpers/helper.js'




const router = express.Router();
//Nested router:Profile/tikets
router.use('/tickets', tikcetsRoutes);



router.get('/', async (req, res, next) => {
  const userId = req.session.currentUser._id
  console.log('profile user ID, getting related projects ... : ', userId);
  try {
    const relatedProjects = await projectLogic.getRelatedProjects(userId)
    const takenTickets = await tikcetLogic.getallUserTickets(userId)
    const [done, notDone] =helper.splitArrayBasedOnProp(takenTickets, 'isDone')
    res.json({
      message: 'OK',
      data: {
        projects: { asCreator: relatedProjects[0], asManager: relatedProjects[1], asDev: relatedProjects[2] },
        tickets: { done, notDone }
      }
    })
  } catch (error) {
    next(error)
  }

})


export default router;
//helpers:
