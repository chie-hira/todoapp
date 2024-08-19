const Task = require('../models/Task')

const getAllTasks = async (req, res) => {
  try {
    const allTasks = await Task.find({})
    res.status(200).json(allTasks)
    // res.status(200).json({ tasks: allTasks })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error })
  }
}

const createTask = async (req, res) => {
  try {
    const createTask = await Task.create(req.body)
    res.status(201).json({ task: createTask })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

const getTask = async (req, res) => {
  try {
    const getTask = await Task.findOne({ _id: req.params.id })

    if (!getTask) {
      return res.status(404).json({ message: `No task with id : ${req.params.id}` })
    }

    res.status(200).json(getTask)
    // res.status(200).json({ task: getTask })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

const updateTask = async (req, res) => {
  try {
    const updateTask = await Task.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true } // 新しいデータを返す
    )

    if (!updateTask) {
      return res.status(404).json({ message: `No task with id : ${req.params.id}` })
    }
    
    res.status(200).json({ task: updateTask })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

const deleteTask = async (req, res) => {  
  try {
    const deleteTask = await Task.findOneAndDelete({ _id: req.params.id })  

    if (!deleteTask) {
      return res.status(404).json({ message: `No task with id : ${req.params.id}` })
    }
    
    res.status(200).json({ task: deleteTask })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
}
