import { likeCard, unlikeCard, deleteCard } from './Api.js';

export default class Card {
  constructor(item, cardTemplateSelector, handleCardImageClick) {
    this._name = item.name;
    this._link = item.link;
    this._cardTemplate = document.querySelector(cardTemplateSelector).content;
    this._handleCardImageClick = handleCardImageClick;
    this._likes = item.likes;
    this._owner = item.owner;
    this._id = item._id;
    this.userId = 'd27dcfb3e5566acadc4d1e83'
  }

  _deleteCard() {
    deleteCard(this._id)
      .then(() => {
        this._element.remove();
        this._element = null;
      })
      .catch(error => console.error("Error deleting card:", error));
  }

  _searchLike() {
    this._likes.forEach((like) => {
      if(like._id === this.userId) {
        this._likeButton.classList.add('cards__btn_active');
      }
      else {
        this._likeButton.classList.remove('cards__btn_active');
      }
    })
  }


  //при лайке он отправляется на сервер
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

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._toggleLike());
    this._imageElement.addEventListener('click', () => this._onImageClick());

    const deleteButton = this._element.querySelector('.cards__trash-btn');
    if (deleteButton) {
      deleteButton.addEventListener('click', () => this._deleteCard());
    }
  }

  generateCard() {
    this._element = this._cardTemplate.querySelector('.cards__item').cloneNode(true);
    this._likeButton = this._element.querySelector('.cards__btn');
    this._imageElement = this._element.querySelector('.cards__image');
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._element.querySelector('.cards__title').textContent = this._name;
    const deleteButton = this._element.querySelector('.cards__trash-btn');

    if (this._owner._id === this.userId) {
      deleteButton.classList.add('cards__trash-btn_active');
      deleteButton.style.display = 'block';
    } else {
      deleteButton.classList.remove('cards__trash-btn_active');
      deleteButton.style.display = 'none';
    }
    this._searchLike()
    this._setEventListeners();

    const likeCountElement = this._element.querySelector('.cards__like-total');
    likeCountElement.textContent = this._likes.length;

    return this._element;
  }
}
