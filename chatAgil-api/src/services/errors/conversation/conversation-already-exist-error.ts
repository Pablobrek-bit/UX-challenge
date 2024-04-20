export class ConversationAlreadyExistError extends Error {
  constructor() {
    super('Conversation already exist');
    this.name = 'ConversationAlreadyExistError';
  }
}
