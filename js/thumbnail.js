const renderPictures = (createPhotoPosts) => {
  const pictureList = document.querySelector('.pictures');

  const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');


  const thumbnailFragment = document.createDocumentFragment();

  while (document.querySelector('.picture')) {
    pictureList.removeChild(document.querySelector('.picture'));
  }

  createPhotoPosts.forEach(({url, description, likes, comments, id}) => {
    const thumbnailItem = thumbnailTemplate .cloneNode(true);

    const picture = thumbnailItem.querySelector('.picture__img');
    picture.src = url;
    picture.alt = description;
    thumbnailItem.querySelector('.picture__comments').textContent = comments.length;
    thumbnailItem.querySelector('.picture__likes').textContent = likes;
    thumbnailItem.setAttribute('data-id', id);

    thumbnailFragment.appendChild(thumbnailItem);
  });

  pictureList.appendChild(thumbnailFragment);
};

export {renderPictures};


