import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards } from '../utils/constants.js';
import { validationConfig } from '../utils/constants.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';

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
const addCardForm = document.querySelector('.popup__form_new-card');
let nameInput = document.querySelector('.popup__input_type_place');
let linkInput = document.querySelector('.popup__input_type_pic');
document.querySelector('.profile__add-button').addEventListener('click', () => {
  addCardPopup.open();

  addCardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const data = {
      name: nameInput.value,
      link: linkInput.value
    };
    console.log("Отправляемые данные:", data);
    cardsSection.publicAddCard(data)
      .then((newCardData) => {
        const cardElement = createCard(newCardData.name, newCardData.link);
        cardsSection.addItem(cardElement);
      })
      .catch((err) => {
        console.error("Ошибка: ", err);
      });
  });
});

const editProfileValidator = new FormValidator(validationConfig, document.querySelector('.popup__form_edit-profile'));
const addCardValidator = new FormValidator(validationConfig, document.querySelector('.popup__form_new-card'));

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

function createCard(name, link) {
  const card = new Card(name, link, '#card-template', (name, link) => popupImage.open(name, link));
  return card.generateCard();
}

const cardsSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item.name, item.link);
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
  document.querySelector('.popup__input_type_status').value = userData.status;
  editProfilePopup.open();
});

editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
popupImage.setEventListeners();
