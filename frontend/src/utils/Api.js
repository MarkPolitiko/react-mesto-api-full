const authInfo = {
  url: "https://api.mp.students.nomoredomainsclub.ru",
  headers: {
    //Authorization: "bf036392-6320-48e8-bc39-fe0e751cfef6",
    "Content-Type": "application/json",
  },
};

export class API {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
    const jwt = localStorage.getItem("jwt")
    if(jwt) {
      this._headers.authorization = "Bearer " + jwt;
    }
  }

  useToken(token) {
    localStorage.setItem("jwt", token);
    this._headers.authorization = "Bearer " + token;
  }

  async _processFetch(track, method = "GET", body) {
    const params = { headers: this._headers, method };
    if (body) {
      if (typeof body === "string") {
        params.body = body;
      } else {
        params.body = JSON.stringify(body);
      }
    }
    const res = await fetch(this._url + track, params);
    if (res.ok) {
      return res.json()
    }
      return Promise.reject(`Ошибка: ${res.status}`)
  }

  getProfileInfo() {
    return this._processFetch("/users/me", "GET");
  }

  getInitialCards() {
    return this._processFetch("/cards", "GET");
  }

  patchProfile(values) {
    return this._processFetch("/users/me", "PATCH", values);
  }

  postNewCard(values) {
    return this._processFetch("/cards", "POST", values);
  }

  deleteCard(id) {
    return this._processFetch(`/cards/${id}`, "DELETE");
  }

  putLike(id) {
    return this._processFetch(`/cards/${id}/likes`, "PUT");
  }

  deleteLike(id) {
    return this._processFetch(`/cards/${id}/likes`, "DELETE");
  }

  patchAvatar(values) {
    return this._processFetch(`/users/me/avatar`, "PATCH", values);
  }
}

export const api = new API(authInfo);