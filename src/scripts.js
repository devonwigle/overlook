
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
let response;
let availableRooms;

//QuerySelectors
const searchForm = document.querySelector('form');
const bookable = document.querySelector('.bookable-rooms')

// Functions
const loadPage = () => {
  fetchTheData()
    .then(data => {
      hotel = new Hotel(data[0], data[1], data[2])
      addInfo()
      defineUser(50)
      singleCustomerInfo()
      domUpdates.greetUser(currentUser)
    })
    .catch(error => domUpdates.fetchErrorMessage(error))
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
  return currentUser
}

const definePost = (currentUser, dateInput, id) => {
  newPost = {
    userID: currentUser.id,
    date: dateInput,
    roomNumber: parseInt(id)
  }
}

//eventlisteners
window.addEventListener('load', () => {
  loadPage()
  
})

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  let unformattedDate = formData.get('dateSelected');
  let formatDate = unformattedDate.split('-');
  dateInput = formatDate.join('/');
  const roomTypeInput = formData.get('room type');
  if (!roomTypeInput) {
    availableRooms = hotel.filterRoomsByDate(dateInput);
    domUpdates.displayAvailableRoomsByDateType(availableRooms);
  } else if (roomTypeInput && !availableRooms) {
    domUpdates.noAvailability()
  } else if (roomTypeInput && availableRooms.length > 0) {
    availableRooms = hotel.filterRoomsByType(roomTypeInput, dateInput);
    domUpdates.displayAvailableRoomsByDateType(availableRooms);
  }
  e.target.reset()
});

bookable.addEventListener('click', (e) => {
  let id = e.target.closest('button').id
  definePost(currentUser, dateInput, id)
  postData(newPost).then(() => loadPage())
})
bookable.addEventListener('keydown', (e) => {
  if ((e.key === 'Enter' || e.key === 13) || (e.key === ' ' || e.key === 32)) {
    e.preventDefault()
    let id = e.target.closest('button').id
    definePost(currentUser, dateInput, id)
    postData(newPost).then(() => loadPage())
  }
})

export default currentUser