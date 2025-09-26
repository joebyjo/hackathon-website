import AIChatbot from '../AIChatbot';

export default function AIChatbotExample() {
  return (
    <div className="p-8 bg-background max-w-md">
      <AIChatbot 
        onSendMessage={async (message) => {
          // Mock API call
          return new Promise(resolve => {
            setTimeout(() => {
              resolve({
                id: Date.now().toString(),
                content: `Thanks for asking: "${message}". I'm here to help with course recommendations!`,
                isBot: true,
                timestamp: new Date()
              });
            }, 1000);
          });
        }}
        initialMessage="Hello! I'm your AI Course Advisor. Try asking me about data science courses!"
      />
    </div>
  );
}