const express = require('express');
const router = express.Router();

//import CRUD operations from taskController
const {getTasks, createTask, updateTask, deleteTask} = require('../controllers/taskController')
const { protect } = require('../middleware/authMiddleware')

//get Tasks from Backend
router.get('/',protect, getTasks);
//Post Route
router.post('/',protect, createTask);
//Update Route
router.put('/:id',protect, updateTask);
//Delete Task
router.delete('/:id',protect, deleteTask);

module.exports = router;