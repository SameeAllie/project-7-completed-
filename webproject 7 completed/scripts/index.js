import FormValidator from "./formValidator.js";
import Card from "./Card.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

// Wrappers

const photoGridWrap = document.querySelector(".photo-grid__cards");

const editPopupWindow = document.querySelector(".popup");
const createPopupWindow = document.querySelector(".create-popup");

const editForm = document.querySelector(".popup__edit-container");
const createForm = document.querySelector(
  ".popup__create-container .popup__form"
);

// Buttons and other DOM elements

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editCloseButton = document.querySelector(".popup__close-edit");
const createCloseButton = document.querySelector(".popup__close-create");
const profileTitle = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__title");

const previewImagePopup = document.querySelector(".preview-popup");

// Form Data

const titleInputField = editForm.querySelector(".popup__input_type_title");
const descriptionInputField = editForm.querySelector(
  ".popup__input_type_description"
);

const nameInputField = createForm.querySelector(".popup__input_type_name");
const linkInputField = createForm.querySelector(".popup__input_type_link");

/*
                             Validation
*/

const editFormElement = editPopupWindow.querySelector("#new-card-form");
const addFormElement = createPopupWindow.querySelector("#add-new");

const validateConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
//creates two instances of the FormValidator class and enables validation on two HTML form elements,
//addFormElement and editFormElement, respectively.
const addFormValidator = new FormValidator(validateConfig, addFormElement);
addFormValidator.enableValidation();
const editFormValidator = new FormValidator(validateConfig, editFormElement);
editFormValidator.enableValidation();

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = titleInputField.value;
  profileDescription.textContent = descriptionInputField.value;

  toggleModalVisibility(editPopupWindow);
}

function handleCreateFormSubmit(evt) {
  evt.preventDefault();
  renderCard(
    {
      name: nameInputField.value,
      link: linkInputField.value,
    },
    photoGridWrap
  );

  toggleModalVisibility(createPopupWindow);
  createForm.reset();

  addFormValidator.disableSubmitButton();
}

editForm.addEventListener("submit", handleEditFormSubmit);
createForm.addEventListener("submit", handleCreateFormSubmit);

editButton.addEventListener("click", () => {
  titleInputField.value = profileTitle.textContent;
  descriptionInputField.value = profileDescription.textContent;

  toggleModalVisibility(editPopupWindow);
});

addButton.addEventListener("click", () => {
  toggleModalVisibility(createPopupWindow);
});

const closeButtons = document.querySelectorAll(".popup__close-button");

//.closeButton using the querySelectorAll() method and creates a loop using the forEach() method to iterate over each element.
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => toggleModalVisibility(popup));
});

//This is the function where the escape button is pressed to toggle the modal window
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    toggleModalVisibility(openedPopup);
  }
}
function removeEscListener() {
  document.removeEventListener("keyup", handleEscClose);
}
function addEscListener() {
  document.addEventListener("keyup", handleEscClose);
}
//toggles the visibility of a modal window element by adding or removing the class popup_opened.
function toggleModalVisibility(popupWindow) {
  popupWindow.classList.toggle("popup_opened");
  if (popupWindow.classList.contains("popup_opened")) {
    addEscListener();
  } else {
    removeEscListener();
  }
}

//This is the function that is the overlay for the modal window
function attachPopupMouseDownHandler(popup) {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === popup) {
      toggleModalVisibility(popup);
    }
  });
}
// Attach the event handlers for each popup
attachPopupMouseDownHandler(editPopupWindow);
attachPopupMouseDownHandler(createPopupWindow);
attachPopupMouseDownHandler(previewImagePopup);

const renderCard = (data, wrapper) => {
  const newCard = new Card(data, "#card-template").generateCard();
  wrapper.prepend(newCard);
};

initialCards.forEach((data) => {
  renderCard(data, photoGridWrap);
});

// allow Card class to have access to function
export { toggleModalVisibility };
