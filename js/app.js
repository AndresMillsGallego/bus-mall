'use strict';

//Global variables up here at the top
//Put the names into this array to easily make them as objects.
let startingNameArray = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','tauntaun','unicorn','water-can','wine-glass'];
let productArray = [];
let numberArray = [];
let imageElementQuantity = 3; // This variable sets the number of products/images to display
let uniqueNumberVariable = imageElementQuantity * 2;//Added this separate variable to ensure 3 unique numbers that don't repeat
let clickCounter = 0;
let maxClickValue = 25; //Set this to 25 for lab11

const productSection = document.getElementById('imageSection');
const button = document.getElementById('buttonDiv');
const chartInfo = document.getElementById('myCanvas');

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
for (let i = 0; i <startingNameArray.length; i++) {
  let storeName = startingNameArray[i];
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
}
renderImages();

//I am including a parameter that takes chart type as an argument.  That way I can render different charts with the same function.
function renderChart(chartType,elementId) {
  let productNameArray = [];
  let productViewsArray = [];
  let productLikesArray = [];
  for (let i = 0; i < productArray.length; i++) {
    productNameArray.push(productArray[i].name);
    productViewsArray.push(productArray[i].views);
    productLikesArray.push(productArray[i].hasBeenClicked);
  }
  const data = {
    labels: productNameArray,

    datasets: [{
      label: 'Number of Views',
      data: productViewsArray,
      backgroundColor: 'yellow',
      borderColor: 'red',
      borderWidth: 2,
      hoverOffset: 4
    },
    {
      label: 'Number of Likes',
      data: productLikesArray,
      backgroundColor: 'fuchsia',
      borderColor: 'red',
      borderWidth: 2,
      hoverOffset: 4
    }]
  };
  const config = {
    type: chartType,
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };
  document.querySelector('canvas').style.backgroundColor = '#181A18';
  const myChart = new Chart(chartInfo, config);
}

function createButton(text) {
  const buttonDiv =  document.getElementById('buttonDiv');
  let button = document.createElement('button');
  button.setAttribute('id', text);
  button.textContent = text;
  buttonDiv.appendChild(button);
}

function buttonClick(event) {
  if (event.target.id === 'Reset') {
    window.location.reload();
  }
  // if(event.target.id === 'Pie') {
  //   let pieCanvas = document.createElement('canvas');
  //   canvasDiv.appendChild(pieCanvas);
  //   renderChart('pie', pieCanvas);
  // }
  // if (event.target.id === 'Line') {
  //   let lineCanvas = document.createElement('canvas');
  //   canvasDiv.appendChild(lineCanvas);
  //   renderChart('line',lineCanvas);
  //   renderChart('line');
  // }
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
    button.addEventListener('click', buttonClick);
    let buttonDiv = document.getElementById('buttonDiv');
    buttonDiv.setAttribute('class','buttons');
    renderChart('bar',chartInfo);
    createButton('Reset');
    // createButton('Line');
    // createButton('Pie');
  } else {
    renderImages();
  }
}

productSection.addEventListener('click',handleClick);

