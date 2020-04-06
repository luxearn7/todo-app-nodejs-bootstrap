const express = require('express')
const router = express.Router()
const taskModel = require('../models/taskModel')

//Get all tasks
router.get('/', async function(req, res, next) {
    // let search = {}
    // if(req.query.task != null && req.query.task !='') {
    //     search.task = new RegExp(req.query.task, 'i')
    //}
    try {
        const tasks = await taskModel.find({})
        res.render('taskView', {tasks: tasks})
        //res.render('taskView', {tasks: tasks})
    } catch {
        res.redirect('/')
    }
})

router.get('/:id', async function(req, res, next) {
    try {
        const task = await taskModel.findById(req.params.id)
        const tasks = await taskModel.find({})
        res.render('taskView', {tasks: tasks})
        //res.render('taskView', {tasks: tasks})
    } catch {
        res.render('taskView', {
            errorMessage: 'Error creating Task'
        })
    }
})

//Edit a task
router.get('/edit/:id', async function(req, res, next) {
    try {
        const task = await taskModel.findById(req.params.id)
        res.render('editView', {task: task})
    } catch {
        res.redirect('/task')
    }
})

//Add a task
router.post('/', async function(req, res, next) {
    const taskClient = new taskModel({
        task: req.body.task
    })
    try {
        const newTask = await taskClient.save()
        res.redirect('/task')
    } catch {
        const tasks = await taskModel.find({})
        res.render('taskView', {tasks: tasks, errorMessage: 'You must write a task'})
    }
})

//Edit task
router.put('/edit/:id', async function(req, res, next) {
    let task
    try {
        task = await taskModel.findById(req.params.id)
        task.task = req.body.task
        await task.save()
        // 
        res.redirect('/task')
    } catch {
        if (task == null) {
            res.redirect('/task')
          } else {
            res.render('editView', {
              task: task,
              errorMessage: 'Error updating Task'
            })
          }
    }
})
//Delete task
router.delete('/:id', async function(req, res, nect) {
    let task
    try {
        task =await taskModel.findById(req.params.id)
        await task.remove()
        res.redirect('/task')
    } catch {
        if(task == null) {
            res.redirect('/task')
        }
        res.redirect('/task')
    }
})

module.exports = router