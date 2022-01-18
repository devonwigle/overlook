import { fetchAllData, fetchSingleUser, postData } from './APICalls';
import Hotel from './classes/hotel';
import currentUser from './scripts'

// Global variables
let hotel;
let sum;
// let currentUser;

let domUpdates = {
  greetUser(currentUser) {
    let userBox = document.querySelector('.user-box');
    userBox.innerText = `Hello ${currentUser.name}`;
  },
  displayUsersExpenses(sum) {
    let amountSpent = document.querySelector('.amount');
    amountSpent.innerText = `Amount Spent: $${sum}`
  },
  displayUserBookings(currentUser) {
    let imageScroll = document.querySelector('.image-scroll');
    imageScroll.innerHTML = ``
    currentUser.bookings.forEach(booking => imageScroll.innerHTML += `
      <div class="booking">
        <p>Date of Stay: ${booking.date}</p>
        <p>Room Number: ${booking.roomNumber}</p>
        <p>Confirmation Number: ${booking.id}</p>
      </div>`
    )
  },
  displayAvailableRoomsByDateType(availableRooms) {
    let bookableRooms = document.querySelector('.bookable-rooms');
    bookableRooms.innerHTML = ``
    availableRooms.forEach(room => bookableRooms.innerHTML += `
      <div class="options">
        <p>Room Number: ${room.number}</p>  
        <p>Room Type: ${room.roomType}</p>
        <p>Has a Bidet: ${room.bidet}</p>
        <p>Bed Size: ${room.bedSize}</p>
        <p>Number of Beds: ${room.numBeds}</p>
        <p>Cost Per Night: $${room.cost}</p>
        <button class="book-it" id="${room.roomNumber}">Book It!</button>
      </div>`
    )
  }
}

export default domUpdates