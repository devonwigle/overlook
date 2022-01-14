 class Room {
  constructor(roomsData) {
    this.roomNumber = roomsData.number;
    this.roomType = roomsData.roomType;
    this.bidet = roomsData.bidet;
    this.bedSize = roomsData.bedSize;
    this.numBeds = roomsData.numBeds;
    this.cost = roomsData.costPerNight;
  }
 }

 export default Room