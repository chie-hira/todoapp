const tasksDOM = document.querySelector(".tasks");
const formDOM = document.querySelector(".task-form");
const taskInputDOM = document.querySelector(".task-input");
const formAlertDOM = document.querySelector(".form-alert");

// タスクを表示する関数
const showTasks = async () => {
    try {
        // const tasks = await axios.get('/api/v1/tasks')
        const { data: tasks } = await axios.get("/api/v1/tasks");

        // タスクがない場合
        if (tasks.length === 0) {
            tasksDOM.innerHTML = `<h5 class="empty-list">タスクがありません</h5>`;
            return;
        }

        const allTasks = tasks
            .map((task) => {
                const { _id, name, completed } = task; // 分割代入、最近の書き方
                // console.log(name)
                // console.log(task.name); この方法もある

                return `
                  <div class="single-task ${completed && "task-completed"}">
                      <h5>
                          <span><i class="fa-regular fa-circle-check"></i></span>${name}
                      </h5>
                      <div class="task-links">
                          <!-- 編集リンク -->
                          <a href="edit.html?id=${_id}" class="edit-link">
                              <i class="fa-solid fa-pen-to-square"></i>
                          </a>
                          <!-- ゴミ箱リンク -->
                          <button type="button" class="delete-btn" data-id="${_id}">
                              <i class="fa-solid fa-trash-can"></i>
                          </button>
                      </div>
                  </div>
                  `;
            })
            .join("");

        tasksDOM.innerHTML = allTasks;
    } catch (error) {
        console.log(error);
    }
};

showTasks();

// タスクを追加する処理
formDOM.addEventListener("submit", async (e) => {
    e.preventDefault(); // ページのリロードを防ぐ

    const name = taskInputDOM.value;

    if (name.length > 20) {
        displayMessage("文字数が多すぎます", "text-alert");

        return;
    }

    try {
        await axios.post("/api/v1/tasks", {
            // name: name
            name, // 省略形
        });

        showTasks();
        taskInputDOM.value = "";
        displayMessage("タスクを追加しました", "text-success");
    } catch (error) {
        console.log(error);
        displayMessage("エラーが発生しました", "text-alert");
    }
});

// タスクを削除する処理
tasksDOM.addEventListener("click", async (e) => {
    const parentElement = e.target.parentElement;
    // console.log(element.parentElement);

    if (parentElement.classList.contains("delete-btn")) {
        const taskId = parentElement.dataset.id;

        try {
            await axios.delete(`/api/v1/tasks/${taskId}`);
            showTasks();
            displayMessage("タスクを削除しました", "text-success");
        } catch (error) {
            console.log(error);
            displayMessage("エラーが発生しました", "text-alert");
        }
    }
});

const hiddenMessage = () => {
    setTimeout(() => {
        formAlertDOM.style.display = "none";
        formAlertDOM.classList.remove("text-success");
        formAlertDOM.classList.remove("text-alert");
    }, 3000); // 3秒後にエラーメッセージを消す
};

const displayMessage = (message, addClass) => {
    formAlertDOM.classList.add(addClass); // クラスを追加して文字色を変える
    formAlertDOM.textContent = message;
    formAlertDOM.style.display = "block";

    hiddenMessage();
};
