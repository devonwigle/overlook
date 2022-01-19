
import {fetchAllData, fetchSingleUser, postData} from './APICalls';
import Hotel from './classes/hotel';
import domUpdates from './domUpdates'
import './css/base.scss';
import Customer from './classes/customer';

// Global variables
let hotel;
let currentUser;
let sum;
let newPost;
let dateInput;
let availableRooms;

//QuerySelectors
const bookable = document.querySelector('.bookable-rooms');
const usernameInput = document.querySelector('#usernameInput');
const passwordInput = document.querySelector('#passwordInput');
const loginButton = document.querySelector('.login-button');
const mainPage = document.querySelector('.main-page');
const loginPage = document.querySelector('.login-page');
const selectionForm = document.querySelector('.selection-form')

// Functions
const loadPage = () => {
  fetchTheData(currentUser.id)
    .then(data => {
      hotel = new Hotel(data[0], data[1], data[2])
      addInfo()
      defineCurrentUser()
      singleCustomerInfo()
      domUpdates.greetUser(currentUser)
    })
    .catch(error => domUpdates.fetchErrorMessage(error))
}

const login = (e) => {
  e.preventDefault();
  let userID = defineUser(usernameInput)
  if (userID > 0 && userID < 51 && passwordInput.value === 'overlook2021') {
    fetchTheData(userID)
    .then(data => {
      hotel = new Hotel(data[0], data[1], data[2])
      addInfo()
      console.log('hotel', hotel)
      defineCurrentUser()
      singleCustomerInfo()
    })
    .catch(error => domUpdates.fetchErrorMessage(error))
  }
  domUpdates.show(mainPage)
  domUpdates.hide(loginPage)
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

const fetchTheData = (userID) => {
  return Promise.all([fetchAllData('rooms'), fetchSingleUser(userID), fetchAllData('bookings')])
}

const defineUser = (input) => {
  let username = input.value
  let userID = username.substring(8)
  return userID
}

const defineCurrentUser = () => {
  return currentUser = hotel.allCustomers[0];
}

const definePost = (currentUser, dateInput, id) => {
  newPost = {
    userID: currentUser.id,
    date: dateInput,
    roomNumber: parseInt(id)
  }
}

loginButton.addEventListener('click', (e) => {
  login(e)
})

selectionForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  let unformattedDate = formData.get('dateSelected');
  let formatDate = unformattedDate.split('-');
  dateInput = formatDate.join('/');
  const roomTypeInput = formData.get('room type');
  hotel.filterRoomsByDate(dateInput);
  availableRooms = hotel.filteredRoomsByDate
  if (!roomTypeInput) {
    domUpdates.displayAvailableRoomsByDateType(availableRooms);
  }
  if(roomTypeInput) {
    hotel.filterRoomsByType(roomTypeInput, dateInput);
    availableRooms = hotel.filteredRoomsByType
  }
  if (roomTypeInput && availableRooms.length > 0) {
    domUpdates.displayAvailableRoomsByDateType(availableRooms);
  } else  if (roomTypeInput && availableRooms.length === 0) {
    domUpdates.noAvailability()
  } 
  e.target.reset()
});

bookable.addEventListener('click', (e) => {
  let id = e.target.closest('button').id
  definePost(currentUser, dateInput, id)
  postData(newPost).then(() => loadPage())
  domUpdates.resetBookableRooms()
})

bookable.addEventListener('keydown', (e) => {
  if ((e.key === 'Enter' || e.key === 13) || (e.key === ' ' || e.key === 32)) {
    e.preventDefault()
    let id = e.target.closest('button').id
    definePost(currentUser, dateInput, id)
    postData(newPost).then(() => loadPage())
    domUpdates.resetBookableRooms()
  }
})

export default currentUser