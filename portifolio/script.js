const menu = document.querySelector('#menu ul'); 
const button = document.getElementById('button-toggle')

function toggleMenu() {

    const open = '<svg width="32" height="32" viewBox="0 0 100 80" fill="white" xmlns="http://www.w3.org/2000/svg"> <rect width="100" height="10" rx="5"></rect><rect y="30" width="100" height="10" rx="5"></rect><rect y="60" width="100" height="10" rx="5"></rect></svg>'

    const closed = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>'
    
    if(!button || !menu) return;

    console.log(button)

    button.classList.contains("close") ? button.innerHTML = closed : button.innerHTML = open;

    button.classList.toggle('close')
    menu.classList.toggle('close');
}


