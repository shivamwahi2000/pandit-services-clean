'use client';

import { useEffect, useState } from 'react';

interface QuestionOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuestionOfferModal: React.FC<QuestionOfferModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [question, setQuestion] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !phone.trim() || !question.trim()) return;

    setSubmitting(true);

    const message = `🙏 Namaste Pandit Ji,%0A%0AI am booking the ₹20 question offer.%0AName: ${encodeURIComponent(
      name.trim()
    )}%0APhone: ${encodeURIComponent(phone.trim())}%0AQuestion: ${encodeURIComponent(question.trim())}%0A%0AThank you!`;

    window.open(`https://wa.me/919340337323?text=${message}`, '_blank');

    setTimeout(() => {
      setSubmitting(false);
      onClose();
      setName('');
      setPhone('');
      setQuestion('');
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="question-offer-title"
    >
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <button
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-900"
          onClick={onClose}
          aria-label="Close offer modal"
        >
          ✕
        </button>
        <h2 id="question-offer-title" className="text-2xl font-semibold text-orange-700">
          ₹20 Question Offer
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Fill in your details and send one clear question. Our Panditji will respond with a concise Jyotish answer within minutes.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-gray-500">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-2 shadow-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
              placeholder="e.g. Rohan Sharma"
              required
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-gray-500">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-2 shadow-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
              placeholder="+91 98765 43210"
              required
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-gray-500">Your Question</label>
            <textarea
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-2 shadow-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
              rows={4}
              placeholder="Ask about muhurta, career, relationships, or quick guidance..."
              required
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-3 text-sm font-semibold uppercase tracking-widest text-white shadow-lg transition hover:brightness-110"
          >
            {submitting ? 'Sending...' : 'Send to WhatsApp ₹20'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuestionOfferModal;
