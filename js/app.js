'use strict';

// Create JS object literals for each shop location.
// Store min/max hourly customers
// Average cookies per customer
// Use a method of that object to generate a random number of customers per hour. Objects/Math/random
// Calculate and store simulated amounts of cookies purchased for each hour at each location using average cookies purchased and a random number of customers generated.
// Write a helper function that generates random number taking in a min and max param.
// Store results for each location in a separate array as a property of the object representing that location.
// Display the values of each array as unordered lists in the browser.

// ***** WINDOW INTO THE DOM *****
let locationSection = document.getElementById('location-profiles');

console.log(locationSection);

const hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

// ************* HELPER FUNCTION - GENERATE A RANDOM NUMBER *************
// taken from MDN docs
function getRandomIntInclusive(minInt, maxInt) {
  return Math.floor(Math.random() * (maxInt - minInt + 1) + minInt);
}

// ************* OBJECT LITERALS *************
let frankie = {
  name: 'Frankie',
  // age: 0,
  age: `${getRandomIntInclusive(3, 12)} months old`,
  interests: ['wet food', 'knocking stuff off counters', 'cat nip'],
  isGoodWithCats: true,
  isGoodWithDogs: false,
  isGoodWithKids: true,
  photo: 'img/frankie.jpg',
  // each kitty is responsible for adding themselves to the DOM
  // **** DOM Manipulation ****
  // 1/ Grab window into the DOM. JS must have access to HTML, grab an element.
  render() {
    // Create element
    let articleElem = document.createElement('article');
    // Add to the DOM
    locationSection.appendChild(articleElem);
    // h2
    let h2Elem = document.createElement('h2');
    h2Elem.textContent = this.name;
    articleElem.appendChild(h2Elem);
    // p
    let pElem = document.createElement('p');
    pElem.textContent = `${this.name} is ${this.age}`;
    articleElem.appendChild(pElem);
    // ul
    let ulElem = document.createElement('ul');
    articleElem.appendChild(ulElem);
    // li
    for (let i = 0; i < this.interests.length; i++) {
      let liElem = document.createElement('li');
      liElem.textContent = this.interests[i];
      ulElem.appendChild(liElem);
    }
    // img
    let imgElem = document.createElement('img');
    imgElem.src = this.photo;
    imgElem.alt = 'kitten';
    articleElem.appendChild(imgElem);
  }
};

let seattle = {
  storeName: 'Seattle',
  minCust: 23,
  maxCust: 65,
  avg: 6.3,
  cookiesArray: [],
  customersArray: [],
  dailyTotal: 0,
  setCustomersPerHour() {
    for (let i = 0; i < hours.length; i++) {
      this.customersArray.push(getRandomIntInclusive(this.minCust, this.maxCust));
    }
  },
  setCookiesPerHour() {
    for (let i = 0; i < hours.length; i++) {
      this.cookiesArray.push(Math.floor(this.customersArray[i] * this.avg));
    }
  },
  setCookiesTotal() {
    for (let i = 0; i < hours.length; i++) {
      this.dailyTotal += this.cookiesArray[i];
    }
  },
  render() {
    this.setCustomersPerHour();
    this.setCookiesPerHour();
    this.setCookiesTotal();
    let articleElem = document.createElement('article');
    locationSection.appendChild(articleElem);
    // h2
    let h2Elem = document.createElement('h2');
    h2Elem.textContent = this.storeName;
    articleElem.appendChild(h2Elem);
    // ul
    let ulElem = document.createElement('ul');
    articleElem.appendChild(ulElem);
    // li
    for (let i = 0; i < hours.length; i++) {
      let liElem = document.createElement('li');
      liElem.textContent = `${hours[i]}: ${this.cookiesArray[i]} cookies`;
      ulElem.appendChild(liElem);
    }
    // li - Total
    let pElem = document.createElement('li');
    pElem.textContent = `Total: ${this.dailyTotal} cookies`;
    articleElem.appendChild(pElem);
  },
};
seattle.render();

console.table(seattle);