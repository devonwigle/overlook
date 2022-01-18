import { expect } from 'chai';
import roomsData from './test-data/room-data';
import Room from '../src/classes/room';

describe('Room', () => {
  let room;

  beforeEach(() => {
    room = new Room(roomsData[0])
  });

  it('should be a function', () => {
    expect(Room).to.be.a('function');
  });

  it('should have a number', () => {
    expect(room.number).to.equal(1)
  });

  it('should have a room type', () => {
    expect(room.roomType).to.equal('residential suite');
  });

  it('should have a bidet', () => {
    expect(room.bidet).to.equal(true)
  });

  it('should have a bed size', () => {
    expect(room.bedSize).to.equal('queen')
  });

  it('should have a number of beds', () => {
    expect(room.numBeds).to.equal(1)
  });

  it('should have a cost', () => {
    expect(room.cost).to.equal(358.4)
  });
});
  