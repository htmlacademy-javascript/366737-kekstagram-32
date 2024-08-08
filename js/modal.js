import {isEscapeKey} from './util.js';
//import {renderPictures} from './thumbnail.js';

const COMMENT_SHOWN_COUNT = 5;


const picturesContainer = document.querySelector('.pictures');
const userModalOpen = document.querySelector('.big-picture');
const userModalClose = userModalOpen.querySelector('.big-picture__cancel');
const listComment = userModalOpen.querySelector('.social__comments');
const socialCommentShownCount = userModalOpen.querySelector('.social__comment-shown-count');
const loaderComment = userModalOpen.querySelector('.comments-loader');
const commentTemplate = document.querySelector('#comment').content;
const commentSocial = commentTemplate.querySelector('.social__comment');
const commentFragment = document.createDocumentFragment();


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

const renderComments = (comments) =>{
  listComment.innerHTML = '';
  comments.forEach(({avatar, name, message}, count) => {
    const commentItem = commentSocial.cloneNode(true);
    const commentData = commentItem.querySelector('.social__picture');
    commentData.src = avatar;
    commentData.alt = name;
    commentItem.querySelector('.social__text').textContent = message;

    if(count > COMMENT_SHOWN_COUNT - 1) {
      commentItem.classList.add('hidden');
    }

    commentFragment.appendChild(commentItem);
  });
  listComment.appendChild(commentFragment);
};

const dataTransferInModal = (post) => {
  userModalOpen.querySelector('.big-picture__image').src = post.url;
  userModalOpen.querySelector('.social__caption').textContent = post.description;
  userModalOpen.querySelector('.likes-count').textContent = post.likes;
  renderComments(post.comments);
  if (COMMENT_SHOWN_COUNT > post.comments.length){
    userModalOpen.querySelector('.social__comment-shown-count').textContent = post.comments.length;
    userModalOpen.querySelector('.comments-loader').classList.add('hidden');
  } else {
    userModalOpen.querySelector('.social__comment-shown-count').textContent = COMMENT_SHOWN_COUNT;
    userModalOpen.querySelector('.comments-loader').classList.remove('hidden');
    userModalOpen.querySelector('.comments-loader').addEventListener('click', loaderComments);
  }

  userModalOpen.querySelector('.social__comment-total-count').textContent = post.comments.length;

  openUserModal();
};

function loaderComments () {
  const commentHidden = listComment.querySelectorAll('.social__comment.hidden');
  const countComment = Math.min(commentHidden.length, COMMENT_SHOWN_COUNT);
  for (let i = 0; i < countComment; i++){
    commentHidden[i].classList.remove('hidden');
  }
  const countShowComments = parseInt(socialCommentShownCount.textContent, 10);
  const countComments = countShowComments + countComment;
  socialCommentShownCount.textContent = countComments;

  const commentLength = listComment.querySelectorAll('.social__comment').length;
  if (countComments === commentLength) {
    loaderComment.classList.add('hidden');
  }
}
const picturesOpenContainer = (data) => {
  picturesContainer.addEventListener('click', (evt) => {
    if (evt.target.closest('.picture')) {
      const renderPictures = data;
      const idPicture = parseInt(evt.target.closest('.picture').getAttribute('data-id'), 10);
      const resultId = renderPictures.find((post) => post.id === idPicture);

      if (resultId) {
        evt.preventDefault();
        dataTransferInModal(resultId);
      }
    }
  });
};
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
  userModalClose.removeEventListener('click', closeUserModal);
}

export {picturesOpenContainer, onDocumentKeydown};
