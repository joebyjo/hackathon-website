import AIRecommendationChat from '../AIRecommendationChat';

export default function AIRecommendationChatExample() {
  return (
    <div className="h-96 w-full max-w-lg">
      <AIRecommendationChat 
        onSendMessage={(message) => console.log('User message:', message)}
        isLoading={false}
      />
    </div>
  );
}