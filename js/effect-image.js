const EffectName = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const effectToFilter = {
  [EffectName.CHROME]: {
    style: 'grayscale',
    unit: '',
  },
  [EffectName.SEPIA]: {
    style: 'sepia',
    unit: '',
  },
  [EffectName.MARVIN]: {
    style: 'invert',
    unit: '%',
  },
  [EffectName.PHOBOS]: {
    style: 'blur',
    unit: 'px',
  },
  [EffectName.HEAT]: {
    style: 'brightness',
    unit: '',
  },
};

const effectToSliderOptions = {
  [EffectName.DEFAULT]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [EffectName.CHROME]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [EffectName.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [EffectName.MARVIN]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [EffectName.PHOBOS]: {
    min: 0,
    max: 3,
    step: 0.1,
  },
  [EffectName.HEAT]: {
    min: 1,
    max: 3,
    step: 0.1,
  },
};

const effectValue = document.querySelector('.effect-level__value');
const imageLoadPreview = document.querySelector('.img-upload__preview img');
const effectContainer = document.querySelector('.img-upload__effect-level');
const effectSlider = document.querySelector('.effect-level__slider');
const effectsElement = document.querySelector('.effects');

let chosenEffect = EffectName.DEFAULT;
const isDefault = () => chosenEffect === EffectName.DEFAULT;


// выбранный эффект применяем к изображению
const setImageStyle = () => {
  if (isDefault()) {
    imageLoadPreview.style.filter = null;
    return;
  }

  const {value} = effectValue;
  const{style, unit} = effectToFilter[chosenEffect];
  imageLoadPreview.style.filter = `${style}(${value}${unit})`;
};

const showSlider = () => {
  effectContainer.classList.remove('hidden');
};

const hideSlider = () => {
  effectContainer.classList.add('hidden');
};

// обновляем эффект при изменение слайдера
const onSliderUpdate = () => {
  effectValue.value = effectSlider.noUiSlider.get();
  setImageStyle();
};

// создаем слайдер
const createSlider = ({min, max, step}) => {
  noUiSlider.create(effectSlider, {
    range: { min, max },
    step,
    start: max,
    connect: 'lower',
    format: {
      to: (value) => Number(value),
      from: (value) => Number(value),
    }
  });
  effectSlider.noUiSlider.on('update', onSliderUpdate);
  hideSlider();
};

//обновляем настройки слайдера
const updateSlider = ({min, max, step}) => {
  effectSlider.noUiSlider.updateOptions({
    range: {min, max},
    step,
    start: max,
  });
};

//отображение и обновление слайдера
const setSlider = () => {
  if (isDefault()) {
    hideSlider();
  } else {
    updateSlider(effectToSliderOptions[chosenEffect]);
    showSlider();
  }
};

// устанавливаем выбранный эффект
const setEffect = (effect) => {
  chosenEffect = effect;
  setSlider();
  setImageStyle();
};

const reset = () => {
  setEffect(EffectName.DEFAULT);
};

const onEffectsChange = (evt) => {
  setEffect(evt.target.value);
};

const init = () => {
  createSlider(effectToSliderOptions[chosenEffect]);
  effectsElement.addEventListener('change', onEffectsChange);
};

export {init, reset};


