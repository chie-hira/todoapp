const { get } = require("../routes/tasks")

const getAllTasks = (req, res) => {
  res.json([
    { id: 1, name: 'Task 1' },
    { id: 2, name: 'Task 2' },
    { id: 3, name: 'Task 3' }
  ])
}

const createTask = (req, res) => {
  res.json({ message: 'Create task' })
}

const getTask = (req, res) => {
  res.json({ id: req.params.id, name: `Task ${req.params.id}` })
}

const updateTask = (req, res) => {
  res.json({ message: `Update task ${req.params.id}` })
}

const deleteTask = (req, res) => {  
  res.json({ message: `Delete task ${req.params.id}` })
}

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
}
