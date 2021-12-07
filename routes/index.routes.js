import express from 'express';
import authRoutes from './auth.routes.js';
import profileRoutes from './profile.router.js'
import projectRoutes from './project.routes.js'

const router = express.Router();
router.get('/', (req, res) => {
  res.json({
    "Endpoints": [
      {
        'publics': [
          { 'GET/': 'index', 'res': 'API Map' },
          { 'POST/auth': 'login', 'res': 'success/failure' },
          { 'POST/auth/signup': 'signup', 'res': 'success/failure' }
        ],
        'protected': [
          { 'GET/profile': 'user in session', 'res.data': 'user object' },
          { 'GET/projects': 'all projects in DB', 'res.data': 'Array[project]' },
          { 'GET/projects/:id': 'single Porject if exist', 'res.data': 'project/null' },
          { 'POST/projects/': 'Create and return single Project if success', 'res.data': 'project/Global Error Handler' },
          { 'POST/projects/:id': 'update and return single Project if success', 'res.data': 'project/Global Error Handler' },
          { 'POST/projects/:id/addManager': 'Add manager to exisiting project and return if success', 'res.data': 'project/Error obj' },

        ]
      }]
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
