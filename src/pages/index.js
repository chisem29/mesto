import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards } from '../utils/constants.js';
import { validationConfig } from '../utils/constants.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';

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

const addCardPopup = new PopupWithForm('.popup_add-card', (inputValues) => {
  const newCardElement = createCard(inputValues.place, inputValues.pic);
  cardsSection.prependItem(newCardElement);
});

const popupImage = new PopupWithImage('.popup_open-pic');
const addCardForm = document.querySelector('.popup__form_new-card');
let nameInput = document.querySelector('.popup__input_type_place');
let linkInput = document.querySelector('.popup__input_type_pic');

document.querySelector('.profile__add-button').addEventListener('click', () => {
  addCardPopup.open();
});

addCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const data = {
    name: nameInput.value,
    link: linkInput.value
  };
  console.log("Отправляемые данные:", data);
  cardsSection.publicAddCard(data)
    .then((newCardData) => {
      const cardElement = createCard(newCardData.name, newCardData.link, newCardData._id);
      cardsSection.addItem(cardElement);
    })
    .catch((err) => {
      console.error("Ошибка: ", err);
    });
});

const editProfileValidator = new FormValidator(validationConfig, document.querySelector('.popup__form_edit-profile'));
const addCardValidator = new FormValidator(validationConfig, document.querySelector('.popup__form_new-card'));

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

function createCard(name, link, id) {
  const card = new Card(name, link, '#card-template', (name, link) => popupImage.open(name, link), [], id);
  return card.generateCard();
}

const cardsSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item.name, item.link, item._id, item.likes);
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
const editAvatarPopup = new PopupWithForm('.popup__edit-avatar', async (inputValues) => {
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
