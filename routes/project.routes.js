import express from 'express';
import * as projectLogic from '../controllers/project.controller.js'

const router = express.Router();


router.get('/', async (req, res, next) => {
  try {

    if (req.session.currentUser.isSuper) {
      const allProjects = await projectLogic.getAllProject();
      res.json({ message: "OK", data: allProjects })
    }
    throw new Error("Not Authorized, Contact Web master")

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
//FIXME Get the CreatorId from server current user , instead of Client side.
router.post('/', async (req, res, next) => {
  try {
    const { name, description } = req.body;
    console.log("creating project :", name, description, creator)
    const result = await projectLogic.createProject({ name, description, creator: req.session.currentUser._id })
    res.json({ message: 'ok', data: result })
  } catch (error) {
    next(error)
  }
})

router.post('/:id', async (req, res, next) => {
  try {
    const { name, description, creator } = req.body;
    const result = await projectLogic.updateProject({ name, description, creator })
    res.json({ message: 'OK', data: result })
  } catch (error) {
    next(error)
  }
})
router.post('/:id/adddev', async (req, res, next) => {
  try {
    //TODO add logic to accept An array of devs and add them all together

    const { creatorId, developerId } = req.body;
    console.log("Adding dev to project :", req.params.id, creatorId, developerId)
    const result = await projectLogic.addDevToProject(creatorId, req.params.id, developerId)
    console.log("result: ", result)
    if (result?.developers.includes(developerId)) {
      res.json({ message: 'ok', data: result })
    }
    else res.status(400).json({ message: 'FAILURE', data: result })
  } catch (error) {
    next(error)
  }
})

router.post('/:id/addmanager', async (req, res, next) => {
  try {
    //TODO add logic to accept An array of managers and add them all together

    const { creatorId, managerId } = req.body;
    console.log("Adding manager to :", req.params.id)
    const result = await projectLogic.addManagerToProject(creatorId, req.params.id, managerId)
    if (result?.managers.includes(managerId)) {
      res.json({ message: 'ok', data: result })
    }
    else res.status(400).json({ message: 'FAILURE', data: result })
  } catch (error) {
    next(error)
  }
})


export default router;
