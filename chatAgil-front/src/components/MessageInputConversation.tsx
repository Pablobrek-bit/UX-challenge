import { zodResolver } from '@hookform/resolvers/zod';
import { SendHorizonal } from 'lucide-react';
import { ComponentProps } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { z } from 'zod';
import { sendMessageRoom } from '../api/message/sendMessageRoom';
import { useParams } from 'react-router-dom';
import { socketIo } from '../socket/socket';
import { useAuth } from '../Auth/AuthProvider';

const messageFormSchema = z.object({
  message: z.string({
    required_error: 'Mensagem é obrigatória',
  }),
});

type MessageFormSchemaType = z.infer<typeof messageFormSchema>;

interface MessageInputConversationProps extends ComponentProps<'form'> {}

export function MessageFormConversation({
  className,
  ...props
}: MessageInputConversationProps) {
  const { id } = useParams();
  const { user } = useAuth();

  const { register, handleSubmit, reset } = useForm<MessageFormSchemaType>({
    resolver: zodResolver(messageFormSchema),
    defaultValues: {
      message: '',
    },
    mode: 'onSubmit',
  });

  const { mutateAsync: sendMessageFn, isLoading } = useMutation({
    mutationFn: sendMessageRoom,
  });

  function handleMessageSubmit({ message }: MessageFormSchemaType) {
    socketIo.emit('send_message_conversation', {
      message,
      friendId: id ?? '',
      userId: user?.id,
    });

    console.log('friendId', id ?? '');

    reset({ message: '' });
  }

  return (
    <form
      className={`flex w-full gap-3 ${className}`}
      onSubmit={handleSubmit(handleMessageSubmit)}
      {...props}
    >
      <div
        className="h-14 w-full border-b-2 border-slate-400 bg-slate-100 focus-within:border-primary-500 flex 
     gap-2 px-3 py-2 items-center rounded-lg text-slate-500 focus-within:text-primary-500 aria-[disabled=true]:color-slate-400 aria-[disabled=true]:bg-slate-200"
      >
        <input
          type="text"
          className="flex-1 bg-transparent border-none text-slate-800 placeholder:text-slated-500 outline-none w-full text-base font-normal"
          placeholder="Escreva uma mensagem..."
          {...register('message')}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="text-white border-b-2 border-black/30 bg-primary-500 hover:bg-primary-400 flex flex-shrink-0 size-14 rounded-lg items-center justify-center  active:translate-y-0.5 active:border-b-0 transition-all ease-linear duration-[0.05s]"
      >
        <SendHorizonal size={24} />
      </button>
    </form>
  );
}
