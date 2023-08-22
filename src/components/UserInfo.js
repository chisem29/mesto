class UserInfo {
  // Принимает в конструктор объект с селекторами двух элементов
  constructor({ userNameSelector, userStatusSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userStatusElement = document.querySelector(userStatusSelector);
  }

  // Метод для возвращения объекта с данными пользователя
  getUserInfo() {
    return {
      name: this._userNameElement.textContent,
      status: this._userStatusElement.textContent
    };
  }

  // Метод для установки новой информации пользователя
  setUserInfo({ name, status }) {
    this._userNameElement.textContent = name;
    this._userStatusElement.textContent = status;
  }
}

export default UserInfo;