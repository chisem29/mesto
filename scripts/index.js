import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './constants.js';
import { validationConfig } from './constants.js';

// Получаем ссылки на DOM-элементы
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

// Включение валидации
editProfileValidator.enableValidation();
addCardValidator.enableValidation();

// Функция для открытия любого Popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
  // Добавляем слушатель события keydown с документа
  document.addEventListener('keydown', handleEscClose);
}

// Функция для закрытия любого Popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  // Удаляем слушатель события keydown с документа
  document.removeEventListener('keydown', handleEscClose);
}

// Функция установки значений полей ввода в форме редактирования профиля
function setProfileInputValues() {
  popupNameInput.value = profileName.textContent;
  popupStatusInput.value = profileStatus.textContent;
}

// Функция для открытия Popup редактирования профиля
function openEditPopup() {
  setProfileInputValues();
  openPopup(popupEditProfile);
}

// Функция для создания DOM-элемента карточки
function createCard(name, link) {
  const card = new Card(name, link, '#card-template', openPicPopup)
  return card.generateCard();
}

// Функция для добавления карточек на страницу
function renderInitialCards() {
  const cardsContainer = document.querySelector('.cards');

  initialCards.forEach((card) => {
    const cardElement = createCard(card.name, card.link);
    cardsContainer.appendChild(cardElement);
  });
}

// Функция для открытия попапа картинки
function openPicPopup(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupImageTitle.textContent = name;

  openPopup(popupOpenPic);
}

// Функция для закрытия попапа картинки
function closePicPopup() {
  closePopup(popupOpenPic);
}

// Функция для добавления новой карточки
function addNewCard(event) {
  event.preventDefault();

  const placeName = addCardPopupPlaceInput.value;
  const picLink = addCardPopupPicInput.value;

  const newCardElement = createCard(placeName, picLink);
  const cardsContainer = document.querySelector('.cards')
  cardsContainer.prepend(newCardElement); // Добавляем новую карточку в начало массива

  // Очищаем поля ввода
  addCardForm.reset();

  // Закрываем попап
  closePopup(popupAddCard);
}

// Функция для обновления профиля и закрытия попапа редактирования профиля
function saveProfile(event) {
  event.preventDefault();

  profileName.textContent = popupNameInput.value;
  profileStatus.textContent = popupStatusInput.value;

  closePopup(popupEditProfile);
}

// Функция для открытия попапа добавления карточки
function openAddPopup() {
  openPopup(popupAddCard);
}

// Функция для закрытия попапа добавления карточки
function closeAddPopup() {
  closePopup(popupAddCard);
}

// Функция для закрытия попапа по нажатию на ESC 
function handleEscClose(event) {
  if (event.code === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    if (activePopup) {
      closePopup(activePopup);
    }
  }
};

// Функция для закрытия попапа по нажатию на overlay
function handleOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  }
}

// Прикрепляем функцию открытия попапа редактирования профиля к кнопке открытия попапа
openPopupEditButton.addEventListener('click', openEditPopup);

// Прикрепляем функцию закрытия попапа редактирования профиля к кнопке закрытия попапа
closeEditProfilePopupButton.addEventListener('click', () => closePopup(popupEditProfile));

// Добавляем слушатель событий на форму попапа редактирования профиля для сохранения профиля
editProfileForm.addEventListener('submit', saveProfile);

// Добавляем обработчик события для кнопки открытия попапа добавления карточки
openPopupAddButton.addEventListener('click', openAddPopup);

// Добавляем слушатель событий закрытия попапа добавления карточки
closePopupAddButton.addEventListener('click', closeAddPopup);

// Добавляем слушатель событий на форму добавления новой карточки
addCardForm.addEventListener('submit', addNewCard);

// Добавляем слушатель события закрытия попапа картинки
closePopupImageButton.addEventListener('click', closePicPopup);

// Добавляем слушатель события click на каждый попап
const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  popup.addEventListener('click', handleOverlayClick);
});

// Вызываем функцию для отображения карточек при загрузке страницы
renderInitialCards();

//--------------------------------------------------------------------

