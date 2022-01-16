'use strict';

//Note, does not include sweep since that is a png file
let productNameArray = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','tauntaun','unicorn','water-can','wine-glass'];
let productArray = [];
let clickCounter = 0;
let maxClickValue = 25;

const productSection = document.querySelector('section');
const myButton = document.querySelector('button');
const resultsUl = document.querySelector('ul');

let firstImage = document.querySelector('section img:first-child');
let secondImage = document.querySelector('section img:nth-child(2)');
let thirdImage = document.querySelector('section img:last-child');

function Product(name, fileType = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileType}`;
  this.alt = name;
  this.views = 0;
  this.hasBeenClicked = 0;
  productArray.push(this);
}

for (let i = 0; i <productNameArray.length; i++) {
  let storeName = productNameArray[i];
  storeName = new Product(storeName);
}
new Product('sweep','png');

console.log(productArray);

function randomNumber() {
  return Math.floor(Math.random() * productArray.length);
}

function renderImages() {
  let image1 = randomNumber();
  let image2 = randomNumber();
  let image3 = randomNumber();
  while (image1 === image2) {
    image2 = randomNumber();
    while (image1 === image3) {
      image2 = randomNumber();
    }
  }
  while (image2 === image3) {
    image3 = randomNumber();
    while (image1 === image3) {
      image3 = randomNumber();
    }
  }
  firstImage.src = productArray[image1].src;
  firstImage.alt = productArray[image1].alt;
  productArray[image1].views++;
  secondImage.src = productArray[image2].src;
  secondImage.alt = productArray[image2].alt;
  productArray[image2].views++;
  thirdImage.src = productArray[image3].src;
  thirdImage.alt = productArray[image3].alt;
  productArray[image3].views++;
}
renderImages();

function displayResults() {
  for (let i = 0; i < productArray.length; i++) {
    let message = `${productArray[i].name} views = ${productArray[i].views} clicks = ${productArray[i].hasBeenClicked}`;
    let li = document.createElement('li');
    li.textContent = message;
    resultsUl.appendChild(li);
  }
}
function handleClick(event) {
  if (event.target === productSection) {
    alert('Please click on one of the images');
  }
  let productClicked = event.target.alt;
  for (let i = 0; i < productArray.length; i++) {
    if (productClicked === productArray[i].name) {
      productArray[i].hasBeenClicked++;
      clickCounter++;
      break;
    }
  }
  if (clickCounter === maxClickValue) {
    productSection.removeEventListener('click',handleClick);
    myButton.className = 'myButton';
    myButton.addEventListener('click', displayResults);
    alert('Thank you for completing this survey.  Please click the "View Results" button to see the results.');
  }
  console.log(clickCounter);
  renderImages();
}


productSection.addEventListener('click',handleClick);

