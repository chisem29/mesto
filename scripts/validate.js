// Функция для отображения сообщения об ошибке валидации
// Принимает форму, поле ввода и сообщение об ошибке в качестве аргументов
const displayValidationError = (form, input, errorMsg) => {
  // Получаем элемент для отображения сообщения об ошибке
  const errorField = form.querySelector(`.${input.id}-error`);
  // Добавляем класс, указывающий на ошибку в поле ввода
  input.classList.add('popup__input_type-error');
  // Заполняем текст ошибки в элементе для ошибки
  errorField.textContent = errorMsg;
  // Делаем элемент с ошибкой видимым
  errorField.classList.add('popup__input-error_active');
};

// Функция для удаления сообщения об ошибке валидации
// Принимает форму и поле ввода в качестве аргументов
const removeValidationError = (form, input) => {
  // Получаем элемент для отображения сообщения об ошибке
  const errorField = form.querySelector(`.${input.id}-error`);
  // Удаляем класс, указывающий на ошибку в поле ввода
  input.classList.remove('popup__input_type-error');
  // Делаем элемент с ошибкой невидимым
  errorField.classList.remove('popup__input-error_active');
  // Очищаем текст ошибки в элементе для ошибки
  errorField.textContent = '';
};

// Функция для проверки наличия невалидных полей ввода
// Принимает массив полей ввода в качестве аргумента
const anyInvalidInput = (inputs) => {
  return inputs.some((input) => {
    return !input.validity.valid;
  });
};

// Функция для изменения статуса кнопки в зависимости от валидности полей ввода
// Принимает массив полей ввода и кнопку в качестве аргументов
const changeButtonStatus = (inputs, button) => {
  if (anyInvalidInput(inputs)) {
    // Если есть хотя бы одно невалидное поле, деактивируем кнопку
    button.classList.add('popup__button_disabled');
    button.disabled = true;
  } else {
    // В противном случае активируем кнопку
    button.classList.remove('popup__button_disabled');
    button.disabled = false;
  }
};

// Функция для валидации поля ввода
// Принимает форму и поле ввода в качестве аргументов
const validateInput = (form, input) => {
  if (!input.validity.valid) {
    // Если поле ввода невалидно, отображаем сообщение об ошибке
    displayValidationError(form, input, input.validationMessage);
  } else {
    // Если поле ввода валидно, удаляем сообщение об ошибке
    removeValidationError(form, input);
  }
};

// Функция для добавления обработчиков событий к полям ввода
// Принимает форму в качестве аргумента
const addEventListeners = (form) => {
  // Получаем все поля ввода в форме
  const inputs = Array.from(form.querySelectorAll('.popup__input'));
  // Получаем кнопку отправки формы
  const submitButton = form.querySelector('.popup__button');

  // Изначально меняем статус кнопки в зависимости от валидности полей ввода
  changeButtonStatus(inputs, submitButton);

  // Добавляем обработчик события на каждое поле ввода
  inputs.forEach((input) => {
    input.addEventListener('input', function () {
      // При вводе в поле проверяем его валидность и меняем статус кнопки
      validateInput(form, input);
      changeButtonStatus(inputs, submitButton);
    });
  });
};

// Функция для активации валидации формы
// Принимает объект конфигурации в качестве аргумента
const enableValidation = (config) => {
  // Получаем все формы, соответствующие селектору из конфигурации
  const forms = Array.from(document.querySelectorAll(config.formSelector));

  // Добавляем обработчик события на каждую форму
  forms.forEach((form) => {
    // Предотвращаем стандартное поведение при отправке формы
    form.addEventListener('submit', function (e) {
      e.preventDefault();
    });
    // Получаем все поля ввода в форме
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    // Получаем кнопку отправки формы
    const submitButton = form.querySelector(config.submitButtonSelector);

    // Добавляем обработчик события на каждое поле ввода
    inputs.forEach((input) => {
      input.addEventListener('input', function () {
        // При вводе в поле проверяем его валидность и меняем статус кнопки
        validateInput(form, input);
        changeButtonStatus(inputs, submitButton);
      });
    });
  });
};

// Активируем валидацию формы с заданной конфигурацией
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
});
