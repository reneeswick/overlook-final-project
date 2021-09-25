class Hotel {
  constructor(name, rooms, bookings) {
    this.name = name;
    this.rooms = rooms;
    this.bookings = bookings;
  }

  findAvailability(checkInDate, checkOutDate) {
      let unavailableRooms = this.bookings.bookings.filter((booking) => {
        if(booking.date >= checkInDate && booking.date <= checkOutDate) {
          return booking
        }
    }).map((room) => {
      return room.roomNumber
    })
    let availableRooms = this.rooms.rooms.filter((room) => {
      if(!unavailableRooms.includes(room.number)) {
        return room
      }
    })
    return availableRooms
  };

  filterByRoomType(roomType, checkInDate, checkOutDate) {
    let availableRooms = this.findAvailability(checkInDate, checkOutDate);
    let filteredRooms = availableRooms.filter((room) => {
      return roomType === room.roomType
    })
    return filteredRooms
  };
}


export default Hotel;
