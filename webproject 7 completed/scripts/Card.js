import { toggleModalVisibility } from "./index.js";

class Card {
  constructor(data, cardTemplate) {
    this._data = data;
    this.cardTemplate = cardTemplate;
    this._previewCardImage = document.querySelector(".popup__preview-image");
    this._previewCardName = document.querySelector(".popup__preview-name");
    this._previewImagePopup = document.querySelector(".preview-popup");
  }

  generateCard() {
    this._cardTemplate = document
      .querySelector(this.cardTemplate)
      .content.querySelector(".card");

    this._cardElement = this._cardTemplate.cloneNode(true);

    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );

    //imagePreview controls the preview image when the click event has happened.

    this._imagePreviewTitle = this._cardElement.querySelector(".card__title");

    this._imagePreview = this._cardElement.querySelector(".card__image");

    this._cardElement.querySelector(
      ".card__image"
    ).style.backgroundImage = `url('${this._data.link}')`;

    this._imagePreviewTitle.textContent = this._data.name;

    this._setEventListeners();
    return this._cardElement;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", function (evt) {
        evt.target.classList.toggle("card__active-button");
      });
    this._deleteButton.addEventListener("click", () => {
      this._cardElement.remove();
    });

    this._imagePreview.addEventListener("click", () => {
      this._previewCardImage.src = this._data.link;
      this._previewCardImage.alt = `'Photo of ${this._data.name}'`;
      this._previewCardName.textContent = this._data.name;
      toggleModalVisibility(this._previewImagePopup);
    });
  }
}

export default Card;
