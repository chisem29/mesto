// Класс Card для управления карточкам
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
  }

  // Метод для переключения состояния "лайк"
  _toggleLike() {
    this._element.querySelector('.cards__btn').classList.toggle('cards__btn_active');
  }

  _handleImageClick() {
    this._handleImageClick(this._name, this._link);
  }

  // Метод для установки обрработчиков событий карточки
  _setEventListeners() {
    this._element.querySelector('.cards__trash-btn').addEventListener('click', () => this._deleteCard());
    this._element.querySelector('.cards__btn').addEventListener('click', () => this._toggleLike());
    this._element.querySelector('.cards__image').addEventListener('click', () => this._handleImageClick());
  }

  // Метод для генерации карточки из шаблона и установки свойств
  generateCard() {
    this._element = this._cardTemplate.querySelector('.cards__item').cloneNode(true);
    this._element.querySelector('.cards__image').src = this._link;
    this._element.querySelector('.cards__image').alt = this._name;
    this._element.querySelector('.cards__title').textContent = this._name;
    this._setEventListeners();
  
    const imageElement = this._element.querySelector('.cards__image');
    imageElement.addEventListener('click', () => {
      this._handleImageClick(this._name, this._link);
    });
  
    return this._element; // Возвращает сгенерированный элемент карточки
  }  
}
