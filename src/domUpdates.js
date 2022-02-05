
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
      <article class="booking">
        <p>Date of Stay: ${booking.date}</p>
        <p>Room Number: ${booking.roomNumber}</p>
        <p>Confirmation Number: ${booking.id}</p>
      </article>`
    )
  },
  displayAvailableRoomsByDateType(availableRooms) {
    let bookableRooms = document.querySelector('.bookable-rooms');
    bookableRooms.innerHTML = ``
    availableRooms.forEach(room => bookableRooms.innerHTML += `
      <article class="options">
        <p>Room Number: ${room.number}</p>  
        <p>Room Type: ${room.roomType}</p>
        <p>Has a Bidet: ${room.bidet}</p>
        <p>Bed Size: ${room.bedSize}</p>
        <p>Number of Beds: ${room.numBeds}</p>
        <p>Cost Per Night: $${room.cost}</p>
        <button class="book-it" id="${room.number}">Book It!</button>
      </article>`
    )
  },
  fetchErrorMessage(error) {
    let message;
    let imageScroll = document.querySelector('.image-scroll');
    if (error.message === 'Failed to fetch') {
      imageScroll.innerHTML = `<h2> Oops, is your internet on? </h2>`
    } else {
      message = error.message;
    }
  },
  noAvailability() {
    let bookableRooms = document.querySelector('.bookable-rooms');
    bookableRooms.innerHTML = `<h2>We SOOOO sorry, your choices are not available on this day.  Please try another day, you will not be sorry</h2>`
  },
  displayLoginError(place) {
    const loginError = document.querySelector('.login-error')
    loginError.innerText = `Oops, your ${place} incorrect`
  },
  show(show) {
    show.classList.remove('hidden')
  },
  hide(hide) {
    hide.classList.add('hidden')
  },
  resetBookableRooms() {
    let bookableRooms = document.querySelector('.bookable-rooms');
    bookableRooms.innerHTML = `Search to book another room!`
  }
}

export default domUpdates