export class UserCredentialsIncorrectError extends Error {
  constructor() {
    super('User credentials are incorrect');
  }
}
