const button = document.querySelector("button");

button.addEventListener("click", () => {
    alert(`Размеры экрана: ${window.screen.width}х${window.screen.height}`);
});