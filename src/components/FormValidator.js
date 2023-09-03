// Класс FormValidator для валидации формы
export default class FormValidator {
  // Конструктор класса, инициализирует свойства объекта валидатора
  constructor(config, formElement) {
    this._config = config; // Конфигурация валидации
    this._formElement = formElement; // Элемент формы
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector)); // Список полей ввода
    this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector); // Кнопка отправки
  }

  // Метод для отображения ошибки валидации
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    const inputLabel = inputElement.parentElement;
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  // Метод для скрытия ошибки валидации
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    const inputLabel = inputElement.parentElement;
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  }

  // Метод для проверки валидности поля ввода
  _isValid(inputElement) {
    return !inputElement.validity.valid;
  }

  // Метод для проверки валидности и отображения ошибки
  _checkInputValidity(inputElement) {
    if (this._isValid(inputElement)) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Метод для проверки валидности всех полей ввода
  _hasInvalidInput() {
    return this._inputList.some(this._isValid);
  }

  // Метод для переключения состояния кнопки отправки
  _toggleButtonState() {
    if (this._buttonElement) {
      if (this._hasInvalidInput()) {
        this._buttonElement.setAttribute('disabled', true);
        this._buttonElement.classList.add(this._config.inactiveButtonClass);
      } else {
        this._buttonElement.removeAttribute('disabled');
        this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      }
    } else {
      console.warn('Кнопка отправки не найдена');
    }
  }


  // Метод для установки обработчиков событий валидации
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // Метод для включения валидации формы
  enableValidation() {
    this._setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._toggleButtonState();
  }
}
