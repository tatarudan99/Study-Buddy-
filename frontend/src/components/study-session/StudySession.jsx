// src/components/StudySession.jsx

import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import './StudySession.css';
import {buildMasterPrompt, TEXT_FOR_SUMMARY} from "./lib.js";

function StudySession() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isTyping, setIsTyping] = useState(false);
    const [retryMessage, setRetryMessage] = useState(null);

    const refMessageContainer = useRef(null)


    const formData = JSON.parse(localStorage.getItem('questionnaireData'));

    const masterPrompt = buildMasterPrompt(formData);

    const refFirstResponse = useRef(true)

    useEffect(() => {
        if (messages.length === 0 && refFirstResponse.current) {
            console.log("1st response")

            setMessages([{role: 'system', content: masterPrompt}]);

            (async () => {
                try {
                    refFirstResponse.current = false

                    setIsLoading(true);
                    const response = await axios.post(
                        `${process.env.REACT_APP_BACKEND_URL}/api/generate`,
                        {messages: [{role: 'system', content: masterPrompt}]}
                    )
                    const assistantMessage = {
                        role: 'assistant',
                        content: response.data.completion.trim(),
                    };

                    setMessages((prev) => [...prev, assistantMessage]);
                    setIsLoading(false);
                    refMessageContainer.current.scrollTop = refMessageContainer.current.scrollHeigh
                } catch (error) {
                    console.error(error)
                }
            })()
        }
    }, [messages, masterPrompt]);

    const handleSend = async (isNotTrim) => {
        const userMessage = {
            role: 'user',
            content: input.trim(),
        };

        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInput('');

        refMessageContainer.current.scrollTop = refMessageContainer.current.scrollHeight

        setIsLoading(true);

        const isMinimalInput = userMessage.content.split(' ').length <= 2;

        const summary = await generateSummary(updatedMessages);

        let messagesForAPI = [];

        if (isMinimalInput) {
            messagesForAPI = [
                {role: 'system', content: masterPrompt},
                {role: 'system', content: `Conversation Summary: ${summary}`},
                ...updatedMessages.slice(-5),
            ];
        } else {
            messagesForAPI = [
                {role: 'system', content: masterPrompt},
                {role: 'system', content: `Conversation Summary: ${summary}`},
                ...updatedMessages.slice(-10),
            ];
        }

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/generate`,
                {messages: messagesForAPI}
            );

            const assistantMessage = {
                role: 'assistant',
                content: response.data.completion.trim(),
            };

            setMessages((prev) => [...prev, assistantMessage]);
            setIsLoading(false);
            refMessageContainer.current.scrollTop = refMessageContainer.current.scrollHeight
        } catch (error) {
            console.error('Error fetching response:', error);
            setIsLoading(false);

        }
    };

    const generateSummary = async (conversation) => {
        const conversationText = conversation
            .filter((msg) => msg.role !== 'system')
            .map((msg) => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
            .join('\n');

        const summaryPrompt = `
            Please provide a concise summary of the following conversation between a user and an assistant:
            
            ${conversationText}
            
            Summary:
        `;

        const summaryMessages = [
            {role: 'system', content: 'You are an assistant that summarizes conversations.'},
            {role: 'user', content: summaryPrompt},
        ];

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/generate`,
                {messages: summaryMessages}
            );

            const summary = response.data.completion.trim();
            return summary;
        } catch (error) {
            console.error('Error generating summary:', error);
            return '';
        }
    };

    const getAndSummary = () => {
        const sumaryMessages = [
            ...messages,
            {role: 'system', content: 'You are an assistant that summarizes conversations.'},
            {role: 'user', content: TEXT_FOR_SUMMARY}
        ];

        (async () => {
            try {
                setIsLoading(true);
                const response = await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/api/generate`,
                    {messages: sumaryMessages}
                );

                const assistantMessage = {
                    role: 'assistant',
                    content: response.data.completion.trim(),
                };

                setMessages((prev) => [...prev, assistantMessage]);
                setIsLoading(false);
                refMessageContainer.current.scrollTop = refMessageContainer.current.scrollHeight
            } catch (error) {
                console.error('Error generating summary:', error);
                setIsLoading(false);
                return '';
            }
        })()
    };

    return (
        <div className="study-session-container">
            <div className="chat-window--wrap">
                <div className="chat-window" ref={refMessageContainer}>
                    {messages
                        .filter((msg) => msg.role !== 'system') // Exclude system messages from display
                        .map((msg, index) => (
                            <div
                                key={index}
                                className={`chat-message ${msg.role === 'user' ? 'user' : 'assistant'}`}
                            >
                                <div className="message-content">
                                    <p>{msg.content}</p>
                                </div>
                            </div>
                        ))}
                    {isLoading && <div className="loading">Study Buddy is typing...</div>}
                </div>
            </div>
            <div className="input-area">
                <input
                    type="text"
                    placeholder="Type your response here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button disabled={isLoading} onClick={handleSend}>Send</button>
            </div>
            <button disabled={isLoading} onClick={getAndSummary} className={"summarize__session"}>
                summarize the session
            </button>
        </div>
    );
}

export default StudySession;
