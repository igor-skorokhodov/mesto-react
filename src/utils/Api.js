export class Api {
    constructor (config) {
        this._url = config.url;
        this._headers = config.headers;
    }

getUserInfo() { //подгрузили инфу о пользователе из сервера
    return fetch(this._url+'users/me', {
        method: "GET",
        headers: this._headers
    }).then((res) => this._getResponseData(res)) 
}

postUserInfo(name, about) { //загрузили инфу о пользователе на сервер
    return fetch(this._url+'users/me', {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
            name: name,
            about: about
          })
    }).then((res) => this._getResponseData(res)) 
}

getAllCards() { //загрузили все карточки
   return fetch(this._url+'cards', {
        method: "GET",
        headers: this._headers
    }).then((res) => this._getResponseData(res)) 
}

addNewCard(name, link) { //добавили карточку
    return fetch(this._url+'cards', {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
            name: name,
            link: link
          })
    }).then((res) => this._getResponseData(res)) 
}

removeCard(id) { //удалили карточку
    return fetch(`${this._url}cards/${id}`, {
        method: "DELETE",
        headers: this._headers,
    }).then((res) => this._getResponseData(res)) 
}

setLike (id) { //загрузили лайк на сервер
    return fetch(`${this._url}cards/likes/${id}`, {
        method: "PUT",
        headers: this._headers,
    }).then((res) => this._getResponseData(res)) 
};

deleteLike (id) { //удалили лайк с сервера
    return fetch(`${this._url}cards/likes/${id}`, {
        method: "DELETE",
        headers: this._headers,
    }).then((res) => this._getResponseData(res)) 
};

userAvatarUpdate(link) { //загрузили новый аватар
    return fetch(this._url+'users/me/avatar', {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
            avatar: link
          })
    }).then((res) => this._getResponseData(res)) 
}
 
 _getResponseData(res) {
  if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`); 
  }
  return res.json();
}

changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._url}cards/likes/${id}`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._headers
    })
      .then((res) => this._getResponseData(res)) 
  }

}

const api = new Api ({ //создаем экземпляр класса API
    url: 'https://mesto.nomoreparties.co/v1/cohort-20/',
    headers: {
        'authorization': '9c0a4b23-790f-477e-8923-142dbfd6589d',
        'Content-Type': 'application/json'
      }
});

export default api;