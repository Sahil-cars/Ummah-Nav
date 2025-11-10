import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { marked } from 'marked';
import { useSpeechToText } from '../hooks/useSpeechToText';

const UserIcon: React.FC = () => (
    <svg className="h-8 w-8 text-white bg-teal-600 rounded-full p-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const AIIcon: React.FC = () => (
    <svg className="h-8 w-8 text-teal-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
    </svg>
);

const MicIcon: React.FC<{ className?: string, isListening?: boolean }> = ({ className, isListening }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        {isListening ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.5 5.5A.5.5 0 0 1 6 6v4a4 4 0 0 0 8 0V6a.5.5 0 0 1 1 0v4a5 5 0 0 1-10 0V6a.5.5 0 0 1 .5-.5zM3 10v2a9 9 0 0 0 18 0v-2" />
        ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        )}
    </svg>
);

interface Message {
    sender: 'user' | 'ai';
    text: string;
}

const Chatbot: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const { isListening, transcript, startListening, stopListening } = useSpeechToText({ onTranscript: (text) => setInput(text) });

    useEffect(() => {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        chatRef.current = ai.chats.create({
            model: 'gemini-2.5-pro',
            config: {
                systemInstruction: "You are an expert Islamic scholar and AI assistant named 'Nur'. Your purpose is to provide accurate, well-sourced information about Islam based on the Quran and authentic Hadith. Your tone must be informative, wise, and compassionate.",
            },
        });
        setMessages([{sender: 'ai', text: "As-salamu alaykum! I am Nur, your AI Islamic Scholar. How can I help you today?"}]);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    const handleSend = useCallback(async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!input.trim() || loading || !chatRef.current) return;

        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const stream = await chatRef.current.sendMessageStream({ message: input });
            let aiResponse = '';
            let firstChunk = true;
            for await (const chunk of stream) {
                aiResponse += chunk.text;
                if (firstChunk) {
                    setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
                    firstChunk = false;
                } else {
                    setMessages(prev => {
                        const newMessages = [...prev];
                        newMessages[newMessages.length - 1] = { sender: 'ai', text: aiResponse };
                        return newMessages;
                    });
                }
            }
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { sender: 'ai', text: "I'm sorry, I encountered an error. Please try again." }]);
        } finally {
            setLoading(false);
        }
    }, [input, loading]);

    const handleMicClick = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };
    
    const renderMarkdown = (text: string) => ({ __html: marked(text) as string });

    return (
        <div className="flex flex-col h-full max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-6 flex-shrink-0">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">AI Scholar (Nur)</h1>
                <p className="text-gray-600 dark:text-gray-400">Your personal guide for Islamic inquiries.</p>
            </div>

            <div className="flex-grow bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg overflow-y-auto mb-6 space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                        {msg.sender === 'ai' && <AIIcon />}
                        <div className={`p-3 rounded-lg max-w-lg ${msg.sender === 'user' ? 'bg-teal-600 text-white rounded-br-none' : 'bg-gray-100 dark:bg-gray-700/50 rounded-bl-none'}`}>
                           <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={renderMarkdown(msg.text)} />
                        </div>
                        {msg.sender === 'user' && <UserIcon />}
                    </div>
                ))}
                 {loading && (
                    <div className="flex items-start gap-3">
                        <AIIcon />
                        <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700/50">
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 bg-teal-500 rounded-full animate-pulse"></span>
                                <span className="h-2 w-2 bg-teal-500 rounded-full animate-pulse delay-75"></span>
                                <span className="h-2 w-2 bg-teal-500 rounded-full animate-pulse delay-150"></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="mt-auto flex-shrink-0">
                <form onSubmit={handleSend} className="flex gap-2 relative">
                     <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={isListening ? "Listening..." : "Ask Nur a question..."}
                        className="flex-grow bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        disabled={loading}
                    />
                    <button type="button" onClick={handleMicClick} className={`absolute inset-y-0 right-16 flex items-center p-2 rounded-full transition-colors ${isListening ? 'text-red-500' : 'text-gray-500 hover:text-teal-600'}`}>
                        <MicIcon className="h-5 w-5" isListening={isListening} />
                    </button>
                    <button type="submit" disabled={loading || !input.trim()} className="bg-teal-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-teal-700 disabled:bg-teal-400 transition-colors flex justify-center items-center">
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chatbot;
