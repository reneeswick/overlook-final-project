import chai from 'chai';
const expect = chai.expect;
import Hotel from '../src/classes/Hotel.js';

let rooms;
let hotelA;
let hotelB;
let bookings;
describe('Hotel tests', () => {
  beforeEach(() => {
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
    },];
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
    date: "2020/04/23",
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
    ]
    hotelA = new Hotel('Hyatt', rooms, bookings);
    hotelB = new Hotel('Marriot', rooms, bookings);
  });

  it('should have a name', () => {
    expect(hotelA.name).to.equal('Hyatt');
    expect(hotelB.name).to.equal('Marriot');
  });

  it('should have a repository of rooms', () => {
    expect(hotelA.rooms).to.deep.equal(rooms);
  });

  it('should have a collection of all bookings', () => {
    expect(hotelA.bookings).to.deep.equal(bookings);
    expect(hotelB.bookings).to.deep.equal(bookings);
  });
});
