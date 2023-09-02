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

  getUserId() {
    return this._id;
  }

  _updateUI({ name, about, avatar, _id }) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
    this._id = _id;

    this._userName.textContent = name;
    this._userAbout.textContent = about;
    this._userAvatar.src = avatar;
  }
}
