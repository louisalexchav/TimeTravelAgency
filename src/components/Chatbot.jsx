import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

// Composant `Chatbot` : widget flottant en bas à droite
// - Bulle fixe, fenêtre de chat élégante
// - Historique de messages et simulation de réponse

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Bonjour, je suis votre concierge temporel — comment puis-je vous guider aujourd'hui ?" },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    // Scroll vers le bas à chaque nouveau message
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const extractReplyFromResponse = (data) => {
    // Try several common shapes for assistant replies
    try {
      if (!data) return null;
      if (data.output && Array.isArray(data.output) && data.output[0]?.content) {
        // older or varied shapes
        const content = data.output[0].content;
        if (typeof content === 'string') return content;
        if (Array.isArray(content)) return content.map((c) => c.text || c).join(' ');
      }
      if (data.choices && data.choices[0]) {
        const ch = data.choices[0];
        if (ch.message) {
          if (typeof ch.message === 'string') return ch.message;
          if (ch.message.content) {
            if (typeof ch.message.content === 'string') return ch.message.content;
            if (Array.isArray(ch.message.content)) return ch.message.content.map((c) => c.text || c).join(' ');
          }
        }
        if (ch.text) return ch.text;
      }
      if (data.result && data.result[0]?.content) return data.result[0].content;
    } catch (e) {
      // ignore
    }
    return null;
  };

  const send = async () => {
    if (!input.trim()) return;
    const text = input.trim();
    setMessages((m) => [...m, { sender: 'user', text }]);
    setInput('');
    setIsTyping(true);

    const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;
    const systemPrompt = `Tu es l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe. Ton ton est professionnel, chaleureux et passionné d'histoire.
RÈGLES ABSOLUES (NE JAMAIS TRANSGRESSER) :
Notre catalogue ne contient STRICTEMENT QUE ces 3 destinations : Paris 1889, Crétacé -65M, Florence 1504. Tu ne dois JAMAIS proposer de voyage sur-mesure, ni mentionner d'autres villes ou époques. Si on te le demande, refuse poliment en expliquant que nos couloirs temporels ne sont stables que pour ces trois époques.
Respecte une logique temporelle stricte : le client est physiquement envoyé dans le passé. Au Crétacé, il n'y a aucun humain, juste des dinosaures.
Reste géographiquement précis : À Florence en 1504, parle uniquement de Florence (la Chapelle Sixtine est à Rome, n'en parle pas).`;

    const messagesForApi = messages
      .map((m) => ({ role: m.sender === 'bot' ? 'assistant' : 'user', content: m.text }))
      .concat([{ role: 'user', content: text }]);

    const payload = {
      model: 'mistral-small',
      messages: [{ role: 'system', content: systemPrompt }, ...messagesForApi],
    };

    try {
      const res = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();
      const reply = extractReplyFromResponse(data) || "Je suis navré, je n'ai pas pu formuler une réponse complète. Pouvez-vous reformuler ?";
      setMessages((m) => [...m, { sender: 'bot', text: reply }]);
    } catch (err) {
      console.error('Mistral API error', err);
      const fallback = "Désolé, le service de réponse est momentanément indisponible. Je vous propose de réessayer dans un instant ou de consulter nos fiches de destination.";
      setMessages((m) => [...m, { sender: 'bot', text: fallback }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div>
      {/* Fenêtre */}
      <div className={`fixed right-6 bottom-6 z-50 flex flex-col items-end`}>
        {open && (
          <div className="w-80 sm:w-96 mb-3 bg-neutral-900 border border-yellow-600 rounded-xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-black to-neutral-800 border-b border-yellow-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold">TT</div>
                <div>
                  <div className="text-sm font-semibold">Concierge Temporel</div>
                  <div className="text-xs text-gray-300">Expert · Historien · Guide de luxe</div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Fermer chat" className="p-2 text-gray-200">
                <X size={16} />
              </button>
            </div>

            <div ref={scrollRef} className="h-64 overflow-auto p-4 space-y-3 bg-gradient-to-b from-neutral-900 to-neutral-800">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.sender === 'bot' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`${m.sender === 'bot' ? 'bg-gray-800 text-gray-100' : 'bg-yellow-500 text-black'} px-3 py-2 rounded-lg max-w-[80%]`}>{m.text}</div>
                </div>
              ))}
              {isTyping && (
                <div className="text-sm text-stone-300 italic">L'assistant réfléchit...</div>
              )}
            </div>

            <div className="px-3 py-3 bg-neutral-900 border-t border-yellow-700 flex gap-2 items-center">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Posez une question..."
                className="flex-1 px-3 py-2 rounded-lg bg-neutral-800 text-gray-100 outline-none"
              />
              <button onClick={send} className="px-3 py-2 rounded-lg bg-yellow-500 text-black font-semibold">Envoyer</button>
            </div>
          </div>
        )}

        {/* Bouton flottant */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Ouvrir le chat"
          className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-400 shadow-xl flex items-center justify-center text-black border-2 border-yellow-600"
        >
          <MessageCircle size={20} />
        </button>
      </div>
    </div>
  );
}
