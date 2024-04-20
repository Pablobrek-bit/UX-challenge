export class UserEmailAlreadyExistsError extends Error {
  constructor() {
    super('User email already exists');
  }
}
