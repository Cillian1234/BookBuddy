import React, { useState } from 'react';
import Navbar from '../../../src/components/Navbar.jsx';
// Importing the CSS file
import '../../css/acc/parent/ptot.css';

export default function P_to_T() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSend = () => {
        if (message.trim() !== '') {
            const newMessage = {
                text: message,
                sender: 'Parent',
                timestamp: new Date().toLocaleString(),
            };

            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setMessage('');
        }
    };

    return (
        <>
            <Navbar />

            <div className="messaging-container">
                <h1>Parent to Teacher Page</h1>

                <div className="messages-box">
                    {messages.length === 0 ? (
                        <p>No messages yet.</p>
                    ) : (
                        messages.map((msg, index) => (
                            <div key={index} className="message">
                                <strong>{msg.sender}</strong> [{msg.timestamp}]: {msg.text}
                            </div>
                        ))
                    )}
                </div>

                <div className="input-area">
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write a message to the teacher..."
                        rows={4}
                        cols={50}
                    />
                    <button onClick={handleSend}>Send</button>
                </div>
            </div>
        </>
    );
}
