import express from 'express';
import authRoutes from './auth.routes.js';
import profileRoutes from './profile.router.js'
import projectRoutes from './project.routes.js'

const router = express.Router();
router.get('/', (req, res) => {
  res.json({
    //
    "INFO": {
      "name": "Project ManagerAPI", "version": 0.1, style:"RPC",  "author": {
        "name": "rasul Jam ", Socials: { "github": "https://github.com/RaselJam", "LinkedIn": "https://www.linkedin.com/in/rasul-jam-6b3343205/", "Email": "rasel.jam.h@gmail.com" }
      }
    },
    "Endpoints": [
      { auth: [{ 'POST:auth/signeup': "signup" }, { 'POST:auth/login': "login" }, { "GET:auth/logout": "logout" }] },
      {
        profile: [
          { 'GET:profile': "profile page" },
          { 'GET:profile/my-tickets': "all tikcets taken by current user if any" },
          { 'GET:profile/tickets/': 'get All Tickets in db, Only available for WEBMASTER ADMIN', 'req.body': ['projectId'] },
          { 'GET:profile/tickets/project/:id': 'All tikcet of a given Project.user MUST be in the Project as  one of creator/manager/developer', 'req.body': ['projectId'] },
          { 'POST:profile/tickets/take-it': 'asign a given tikcet to current user, user must be in project as developer', 'req.body': ['projectId', 'tikcetId'] },
          { 'POST:profile/tickets/add-task': 'asign to given ticket new task, user must be in project as manager', 'req.body': ['projectId', 'tikcetId', 'name', 'description'] },
          { 'POST:profile/tickets/do-task': 'asign given task as done(it will check the parent ticket and asign Done if there is not any more task left)user must had taken the ticken in first place', 'req.body': ['projectId', 'ticketId', 'taskId'] },
          { 'POST:profile/tickets/undo-task': 'asign given task as unDone(it will check the parent ticket and asign unDone).user must had taken the ticken in first place', 'req.body': ['projectId', 'ticketId', 'taskId'] },
          { 'POST:profile/tickets/': 'create a new Tikcet, user must be Manager', 'req.body': ['projectId', 'number', 'description', { 'Predecessor': "an optional previous tikcketId" }] },
          { 'POST:profile/tickets/remove-task': 'remove a task from a given ticket.  user must be Manager', 'req.body': ['projectId', 'tikcetId', 'taskId'] },
          { 'GET:profile/tickets/:id': 'get Single Ticket,user MUST be in the Project as  one of creator/manager/developer', 'req.body': ['projectId'] },
          { 'GET:profile/tickets/:id/comments': 'get All Commnets under a given Tikcet', 'req.body': ['projectId'] },
          { 'POST:profile/tickets/:id/comments': 'post a new Commnets under a given Tikcet', 'req.body': ['comment','projectId'] },
        ]
      },
      {
        Projects: [
          { 'GET:/projects/': "All Projects, Only available for WEBMASTER ADMIN" },
          { 'GET:/projects/user-projects-as-dev': "All Projects related to given user as developer" },
          { 'GET:/projects/user-projects-as-manager': "All Projects related to given user as manager" },
          { 'GET:/projects/user-projects-as-creator': "All Projects related to given user as manager, the creator is a manager by default any way on creation. but here is an specific endpoint if user update a project after creation" },

          { 'GET:/projects/:id': "Single Project, User must be realated to the project" },
          { 'POST:/projects/': "Create a new Project", 'req.body': ['name', 'description'] },
          { 'POST:/projects/:id/add-dev': "add new dev to the Project, User must be  manager", 'req.body': ['developerId'] },
          { 'POST:/projects/:id/add-manager': "add new manager to the Project, User must be  creator", 'req.body': ['managerId'] },
          { 'POST:/projects/:id/remove': "remove the project from DB (there is no roling back, make sure).user must be  creator", 'req.body': ['projectId'] },
          { 'POST:/projects/update/:id/': "update the project .Here it is possible to chnage the creator by proving  new creatorId.the current creator will lose its ownership, but still will be as manager/developer.user must be  creator", 'req.body': ['name', 'description', 'projectId' ,{ 'creatorId ': 'this is optional, and it will chnage the owner ship and access privlage to new user' }] },
        ]
      }
    ]
  })
});
router.use('/auth', authRoutes)
router.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.status(401).json({ message: "un-Authorized access, login first" })
  }
})
router.use('/profile', profileRoutes)
router.use('/projects', projectRoutes)


export default router;
