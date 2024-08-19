const params = window.location.search
const id = new URLSearchParams(params).get('id')
const taskIdDOM = document.querySelector('.task-edit-id')
const taskNameDOM = document.querySelector('.task-edit-name')
const taskCompletedDOM = document.querySelector('.task-edit-completed')
const editFormDOM = document.querySelector('.single-task-form')
import { displayMessage } from './common.js';


const showTask = async () => {
  try {
    const { data: task } = await axios.get(`/api/v1/tasks/${id}`)

    const { _id, name, completed } = task

    taskIdDOM.textContent = _id
    taskNameDOM.value = name
    if (completed) {
      taskCompletedDOM.setAttribute('checked', 'checked')
      // taskCompletedDOM.checked = true // この方法でもOK
    }
  } catch (error) {
    console.log(error)
  }
}

showTask()

// タスクの編集
editFormDOM.addEventListener('submit', async (e) => {
  e.preventDefault() // ページのリロードを防ぐ

  const taskName = taskNameDOM.value
  const taskCompleted = taskCompletedDOM.checked

  if (taskName.length > 20) {
    displayMessage('文字数が多すぎます', 'text-alert')

    return
  }

  try {
    const { data: task } = await axios.patch(`/api/v1/tasks/${id}`, {
      name: taskName,
      completed: taskCompleted
    })

    displayMessage('タスクを編集しました', 'text-success')

    setTimeout(() => {
      window.location.replace('./index.html')
    }, 1000)
  } catch (error) {
    console.log(error)
  }
})
