import {isEscapeKey, isEnterKey} from './util.js';
import {renderThumbnail} from './thumbnail.js';

const picturesContainer = document.querySelector('.pictures');
const userModalElement = document.querySelector('.picture');
const userModalElementOpen = document.querySelector('.big-picture');
const userModalElementClose = userModalElementOpen.querySelector('.big-picture__cancel');
const bigPicture = userModalElementOpen.querySelector('.big-picture__img');


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

function openUserModal () {
  userModalElementOpen.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeUserModal () {
  userModalElementOpen.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

const onListClick = function(evt){
  picturesContainer.addEventListener('click', (evt) => {
    if (event.target.closest('.picture')) {
      openUserModal();
    }
  });

  picturesContainer.addEventListener('change', onListClick);
};


onListClick();

userModalElementClose.addEventListener('click', () => {
  closeUserModal();
});

userModalElementClose.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeUserModal();
  }
});


/*
*/

/*


function openUserModal () {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeUserModal () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

userModalElement.addEventListener('click', () => {
  openUserModal();
});

userModalElement.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    openUserModal();
  }
});

userModalElementClose.addEventListener('click', () => {
  closeUserModal();
});

userModalElementClose.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeUserModal();
  }
});
*/


/*for(const userModalElement of userModalElements){
  userModalElement.addEventListener('click', () => {
    userModalElementOpen.classList.remove('hidden');
  });
}

userModalElement.forEach(
  console.log


);
*/
