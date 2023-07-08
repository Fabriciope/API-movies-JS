const textAlert = document.getElementById('alert');

//refatora função para adaptar as mensagens de error para outras páginas ou locais da aplicação
export default function (message, type) {
    switch(type) {
        case 'SUCCESS':
            textAlert.classList.add('text-green-600');
            textAlert.textContent = message;
            break;
            case 'ERROR':
            textAlert.classList.add('text-red-600');
            textAlert.textContent = message;
            break;
    }
}