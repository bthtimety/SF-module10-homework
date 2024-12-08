const chatDialog = document.querySelector(".chat__dialog");
const buttonSend = document.querySelector(".interface__button-send");
const buttonGeolocation = document.querySelector(".interface__button-geolocation");
const chatInput = document.getElementById("input");

let isFirstMessage = true;

const webSocket = new WebSocket("https://echo.websocket.org/");

webSocket.onmessage = (message) => {
    if (isFirstMessage) {
        isFirstMessage = false;
        return;
    }
    sendMessage(message.data, true);
}

function sendMessage(message, isEcho = false) {
    const messageItem = document.createElement("div");
    messageItem.innerHTML = isEcho ? `Сервер: ${message}` : `Вы: ${message}`;
    chatDialog.appendChild(messageItem);
    chatDialog.scrollTop = chatDialog.scrollHeight;
}

const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    sendMessage(
        `<a href="https://www.openstreetmap.org/#map=18/${latitude}/${longitude}" target="_blank">Ваша геолокация</a>`,
        true
    );
};

const error = () => {
    sendMessage("Не удалось получить местоположение", true);
};

buttonSend.addEventListener("click", () => {
    const message = chatInput.value;
    if (message) {
        sendMessage(message);
        webSocket.send(message);
        chatInput.value = "";
    }
});

buttonGeolocation.addEventListener("click", () => {
    sendMessage("Гео-локация");
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        sendMessage("Геолокация не поддерживается", true);
    }
});