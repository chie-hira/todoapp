const formAlertDOM = document.querySelector(".form-alert");

const hiddenMessage = () => {
    setTimeout(() => {
        formAlertDOM.style.display = "none";
        formAlertDOM.classList.remove("text-success");
        formAlertDOM.classList.remove("text-alert");
    }, 3000); // 3秒後にエラーメッセージを消す
};

export const displayMessage = (message, addClass) => {
    formAlertDOM.classList.add(addClass); // クラスを追加して文字色を変える
    formAlertDOM.textContent = message;
    formAlertDOM.style.display = "block";

    hiddenMessage();
};
