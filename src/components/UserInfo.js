import { baseUrl, token } from './Api.js';

export default class UserInfo {
  constructor({ userNameSelector, userAboutSelector, userAvatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userAbout = document.querySelector(userAboutSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  init() {
    this._getUserInfo()
      .then(userData => {
        this._updateUI(userData);
      })
      .catch(err => {
        console.error("Произошла ошибка при получении данных пользователя:", err);
      });
  }

  async _getUserInfo() {
    const res = await fetch(`${baseUrl}/users/me`, {
      headers: {
        authorization: `${token}`
      }
    })
    if (!res.ok) {
      throw new Error(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo() {
    return {
      name: this._name ? "" : this._name,
      about: this._about ? "" : this._about,
    }; // Добавил обнуление полей 
  }

  setUserInfo({ name, about }) {
    this._name = name;
    this._about = about;

    this._updateUI({ name, about });
  }

  async updateUserInfoOnServer({ name, about }) {
    const response = await fetch(`${baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        about
      })
    });

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }

    const data = await response.json();
    this._updateUI(data);
  }

  async updateUserAvatarOnServer(avatarUrl) {
    const response = await fetch(`${baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatarUrl
      })
    });

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }

    const data = await response.json();
    this._updateUI(data);
  }

  _updateUI({ name, about, avatar }) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;

    this._userName.textContent = name;
    this._userAbout.textContent = about;
    this._userAvatar.src = avatar;
  }
}
