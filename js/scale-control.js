const scaleInput = document.querySelector('.scale__control--value');
const scaleDecrease = document.querySelector('.scale__control--smaller');
const scaleIncrease = document.querySelector('.scale__control--bigger');
const imageLoadPreview = document.querySelector('.img-upload__preview img');

let currentScale = 100;

scaleDecrease.addEventListener('click', () => {
  currentScale = Math.max(currentScale - 25, 25);
  updateScale();
});

scaleIncrease.addEventListener('click', () => {
  currentScale = Math.min(currentScale + 25, 100);
  updateScale();
});


function updateScale() {
  scaleInput.value = `${currentScale}%`;
  imageLoadPreview.style.transform = `scale(${currentScale / 100})`;
}

export {updateScale};
