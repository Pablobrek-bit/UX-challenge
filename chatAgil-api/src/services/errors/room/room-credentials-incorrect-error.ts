export class RoomCredentialsIncorrectError extends Error {
  constructor() {
    super('Room credentials are incorrect');
    this.name = 'RoomCredentialsIncorrectError';
  }
}
