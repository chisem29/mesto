import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './constants.js';
import { validationConfig } from './constants.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import Section from './Section.js';
import UserInfo from './UserInfo.js';

// Создаем экземпляры классов попапов
const editProfilePopup = new PopupWithForm('.popup_edit-profile', (inputValues) => {
  userInfo.setUserInfo({
    name: inputValues.name,
    status: inputValues.status
  });
});

const addCardPopup = new PopupWithForm('.popup_add-card', (inputValues) => {
  const newCardElement = createCard(inputValues.place, inputValues.pic);
  cardsSection.prependItem(newCardElement);
});

const popupImage = new PopupWithImage('.popup_open-pic');

// Валидация
const editProfileValidator = new FormValidator(validationConfig, document.querySelector('.popup__form_edit-profile'));
const addCardValidator = new FormValidator(validationConfig, document.querySelector('.popup__form_new-card'));

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

function createCard(name, link) {
  const card = new Card(name, link, '#card-template', (name, link) => popupImage.open(name, link));
  return card.generateCard();
}

// Инициализация карточек при загрузке
const cardsSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item.name, item.link);
    cardsSection.addItem(cardElement);
  },
}, '.cards');
cardsSection.renderItems();

const userInfo = new UserInfo({
  userNameSelector: '.profile__user-name',
  userStatusSelector: '.profile__status'
});

// Слушатели
document.querySelector('.profile__edit-button').addEventListener('click', () => {
  const userData = userInfo.getUserInfo();

  document.querySelector('.popup__input_type_name').value = userData.name;
  document.querySelector('.popup__input_type_status').value = userData.status;
  
  editProfilePopup.open();
});

document.querySelector('.profile__add-button').addEventListener('click', () => {
  addCardPopup.open();
});

editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
popupImage.setEventListeners();
