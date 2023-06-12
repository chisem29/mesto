// Находим попап, кнопку открытия попапа и кнопку закрытия попапа в документе
let popup = document.querySelector('.popup__edit-profile');
let openPopupButton = document.querySelector('.profile__edit-button');
let closePopupButton = document.querySelector('.popup__close-button');
// Находим поля имени и статуса в профиле и в попапе
let profileName = document.querySelector('.profile__user-name');
let profileStatus = document.querySelector('.profile__status');
let popupNameInput = document.querySelector('.popup__input_name');
let popupStatusInput = document.querySelector('.popup__input_status');
// Находим форму и кнопку сохранения в попапе
let popupForm = document.querySelector('.popup__form');
let saveButton = document.querySelector('.popup__save-button');

// Функция для открытия попапа и присваивания значения инпутов
function openPopup() {
    popupNameInput.value = profileName.textContent;
    popupStatusInput.value = profileStatus.textContent;
  
    popup.classList.add('popup_opened');
}

// Функция для закрытия попапа
function closePopup() {
    popup.classList.remove('popup_opened');
}

// Функция для обновления профиля и закрытия попапа
function saveProfile(event) {
  // Останавливаем дефолтное поведение формы (перезагрузку страницы)
  event.preventDefault();

  // Обновляем имя и статус в профиле новыми значениями
  profileName.textContent = popupNameInput.value;
  profileStatus.textContent = popupStatusInput.value;

  // Закрываем попап
  closePopup();
}


// Прикрепляем функцию открытия попапа к кнопке открытия попапа
openPopupButton.addEventListener('click', openPopup);

// Прикрепляем функцию закрытия попапа к кнопке закрытия попапа
closePopupButton.addEventListener('click', closePopup);

// Добавляем слушатель событий на форму попапа для сохранения профиля
popupForm.addEventListener('submit', saveProfile);