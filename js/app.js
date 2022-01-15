'use strict';

let productArray = [];
let clickCounter = 0;
let maxClickValue = 25;

const productSection = document.querySelector('section');

let firstImage = document.querySelector('section img:first-child');
let secondImage = document.querySelector('section img:nth-child(2)');
let thirdImage = document.querySelector('section img:last-child');

function Product(name) {
  this.name = name;
  this.src = `img/${name}.jpg`;
  this.alt = name;
  this.views = 0;
  this.hasBeenClicked = 0;
  productArray.push(this);
}

function randomNumber() {
  return Math.floor(Math.random) * productArray.length;
}

function renderImages() {
  let image1 = randomNumber();
  let image2 = randomNumber();
  let image3 = randomNumber();
}
