import { baseUrl, token } from './api.js';

export default class UserInfo {
  constructor({ userNameSelector, userAboutSelector, userAvatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userAbout = document.querySelector(userAboutSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  init() {
    this._getUserInfo()
      .then(userData => {
        this._name = userData.name;
        this._about = userData.about;
        this._avatar = userData.avatar;

        this._userName.textContent = this._name;
        this._userAbout.textContent = this._about;
        this._userAvatar.src = this._avatar;
      })
      .catch(err => {
        console.error("Произошла ошибка при получении данных пользователя:", err);
      });
  }

  _getUserInfo() {
    return fetch(`${baseUrl}/users/me`, {
      headers: {
        authorization: `${token}`
      }
    })
      .then(res => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      })
      .catch(err => {
        console.error("Ошибка при выполнении fetch:", err);
      });
  }

  getUserInfo() {
    return {
      name: this._name,
      about: this._about
    };
  }

  setUserInfo({ name, about }) {
    this._name = name;
    this._about = about;

    this._userName.textContent = name;
    this._userAbout.textContent = about;
  }
}
