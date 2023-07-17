// Функция для отображения сообщения об ошибке валидации
// Принимает форму, поле ввода и сообщение об ошибке в качестве аргументов
const displayValidationError = (form, input, errorMsg, config) => {
  // Получаем элемент для отображения сообщения об ошибке
  const errorField = form.querySelector(`.${input.id}-error`);
  // Получаем соответсвующий элемент label
  const inputLabel = input.parentElement;
  // Добавляем класс, указывающий на ошибку в поле ввода
  inputLabel.classList.add(config.inputErrorClass);
  // Заполняем текст ошибки в элементе для ошибки
  errorField.textContent = errorMsg;
  // Делаем элемент с ошибкой видимым
  errorField.classList.add(config.errorClass);
};

// Функция для удаления сообщения об ошибке валидации
// Принимает форму и поле ввода в качестве аргументов
const removeValidationError = (form, input, config) => {
  // Получаем элемент для отображения сообщения об ошибке
  const errorField = form.querySelector(`.${input.id}-error`);
  // Получаем соответсвующий элемент label
  const inputLabel = input.parentElement;
  // Удаляем класс, указывающий на ошибку в поле ввода
  inputLabel.classList.remove(config.inputErrorClass);
  // Делаем элемент с ошибкой невидимым
  errorField.classList.remove(config.errorClass);
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
const changeButtonStatus = (inputs, button, config) => {
  if (anyInvalidInput(inputs)) {
    // Если есть хотя бы одно невалидное поле, деактивируем кнопку
    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
  } else {
    // В противном случае активируем кнопку
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = false;
  }
};

// Функция для валидации поля ввода
// Принимает форму и поле ввода в качестве аргументов
const validateInput = (form, input, config) => {
  if (!input.validity.valid) {
    // Если поле ввода невалидно, отображаем сообщение об ошибке
    displayValidationError(form, input, input.validationMessage, config);
  } else {
    // Если поле ввода валидно, удаляем сообщение об ошибке
    removeValidationError(form, input, config);
  }
};

// Функция для добавления обработчиков событий к полям ввода
// Принимает форму в качестве аргумента
const addEventListeners = (form, config) => {
  // Получаем все поля ввода в форме
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  // Получаем кнопку отправки формы
  const submitButton = form.querySelector(config.submitButtonSelector);

  changeButtonStatus(inputs, submitButton, config);

  // Добавляем обработчик события на каждое поле ввода
  inputs.forEach((input) => {
    input.addEventListener('input', function () {
      // При вводе в поле проверяем его валидность и меняем статус кнопки
      validateInput(form, input, config);
      changeButtonStatus(inputs, submitButton, config);
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
        validateInput(form, input, config);
        changeButtonStatus(inputs, submitButton, config);
      });
    });
  });
};

// Активируем валидацию формы с заданной конфигурацией
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type-error',
  errorClass: 'popup__input-error_active',
});
