class Customer {
  constructor(customersData) {
    this.id = customersData.id;
    this.name = customersData.name;
    this.bookings = []
  }
}

export default Customer