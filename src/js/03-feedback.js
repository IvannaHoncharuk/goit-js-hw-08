import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const emailRef = document.querySelector('[name="email"]');
const messageRef = document.querySelector('[name="message"]');

const feedbackFormState = { email: '', message: '' };
let localStorageData = localStorage.getItem('feedback-form-state');
const parsedLocalStorageData = JSON.parse(localStorageData);

if (localStorageData) {
  feedbackFormState.email = parsedLocalStorageData.email;
  feedbackFormState.message = parsedLocalStorageData.message;
}

formRef.addEventListener('input', throttle(saveInputToLocal, 500));
formRef.addEventListener('submit', onSubmitAction);
fillFieldsWithSavedData();

function saveInputToLocal(event) {
  if (event.target.name === 'email') {
    feedbackFormState.email = event.target.value;
  } else if (event.target.name === 'message') {
    feedbackFormState.message = event.target.value;
  }
  localStorage.setItem(
    'feedback-form-state',
    JSON.stringify(feedbackFormState)
  );
}

function fillFieldsWithSavedData() {
  if (parsedLocalStorageData) {
    emailRef.value = parsedLocalStorageData.email;
    messageRef.value = parsedLocalStorageData.message;
  }
}

function onSubmitAction(event) {
  event.preventDefault();
  const {
    elements: { email, message },
  } = event.currentTarget;

  if (email.value === '' || message.value === '') {
    return alert('Заполните все поля');
  }

  console.log(feedbackFormState);
  feedbackFormState.email = '';
  feedbackFormState.message = '';
  event.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
}
