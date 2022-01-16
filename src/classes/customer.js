class Customer {
  constructor(customersData) {
    this.id = customersData.id;
    this.name = customersData.name;
    this.bookings = [];
    this.userName = `customer${this.id}`;
    this.password = 'overlook2021'
  }
}

export default Customer