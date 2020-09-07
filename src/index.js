import SignaturePad from 'signature_pad';

const mainContentWrapper = document.querySelector('#main-content');
const enterButton =  document.querySelector('#enter-button');
enterButton.addEventListener('click', showForm)
enterButton.addEventListener('touchstart', showForm);

function showForm() {
    mainContentWrapper.classList.add('show-back');
}

const signatureCanvas = document.querySelector('#health-signature');
const signaturePad = new SignaturePad(signatureCanvas);
signatureCanvas.addEventListener('selectionstart', function (selectEvent) {
    selectEvent.stopPropagation();
    selectEvent.preventDefault();
});
 

window.signaturePad = signaturePad;
