import chai from 'chai';
const expect = chai.expect;
import Customer from '../src/classes/Customer.js';

let user1;
let user2;

describe('Customer Test', () => {
  beforeEach(function() {
    user1 = new Customer(1, 'Nico Ziller')
    user2 = new Customer(2, 'Gracie Spaccamonti')
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

})
