import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { SAMPLE_CHAT_PROMPTS } from '../data/mockData';
import { Sparkles, Send, X, Bot, User, RefreshCw, BookOpen, Lightbulb } from 'lucide-react';

interface GitaAIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

export const GitaAIChatModal: React.FC<GitaAIChatModalProps> = ({ isOpen, onClose, initialPrompt }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Hari Om! Welcome to the Science of Krishna AI Companion. Ask me anything about Bhagavad Gita philosophy, quantum physics parallels, neuroscience of meditation, or Sattvic nutrition.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });

      const data = await response.json();
      const botReply = data.reply || 'Apologies, I could not generate a response. Please try again.';

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: 'Network response error. Please check server connectivity.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0D0C0A]/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="obsidian-card rounded-2xl max-w-2xl w-full h-[85vh] flex flex-col border border-[#C69214]/40 shadow-2xl overflow-hidden relative">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-[#1A1815] border-b border-[#C69214]/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1A1815] to-[#C69214]/30 border border-[#C69214]/50 flex items-center justify-center text-[#C69214]">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#F4EFE6] flex items-center gap-2">
                Ask Gita AI
                <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded bg-[#C69214] text-[#0D0C0A]">
                  Gemini
                </span>
              </h3>
              <p className="text-xs text-[#A39E93]">
                Bhagavad Gita & Scientific Intelligence Companion
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#0D0C0A] border border-[#28241F] text-[#A39E93] hover:text-[#F4EFE6] hover:border-[#C69214]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#0D0C0A]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-[#B24227] text-[#F4EFE6]'
                    : 'bg-[#1A1815] border border-[#C69214]/40 text-[#C69214]'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#B24227]/30 border border-[#B24227]/50 text-[#F4EFE6] rounded-tr-none'
                    : 'bg-[#1A1815] border border-[#C69214]/20 text-[#F4EFE6] rounded-tl-none space-y-2'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
                <span className="text-[10px] text-[#A39E93] block text-right">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1A1815] border border-[#C69214]/40 text-[#C69214] flex items-center justify-center">
                <Sparkles className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-3 rounded-xl bg-[#1A1815] border border-[#C69214]/20 text-xs text-[#A39E93] flex items-center gap-2">
                <span>Analyzing scriptures and scientific references...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts Strip */}
        <div className="px-4 py-2 bg-[#1A1815] border-t border-[#28241F] flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-bold text-[#C69214] whitespace-nowrap flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5" />
            Prompts:
          </span>
          {SAMPLE_CHAT_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1 rounded-full bg-[#0D0C0A] hover:bg-[#28241F] border border-[#C69214]/20 hover:border-[#C69214]/50 text-[11px] text-[#A39E93] hover:text-[#F4EFE6] whitespace-nowrap transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-[#1A1815] border-t border-[#C69214]/20">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about Bhagavad Gita, quantum physics, consciousness..."
              className="flex-1 px-4 py-3 rounded-xl bg-[#0D0C0A] border border-[#C69214]/30 focus:border-[#C69214] text-xs sm:text-sm text-[#F4EFE6] placeholder-[#A39E93] focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="p-3 rounded-xl bg-[#C69214] hover:bg-[#E5A91B] disabled:opacity-50 text-[#0D0C0A] font-bold transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
