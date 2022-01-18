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
    let unavailableByDate = this.allBookings.reduce((unavailableByDate, booking) => {
      if (properInputDate === booking.date) {
        unavailableByDate.push(booking.roomNumber)
      }
      return unavailableByDate
    }, [])
    filteredRoomsByDate = this.allRooms.filter(room => {
      return !unavailableByDate.includes(room.number)
    })
    return filteredRoomsByDate
  }

  filterRoomsByType(roomTypeInput, dateInput) {
    let formatInputDate = dateInput.split('-');
    let properInputDate = formatInputDate.join('/');
    let filteredRoomsByDate = []
    let unavailableByDate = this.allBookings.reduce((unavailableByDate, booking) => {
      if (properInputDate === booking.date) {
        unavailableByDate.push(booking.roomNumber)
      }
      return unavailableByDate
    }, [])
    filteredRoomsByDate = this.allRooms.filter(room => {
      return !unavailableByDate.includes(room.number)
    })
    if (filteredRoomsByDate.length !== 0) {
      let filteredRoomsByType = filteredRoomsByDate.filter(room => room.roomType === roomTypeInput)
      if (filteredRoomsByType.length === 0) {
        return `We are profusely sorry.`
      } else {
        return filteredRoomsByType
      }
    }
  }
}

export default Hotel