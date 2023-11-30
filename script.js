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
