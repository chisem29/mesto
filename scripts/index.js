// Находим попап, кнопку открытия попапа и кнопку закрытия попапа в документе
const popupEditProfile = document.querySelector('.popup_edit-profile');
const openPopupEditButton = document.querySelector('.profile__edit-button');
const closeEditProfilePopupButton = document.querySelector('.popup__close-button');
const popupAddCard = document.querySelector('.popup_add-card');
const openPopupAddButton = document.querySelector('.profile__add-button');
const closePopupAddButton = popupAddCard.querySelector('.popup__close-button');
// Находим поля имени и статуса в профиле и в попапе
const profileName = document.querySelector('.profile__user-name');
const profileStatus = document.querySelector('.profile__status');
const popupNameInput = document.querySelector('.popup__input_type_name');
const popupStatusInput = document.querySelector('.popup__input_type_status');
// Находим формы по их классам
const editProfileForm = popupEditProfile.querySelector('.popup__form_edit-profile');
const addCardForm = popupAddCard.querySelector('.popup__form_new-card')
// Находим попап для открытия картинки и его элементы
const popupOpenPic = document.querySelector('.popup_open-pic');
const popupImage = popupOpenPic.querySelector('.popup__image');
const popupImageTitle = popupOpenPic.querySelector('.popup__title');
const closePopupImageButton = popupOpenPic.querySelector('.popup__close-button');
const addCardPopupPlaceInput = popupAddCard.querySelector('.popup__input_type_place');
const addCardPopupPicInput = popupAddCard.querySelector('.popup__input_type_pic');


// Функция для открытия попапа и присваивания значения инпутов
function openPopup() {
  popupNameInput.value = profileName.textContent;
  popupStatusInput.value = profileStatus.textContent;

  popupEditProfile.classList.add('popup_opened');
}

// Функция для закрытия попапа редактирования профиля
function closeEditPopup() {
  popupEditProfile.classList.remove('popup_opened');
}

// Функция для создания DOM-элемента карточки
function createCard(name, link) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);

  const cardImage = cardElement.querySelector('.cards__image');
  cardImage.src = link;
  cardImage.alt = name;

  const cardTitle = cardElement.querySelector('.cards__title');
  cardTitle.textContent = name;

// Находим кнопку удаления в элементе карточки и добавляем ей слушатель событий
  const deleteButton = cardElement.querySelector('.cards__trash-btn');
  deleteButton.addEventListener('click', () => {
    deleteCard(cardElement);
  });

  const likeButton = cardElement.querySelector('.cards__btn');
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('cards__btn_active');
  });

  // Добавляем слушатель событий для открытия попапа картинки
  cardImage.addEventListener('click', () => {
    openPicPopup(name, link);
  });

  return cardElement;
}

// Функция для добавления карточек на страницу
function renderInitialCards() {
  const cardsContainer = document.querySelector('.cards');

  initialCards.forEach((card) => {
    const cardElement = createCard(card.name, card.link);
    cardsContainer.appendChild(cardElement);
  });
}

// Функция для удаления карточки
function deleteCard(cardElement) {
  cardElement.remove()
// Удаляем слушатели событий для избежания утечек памяти
  cardElement.removeEventListener('click', deleteCard)
}

// Функция для открытия попапа картинки
function openPicPopup(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupImageTitle.textContent = name;

  popupOpenPic.classList.add('popup_opened');
}

// Функция для закрытия попапа картинки
function closePicPopup() {
  popupOpenPic.classList.remove('popup_opened')
}

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
  closeAddPopup();
}

// Функция для обновления профиля и закрытия попапа редактирования профиля
function saveProfile(event) {
  event.preventDefault();

  profileName.textContent = popupNameInput.value;
  profileStatus.textContent = popupStatusInput.value;

  closeEditPopup();
}

// Функция для открытия попапа добавления карточки
function openAddPopup() {
  popupAddCard.classList.add('popup_opened');
}

// Функция для закрытия попапа добавления карточки
function closeAddPopup() {
  popupAddCard.classList.remove('popup_opened');
}

// Прикрепляем функцию открытия попапа редактирования профиля к кнопке открытия попапа
openPopupEditButton.addEventListener('click', openPopup);

// Прикрепляем функцию закрытия попапа редактирования профиля к кнопке закрытия попапа
closeEditProfilePopupButton.addEventListener('click', closeEditPopup);

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

// Вызываем функцию для отображения карточек при загрузке страницы
renderInitialCards();
