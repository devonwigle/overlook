import Hotel from './hotel';
class Customer {
  constructor(customersData) {
    this.id = customersData.id;
    this.name = customersData.name;
    this.bookings = [];
    this.userName = `customer${this.id}`;
    this.password = 'overlook2021'
  }

  sumUserBookings(hotel) {
    let sum = this.bookings.reduce((sum, booking) => {
      hotel.allRooms.forEach(room => {
        if (room.number === booking.roomNumber) {
          sum += room.cost
        }
      })
      return sum
    }, 0)
    return sum
  }
}

export default Customer