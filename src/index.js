import SignaturePad from 'signature_pad';
import { getUser } from './users.js';

const mainContentWrapper = document.querySelector('#main-content');
const enterButton =  document.querySelector('#enter-button');
enterButton.addEventListener('click', showForm)
enterButton.addEventListener('touchstart', showForm);

const registerForm = document.querySelector('#registration-form');

async function showForm() {
    mainContentWrapper.classList.add('show-back');
    const user = await getUser();
    registerForm.elements['name'].value = user.displayName;
    registerForm.elements['email'].value = user.email;
}

const signatureCanvas = document.querySelector('#health-signature');
const signaturePad = new SignaturePad(signatureCanvas);
signatureCanvas.addEventListener('selectionstart', function (selectEvent) {
    selectEvent.stopPropagation();
    selectEvent.preventDefault();
});

registerForm.addEventListener('submit', async submitEvent => {
    submitEvent.preventDefault();
    const formData = new FormData(registerForm);
    const user = await getUser();
    await user.updateProfile({
        displayName: formData.get('name'),
    });
    await user.updateEmail(formData.get('email'));
});
