console.log(document.forms[0]);

document.forms[0].addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log(event)
});