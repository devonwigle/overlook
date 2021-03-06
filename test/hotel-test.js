import { expect } from 'chai';
import bookingsData from './test-data/booking-data';
import roomsData from './test-data/room-data';
import customersData from './test-data/customer-data';

import Customer from '../src/classes/customer';
import Hotel from '../src/classes/hotel';

describe('hotel', () => {
  let hotel;
  let customer1;

  beforeEach(() => {
    hotel = new Hotel(roomsData, customersData, bookingsData);
    customer1 = new Customer(customersData[0]);
  });

  it('should hold room data', () => {
    expect(hotel.roomsData).to.equal(roomsData);
  });

  it('should hold customer data', () => {
    expect(hotel.customersData).to.equal(customersData)
  });

  it('should hold booking data', () => {
    expect(hotel.bookingsData).to.equal(bookingsData)
  });

  it('should be a function', () => {
    expect(Hotel).to.be.a('function')
  });

  it('should instantiate a new hotel', () => {
    expect(hotel).to.be.an.instanceOf(Hotel)
  });

  it('should start with an empty rooms array', () => {
    expect(hotel.allRooms).to.deep.equal([])
  });

  it('should start with an empty bookings array', () => {
    expect(hotel.allBookings).to.deep.equal([])
  });

  it('should start with an empty customers array', () => {
    expect(hotel.allCustomers).to.deep.equal([])
  });

  it('should have a method to add rooms to array', () => {
    hotel.addRooms()

    expect(hotel.allRooms.length).to.equal(6)
  });

  it('should have a method to add bookings to array', () => {
    hotel.addBookings()

    expect(hotel.allBookings.length).to.equal(5)
  });

  it('should have a method to add customers to array', () => {
    hotel.addCustomers()

    expect(hotel.allCustomers.length).to.equal(1)
  });

  it('should have a method to filter bookings by customer ID', () => {
    hotel.addCustomers();
    hotel.addBookings();
    hotel.filterBookingsByCustomerID(customer1)

    expect(customer1.bookings).to.be.deep.equal([
      {
        id: '5fwrgu4i7k55hl6ty',
        userID: 50,
        date: '2022/01/10',
        roomNumber: 25
      },
      {
        id: '5fwrgu4i7k55hl6xu',
        userID: 50,
        date: '2022/02/25',
        roomNumber: 19
      },
      {
        id: '5fwrgu4i7k55hl71d',
        userID: 50,
        date: '2022/02/03',
        roomNumber: 9
      },
      {
        id: '5fwrgu4i7k55hl77h',
        userID: 50,
        date: '2022/01/21',
        roomNumber: 13
      }
    ])
  });
  
  

  it('should have a method to filter by date', () => {
    hotel.addRooms();
    hotel.addBookings();
    hotel.filterBookingsByCustomerID(customer1)
    hotel.filterRoomsByDate('2022-02-25')
    expect(hotel.filteredRoomsByDate).to.deep.equal([
      {
        number: 1,
        roomType: 'residential suite',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        cost: 358.4
      },
      {
        number: 2,
        roomType: 'suite',
        bidet: false,
        bedSize: 'full',
        numBeds: 2,
        cost: 477.38
      },
      {
        number: 3,
        roomType: 'single room',
        bidet: false,
        bedSize: 'king',
        numBeds: 1,
        cost: 491.14
      },
      {
        number: 11,
        roomType: 'single room',
        bidet: true,
        bedSize: 'twin',
        numBeds: 2,
        cost: 207.24
      },
      {
        number: 13,
        roomType: 'single room',
        bidet: false,
        bedSize: 'queen',
        numBeds: 2,
        cost: 423.92
      }
    ])
  });

  it('should have a method to filter rooms available by type', () => {
    hotel.addRooms();
    hotel.addBookings();
    hotel.filterRoomsByDate('2022-02-25');
    hotel.filterRoomsByType('single room', '2022-02-25')

    expect(hotel.filteredRoomsByType).to.deep.equal([
      {
        number: 3,
        roomType: 'single room',
        bidet: false,
        bedSize: 'king',
        numBeds: 1,
        cost: 491.14
      },
      {
        number: 11,
        roomType: 'single room',
        bidet: true,
        bedSize: 'twin',
        numBeds: 2,
        cost: 207.24
      },
      {
        number: 13,
        roomType: 'single room',
        bidet: false,
        bedSize: 'queen',
        numBeds: 2,
        cost: 423.92
      }
    ])
  });

  it('should tell you when nothing is available', () => {
    hotel.addRooms();
    hotel.addBookings();
    hotel.filterRoomsByDate('2022-02-25');
    hotel.filterRoomsByType('queen', '2022-02-25')
    expect(hotel.filterRoomsByType('queen', '2022-02-25')).to.equal(`We are profusely sorry.`)
  });
})