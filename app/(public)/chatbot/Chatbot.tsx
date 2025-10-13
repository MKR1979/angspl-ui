'use client';

import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import { useMutation } from '@apollo/client'
import { CHATBOT_REPLY } from '../../graphql/Chat';
import styles from './chatbot.module.css';

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: 'Hi! How can I help you today?' },
  ]);
  const [input, setInput] = useState<string>('');
  //const [sendMessageMutation] = useLazyQuery(CHATBOT_REPLY, { fetchPolicy: 'network-only' });
  const [sendMessageMutation] = useMutation(CHATBOT_REPLY);
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const { data } = await sendMessageMutation({
        variables: { input },
      });

      const botReply = data?.chatbotReply?.response || 'No response.';
      const botMessage: Message = { sender: 'bot', text: botReply };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: 'Something went wrong.' },
      ]);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className={styles.chatbotContainer}>
      <div className={styles.messages}>
        {messages.map((msg, idx) => (
          <div key={idx} className={styles[msg.sender]}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={input}
          placeholder="Type your message..."
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className={styles.inputField}
        />
        <button onClick={sendMessage} className={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
