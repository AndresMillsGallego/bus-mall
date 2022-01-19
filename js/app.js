'use strict';

//Global variables up here at the top
//Put the names into this array to easily make them as objects.
let productNameArray = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','tauntaun','unicorn','water-can','wine-glass'];
let productArray = [];
let numberArray = [];
let imageElementQuantity = 3; // This variable sets the number of products/images to display
let uniqueNumberVariable = imageElementQuantity * 2;//Added this separate variable to ensure 3 unique numbers that don't repeat
let clickCounter = 0;
let maxClickValue = 25; //Set this to 25 for lab11

const productSection = document.querySelector('section');
const myButton = document.querySelector('button');
const resultsUl = document.querySelector('ul');

//Constructor stored here
function Product(name, fileType = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileType}`;
  this.alt = name;
  this.views = 0;
  this.hasBeenClicked = 0;
  productArray.push(this);
}

//For loop to quickly construct the product objects
for (let i = 0; i <productNameArray.length; i++) {
  let storeName = productNameArray[i];
  storeName = new Product(storeName);
}

//made the "sweep" object here since it's the lone object with a .png
new Product('sweep','png');

//Returns a random number based on the length of the productArray
function randomNumber() {
  return Math.floor(Math.random() * productArray.length);
}

//Function below makes an array of unique random numbers.  The length of the array is determined in the "number" parameter.
function createNumberArray(number) {
  while (numberArray.length < number) {
    let num = randomNumber();
    if (numberArray.indexOf(num) === -1) {
      numberArray.push(num);
    }
  }
}
createNumberArray(uniqueNumberVariable);
console.log(numberArray);
// This function is to specifically render images since it calls for src/alt data.
//sets an id to each element that can be used to overwrite the content.
function createImageElement() {
  for (let i = 0; i < imageElementQuantity; i++) {
    let productImage = document.createElement('img');
    productImage.setAttribute('id',i);
    productSection.appendChild(productImage);
  }
}
createImageElement();

// This is the function that actually renders the images.  The quantity of images is determined by the length of numberArray.
//I changed to use 2 different variables so I could use one to create the image elements, and another to render the images making sure they don't repeat.
function renderImages() {
  for (let i = 0; i < imageElementQuantity; i++) {
    let image = document.getElementById(i);
    let arrayNumber = numberArray.shift();
    console.log(arrayNumber);
    image.src = productArray[arrayNumber].src;
    image.alt = productArray[arrayNumber].alt;
    productArray[arrayNumber].views++;
  }
  createNumberArray(uniqueNumberVariable);
  console.log(numberArray);
}
renderImages();

function displayResults() {
  for (let i = 0; i < productArray.length; i++) {
    let results = `${productArray[i].name}: views(${productArray[i].views}) clicks(${productArray[i].hasBeenClicked})`;
    let li = document.createElement('li');
    li.textContent = results;
    resultsUl.appendChild(li);
  }
  myButton.className = '';
  createResetButton();
}

function createResetButton() {
  const footer =  document.querySelector('footer');
  let reset = document.createElement('button');
  reset.setAttribute('id','reset');
  let link = document.createElement('a');
  link.textContent = 'Reset Application';
  link.href = 'index.html';
  reset.appendChild(link);
  footer.appendChild(reset);
}

function handleClick(event) {
  if (event.target === productSection) {
    alert('Please click on one of the images');
  }
  //Below checks if productClicked is in the productArray, then finds the index and increments the clicks.
  let productClicked = event.target.alt;
  if(productArray.indexOf(Product => Product.name === productClicked)) {
    let productIndex = +productArray.findIndex(Product => Product.name === productClicked);
    productArray[productIndex].hasBeenClicked++;
    clickCounter++;
  }
  if (clickCounter === maxClickValue) {
    productSection.removeEventListener('click',handleClick);
    myButton.className = 'myButton';
    myButton.addEventListener('click', displayResults);
    alert('Thank you for completing this survey.  Please click the "View Results" button to see the results.');
  } else {
    renderImages();
  }
}

productSection.addEventListener('click',handleClick);
