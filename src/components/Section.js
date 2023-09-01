import { baseUrl, token } from './api.js';

export default class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);

    this._getInitialCards()
      .then(cards => {
        this._initialCards = cards;
        this.renderItems();
      })
  }

  _getInitialCards() {
    return fetch(`${baseUrl}/cards`, {
      headers: {
        authorization: `${token}`
      }
    })
      .then(res => res.json())
  }

  renderItems() {
    this._initialCards.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.append(element);
  }

  prependItem(element) {
    this._container.prepend(element);
  }

  _addCard(cardData) {
    return fetch(`${baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: `${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cardData)
    })
      .then(res => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      })
  }

  publicAddCard(cardData) {
    return this._addCard(cardData)
      .then((newCardData) => {
        return newCardData;
      });
  }
}