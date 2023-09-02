import { likeCard, unlikeCard } from './Api.js';
export default class Card {
  // Конструктор класса, инициализирует свойства объекта карточки
  constructor(name, link, cardTemplateSelector, handleCardImageClick, likes, id, userInfo) {
    this._name = name; // имя карточки
    this._link = link; // url изображения карточки
    this._cardTemplate = document.querySelector(cardTemplateSelector).content; // шаблон карточки
    this._handleCardImageClick  = handleCardImageClick;
    this._likes = likes;
    this._id = id;
    this._userInfo = userInfo;
  }

  // Метод для удаления карточки
  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  // Метод для переключения состояния "лайк"
  async _toggleLike() {
    try {
      let updatedCardData;
      if (this._likeButton.classList.contains('cards__btn_active')) {
        updatedCardData = await unlikeCard(this._id);
      } else {
        updatedCardData = await likeCard(this._id);
      }
      this._likeButton.classList.toggle('cards__btn_active');
      this._likes = updatedCardData.likes;
      const likeCountElement = this._element.querySelector('.cards__like-total');
      likeCountElement.textContent = this._likes.length;
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  }


  _onImageClick() {
    this._handleCardImageClick(this._name, this._link);
  }

  // Метод для установки обработчиков событий карточки
  _setEventListeners() {
    this._element.querySelector('.cards__trash-btn').addEventListener('click', () => this._deleteCard());
    this._likeButton.addEventListener('click', () => this._toggleLike());
    this._imageElement.addEventListener('click', () => this._onImageClick());
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
    const likeCountElement = this._element.querySelector('.cards__like-total');
    likeCountElement.textContent = this._likes.length;
    this._element.dataset.id = this._id;
    const currentUserId = this._userInfo.getUserId();
    if (this._likes.some(user => user._id === currentUserId)) {
      this._likeButton.classList.add('cards__btn_active');
    }

    return this._element; // Возвращает сгенерированный элемент карточки
  }
}
