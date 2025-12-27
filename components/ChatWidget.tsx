
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, MessageCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChatMessage } from '../lib/types';
import { useNavigate } from 'react-router-dom';
import { GoogleGenAI } from '@google/genai';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    sender: 'bot',
    text: "Hello! I'm Shoba, your AI cleaning assistant. How can I help you revive your home today?",
    options: ['Check Prices', 'Book Service', 'Pest Control Info'],
  },
];

export default function ChatWidget() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleGeminiResponse = async (userText: string) => {
    setIsTyping(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userText,
        config: {
          systemInstruction: `You are the friendly AI assistant for "Shoba Clean Services" based in Bangalore. 
          We offer:
          1. Deep Home Cleaning (Starts ₹3,999)
          2. Sofa/Upholstery Cleaning (Starts ₹1,000)
          3. Pest Control (Starts ₹899)
          
          Keep answers concise and helpful. If the user wants to book, encourage them to click "Book Now" or use our booking page. 
          Locations we serve: Indiranagar, Koramangala, Jayanagar, HSR Layout, Whitefield, JP Nagar.
          Always maintain a professional and clean tone.`,
        },
      });

      const botText = response.text || "I'm sorry, I'm having a little trouble connecting. How else can I help?";
      const responseMsg: ChatMessage = { 
        id: Date.now().toString(), 
        sender: 'bot', 
        text: botText,
        options: ['Book Now', 'Check Other Prices']
      };
      setMessages((prev) => [...prev, responseMsg]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { id: Date.now().toString(), sender: 'bot', text: "I'm offline for a moment, but you can book a service directly!" }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    if (text === 'Book Service' || text === 'Book Now') {
        navigate('/booking');
        setIsOpen(false);
        return;
    }

    const userMsg: ChatMessage = { id: Date.now().toString(), sender: 'user', text: text };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    handleGeminiResponse(text);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-4 md:right-8 w-[90vw] md:w-96 bg-white rounded-[2rem] shadow-2xl border border-blue-100 z-50 overflow-hidden flex flex-col h-[550px]"
          >
            <div className="bg-blue-600 p-6 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-xl">
                  <Bot size={22} />
                </div>
                <div>
                  <h3 className="font-black text-sm uppercase tracking-widest">Shoba AI</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-[10px] text-blue-100 font-bold">Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50 custom-scrollbar">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none shadow-lg'
                        : 'bg-white text-gray-800 rounded-tl-none shadow-sm border border-gray-100'
                    }`}
                  >
                    <p className="whitespace-pre-line font-medium">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-3xl rounded-tl-none border border-gray-100 flex gap-1 items-center h-10 shadow-sm">
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-75" />
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-150" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white border-t border-gray-100 space-y-3">
              {!isTyping && messages[messages.length - 1]?.sender === 'bot' && messages[messages.length - 1]?.options && (
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                  {messages[messages.length - 1].options!.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleSend(opt)}
                      className="whitespace-nowrap px-4 py-2 bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-widest rounded-xl border border-blue-100 hover:bg-blue-100 transition-colors"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend(inputText)}
                  placeholder="Ask about pricing or service details..."
                  className="flex-1 bg-gray-100 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all font-medium"
                />
                <button
                  onClick={() => handleSend(inputText)}
                  disabled={!inputText.trim() || isTyping}
                  className="bg-blue-600 text-white p-3 rounded-2xl hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg shadow-blue-200"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 bg-blue-600 text-white p-5 rounded-full shadow-2xl hover:shadow-blue-900/40 transition-shadow z-50 flex items-center justify-center"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </motion.button>
    </>
  );
}
