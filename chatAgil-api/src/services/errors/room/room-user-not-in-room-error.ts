export class RoomUserNotInRoomError extends Error {
  constructor() {
    super('User not in room');
    this.name = 'RoomUserNotInRoomError';
  }
}
