// Импортируем необходимые классы и константы
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './constants.js';
import { validationConfig } from './constants.js';
import Section from './Section.js';

// Находим элементы на странице
const popupEditProfile = document.querySelector('.popup_edit-profile');
const openPopupEditButton = document.querySelector('.profile__edit-button');
const closeEditProfilePopupButton = popupEditProfile.querySelector('.popup__close-button');
const popupAddCard = document.querySelector('.popup_add-card');
const openPopupAddButton = document.querySelector('.profile__add-button');
const closePopupAddButton = popupAddCard.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__user-name');
const profileStatus = document.querySelector('.profile__status');
const popupNameInput = document.querySelector('.popup__input_type_name');
const popupStatusInput = document.querySelector('.popup__input_type_status');
const editProfileForm = popupEditProfile.querySelector('.popup__form_edit-profile');
const addCardForm = popupAddCard.querySelector('.popup__form_new-card');
const popupOpenPic = document.querySelector('.popup_open-pic');
const popupImage = popupOpenPic.querySelector('.popup__image');
const popupImageTitle = popupOpenPic.querySelector('.popup__title');
const closePopupImageButton = popupOpenPic.querySelector('.popup__close-button');
const addCardPopupPlaceInput = popupAddCard.querySelector('.popup__input_type_place');
const addCardPopupPicInput = popupAddCard.querySelector('.popup__input_type_pic');
const editProfileValidator = new FormValidator(validationConfig, editProfileForm);
const addCardValidator = new FormValidator(validationConfig, addCardForm);

// Включаем валидацию для форм
editProfileValidator.enableValidation();
addCardValidator.enableValidation();

// Открываем попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClose);
}

// Закрываем попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClose);
}

// Устанавливаем значения полей формы редактирования профиля
function setProfileInputValues() {
  popupNameInput.value = profileName.textContent;
  popupStatusInput.value = profileStatus.textContent;
}

// Открываем попап редактирования профиля
function openEditPopup() {
  setProfileInputValues();
  openPopup(popupEditProfile);
}

// Создаем карточку
function createCard(name, link) {
  const card = new Card(name, link, '#card-template', openPicPopup)
  return card.generateCard();
}

// Открываем попап с картинкой
function openPicPopup(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupImageTitle.textContent = name;

  openPopup(popupOpenPic);
}

// Закрываем попап с картинкой
function closePicPopup() {
  closePopup(popupOpenPic);
}

// Добавляем новую карточку
function addNewCard(event) {
  event.preventDefault();

  const placeName = addCardPopupPlaceInput.value;
  const picLink = addCardPopupPicInput.value;

  const newCardElement = createCard(placeName, picLink);
  cardsSection.prependItem(newCardElement);

  addCardForm.reset();

  closePopup(popupAddCard);
}

// Сохраняем изменения профиля
function saveProfile(event) {
  event.preventDefault();

  profileName.textContent = popupNameInput.value;
  profileStatus.textContent = popupStatusInput.value;

  closePopup(popupEditProfile);
}

// Открываем попап добавления карточки
function openAddPopup() {
  openPopup(popupAddCard);
}

// Закрываем попап добавления карточки
function closeAddPopup() {
  closePopup(popupAddCard);
}

// Закрываем попап по нажатию Esc
function handleEscClose(event) {
  if (event.code === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    if (activePopup) {
      closePopup(activePopup);
    }
  }
}

// Закрываем попап по клику на оверлей
function handleOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  }
}

// Вешаем обработчики событий
openPopupEditButton.addEventListener('click', openEditPopup);
closeEditProfilePopupButton.addEventListener('click', () => closePopup(popupEditProfile));
editProfileForm.addEventListener('submit', saveProfile);
openPopupAddButton.addEventListener('click', openAddPopup);
closePopupAddButton.addEventListener('click', closeAddPopup);
addCardForm.addEventListener('submit', addNewCard);
closePopupImageButton.addEventListener('click', closePicPopup);

const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  popup.addEventListener('click', handleOverlayClick);
});

// Создаем экземпляр класса Section и отображаем карточки на странице
const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData.name, cardData.link);
      cardsSection.addItem(cardElement);
    }
  },
  '.cards'
);
cardsSection.renderItems();
