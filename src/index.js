import SignaturePad from 'signature_pad';
import { getUser, getUserData, setUserData } from './users.js';

const PENDING_TIME = 60 * 60 * 1000; // 1 Hour
const mainContentWrapper = document.querySelector('#main-content');
const showFormButton =  document.querySelector('#show-form-btn');

const registerForm = document.querySelector('#registration-form');
const enterButton = document.querySelector('#enter-btn');
const pendingButton = document.querySelector('#pending-btn');
const signatureCanvas = document.querySelector('#health-signature');
window.signatureCanvas = signatureCanvas;

showFormButton.addEventListener('click', showForm);
showFormButton.addEventListener('touchstart', showForm);

const signaturePad = new SignaturePad(signatureCanvas);
signatureCanvas.addEventListener('selectionstart', function (selectEvent) {
    selectEvent.stopPropagation();
    selectEvent.preventDefault();
});

pendingButton.addEventListener('click', async () => {
    await saveFormDataToUser({ pendingStart: new Date() });
    await updateForm();
});

enterButton.addEventListener('click', async () => {
    await saveFormDataToUser({ entered: true });
});

async function saveFormDataToUser({ pendingStart, entered }) {
    const formData = new FormData(registerForm);
    const user = await getUser();
    await user.updateProfile({
        displayName: formData.get('name'),
    });
    await user.updateEmail(formData.get('email'));
    setUserData(user.uid, {
        username: formData.get('name'),
        signatureBase64: signaturePad.toDataURL(),
        entered: !!entered,
        pendingStart: +pendingStart,
    });
}

async function showForm() {
    mainContentWrapper.classList.add('show-back');
    await updateForm();
}

async function updateForm() {
    const user = await getUser();
    const data = await getUserData(user.uid);
    registerForm.elements['name'].value = user.displayName;
    registerForm.elements['email'].value = user.email;
    const now = new Date();
    if (now - data.pendingStart < PENDING_TIME) {
        pendingButton.classList.add('hidden');
    }
    if (data.signatureBase64) {
        const img = new Image();
        img.src = data.signatureBase64;
        img.onload = function() {
            signatureCanvas.getContext('2d').drawImage(img,0,0);
        };
    }
}