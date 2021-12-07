import express from 'express';
import * as ticketLogic from '../controllers/ticket.controller.js'
import * as projectLogic from '../controllers/project.controller.js'



//Profile/tikets
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
//Authorization, only A user in a project has access to this area bellow:
router.use(async (req, res, next) => {

  try {
    const userId = req.session.currentUser._id
    let { projectId } = req.body
    if (!projectId) throw new Error("Add projectId in your Request body")
    const project = await projectLogic.getProjectById(projectId)
    let amIIn =
      project.developers.some(elm => elm.equals(userId)) ||
      project.managers.some(elm => elm.equals(userId)) ||
      project.creator.equals(userId);
    console.log("Authorized? : ", amIIn)
    if (amIIn) next();//All good continue
    else throw new Error("Un Authorized attempt, user must be in a project to have access, Contact your Project manager")
  } catch (error) {
    next(error)
  }
})
//profile/tickets/project/:id it returns all ticket of this project
router.get('/project/:id', async (req, res, next) => {
  try {
    const projectTickets = await ticketLogic.getThisProjectTickets(req.params.id)
    res.json({ message: "OK", data: projectTickets })
  } catch (error) {
    next(error)
  }
})

router.post('/take-it', async (req, res, next) => {
  try {
    const user = req.session.currentUser._id
    const { ticketId } = req.body;
    const result = await ticketLogic.takeThisTikcet(user, ticketId)
    res.status(202).json({ message: 'OK', data: result })
  } catch (error) {
    next(error)
  }
})
//Tasks part :
router.post('/add-task', async (req, res, next) => {
  try {
    const { name, description, ticketId } = req.body;
    console.log("adding Tast to ticketId is: ", ticketId)
    const result = await ticketLogic.addTask({ name, description, ticket: ticketId });
    console.log(result)
    res.status(201).json({ message: "OK", data: result })
  } catch (error) {
    next(error)
  }
})
router.post('/remove-task', async (req, res) => {
  console.log("removing task from Ticket")
  const { ticketId , projectId, taskId} = req.body
  try {

  } catch (error) {

  }

})
router.post('/', async (req, res, next) => {
  try {
    const { number, description, project, Predecessor } = req.body
    const creator = req.session.currentUser._id
    const result = await ticketLogic.createTicket({ number, description, project, Predecessor, creator })
    console.log(result)
    res.status(201).json({ message: 'OK', data: result })
  } catch (error) {
    next(error)
  }

})
export default router;
