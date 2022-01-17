import { expect } from 'chai';
import bookingsData from './test-data/booking-data';
import roomsData from './test-data/room-data';
import customersData from './test-data/customer-data';
import Customer from '../src/classes/customer';
import Hotel from '../src/classes/hotel';


describe('customer', () =>  {
  let hotel;
  let customer1;
  let customer2;
  let customer; 
  beforeEach(() => {
    customer = new Customer(customersData[0])
    customer2 = new Customer(customersData[1]);
    hotel = new Hotel(roomsData, customersData, bookingsData);
  });

  it('should be a function', () => {
    expect(Customer).to.be.a('function');
  });

  it('should instantiate an new customer', () => {
    expect(customer).to.be.an.instanceOf(Customer)
  });

  it('should have an id', () => {
    expect(customer.id).to.equal(customersData[0].id)
  });

  it('should have a name', () => {
    expect(customer.name).to.equal(customersData[0].name)
  });

  it('should have an array for bookings', () => {
    expect(customer.bookings).to.deep.equal([])
  });

  it('should have a user name', () => {
    expect(customer.userName).to.equal(`customer${customersData[0].id}`)
  });

  it('should have a password', () => {
    expect(customer.password).to.equal(`overlook2021`)
  })

  it('should have a method to sum user\'s bookings', () => {
    hotel.addCustomers();
    hotel.addBookings();
    hotel.addRooms();
    hotel.filterBookingsByCustomerID(customer2)

    expect(customer2.sumUserBookings(hotel)).to.equal(798.59)
  });
})