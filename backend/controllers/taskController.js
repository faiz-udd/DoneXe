const asynHandler = require('express-async-handler');
const Task = require('../models/taskModel');

//Get tasks
const getTasks = asynHandler(async (req, res)=>{
    const tasks = await Task.find({user: req.user.id});
    res.status(200).json(tasks);
})

//create Tasks
const createTask =asynHandler(async (req, res)=>{
    if(!req.body.text){
        res.status(400)
        throw new Error('Please Enter a Task');       
    }
    const task = await Task.create({ text: req.body.text, user:req.user.id })
    res.status(200).json(task);
});

//Update Tasks
const updateTask = asynHandler(async (req, res)=>{
    const task = await Task.findById(req.params.id)
    if (!task) {
        res.status(400)
        throw new Error('Task not found')
    }
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('No such user found')
    }
    if (task.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User is not authorized to update')
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedTask)
});

//Delete Tasks
const deleteTask = asynHandler(async (req, res)=>{
    const task = await Task.findById(req.params.id)
    if (!task) {
        res.status(400)
        throw new Error('Task not found')
    }

    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('No such user found')
    }
    if (task.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User is not authorized to update')
    }
    
    await Task.findByIdAndDelete(req.params.id)
    res.status(200).json({ id: req.params.id })
});


module.exports  = {getTasks, createTask, updateTask,deleteTask}