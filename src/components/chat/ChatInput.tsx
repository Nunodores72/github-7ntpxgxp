import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/icons';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onFileUpload: () => void;
  isLoading: boolean;
}

export function ChatInput({ 
  value, 
  onChange, 
  onSend, 
  onFileUpload, 
  isLoading 
}: ChatInputProps) {
  return (
    <div className="p-4 border-t">
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={onFileUpload}
        >
          <Icons.FileText className="h-4 w-4" />
        </Button>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === 'Enter' && onSend()}
        />
        <Button
          onClick={onSend}
          disabled={isLoading}
          className="w-24"
        >
          {isLoading ? (
            'Sending...'
          ) : (
            <>
              Send
              <Icons.Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}