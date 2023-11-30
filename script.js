"use strict";
//card holder input name
const cardHolderInputEl = document.querySelector("input[data-cardholder]");

//card number input value
const cardNumberInputEl = document.querySelector("input[data-cardnum]");

//month date and cvc number value
const dateCvcEl = document.querySelectorAll("input[data-date]");

//interactive card elements
const interactiveEl = document.querySelectorAll("[data-interactive]");

//cvc element on the back card
const cvcEl = document.querySelector("[data-cvc]");

//all the error msgs
const errorMsgEl = document.querySelectorAll(".error_msg");

//the submit button
const submitBtnEl = document.querySelector("button");

//all input fields
const allInputEl = document.querySelectorAll("input");

//form element
const form = document.querySelector(".form_container");
console.log(form);
//adding the interactivity

let interactiveElements = [...interactiveEl, cvcEl];
//card holder name
cardHolderInputEl.addEventListener("input", function (e) {
  interactiveElements[1].textContent = e.target.value;
  setToInitialState(e, interactiveElements[1]);
});

const setToInitialState = function (el, set) {
  if (el.target.value.length == 0) {
    set.textContent = "Jane Applessed";
  }
};

//card number
cardNumberInputEl.addEventListener("input", function (e) {
  //adding a space after every four numbers in the input field
  if (
    e.target.value.length == 4 ||
    e.target.value.length == 9 ||
    e.target.value.length == 14
  ) {
    e.target.value += " ";
  }

  //adding a space after every four numbers in the front card image
  interactiveElements[0].textContent = `${e.target.value
    .replaceAll(" ", "")
    .padEnd(16, "0")
    .match(/.{1,4}/g)
    .join(" ")}`;
});

//dates and cvc
dateCvcEl.forEach((el, i) => {
  el.addEventListener("input", function (e) {
    //Not allowing users to type after the maximum length
    maxNum(e);
    enforceMinMax(e.target);
    interactiveElements[i + 2].textContent = e.target.value;
  });
});

submitBtnEl.addEventListener("click", function (e) {
  e.preventDefault();
  check();
  let done = 0;
  allInputEl.forEach((el, i) => {
    if (!el.classList.contains("error")) {
      el.style.borderColor = "teal";
      done++;
    }
  });
  if (done === 5) {
    form.className = "hidden";
    document.querySelector(".complete").classList.remove("hidden");
  }
});

const maxNum = function (element) {
  if (element.target.value.length > element.target.maxLength)
    element.target.value = element.target.value.slice(
      0,
      element.target.maxLength
    );
};

function enforceMinMax(el) {
  if (el.value != "") {
    if (parseInt(el.value) < parseInt(el.min)) {
      el.value = el.min;
    }
    if (parseInt(el.value) > parseInt(el.max)) {
      el.value = el.max;
    }
  }
}

function check() {
  const name = cardHolderInputEl.value.trim();
  const cardNumber = cardNumberInputEl.value.trim();
  const month = dateCvcEl[0].value.trim();
  const year = dateCvcEl[1].value.trim();
  const cvc = dateCvcEl[2].value.trim();
  const allElements = [name, cardNumber, month, year, cvc];
  const valid = [];
  console.log(allElements);
  //checking all the elements if there is any blank one
  allElements.forEach((el, i) => {
    setErrorMsg(el, errorMsgEl[i], allInputEl[i]);
    if (setErrorMsg(el, errorMsgEl[i], allInputEl[i]))
      allInputEl[i].classList.remove("error");
    errorMsgEl[i].textContent = "";
    if (i >= 1) checkLenght(allInputEl[i], errorMsgEl[i], allInputEl[i]);
    console.log(Boolean(setErrorMsg(el, errorMsgEl[i], allInputEl[i])));
  });
  //checking for any number on name element

  onlyLetters(name, errorMsgEl[0], allInputEl[0]);
  //Checking if there is any alphabets in the second input element (Card number)
  onlyNumbers(cardNumber, errorMsgEl[1], allInputEl[1]);

  function setErrorMsg(el, errorEl, inputEl) {
    if (!el) {
      errorEl.textContent = "can't be blank";
      inputEl.classList.add("error");
      return true;
    }
    return valid.push(inputEl);
  }

  function onlyNumbers(el, errorEl, inputEl) {
    if (el.value && Number(el.value.trim()) !== NaN) {
      errorEl.textContent = "Only numbers";
      inputEl.classList.add("error");
      return true;
    }
    return valid.push(inputEl);
  }
  function onlyLetters(el, errorEl, inputEl) {
    if (/\d/.test(el)) {
      errorEl.textContent = "Only alphabets";
      inputEl.classList.add("error");
      return true;
    }
    return valid.push(inputEl);
  }
  function checkLenght(el, errorEl) {
    if (el.maxLength > el.value && el.value) {
      errorEl.textContent = `invalid(too short)`;
      return true;
    }
    return valid.push(el);
  }
}
console.log();
