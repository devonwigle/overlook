import Customer from './customer';
import Room from './room';
import Booking from './booking';
import roomsData from '../../test/test-data/room-data';

class Hotel {
  constructor(roomsData, customersData, bookingsData) {
    this.roomsData = roomsData;
    this.customersData = customersData;
    this.bookingsData = bookingsData;
    this.allRooms = [];
    this.allBookings = [];
    this.allCustomers = [];
  }
  
  addRooms() {
    this.roomsData.forEach(roomData => {
      let room = new Room(roomData);
      this.allRooms.push(room);
      return room;
    })
  }

  addBookings() {
    this.bookingsData.forEach(bookingData => {
      let booking = new Booking(bookingData);
      this.allBookings.push(booking);
      return booking;
    })
  }

  addCustomers() {
    this.customersData.forEach(customerData => {
      let customer = new Customer(customerData);
      this.allCustomers.push(customer);
      return customer;
    })
  }

  filterBookingsByCustomerID(customer) {
    this.allBookings.forEach(booking => {
      if(customer.id === booking.userID) {
        customer.bookings.push({
          id: booking.id,
          userID: booking.userID,
          date: booking.date,
          roomNumber: booking.roomNumber
        })
      }
    })
    return customer.bookings
  };

  filterRoomsByDate(dateInput) {
    let formatInputDate = dateInput.split('-');
    let properInputDate = formatInputDate.join('/');
    let filteredRoomsByDate = []
    this.allRooms.filter(room => {
      this.allBookings.forEach(booking => {
        if(properInputDate === booking.date) {
          if((booking.roomNumber !== room.roomNumber) && !filteredRoomsByDate.includes(room)) {
            filteredRoomsByDate.push(room)
          } else {
            return filteredRoomsByDate
          }
        } else {
          return filteredRoomsByDate
        }
      })
    })
    if (filteredRoomsByDate.length !== 0) {
      return filteredRoomsByDate
    } else {
      return `We are profusely sorry.`
    }
  }

  filterRoomsByType(roomTypeInput, dateInput) {
    let formatInputDate = dateInput.split('-');
    let properInputDate = formatInputDate.join('/');
    let filteredRoomsByDate = []
    this.allRooms.filter(room => {
      this.allBookings.forEach(booking => {
        if (properInputDate === booking.date) {
          if ((booking.roomNumber !== room.roomNumber) && !filteredRoomsByDate.includes(room)) {
            filteredRoomsByDate.push(room)
          } else {
            return filteredRoomsByDate
          }
        } else {
          return filteredRoomsByDate
        }
      })
    })
    if (filteredRoomsByDate.length !== 0) {
      let filteredRoomsByType = filteredRoomsByDate.filter(room => room.roomType === roomTypeInput)
      if (filteredRoomsByType.length !== 0) {
        return filteredRoomsByType
      } else {
      return `We are profusely sorry.`
      }
    }
  }
}

export default Hotel