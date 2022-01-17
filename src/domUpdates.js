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
  }
}

export default domUpdates