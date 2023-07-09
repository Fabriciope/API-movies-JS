const textAlert = document.getElementById('alert');

// TODO: refatora função para adaptar as mensagens de error para outras páginas ou locais da aplicação
// TODO: arrumar cor das mensagens
export function makeErrorMessage(message) {
    textAlert.classList.add('text-red-600');
    textAlert.textContent = message;
}

export function makeSuccessMessage(message) {
    textAlert.classList.add('text-green-600');
    textAlert.textContent = message;
}