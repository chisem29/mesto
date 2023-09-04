import { baseUrl, token } from './Api.js';

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

  async _getInitialCards() {
    return (await fetch(`${baseUrl}/cards`, {
      headers: {
        authorization: `${token}`
      }
    })).json()
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

  async _addCard(cardData) {
    const res = await fetch(`${baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: `${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cardData)
    })

    if (!res.ok) {
      throw new Error(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  async publicAddCard(cardData) {
    return await this._addCard(cardData)
  }
}