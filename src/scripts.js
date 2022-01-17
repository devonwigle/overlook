import {fetchAllData} from './APICalls';
import Hotel from './classes/hotel';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
let hotel;

document.querySelector('button').addEventListener('click', fetchTheData())

function fetchTheData() {
  let roomsPromise = fetchAllData('rooms');
  let customersPromise = fetchAllData('customers');
  let bookingsPromise = fetchAllData('bookings');
  
  Promise.all([roomsPromise, customersPromise, bookingsPromise])
    .then(data => hotel = new Hotel(data[0], data[1], data[2]))
    .then(() => console.log(hotel))
}
console.log('This is the JavaScript entry file - your code begins here.');
