import React, { useState, useEffect } from 'react';
import Navbar from '../../../src/components/Navbar.jsx';
import '../../css/acc/parent/ptot.css';

export default function P_to_T() {
    // React state to keep track of the current message being typed
    const [message, setMessage] = useState('');

    // React state to store the list of all messages exchanged
    const [messages, setMessages] = useState([]);

    // Default recipient ID set to 'general' (as a placeholder)
    const recipientID = 'general';  // Use this placeholder for now

    // Fetch messages when the component mounts
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                // Fetch messages for the 'general' recipient
                const response = await fetch(`/getMessages/${recipientID}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch messages');
                }
                const data = await response.json();
                setMessages(data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, [recipientID]);

    // Function to handle sending a message
    const handleSend = async () => {
        if (message.trim() !== '') {
            const newMessage = {
                message,
                sender: 'Parent',
                recipientID,
            };
    
            console.log("Sending message:", newMessage);
    
            try {
                const response = await fetch('/saveMessage', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newMessage),
                });
    
                if (response.ok) {
                    const refreshResponse = await fetch(`/getMessages/${recipientID}`);
                    if (refreshResponse.ok) {
                        const updatedMessages = await refreshResponse.json();
                        console.log("Updated messages after send:", updatedMessages);
                        setMessages(updatedMessages);
                    }
                    setMessage('');
                } else {
                    console.error('Error sending message');
                }
            } catch (error) {
                console.error('Error sending message:', error);
            }
        } else {
            console.warn('Empty message not sent.');
        }
    };
    
    
    // JSX structure returned by the component
    return (
        <>
            <Navbar />

            <div className="messaging-container">
                <h1>Parent to Teacher Messaging</h1>

                <div className="messages-box">
                    {messages.length === 0 ? (
                        <p>No messages yet.</p>
                    ) : (
                        messages.map((msg, index) => (
                            <div key={index} className="message">
                                <strong>{msg.sender}</strong> [{msg.timestamp}]: {msg.message}
                            </div>
                        ))
                    )}
                </div>

                <div className="input-area">
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message to the teacher..."
                    />
                    <button onClick={handleSend}>Send</button>
                </div>
            </div>
        </>
    );
}
