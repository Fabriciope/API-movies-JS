export default function (message, type) {
    const textAlert = document.getElementById('alert');
    textAlert.classList.add(type);
    textAlert.textContent = message;
}