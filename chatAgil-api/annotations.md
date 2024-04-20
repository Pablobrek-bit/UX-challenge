localhost3000

User:

POST: /users/ -> criar novo usuario
GET: /users/index -> listar todos os usuarios
GET: /users/ -> listar um usuario pelo id usando middleware
PUT: /users/status -> muda o status de um usuario

=======================================================
Room:

GET: /room/index -> listar todas as salas
POST: /room/ -> criar uma nova sala
DELETE: /room/:id -> deletar uma sala
PUT: /room/join/:id -> entrar em uma sala com usuario logado

=======================================================

Message:

POST: /message/room/:idRoom -> criar uma mensagem em um grupo
GET: /message/room/:idRoom -> Pegar todas as mensagens de um grupo
POST: /message/conversation/:idConversation -> criar uma mensagem em uma conversa
GET: /message/conversation/:idConversation -> Pegar todas as mensagens de uma conversa

=======================================================

Conversation:

POST: /conversation/ -> criar uma nova conversa
GET: /conversation/ -> listar todas as conversas de um usuario
GET: /conversation/ -> puxar a conversa de um usuario com outro
