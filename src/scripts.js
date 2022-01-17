
import {fetchAllData, fetchSingleUser, postData} from './APICalls';
import Hotel from './classes/hotel';
import domUpdates from './domUpdates'
import './css/base.scss';
import Customer from './classes/customer';

// Global variables
let hotel;
let currentUser;
let rooms;


// Functions
const loadPage = () => {
  fetchTheData()
  .then(data => {
    hotel = new Hotel(data[0], data[1], data[2])
    addInfo()
    defineUser(50)
    domUpdates.greetUser(currentUser)
  })
}

const addInfo = () => {
  hotel.addRooms();
  hotel.addBookings();
  hotel.addCustomers();
}

const fetchTheData = () => {
  const response = Promise.all([fetchAllData('rooms'), fetchAllData('customers'), fetchAllData('bookings')])
  return response
}

const defineUser = (userID) => {
  currentUser = hotel.allCustomers[userID - 1]
  console.log('user', currentUser)
  return currentUser
}
const iAmAFunction = () => {
  console.log('hello')
  console.log('function', hotel)
}
//eventlisteners
window.addEventListener('load', () => {
  loadPage()
  domUpdates.greetUser(currentUser)
})

export default currentUser