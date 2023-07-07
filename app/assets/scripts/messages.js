const textAlert = document.getElementById('alert');

export default function (message, type) {
    textAlert.classList.add(type);
    textAlert.textContent = message;
}