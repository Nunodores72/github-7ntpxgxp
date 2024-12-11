import { useState, useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { sendMessage } from '@/lib/api-client';
import { useToast } from '@/hooks/use-toast';
import { Message } from '@/lib/types/chat';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await sendMessage(input, token);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.message,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = () => {
    // Implement file upload logic
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-lg">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </ScrollArea>
      <ChatInput
        value={input}
        onChange={setInput}
        onSend={handleSendMessage}
        onFileUpload={handleFileUpload}
        isLoading={isLoading}
      />
    </div>
  );
}