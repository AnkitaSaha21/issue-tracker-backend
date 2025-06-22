// // routes/project.js
// const express = require('express')
// const Project = require('../models/Project')
// const router = express.Router()

// router.post('/', async (req, res) => {
//   try {
//     const project = await Project.create(req.body)
//     res.status(201).json(project)
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// })

// module.exports = router
const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { createProject, getProjects, updateProject, deleteProject } = require('../controllers/projectController')
const checkRole = require('../middlewares/checkRole')
const checkUserType = require('../middlewares/checkUserType')
const router = express.Router()

router.post('/',authMiddleware ,checkUserType('manager'),createProject)
router.get('/', authMiddleware,getProjects)
router.put('/:id',authMiddleware,checkUserType('manager'), updateProject)
router.delete('/:id',authMiddleware, checkUserType('manager'), deleteProject)

module.exports = router

