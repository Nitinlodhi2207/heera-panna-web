"use client";

import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          subject: `New Contact from ${formData.firstName} ${formData.lastName}`,
          message: `Phone: ${formData.phone}\n\n${formData.message}`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  return (
    <div className="bg-white p-5 md:p-10 border-t-4 border-[#591C21] shadow-lg">
      <h2 className="text-xl md:text-2xl font-display font-bold text-[#591C21] mb-4 md:mb-6">
        Send us a Message
      </h2>
      
      {status === 'success' ? (
        <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-md text-center">
          <p className="font-medium">Message sent successfully!</p>
          <p className="text-sm mt-1">We'll get back to you shortly.</p>
          <button 
            onClick={() => setStatus('idle')}
            className="mt-4 text-[#591C21] underline text-sm hover:text-[#4A151A]"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-1 md:space-y-2">
              <label htmlFor="firstName" className="text-xs md:text-sm font-medium text-[#2C1810]">First Name</label>
              <input 
                type="text" 
                id="firstName" 
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 md:px-4 md:py-3 bg-[#FFFAF0] border border-[#D4AF37]/30 focus:border-[#591C21] focus:outline-none transition-colors text-sm"
                placeholder="Enter your first name"
              />
            </div>
            <div className="space-y-1 md:space-y-2">
              <label htmlFor="lastName" className="text-xs md:text-sm font-medium text-[#2C1810]">Last Name</label>
              <input 
                type="text" 
                id="lastName" 
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 md:px-4 md:py-3 bg-[#FFFAF0] border border-[#D4AF37]/30 focus:border-[#591C21] focus:outline-none transition-colors text-sm"
                placeholder="Enter your last name"
              />
            </div>
          </div>

          <div className="space-y-1 md:space-y-2">
            <label htmlFor="email" className="text-xs md:text-sm font-medium text-[#2C1810]">Email Address</label>
            <input 
              type="email" 
              id="email" 
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 md:px-4 md:py-3 bg-[#FFFAF0] border border-[#D4AF37]/30 focus:border-[#591C21] focus:outline-none transition-colors text-sm"
              placeholder="your@email.com"
            />
          </div>

          <div className="space-y-1 md:space-y-2">
            <label htmlFor="phone" className="text-xs md:text-sm font-medium text-[#2C1810]">Phone Number</label>
            <input 
              type="tel" 
              id="phone" 
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 md:px-4 md:py-3 bg-[#FFFAF0] border border-[#D4AF37]/30 focus:border-[#591C21] focus:outline-none transition-colors text-sm"
              placeholder="+91 89828 26000"
            />
          </div>

          <div className="space-y-1 md:space-y-2">
            <label htmlFor="message" className="text-xs md:text-sm font-medium text-[#2C1810]">Message</label>
            <textarea 
              id="message" 
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 md:px-4 md:py-3 bg-[#FFFAF0] border border-[#D4AF37]/30 focus:border-[#591C21] focus:outline-none transition-colors resize-none text-sm"
              placeholder="How can we help you?"
            ></textarea>
          </div>

          {status === 'error' && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded border border-red-200">
              {errorMessage || 'Failed to send message. Please try again.'}
            </div>
          )}

          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="w-full bg-[#591C21] text-white font-bold py-3 md:py-4 hover:bg-[#4A151A] transition-colors flex items-center justify-center gap-2 shadow-md text-sm md:text-base disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="h-3 w-3 md:h-4 md:w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send Message
                <Send className="h-3 w-3 md:h-4 md:w-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
