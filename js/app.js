/* eslint-disable no-unused-vars */ // <= that was the only way I could get rid of the annoying squiggly red lines under my Chart
/* eslint-disable no-undef */
'use strict';

//Global variables up here at the top
//Put the names into this array to easily make them as objects.
let startingNameArray = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','tauntaun','unicorn','water-can','wine-glass'];
let productArray = [];
let numberArray = [];
let imageElementQuantity = 3; // This variable sets the number of products/images to display
let uniqueNumberVariable = imageElementQuantity * 2;//Added this separate variable to ensure 3 unique numbers that don't repeat
let clickCounter = 0;
<<<<<<< HEAD
let maxClickValue = 25; //Set this to 25 for lab11
=======
let maxClickValue = 25; //Set this to 25 for labe1
>>>>>>> chartjs

const productSection = document.getElementById('imageSection');
const button = document.getElementById('buttonDiv');
const chartInfo = document.getElementById('myCanvas');
const chartSection = document.getElementById('extraCharts');

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
//sets an id to each element that can be used to overwrite the content.  This makes it so you can adjust the quantity of image elements from here and don't need to hard code it to the HTML
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
function renderChart(chartType, elementId) {
  let productNameArray = [];
  let productViewsArray = [];
  let productLikesArray = [];
  for (let i = 0; i < productArray.length; i++) {
    let capName = productArray[i].name.charAt(0).toUpperCase() + productArray[i].name.slice(1);//I could have done this in one line, but this is more readable.
    productNameArray.push(capName);
    productViewsArray.push(productArray[i].views);
    productLikesArray.push(productArray[i].hasBeenClicked);
  }
  const data = {
    labels: productNameArray,

    datasets: [{
      label: 'Number of Views',
      data: productViewsArray,
      backgroundColor: 'yellow',
      borderColor: 'azure',
      borderRadius: 2,
      borderWidth: 2,
      hoverOffset: 4,
      pointRadius: 5,
      pointHoverRadius: 6,
      lineTension: .1
    },
    {
      label: 'Number of Likes',
      data: productLikesArray,
      backgroundColor: 'fuchsia',
      borderColor: 'azure',
      borderRadius: 2,
      borderWidth: 2,
      hoverOffset: 4,
      pointRadius: 5,
      pointHoverRadius: 6,
      lineTension: .1
    }]
  };
  const config = {
    type: chartType,
    data: data,
    options: {
      plugins: {
        legend: {
          labels: {
            color: '#1E90FF',
            font: {
              size: 18
            }
          }
        }
      },
      layout: {
        padding: 20
      },
      scales: {
        y: {
          ticks: {
            color: 'lime'
          },
          beginAtZero: true,
          grid: {
            color: 'lightgrey'
          }
        },
        x: {
          ticks: {
            color: 'aqua'
          },
          beginatZero: true
        }
      }
    },
  };
  document.querySelector('canvas').style.backgroundColor = '#181A18';
  const myChart = new Chart(elementId, config);
}

//The function is for creating buttons.  The text parameter assigns the id as well as the text content.
function createButton(text) {
  const buttonDiv =  document.getElementById('buttonDiv');
  let button = document.createElement('button');
  button.setAttribute('id', text);
  button.textContent = text;
  buttonDiv.appendChild(button);
}

//This handles what happens when one of the newly rendered buttons is clicked.  I was able to offer two additional chart type options as well as a reset button.
function buttonClick(event) {
  if (event.target.id === 'Reset') {
    window.location.reload();
  }
  if(event.target.id === 'Doughnut') {
    let canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'pieChart');
    chartSection.appendChild(canvas);
    document.getElementById('pieChart').style.backgroundColor = '#181A18';
    renderChart('doughnut', canvas);
    document.querySelector('footer').scrollIntoView({behavior: 'smooth'});
    document.getElementById('Doughnut').id = 'oldDoughnut';
    document.getElementById('Line').id = 'oldLine';
  }
  if (event.target.id === 'Line') {
    let canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'lineChart');
    chartSection.appendChild(canvas);
    document.getElementById('lineChart').style.backgroundColor = '#181A18';
    renderChart('line', canvas);
    document.querySelector('footer').scrollIntoView({behavior: 'smooth'});
    document.getElementById('Doughnut').id = 'oldDoughnut';
    document.getElementById('Line').id = 'oldLine';
  }
}

//The main code for selecting the images shown to the user.
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
    createButton('Line');
    createButton('Reset');
    createButton('Doughnut');
  } else {
    renderImages();
  }
}

productSection.addEventListener('click',handleClick);

