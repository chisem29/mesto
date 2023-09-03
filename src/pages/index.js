import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {initialCards} from '../utils/constants.js';
import {validationConfig} from '../utils/constants.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import { deleteCard } from '../components/Api.js';
import './index.css';

const deleteCardPopup = new PopupWithForm('.popup_delete-card', async () => {
  try {
    // Используем сохраненный _cardId для удаления карточки
    await deleteCard(deleteCardPopup._cardId);
  } catch (err) {
    console.error("Ошибка при удалении карточки:", err);
  }
});

deleteCardPopup.setEventListeners();

const editProfilePopup = new PopupWithForm('.popup_edit-profile', async (inputValues) => {
  try {
    await userInfo.updateUserInfoOnServer({
      name: inputValues.name,
      about: inputValues.status
    });
  } catch (err) {
    console.error("Ошибка при обновлении данных пользователя:", err);
  }
});

function addCallback(inputValues) {
  const data = {
    name: inputValues.place,
    link: inputValues.pic,
  };
  cardsSection.publicAddCard(data)
    .then((newCardData) => {
      const cardElement = createCard(newCardData);
      cardsSection.prependItem(cardElement);
    })
    .catch((err) => {
      console.error("Ошибка: ", err);
    });
}

const addCardPopup = new PopupWithForm('.popup_add-card', addCallback);
const popupImage = new PopupWithImage('.popup_open-pic');

document.querySelector('.profile__add-button').addEventListener('click', () => {
  addCardPopup.open();
});

const editProfileValidator = new FormValidator(validationConfig, document.querySelector('.popup__form_edit-profile'));
const addCardValidator = new FormValidator(validationConfig, document.querySelector('.popup__form_new-card'));

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

function createCard(item) {
  const card = new Card(item, '#card-template', (name, link) => popupImage.open(name, link), deleteCardPopup);
  return card.generateCard();
}


/*const deleteCardPopup = new PopupWithForm('.popup_delete-card', async (cardId) => {
  try {
    await deleteCard(cardId);
  } catch (err) {
    console.error("Ошибка при удалении карточки:", err);
  }
});
deleteCardPopup.setEventListeners();*/


const cardsSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardsSection.addItem(cardElement);
  },
}, '.cards');


const userInfo = new UserInfo({
  userNameSelector: '.profile__user-name',
  userAboutSelector: '.profile__status',
  userAvatarSelector: '.profile__avatar'
});
userInfo.init();

document.querySelector('.profile__edit-button').addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  document.querySelector('.popup__input_type_name').value = userData.name;
  document.querySelector('.popup__input_type_status').value = userData.about;
  editProfilePopup.open();
});

// Создание нового попапа для редактирования аватара
const editAvatarPopup = new PopupWithForm('.popup_edit-avatar', async (inputValues) => {
  try {
    await userInfo.updateUserAvatarOnServer(inputValues.avatar);
  } catch (err) {
    console.error("Ошибка при обновлении аватара пользователя:", err);
  }
});

// Слушатель для открытия попапа редактирования аватара
document.querySelector('.profile__avatar-container').addEventListener('click', () => {
  editAvatarPopup.open();
});

// Установка слушателей событий для всех попапов
editAvatarPopup.setEventListeners();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
popupImage.setEventListeners();
