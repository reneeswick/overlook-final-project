import chai from 'chai';
const expect = chai.expect;
import Customer from '../src/classes/Customer.js';
import Hotel from '../src/classes/Hotel.js';

let user1;
let user2;
let rooms;
let bookings;
let hotelA;

describe('Customer Test', () => {
  beforeEach(function() {
    rooms = [{
      number: 1,
      roomType: 'suite',
      bidet: true,
      bedSize: 'queen',
      numBeds: 2,
      costPerNight: 358.4
    },
    {
      number: 2,
      roomType: 'single room',
      bidet: false,
      bedSize: 'king',
      numBeds: 1,
      costPerNight: 491.14
    },
    {
      number: 3,
      roomType: 'junior suite',
      bidet: true,
      bedSize: 'queen',
      numBeds: 1,
      costPerNight: 397.04
    },
  ];
    bookings = [
    {
      id: "1abc23",
      userID: 1,
      date: "2020/04/22",
      roomNumber: 1,
      roomServiceCharges: []
    },
    {
      id: "2def34",
      userID: 1,
      date: "2050/04/23",
      roomNumber: 1,
      roomServiceCharges: []
    },
    {
      id: "3ghi45",
      userID: 2,
      date: "2020/04/22",
      roomNumber: 3,
      roomServiceCharges: []
    },
  ];
    hotelA = new Hotel('Hyatt', rooms, bookings);
    user1 = new Customer(1, 'Nico Ziller', hotelA);
    user2 = new Customer(2, 'Gracie Spaccamonti', hotelA)
  });

  it('should have a unique ID', () => {
    expect(user1.id).to.equal(1);
    expect(user2.id).to.equal(2);
  });

  it('should have a name', () => {
    expect(user1.name).to.equal('Nico Ziller');
    expect(user2.name).to.equal('Gracie Spaccamonti');
  });

  it('should be able to save past trips', () => {
    expect(user1.pastTrips).to.deep.equal([]);
    expect(user2.pastTrips).to.deep.equal([]);
  });

  it('should be able to save upcoming trips', () => {
    expect(user1.upcomingTrips).to.deep.equal([]);
    expect(user2.upcomingTrips).to.deep.equal([]);
  });

  it('should take in an instance of the hotel', () => {
    expect(user1.hotel).to.equal(hotelA);
    expect(user1.hotel).to.equal(hotelA);
  });

  it('should be able to calculate the current date', () => {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();
    if(month < 10) {
      month = `0${month}`
    }
    if(date < 10) {
      date = `0${date}`
    }
    let currentDate = `${year}/${month}/${date}`
    user1.calculateCurrentDate();
    expect(user1.calculateCurrentDate()).to.equal(currentDate)
  });

  it('should be able to view past trips', () => {
    user1.viewPastTrips();
    user2.viewPastTrips();
    expect(user1.pastTrips).to.deep.equal([bookings[0]]);
    expect(user2.pastTrips).to.deep.equal([bookings[2]]);
  });

  it('should be able to view upcoming trips', () => {
    user1.viewUpcomingTrips();
    user2.viewUpcomingTrips();
    expect(user1.upcomingTrips).to.deep.equal([bookings[1]]);
    expect(user2.upcomingTrips).to.deep.equal([])
    expect(user2.viewUpcomingTrips()).to.equal('You have no upcoming trips.')
  });

  it('should be able to view total amount spent on rooms', () => {
    user1.calculateTotalSpent();
    user2.calculateTotalSpent();
    expect(user1.calculateTotalSpent()).to.equal('$716.80');
    expect(user2.calculateTotalSpent()).to.equal('$397.04');
  });
})
