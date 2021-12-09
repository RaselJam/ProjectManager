import express from 'express';
import * as projectLogic from '../controllers/project.controller.js'

const router = express.Router();


router.get('/', async (req, res, next) => {
  try {

    if (req.session.currentUser.isSuper) {
      const allProjects = await projectLogic.getAllProject();
      res.json({ message: "OK", data: allProjects })
    }
    res.status(403).send({message:'Not Authorized, Contact Web master'});



  } catch (error) {
    next(error)
  }
})
router.post('/', async (req, res, next) => {
  try {
    const { name, description } = req.body;
    console.log("creating project :", name, description)
    const result = await projectLogic.createProject({ name, description, creator: req.session.currentUser._id, managers: [req.session.currentUser._id] })
    res.status(201).json({ message: 'ok', data: result })
  } catch (error) {
    next(error)
  }
})
router.post('/update/:id', async (req, res, next) => {
  try {
    const { name, description, creatorId, projectId } = req.body;
    const result = await projectLogic.updateProject(req.session.currentUser._id, { _id: projectId, name, description, creator: creatorId })
    res.status(202).json({ message: 'OK', data: result })
  } catch (error) {
    next(error)
  }
})
router.get('/user-projects-as-dev', async (req, res, next) => {
  try {
    const allProjects = await projectLogic.getDeveloperProjects(req.session.currentUser._id)
      .populate('developers');
    res.json({ message: "OK", data: allProjects })
  } catch (error) {
    next(error)
  }
})
router.get('/user-projects-as-manager', async (req, res, next) => {
  try {
    const allProjects = await projectLogic.getManagerProjects(req.session.currentUser._id)
      .populate('managers');
    res.json({ message: "OK", data: allProjects })
  } catch (error) {
    next(error)
  }
})
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
    console.log("Getting single Project :", req.params.id)
    const project = await projectLogic.getProjectById(req.params.id);
    if (project) res.json({ message: "OK", data: project })
    else res.status(404).json({ message: 'NotFound', data: null })
  } catch (error) {
    next(error)
  }
})
router.use(async (req, res, next) => {
  try {
    const userId = req.session.currentUser._id
    let { projectId } = req.body
    if (!projectId) throw new Error("Add projectId in your Request body")
    const project = await projectLogic.getProjectById(projectId)
    let amIIn = project.managers.some(elm => elm.equals(userId))
     console.log("Authorized as manager? : ", amIIn)
    if (amIIn) next();//All good continue
    else throw new Error("Un Authorized attempt, user must be  a Manager to have access, Contact Project creator")
  } catch (error) {
    next(error)
  }
})
router.post('/:id/add-dev', async (req, res, next) => {
  try {
    const { developerId } = req.body;
    console.log("Adding dev to project :", req.params.id, req.session.currentUser._id, developerId)
    const result = await projectLogic.addDevToProject(req.session.currentUser._id, req.params.id, developerId)
    console.log("result: ", result)
    if (result?.developers.includes(developerId)) {
      res.status(202).json({ message: 'ok', data: result })
    }
    else res.status(400).json({ message: 'FAILURE', data: result })
  } catch (error) {
    next(error)
  }
})
router.use(async (req, res, next) => {
  try {
    const userId = req.session.currentUser._id
    let { projectId } = req.body
    if (!projectId) throw new Error("Add projectId in your Request body")
    const project = await projectLogic.getProjectById(projectId)
    let amIIn = project.creator.equals(userId);
     console.log("Authorized as creator? : ", amIIn)
    if (amIIn) next();//All good continue
    else throw new Error("Un Authorized attempt, user must be  a Creator to have access. create your own project or contact the current creator get access right")
  } catch (error) {
    next(error)
  }
})
router.post('/:id/add-manager', async (req, res, next) => {
  try {

    const { managerId } = req.body;
    console.log("Adding manager to :", req.params.id)
    const result = await projectLogic.addManagerToProject(req.session.currentUser._id, req.params.id, managerId)
    console.log("result", result)
    if (result?.managers.includes(managerId)) {
      res.status(202).json({ message: 'ok', data: result })
    }
    else res.status(400).json({ message: 'FAILURE', data: result })
  } catch (error) {
    next(error)
  }
})
router.post('/:id/remove', async (req, res, next) => {
  try {
    console.log("trying to remove project id : ", req.params.id)
    const result = await projectLogic.removeProject(req.session.currentUser._id, req.params.id)
    res.status(202).json({ message: 'OK', data: result })
  } catch (error) {
    next(error)
  }


})




export default router;
