import express from 'express';
import * as ticketLogic from '../controllers/ticket.controller.js'
import * as projectLogic from '../controllers/project.controller.js'
import * as commentLogic from '../controllers/comment.controller.js';



//Profile/tickets
const router = express.Router();

router.get('/', async (req, res, next) => {
  console.log("got in nested route")
  try {
    if (req.session.currentUser.isSuper) {
      const allTickets = await ticketLogic.getAllticket()
      res.json({ message: "OK", data: allTickets })
    }
    res.status(403).send({message:'Not Authorized, Contact Web master'});

  } catch (error) {
    next(error)
  }
})

router.get('/my-tickets', async (req, res, next) => {
  try {
    const userTickets = await ticketLogic.getallUserTickets(req.session.currentUser._id);
    let promiseArrTasks = userTickets.map(ticket => ticketLogic.getTikcetTasks(ticket._id))
    Promise.all(promiseArrTasks).then(data => {
      console.log(data, "promise all result")
      const result = data.map((elm, idx) => { return { ticket: userTickets[idx], tasks: elm } })
      return res.json({ message: "OK", data: result })
    })
      .catch(err => console.log(err))
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
router.get('/:id', async (req, res, next) => {
  try {
    const ticket = await ticketLogic.getTicketById(req.params.id);
    res.json({ message: 'OK', data: ticket })
  } catch (error) {
    next(error)
  }
})
router.get('/:id/comments', async (req, res, next) => {
  try {
    const comments = await commentLogic.getCommentsByTicket(req.params.id)
    res.json({ message: 'OK', data: comments })
  } catch (error) {
    next(error)
  }

})
router.post('/:id/comments', async (req, res) => {
  try {
    const { comment } = req.body;
    const result = commentLogic.createComment({ user: req.session.currentUser._id, ticket: req.params.id, comment })
    res.status(201).json({ message: 'OK', data: result })

  } catch (error) {
    next(error)
  }

})
//profile/tickets/project/:id it returns all tickets of this project
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
router.post('/remove-task', async (req, res, next) => {
  console.log("removing task from Ticket")
  const { ticketId, taskId } = req.body
  try {
    let removingTaskReult = await ticketLogic.removeTask(taskId);
    let updatedTiket = await ticketLogic.checkTasksStatusAndUpdateTicket(ticketId);
    res.status(202).json({ message: "OK", data: { removedTask: removingTaskReult, ticketIsDone: updatedTiket } })
  } catch (error) {
    next(error)
  }
})
router.post('/do-task', async (req, res, next) => {
  console.log("Doing Task...")
  const { ticketId, taskId } = req.body
  try {
    const taskResult = await ticketLogic.doTask(taskId);
    console.log("taskResult :", taskResult)
    const ticketResult = await ticketLogic.checkTasksStatusAndUpdateTicket(ticketId);
    res.status(202).json({ message: "OK", data: { taskDone: taskResult, ticketIsDone: ticketResult } })
  } catch (error) {
    next(error)
  }
})
router.post('/undo-task', async (req, res, next) => {
  console.log("Un Doing Task...")
  const { ticketId, taskId } = req.body
  try {
    const taskResult = await ticketLogic.unDoTask(taskId);
    const ticketResult = await ticketLogic.checkTasksStatusAndUpdateTicket(ticketId);
    res.status(202).json({ message: "OK", data: { taskUnDone: taskResult, ticketIsDone: ticketResult } })
  } catch (error) {
    next(error)
  }
})
//profile/tickets/tasks

//Create Ticket :
router.post('/', async (req, res, next) => {
  try {
    let { number, description, projectId, Predecessor } = req.body
    Predecessor = Predecessor === '' ? null : Predecessor
    const creator = req.session.currentUser._id
    const result = await ticketLogic.createTicket({ number, description, project: projectId, Predecessor, creator })
    console.log(result)
    res.status(201).json({ message: 'OK', data: result })
  } catch (error) {
    next(error)
  }
})
export default router;
