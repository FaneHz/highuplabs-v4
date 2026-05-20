'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { askAIAdvisor, getAdvisorHistory, clearAdvisorHistory } from '@/lib/actions/ai-advisor';
import { AdvisorMessage } from '@/lib/actions/ai-advisor';
import { Send, Loader2, Trash2, Bot, User, Sparkles, TrendingUp, DollarSign, Target, BarChart3 } from 'lucide-react';

interface AIAdvisorChatProps {
  clientId: string;
  companyName: string;
  metaContext?: {
    spend?: number;
    revenue?: number;
    roas?: number;
    ctr?: number;
    cpc?: number;
    conversions?: number;
    campaigns?: number;
  };
  calculatorContext?: {
    reportedRoas?: number;
    targetRoas?: number;
    aov?: number;
  };
}

const QUICK_REPLIES = [
  { label: 'Analizează campaniile mele', icon: BarChart3 },
  { label: 'Cum pot îmbunătăți ROAS?', icon: TrendingUp },
  { label: 'Sfaturi pentru scalare', icon: Target },
  { label: 'Analizează profitabilitatea', icon: DollarSign },
];

// Simple markdown renderer
function renderMarkdown(text: string): React.ReactNode {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeContent = '';
  let codeLanguage = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code blocks
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <pre key={`code-${i}`} className="bg-black/50 border border-[#1A1A1A] rounded-lg p-4 my-3 overflow-x-auto">
            <code className="text-sm font-mono text-[#CCFF00]">{codeContent.slice(0, -1)}</code>
          </pre>
        );
        codeContent = '';
        codeLanguage = '';
      } else {
        codeLanguage = line.slice(3).trim();
      }
      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (inCodeBlock) {
      codeContent += line + '\n';
      continue;
    }

    // Inline code
    const inlineCodeRegex = /`([^`]+)`/g;
    let processedLine = line;
    const inlineCodes: { text: string; key: number }[] = [];
    let match;
    let key = 0;
    while ((match = inlineCodeRegex.exec(line)) !== null) {
      inlineCodes.push({ text: match[1], key: key++ });
    }
    
    // Headers
    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="text-lg font-bold mt-4 mb-2 text-white">{line.slice(4)}</h3>
      );
      continue;
    }
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-xl font-bold mt-5 mb-3 text-[#CCFF00]">{line.slice(3)}</h2>
      );
      continue;
    }
    if (line.startsWith('# ')) {
      elements.push(
        <h1 key={i} className="text-2xl font-bold mt-6 mb-4 text-[#CCFF00]">{line.slice(2)}</h1>
      );
      continue;
    }

    // Bullet points
    if (line.startsWith('- ') || line.startsWith('* ')) {
      const content = line.slice(2);
      elements.push(
        <li key={i} className="ml-4 text-gray-300 mb-1 flex items-start">
          <span className="text-[#CCFF00] mr-2 mt-1.5">•</span>
          <span>{renderInlineFormatting(content)}</span>
        </li>
      );
      continue;
    }

    // Numbered lists
    const numberedMatch = line.match(/^(\d+)\.\s(.+)$/);
    if (numberedMatch) {
      elements.push(
        <li key={i} className="ml-4 text-gray-300 mb-1 flex items-start">
          <span className="text-[#CCFF00] mr-2 font-mono text-sm mt-0.5">{numberedMatch[1]}.</span>
          <span>{renderInlineFormatting(numberedMatch[2])}</span>
        </li>
      );
      continue;
    }

    // Empty line
    if (line.trim() === '') {
      elements.push(<div key={i} className="h-2" />);
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={i} className="text-gray-300 mb-2 leading-relaxed">
        {renderInlineFormatting(line)}
      </p>
    );
  }

  return elements;
}

function renderInlineFormatting(text: string): React.ReactNode {
  // Bold
  let parts = text.split(/(\*\*.*?\*\*)/g);
  
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
    }
    // Inline code
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i} className="bg-black/50 px-1.5 py-0.5 rounded text-sm font-mono text-[#CCFF00]">{part.slice(1, -1)}</code>;
    }
    return part;
  });
}

function ChatMessageComponent({ message }: { message: AdvisorMessage }) {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  if (isSystem) return null;

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} mb-6`}>
      {/* Avatar */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
        isUser 
          ? 'bg-[#CCFF00] text-black' 
          : 'bg-[#1A1A1A] border border-[#333] text-[#CCFF00]'
      }`}>
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>

      {/* Message bubble */}
      <div className={`max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`px-4 py-3 rounded-2xl ${
          isUser
            ? 'bg-[#CCFF00] text-black rounded-tr-sm'
            : 'bg-[#111111] border border-[#1A1A1A] text-white rounded-tl-sm'
        }`}>
          {isUser ? (
            <p className="text-sm leading-relaxed">{message.content}</p>
          ) : (
            <div className="text-sm">{renderMarkdown(message.content)}</div>
          )}
        </div>
        {message.created_at && (
          <span className="text-[10px] text-gray-600 mt-1 block font-mono">
            {new Date(message.created_at).toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>
    </div>
  );
}

function LoadingIndicator() {
  return (
    <div className="flex gap-3 mb-6">
      <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-[#1A1A1A] border border-[#333] text-[#CCFF00]">
        <Bot size={16} />
      </div>
      <div className="bg-[#111111] border border-[#1A1A1A] rounded-2xl rounded-tl-sm px-4 py-3">
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-[#CCFF00] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 bg-[#CCFF00] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 bg-[#CCFF00] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}

export function AIAdvisorChat({ clientId, companyName, metaContext, calculatorContext }: AIAdvisorChatProps) {
  const [messages, setMessages] = useState<AdvisorMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load history on mount
  useEffect(() => {
    async function loadHistory() {
      try {
        const history = await getAdvisorHistory();
        setMessages(history);
      } catch (error) {
        console.error('Failed to load history:', error);
      } finally {
        setIsHistoryLoading(false);
      }
    }
    loadHistory();
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleSend = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: AdvisorMessage = {
      role: 'user',
      content: content.trim(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const allMessages = [...messages, userMessage];
      
      // Build extra context
      const extraContext: Record<string, unknown> = {};
      if (metaContext) {
        extraContext.meta = metaContext;
      }
      if (calculatorContext) {
        extraContext.calculator = calculatorContext;
      }

      const response = await askAIAdvisor(allMessages, extraContext);

      const assistantMessage: AdvisorMessage = {
        role: 'assistant',
        content: response.content,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'A apărut o eroare';
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: `❌ ${errorMessage}. Încearcă din nou.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading, metaContext, calculatorContext]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  const handleClear = async () => {
    if (!confirm('Ești sigur că vrei să ștergi toată conversația?')) return;
    
    try {
      await clearAdvisorHistory();
      setMessages([]);
    } catch (error) {
      console.error('Failed to clear history:', error);
    }
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-black rounded-2xl border border-[#1A1A1A] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A1A1A] bg-[#0A0A0A]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#CCFF00] flex items-center justify-center">
            <Sparkles size={16} className="text-black" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">AI Advisor</h2>
            <p className="text-[10px] text-gray-500 font-mono">{companyName}</p>
          </div>
        </div>
        
        {hasMessages && (
          <button
            onClick={handleClear}
            className="p-2 text-gray-500 hover:text-red-400 transition-colors rounded-lg hover:bg-red-400/10"
            title="Șterge conversația"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
        {!hasMessages && !isHistoryLoading && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#1A1A1A] border border-[#333] flex items-center justify-center mb-4">
              <Bot size={32} className="text-[#CCFF00]" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Cu ce te pot ajuta?</h3>
            <p className="text-sm text-gray-500 max-w-md mb-6">
              Sunt AI Advisor-ul tău pentru performance marketing. 
              Am acces la datele tale din dashboard și îți pot oferi sfaturi personalizate.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg">
              {QUICK_REPLIES.map((reply) => (
                <button
                  key={reply.label}
                  onClick={() => handleSend(reply.label)}
                  className="flex items-center gap-2 px-4 py-3 bg-[#111111] border border-[#1A1A1A] hover:border-[#CCFF00]/50 hover:bg-[#1A1A1A] transition-all rounded-xl text-left group"
                >
                  <reply.icon size={16} className="text-[#CCFF00] group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-gray-300 group-hover:text-white">{reply.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {isHistoryLoading && (
          <div className="flex items-center justify-center h-full">
            <Loader2 size={24} className="text-[#CCFF00] animate-spin" />
          </div>
        )}

        {messages.map((message, index) => (
          <ChatMessageComponent key={index} message={message} />
        ))}

        {isLoading && <LoadingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="px-6 py-4 border-t border-[#1A1A1A] bg-[#0A0A0A]">
        <div className="flex gap-3 items-end">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Scrie un mesaj..."
            rows={1}
            className="flex-1 bg-[#111111] border border-[#1A1A1A] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#CCFF00]/50 resize-none min-h-[44px] max-h-[200px]"
            disabled={isLoading}
          />
          <button
            onClick={() => handleSend(input)}
            disabled={!input.trim() || isLoading}
            className="flex-shrink-0 w-10 h-10 bg-[#CCFF00] hover:bg-[#99CC00] disabled:bg-[#1A1A1A] disabled:text-gray-600 text-black rounded-xl flex items-center justify-center transition-colors"
          >
            {isLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Send size={16} />
            )}
          </button>
        </div>
        <p className="text-[10px] text-gray-600 mt-2 font-mono text-center">
          AI Advisor folosește modele open-source gratuite. Răspunsurile pot varia în calitate.
        </p>
      </div>
    </div>
  );
}
