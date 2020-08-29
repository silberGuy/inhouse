const mainContentWrapper = document.querySelector('#main-content');
const enterButton =  document.querySelector('#enter-button');
enterButton.addEventListener('click', showForm)
enterButton.addEventListener('touchstart', showForm);

function showForm() {
    mainContentWrapper.classList.add('show-back');
}