import { useState } from 'react';
import './App.css';

interface ChatMessage {
  type: string;
  text: string;
}

function App() {
  const [userInput, setUserInput] = useState<string>('');
  const [chat, setChat] = useState<ChatMessage[]>([]);

  const handleSubmit = async () => {
    const response = await fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_input: userInput }),
    });


    const data: { response: string } = await response.json();
    setChat([...chat, { type: 'user', text: userInput }, { type: 'bot', text: data.response }]);
    setUserInput('');
  };

  return (
    <div className="App">
      <div className="Chat">
        {chat.map((message, index) => (
          <div key={index} className={message.type}>
            {message.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button onClick={handleSubmit}>Enviar</button>
    </div>
  );
}

export default App;
