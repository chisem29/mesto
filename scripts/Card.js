// Класс Card для управления карточками
export default class Card {
  // Конструктор класса, инициализирует свойства объекта карточки
  constructor(name, link, cardTemplateSelector, handleImageClick) {
    this._name = name; // имя карточки
    this._link = link; // url изображения карточки
    this._cardTemplate = document.querySelector(cardTemplateSelector).content; // шаблон карточки
    this._handleImageClick = handleImageClick;
  }

  // Метод для удаления карточки
  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  // Метод для переключения состояния "лайк"
  _toggleLike() {
    this._likeButton.classList.toggle('cards__btn_active');
  }

  _handleImageClick() {
    this._handleImageClick(this._name, this._link);
  }

  // Метод для установки обработчиков событий карточки
  _setEventListeners() {
    this._element.querySelector('.cards__trash-btn').addEventListener('click', () => this._deleteCard());
    this._likeButton.addEventListener('click', () => this._toggleLike());
    this._imageElement.addEventListener('click', () => this._handleImageClick());
  }

  // Метод для генерации карточки из шаблона и установки свойств
  generateCard() {
    this._element = this._cardTemplate.querySelector('.cards__item').cloneNode(true);
    this._likeButton = this._element.querySelector('.cards__btn'); // Сохраняем ссылку на кнопку лайка
    this._imageElement = this._element.querySelector('.cards__image'); // Сохраняем ссылку на изображение
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._element.querySelector('.cards__title').textContent = this._name;
    this._setEventListeners();

    return this._element; // Возвращает сгенерированный элемент карточки
  }
}
