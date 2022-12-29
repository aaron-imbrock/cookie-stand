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
let tableSection = document.getElementById('table');

console.log(locationSection);

const hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];


// ************* HELPER FUNCTION - GENERATE A RANDOM NUMBER *************
// taken from MDN docs943 COOKIES
function getRandomIntInclusive(minInt, maxInt) {
  return Math.floor(Math.random() * (maxInt - minInt + 1) + minInt);
}

// ************* HELPER FUNCTION - GENERATE TABLE SKELETON *************
function renderTableHeader(locationHours) {
  // thead
  let theadElem = document.createElement('thead');
  theadElem.setAttribute('id', 'tableHead');
  tableSection.appendChild(theadElem);
  // tr
  let trElem = document.createElement('tr');
  theadElem.appendChild(trElem);
  // th 
  let thElem = document.createElement('th');
  trElem.appendChild(thElem);
  for (let i = 0; i < hours.length; i++) {
    thElem = document.createElement('th');
    thElem.textContent = locationHours[i];
    trElem.appendChild(thElem);
  }
  thElem = document.createElement('th');
  thElem.textContent = 'Daily Location Total';
  trElem.appendChild(thElem);
}

let locations = [];

// CONSTRUCTOR 

function Store(storeName, minCust, maxCust, avg) {
    this.storeName = storeName;
    this.minCust = minCust;
    this.maxCust = maxCust;
    this.avg = avg;
    this.cookiesArray = [];
    this.customersArray = [];
    this.dailyTotal = 0

    locations.push(this);
}

new Store('Seattle', 23, 65, 6.3);
new Store('Tokyo', 3, 24, 1.2);
new Store('Dubai', 11, 38, 3.7);
new Store('Paris', 20, 38, 2.3);
new Store('Lima', 2, 16, 4.6);

Store.prototype.setCustomersPerHour = function() {
    for (let i = 0; i < hours.length; i++) {
      this.customersArray.push(getRandomIntInclusive(this.minCust, this.maxCust));
    }
};

Store.prototype.setCookiesPerHour = function() {
    for (let i = 0; i < hours.length; i++) {
      this.cookiesArray.push(Math.floor(this.customersArray[i] * this.avg));
    }
};

Store.prototype.setCookiesTotal = function() {
    for (let i = 0; i < hours.length; i++) {
      this.dailyTotal += this.cookiesArray[i];
    }
};

Store.prototype.render = function() {
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
  let liElem = document.createElement('li');
  liElem.textContent = `Total: ${this.dailyTotal} cookies`;
  articleElem.appendChild(liElem);
}

// RENDER TABLE

function renderTableBody() {
  
  // tbody
  let tbodyElem = document.createElement('tbody');
  tbodyElem.setAttribute('id', 'tableBody');
  tableSection.appendChild(tbodyElem);
  // tr 
  for (let i = 0; i < locations.length; i++) {
    let trElem = document.createElement('tr');
    tbodyElem.appendChild(trElem);
    // th and td for loop per location
    let thElem = document.createElement('th');
    thElem.textContent = locations[i].storeName;
    trElem.appendChild(thElem);
    for (let j = 0; j < locations[i].cookiesArray.length; j++) {
      let tdElem = document.createElement('td');
      tdElem.textContent = locations[i].cookiesArray[j];
      trElem.appendChild(tdElem);
      }
      let tdElem = document.createElement('td');
      tdElem.textContent = locations[i].dailyTotal;
      tdElem.setAttribute('id', 'dailyTotal');
      trElem.appendChild(tdElem);
  }
}

function renderTableFooter() {
  // tfooter
  let hourlyVal = 0;
  let grandHourlyTotals = new Array(14).fill(0);
  let grandLocationTotal = 0;
  for (let i = 0; i < locations.length; i++) {
    grandLocationTotal += locations[i].dailyTotal;
  }
  for (let i = 0; i < locations.length; i++) {
    for (let j = 0; j < locations[i].cookiesArray.length; j++) {
      hourlyVal = locations[i].cookiesArray[j];
      grandHourlyTotals[j] += hourlyVal;
    }
  }
  console.dir(grandHourlyTotals);
  let tfootElem = document.createElement('tfoot');
  tfootElem.setAttribute('id', 'table-footer');
  tableSection.appendChild(tfootElem);
  let trElem = document.createElement('tr');
  tfootElem.appendChild(trElem);
  let thElem = document.createElement('th');
  thElem.textContent = 'Hourly Totals';
  trElem.appendChild(thElem);
  for (let k = 0; k < grandHourlyTotals.length; k++) {
    let tdElem = document.createElement('td');
    tdElem.textContent = grandHourlyTotals[k];
    trElem.appendChild(tdElem);
  }
  let tdElem = document.createElement('td');
  tdElem.textContent = grandLocationTotal;
  trElem.appendChild(tdElem);
}

// RENDER ALL Locations

function renderAllLocations() {
  for (let i = 0; i < locations.length; i++) {
      locations[i].setCustomersPerHour();
      locations[i].setCookiesPerHour();
      locations[i].setCookiesTotal();
      locations[i].render();
  }
}

renderAllLocations();
renderTableHeader(hours);
renderTableBody();
renderTableFooter();

console.dir(locations);
