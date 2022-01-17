
import {fetchAllData, fetchSingleUser, postData} from './APICalls';
import Hotel from './classes/hotel';
import domUpdates from './domUpdates'
import './css/base.scss';
import Customer from './classes/customer';

// Global variables
let hotel;
let currentUser;
let sum;
let response;

//QuerySelectors
const searchForm = document.querySelector('form');


// Functions
const loadPage = () => {
  fetchTheData()
  .then(data => {
    hotel = new Hotel(data[0], data[1], data[2])
    addInfo()
    defineUser(50)
    singleCustomerInfo()
  })
}

const addInfo = () => {
  hotel.addRooms();
  hotel.addBookings();
  hotel.addCustomers();
}

const singleCustomerInfo = () => {
  hotel.filterBookingsByCustomerID(currentUser);
  domUpdates.greetUser(currentUser);
  sum = currentUser.sumUserBookings(hotel)
  domUpdates.displayUsersExpenses(sum)
  domUpdates.displayUserBookings(currentUser);
}

const fetchTheData = () => {
  return response = Promise.all([fetchAllData('rooms'), fetchAllData('customers'), fetchAllData('bookings')])
}

const defineUser = (userID) => {
  currentUser = hotel.allCustomers[userID - 1]
  console.log('user', currentUser)
  return currentUser
}

//eventlisteners
window.addEventListener('load', () => {
  loadPage()
  domUpdates.greetUser(currentUser)
})

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const dateInput = formData.get('dateSelected');
  const roomTypeInput = formData.get('room type');
  if (!roomTypeInput) {
    const availableRooms = hotel.filterRoomsByDate(dateInput);
    domUpdates.displayAvailableRoomsByDateType(availableRooms);
  } else {
    const availableRooms = hotel.filterRoomsByType(roomTypeInput, dateInput);
    domUpdates.displayAvailableRoomsByDateType(availableRooms);
  }
  e.target.reset()
});

export default currentUser