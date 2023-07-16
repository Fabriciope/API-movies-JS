function createBoxAlert() {
    const boxAlert = document.createElement('div');
    boxAlert.classList.add(
        "fixed",
        "z-50",
        "top-0",
        "w-full" ,
        "py-1",
        "text-center",
        "text-md",
        "font-medium",
        "text-zinc-100",
        "shadow-md"
    );
    return boxAlert;
}

function clearMessages() {
    const boxAlert = document.getElementById('alert');
    if(boxAlert) 
        boxAlert.remove();
    
}

export function makeErrorMessage(message) {
    clearMessages();

    const boxAlert = createBoxAlert();
    boxAlert.id = 'alert';
    boxAlert.classList.add('bg-red-600');
    boxAlert.textContent = message;

    document.body.prepend(boxAlert);
    
    setTimeout(clearMessages, 5000);
}

export function makeSuccessMessage(message) {
    clearMessages()

    const boxAlert = createBoxAlert();
    boxAlert.id = 'alert';
    boxAlert.classList.add('bg-green-600');
    boxAlert.textContent = message;
    
    document.body.prepend(boxAlert);

    setTimeout(clearMessages, 5000);
}
