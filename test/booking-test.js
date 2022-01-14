import {expect} from 'chai';
import bookingsData from './test-data/booking-data';
import roomsData from './test-data/room-data';
import customersData from './test-data/customer-data';
import Booking from '../src/classes/booking'

describe('booking', () => {
  let booking;

  beforeEach(() => {
    booking = new Booking(bookingsData[0])
  });

  it('should be a function', () => {
    expect(Booking).to.be.a('function');
  });

  it('should have an id', () => {
    expect(booking.id).to.equal(bookingsData[0].id);
  });

  it('should have a userID', () => {
    expect(booking.userID).to.equal(bookingsData[0].userID)
  });

  it('should have a date', () => {
    expect(booking.date).to.equal(bookingsData[0].date)
  });

  it('should have a room number', () => {
    expect(booking.roomNumber).to.equal(bookingsData[0].roomNumber)
  });
})