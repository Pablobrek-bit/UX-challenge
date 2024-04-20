export class ConversationNotExistsError extends Error {
  constructor() {
    super('Conversation not exists');
    this.name = 'ConversationNotExistsError';
  }
}
