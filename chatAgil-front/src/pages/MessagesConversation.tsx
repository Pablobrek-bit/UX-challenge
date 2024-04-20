import { ComponentProps, useEffect, useState } from 'react';
import chatAgilLogo from '../assets/chat-agil-logo.svg';
import { ChatUser } from '../components/ChatUser';
import { Message } from '../components/Message';
import { useParams } from 'react-router-dom';
import { useAuth } from '../Auth/AuthProvider';
import { socketIo } from '../socket/socket';
import { CreateConversationResponse } from '../api/conversation/createConversation';
import { MessageFormConversation } from '../components/MessageInputConversation';
import { getConversation } from '../api/conversation/getConversation';

interface MessagesProps extends ComponentProps<'div'> {}

export function MessagesConversation({ ...props }: MessagesProps) {
  const [conversation, setConversation] = useState<
    CreateConversationResponse['conversation'] | null
  >(null);
  const [newMessage, setNewMessage] = useState('' as string);

  const { user } = useAuth();
  const { id: userId } = useParams();

  useEffect(() => {
    socketIo.on(
      'new_message_conversation',
      async (newMessageSocket: string) => {
        setNewMessage(newMessageSocket);
      },
    );

    async function handleConversation() {
      const data = await getConversation(userId || '');

      console.log('data: ', data);

      setConversation(data);
    }
    handleConversation();

    return () => {
      socketIo.off('new_message_conversation');
    };
  }, [newMessage]);

  return (
    <div
      className="flex items-center align-center px-24 py-8 size-full"
      {...props}
    >
      {conversation && (
        <div className="flex flex-1 size-full bg-white/60 backdrop-blur-3xl rounded-2xl overflow-hidden">
          <div className="flex flex-col items-center justify-start h-full w-[40rem] px-8 py-12">
            <img
              src={chatAgilLogo}
              alt="Logo Chat Ágil"
              className="w-auto h-16 mb-6"
            />
            {/* <Room name={conversation.name} variant="chat" className="mb-6" /> */}

            <div className="flex flex-col items-center justify-start gap-2 w-full overflow-y-scroll no-scrollbar">
              {conversation?.participants.map((chatUser) => {
                return (
                  <ChatUser
                    key={chatUser.id}
                    name={chatUser.name}
                    status={chatUser.status}
                    isYou={chatUser.id === user?.id}
                  />
                );
              })}
            </div>
          </div>
          <div className="flex flex-col bg-white size-full items-center justify-end py-12 gap-4">
            <div className="flex flex-col items-center justify-end w-full gap-2 overflow-y-auto h-full messages-scrollbar px-8">
              {conversation?.messages.map((message) => {
                return (
                  <div className="flex w-full" key={message.id}>
                    <Message
                      message={message.text}
                      name={message.user.name}
                      time={message.createdAt.toString()}
                      variant={
                        message.user.id === user?.id ? 'sent' : 'received'
                      }
                    />
                  </div>
                );
              })}
            </div>
            <MessageFormConversation className="px-8" />
          </div>
        </div>
      )}
    </div>
  );
}
