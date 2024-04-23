import { ComponentProps, useEffect, useState } from 'react';
import chatAgilLogo from '../assets/chat-agil-logo.svg';
import { ChatUser } from '../components/ChatUser';
import { Room } from '../components/Room';
import { MessageFormRoom } from '../components/MessageInputRoom';
import { Message } from '../components/Message';
import { useParams } from 'react-router-dom';
import { useAuth } from '../Auth/AuthProvider';
import { socketIo } from '../socket/socket';
import { getRoom, getRoomResponse } from '../api/room/getRoom';

interface MessagesProps extends ComponentProps<'div'> {}

export function MessagesRoom({ ...props }: MessagesProps) {
  const [room, setRoom] = useState<getRoomResponse | null>(null);
  const [newMessage, setNewMessage] = useState('' as string);

  const { id } = useParams();
  const { user } = useAuth();
  const parsedId = id ? parseInt(id) : NaN;

  useEffect(() => {
    socketIo.on('new_message_room', async (newMessageSocket: string) => {
      setNewMessage(newMessageSocket);
    });

    async function handleRoom() {
      const response = await getRoom(parsedId);
      setRoom(response);
    }

    handleRoom();
    return () => {
      socketIo.off('new_message_room');
    };
  }, [newMessage]);

  return (
    <div
      className="flex items-center align-center px-12 py-8 size-full lg:px-24 sm:px-8"
      {...props}
    >
      {room && (
        <div className="flex flex-1 size-full bg-white/60 backdrop-blur-3xl rounded-2xl overflow-hidden">
          <div className="flex flex-col items-center justify-start h-full w-[40rem] px-8 py-12">
            <img
              src={chatAgilLogo}
              alt="Logo Chat Ágil"
              className="w-auto h-16 mb-6"
            />
            <Room name={room.name} variant="chat" className="mb-6" />

            <div className="flex flex-col items-center justify-start gap-2 w-full overflow-y-scroll no-scrollbar">
              {room.users.map((chatUser) => {
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
              {room.Message.map((message) => {
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
            <MessageFormRoom className="px-8" />
          </div>
        </div>
      )}
    </div>
  );
}
