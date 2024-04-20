export class RoomNotExistsError extends Error {
  constructor() {
    super('Room not exists');
    this.name = 'RoomNotExistsError';
  }
}
