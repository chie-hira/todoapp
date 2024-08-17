const tasksDOM = document.querySelector(".tasks")
const formDOM = document.querySelector(".task-form")
const taskInputDOM = document.querySelector(".task-input")

// タスクを表示する関数
const showTasks = async () => {
    try {
        // const tasks = await axios.get('/api/v1/tasks')
        const { data: tasks } = await axios.get("/api/v1/tasks");
        // console.log(tasks);

        // タスクがない場合
        if (tasks.length === 0) {
            tasksDOM.innerHTML = `<h5 class="empty-list">タスクがありません</h5>`
            return
        }

        const allTasks = tasks.map((task) => {
                const { _id, name, description } = task // 分割代入、最近の書き方
                // console.log(name)
                // console.log(task.name); この方法もある

                return `
                  <div class="single-task">
                      <h5>
                          <span><i class="fa-regular fa-circle-check"></i></span>${name}
                      </h5>
                      <div class="task-links">
                          <!-- 編集リンク -->
                          <a href="#" class="edit-link">
                              <i class="fa-solid fa-pen-to-square"></i>
                          </a>
                          <!-- ゴミ箱リンク -->
                          <button type="button" class="delete-btn" data-id="${_id}">
                              <i class="fa-solid fa-trash-can"></i>
                          </button>
                      </div>
                  </div>
                  `;
            }).join("")

            tasksDOM.innerHTML = allTasks
    } catch (error) {
        console.log(error)
    }
}

showTasks()

// タスクを追加する処理
formDOM.addEventListener("submit", async (e) => {
    e.preventDefault() // ページのリロードを防ぐ

    const name = taskInputDOM.value

    try {
        await axios.post("/api/v1/tasks", {
            // name: name
            name // 省略形
        })

        taskInputDOM.value = ""
        showTasks()
    } catch (error) {
        console.log(error)
    }
} )

// タスクを削除する処理
tasksDOM.addEventListener("click", async (e) => {
    const parentElement = e.target.parentElement
    // console.log(element.parentElement);
    
    if (parentElement.classList.contains("delete-btn")) {
        const taskId = parentElement.dataset.id

        try {
            await axios.delete(`/api/v1/tasks/${taskId}`)
            showTasks()
        } catch (error) {
            console.log(error)
        }
    }
} )
