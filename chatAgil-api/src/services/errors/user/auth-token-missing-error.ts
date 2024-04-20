export class AuthTokenMissingError extends Error {
  constructor() {
    super('Token is missing');
  }
}
