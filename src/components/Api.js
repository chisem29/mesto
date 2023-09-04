const token = "bc083038-a8ec-4910-8d48-0886ebfbf617";
const baseUrl = "https://nomoreparties.co/v1/cohort-74";

export { baseUrl, token };

export const likeCard = async (cardId) =>
  await fetch(`${baseUrl}/cards/${cardId}/likes`, {
    method: "PUT",
    headers: {
      authorization: `${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

export const unlikeCard = async (cardId) =>
  await fetch(`${baseUrl}/cards/${cardId}/likes`, {
    method: "DELETE",
    headers: {
      authorization: `${token}`,
      "Content-Type": "application/json",
    },
  }).json();

export const deleteCard = async (cardId) =>
  await fetch(`${baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: `${token}`,
      "Content-Type": "application/json",
    },
  }).json();
