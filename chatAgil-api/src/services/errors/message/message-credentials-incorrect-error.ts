export class MessageCredentialsIncorrectError extends Error {
  constructor() {
    super('Message credentials are incorrect');
    this.name = 'MessageCredentialsIncorrectError';
  }
}
