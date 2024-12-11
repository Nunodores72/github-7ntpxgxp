import { Message } from '@/lib/types/chat';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`mb-4 ${isUser ? 'text-right' : 'text-left'}`}>
      <div
        className={`inline-block max-w-[70%] p-3 rounded-lg ${
          isUser
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}