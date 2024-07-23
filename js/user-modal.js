import {isEscapeKey, isEnterKey} from './util.js';
import {createPhotoPosts} from './thumbnail.js';


const picturesContainer = document.querySelector('.pictures');
const userModalOpen = document.querySelector('.big-picture');
const userModalClose = userModalOpen.querySelector('.big-picture__cancel');

const listComment = userModalOpen.querySelector('.social__comments');

const commentTemplate = document.querySelector('#comment').content;
const comment = commentTemplate.querySelector('.social__comment');
const commentFragment = document.createDocumentFragment();

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};


const renderComments = (comments) =>{
  comments.forEach(({avatar, name, message}) => {
    const commentItem = comment.cloneNode(true);

    const commentData = commentItem.querySelector('.social__picture');
    commentData.src = avatar;
    commentData.alt = name;
    commentItem.querySelector('.social__text').textContent = message;

    commentFragment.appendChild(commentItem);
  });
  listComment.appendChild(commentFragment);
};


const dataTransferInModal = (post) => {
  userModalOpen.querySelector('.big-picture__image').src = post.url;
  userModalOpen.querySelector('.social__caption').textContent = post.description;
  userModalOpen.querySelector('.likes-count').textContent = post.likes;
  userModalOpen.querySelector('.social__comment-total-count').textContent = post.likes.length;
  renderComments(post.comments);

  openUserModal();
};


picturesContainer.addEventListener('click', (evt) => {

  if (evt.target.closest('.picture')) {

    const idPicture = parseInt(evt.target.closest('.picture').getAttribute('data-id'), 10);
    const resultId = createPhotoPosts.find((post) => post.id === idPicture);

    if (resultId) {
      evt.preventDefault();
      dataTransferInModal(resultId);
    }

  }
});


function openUserModal () {
  userModalOpen.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  userModalClose.addEventListener('click', closeUserModal);
}

function closeUserModal () {
  userModalOpen.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  userModalClose.removeListener('click', closeUserModal);
}


