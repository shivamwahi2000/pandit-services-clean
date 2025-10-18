'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    console.log('Chatbot component mounted');
  }, []);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '🙏 Namaste! I\'m here to help you with booking pujas and rituals with Hari Om ji. How can I assist you today?',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [streamingText, setStreamingText] = useState('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingText]);

  const simulateStreaming = (text: string, onComplete: () => void) => {
    setStreamingText('');
    setIsTyping(true);
    
    let currentIndex = 0;
    const streamInterval = setInterval(() => {
      if (currentIndex >= text.length) {
        clearInterval(streamInterval);
        setIsTyping(false);
        setStreamingText('');
        onComplete();
        return;
      }
      
      // Add characters one by one for better accuracy
      const nextChar = text[currentIndex];
      setStreamingText(prev => prev + nextChar);
      currentIndex++;
    }, 40); // Balanced speed - not too fast, not too slow
    
    // Cleanup function to prevent memory leaks
    return () => clearInterval(streamInterval);
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    const formatResponse = (text: string) => {
      return text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    };
    
    // Refined responses for Hari Om ji's services with HTML bold formatting
    if (message.includes('book') || message.includes('appointment')) {
      return '🙏 I\'d be delighted to help you book a sacred ceremony with Hari Om ji!\n\n📿 <b>Our Specialized Services:</b>\n• Griha Pravesh (Housewarming): Traditional blessings for new homes\n• Satyanarayan Puja: Monthly/special occasion worship\n• Wedding Ceremonies: Complete Vedic marriage rituals\n• Festival Pujas: Diwali, Navratri, Karva Chauth celebrations\n• Mundan Ceremony: First haircut ritual for children\n• Thread Ceremony: Sacred thread initiation\n• Shanti Havan: Peace and prosperity rituals\n\n✨ To proceed with booking:\n1. Let me know the type of ceremony\n2. Your preferred dates (2-3 options)\n3. Location details\n4. Number of expected guests\n\nShall we start with the type of ceremony you\'re looking for?';
    }
    
    if (message.includes('price') || message.includes('cost') || message.includes('fee')) {
      return '💰 <b>Hari Om ji\'s Service Fees</b> (All inclusive of basic ritual items):\n\n🏠 <b>Home Ceremonies:</b>\n• Griha Pravesh: ₹2,500 - ₹5,000\n• Satyanarayan Puja: ₹1,500 - ₹3,000\n• Monthly Pujas: ₹1,200 - ₹2,500\n• Shanti Havan: ₹3,000 - ₹6,000\n\n💒 <b>Wedding Services:</b>\n• Complete Wedding Ceremony: ₹8,000 - ₹15,000\n• Engagement Ceremony: ₹3,000 - ₹5,000\n• Mehendi/Haldi Rituals: ₹2,000 - ₹4,000\n\n🎉 <b>Festival & Special Occasions:</b>\n• Diwali/Navratri Puja: ₹1,500 - ₹4,000\n• Karva Chauth: ₹1,000 - ₹2,000\n• Birthday/Anniversary Puja: ₹1,200 - ₹2,500\n\n🚗 <b>Additional:</b>\n• Travel within Delhi NCR: Included\n• Beyond 25km: ₹500-1000 extra\n• Same-day booking: 20% surcharge\n\nWould you like a detailed quote for your specific ceremony?';
    }
    
    if (message.includes('available') || message.includes('free')) {
      return '📅 <b>Hari Om ji\'s Availability Schedule:</b>\n\n⏰ <b>Regular Hours:</b>\n• Morning Slots: 6:00 AM - 11:00 AM\n• Evening Slots: 4:00 PM - 8:00 PM\n• Available: Monday to Sunday\n\n🚫 <b>Generally Unavailable:</b>\n• Major religious fasting days\n• Personal religious observances\n• Already booked ceremonies (check real-time)\n\n✅ <b>Booking Recommendations:</b>\n• Book 7-15 days in advance for flexibility\n• Auspicious muhurat timings available\n• Emergency/same-day bookings possible (subject to availability)\n\n📞 <b>To check real-time availability:</b>\nPlease share your preferred dates (2-3 options) and I\'ll coordinate with Hari Om ji immediately. You can also call directly at +91 98765 43210 for instant confirmation.\n\nWhat dates are you considering?';
    }
    
    if (message.includes('location') || message.includes('area') || message.includes('travel')) {
      return formatResponse('🗺️ **Hari Om ji\'s Service Coverage Area:**\n\n✅ **Primary Service Zones (No extra charges):**\n• Delhi: All districts and localities\n• Gurgaon: All sectors and areas\n• Noida: All sectors including Greater Noida\n• Faridabad: All sectors and colonies\n• Ghaziabad: All areas and localities\n\n🚗 **Extended Coverage (Additional travel charges):**\n• Within 50km radius: ₹500-1000 extra\n• Meerut, Panipat, Sonipat: ₹1000-1500\n• Mathura, Vrindavan: ₹1500-2000\n• Other nearby cities: Contact for quote\n\n🏠 **Service Locations:**\n• Your home/residence\n• Community halls and banquet halls\n• Temples and religious venues\n• Outdoor venues (gardens, farmhouses)\n\n📍 **Special Notes:**\n• Free site visit for wedding planning\n• Parking arrangement assistance\n• Flexible timing for distant locations\n\nWhere is your ceremony location? I\'ll provide exact details and any applicable charges.');
    }
    
    if (message.includes('experience') || message.includes('qualification') || message.includes('services')) {
      return formatResponse('🕉️ **About Pandit Hari Om ji - Your Trusted Spiritual Guide:**\n\n📚 **Qualifications & Experience:**\n• 15+ years of dedicated service in Vedic rituals\n• Acharya degree in Sanskrit and Hindu scriptures\n• Specialized training in Vedic astrology and muhurat\n• Expert in North Indian and traditional rituals\n• Over 1000+ successful ceremonies conducted\n\n🌟 **Expertise & Specializations:**\n• Complete Vedic wedding ceremonies\n• Griha Pravesh and Vastu Shanti\n• Festival celebrations and monthly pujas\n• Astrological consultations and muhurat selection\n• Corporate and community event ceremonies\n• Last rites and spiritual guidance\n\n🗣️ **Languages:**\n• Fluent in Sanskrit (ritual language)\n• Hindi (primary communication)\n• Punjabi and basic English\n\n💫 **What Makes Hari Om ji Special:**\n• Authentic traditional approach with modern understanding\n• Punctual and well-organized ceremonies\n• Patient explanation of rituals to families\n• Affordable pricing with no hidden costs\n• Warm, respectful interaction with all family members\n\nWould you like to know about any specific service or ceremony?');
    }
    
    if (message.includes('items') || message.includes('material') || message.includes('preparation')) {
      return formatResponse('🛍️ **Preparation Guide - What You Need to Arrange:**\n\n🌸 **Essential Items (You Provide):**\n• Fresh flowers: Roses, marigolds, lotus (seasonal)\n• Fruits: Bananas, apples, coconut, seasonal fruits\n• Sweets: Laddu, barfi, or homemade sweets\n• Dry fruits: Almonds, cashews, dates, raisins\n• Milk products: Fresh milk, curd, ghee\n• Grains: Rice, wheat, sesame seeds\n\n🕯️ **Worship Materials (You Arrange):**\n• Incense sticks and dhoop\n• Oil lamps and wicks\n• Camphor and matchbox\n• Red cloth piece and sacred thread\n• Sandalwood paste and kumkum\n• Tulsi leaves (if available)\n\n📿 **Specialized Items (Hari Om ji Provides):**\n• Sacred mantras and prayer books\n• Ritual utensils (kalash, thali, spoons)\n• Havan materials and sacred fire setup\n• Yagnopavit (sacred thread) for ceremonies\n• Specific ritual items per ceremony type\n\n📋 **Additional Arrangements:**\n• Clean worship area/altar setup\n• Seating arrangement for guests\n• Water for hand washing\n• Plates for prasad distribution\n\n💡 **Pro Tip:** Hari Om ji will provide a detailed, ceremony-specific list 2-3 days before your event. Emergency arrangements can also be made if you\'re missing items.\n\nWhich ceremony are you preparing for? I can give you an exact list!');
    }
    
    if (message.includes('time') || message.includes('duration') || message.includes('muhurat')) {
      return formatResponse('⏰ **Ceremony Duration & Auspicious Timing Guide:**\n\n🕐 **Typical Ceremony Durations:**\n• Satyanarayan Puja: 1.5-2 hours\n• Griha Pravesh: 2-3 hours\n• Simple Home Puja: 45 minutes-1.5 hours\n• Wedding Ceremony: 3-5 hours (full ritual)\n• Engagement: 1-2 hours\n• Festival Pujas: 1-3 hours (depending on scale)\n• Mundan/Thread Ceremony: 2-3 hours\n• Shanti Havan: 2-4 hours\n\n🌅 **Muhurat (Auspicious Timing) Services:**\n• Hari Om ji provides detailed muhurat calculation\n• Based on your birth details and planetary positions\n• Considers festival dates and family traditions\n• Morning ceremonies: Usually 6-11 AM\n• Evening ceremonies: Usually 4-7 PM\n\n📅 **Booking Timeline Recommendations:**\n• Regular pujas: 3-7 days advance booking\n• Wedding ceremonies: 2-4 weeks advance\n• Festival pujas: 1-2 weeks during peak seasons\n• Emergency bookings: Same day (subject to availability)\n\n🔮 **Free Muhurat Consultation:**\nHari Om ji provides complimentary auspicious timing consultation with every booking. Just share:\n• Your birth date and time\n• Preferred ceremony date range\n• Any family preferences or traditions\n\nWhat ceremony are you planning? I\'ll help you find the perfect timing!');
    }
    
    if (message.includes('contact') || message.includes('phone') || message.includes('call')) {
      return formatResponse('📞 **Connect with Pandit Hari Om ji:**\n\n💬 **Primary Contact:**\n• Mobile: +91 98765 43210\n• WhatsApp: +91 98765 43210 (Preferred for quick responses)\n• Available: 7 AM - 9 PM daily\n\n📧 **Alternative Contact:**\n• Email: hariomji.pandit@gmail.com\n• Website booking: [Current website]\n• Response time: Within 2-4 hours\n\n⚡ **Quick Response Options:**\n• WhatsApp: Fastest for availability checks\n• Direct call: For immediate bookings\n• Website form: For detailed planning\n\n🕐 **Best Times to Call:**\n• Morning: 7-9 AM (before ceremonies)\n• Afternoon: 1-3 PM (lunch break)\n• Evening: 8-9 PM (after ceremonies)\n\n📝 **When You Contact, Please Share:**\n• Type of ceremony needed\n• Preferred dates (2-3 options)\n• Location and approximate guest count\n• Any special requirements or traditions\n\n💡 **Emergency Bookings:**\nFor same-day or urgent requirements, call directly. WhatsApp for non-urgent queries and planning.\n\nWould you like me to help you prepare the details before you contact Hari Om ji?');
    }
    
    if (message.includes('thank') || message.includes('thanks')) {
      return formatResponse('🙏 **Dhanyawad! You\'re Most Welcome!**\n\nIt brings me immense joy to help you connect with Hari Om ji for your sacred ceremonies. May your upcoming rituals bring:\n\n✨ Divine blessings and spiritual fulfillment\n🏠 Peace and prosperity to your home\n👨‍👩‍👧‍👦 Unity and happiness to your family\n💫 Success in all your endeavors\n🌺 Protection from negative energies\n\n**Remember:** Hari Om ji is not just performing rituals - he\'s helping you connect with the divine and maintain our beautiful Hindu traditions.\n\n🤝 **Always Here to Help:**\nFeel free to return anytime with questions about:\n• Ceremony planning and preparation\n• Festival celebration ideas\n• Spiritual guidance and muhurat consultation\n• Family tradition preservation\n\n**Har Har Mahadev! 🕉️**\n\nIs there anything else about your ceremony planning I can assist you with?');
    }
    
    if (message.includes('hello') || message.includes('hi') || message.includes('namaste')) {
      return formatResponse('🙏 **Namaste and Welcome!**\n\nI\'m your dedicated assistant for **Pandit Hari Om ji\'s Sacred Services**. With over 15 years of devotional service, Hari Om ji brings authentic Vedic traditions to your special occasions.\n\n🌟 **I\'m here to help you with:**\n• 📅 Booking ceremonies and checking availability\n• 💰 Detailed pricing and service information\n• 🛍️ Preparation guides and required materials\n• ⏰ Auspicious timing (muhurat) consultation\n• 📞 Direct contact coordination\n• 🏠 Service area and travel information\n\n✨ **Popular Services:**\n• Wedding ceremonies and engagements\n• Griha Pravesh (housewarming blessings)\n• Festival pujas and monthly rituals\n• Family ceremonies and spiritual guidance\n\n💡 **Quick Start:** Use the tabs above for instant answers, or type your specific questions below.\n\nHow may I assist you in planning your sacred ceremony today?');
    }
    
    // Default response
    return formatResponse('🤔 **I\'m here to help with all your spiritual ceremony needs!**\n\nI can provide detailed information about:\n\n📋 **Services & Booking:**\n• All types of Hindu ceremonies and pujas\n• Real-time availability checking\n• Detailed booking process guidance\n\n💰 **Pricing & Planning:**\n• Transparent pricing for all services\n• Preparation checklists and material guides\n• Auspicious timing consultation\n\n📞 **Contact & Support:**\n• Direct connection with Hari Om ji\n• Service area coverage details\n• Emergency and same-day booking options\n\n✨ **Try asking me about:**\n• "I want to book a Griha Pravesh"\n• "What are the prices for wedding ceremonies?"\n• "Is Hari Om ji available next weekend?"\n• "What items do I need for Satyanarayan Puja?"\n\nOr use the quick action tabs above for instant responses! How can I assist you today? 🙏');
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Get bot response and simulate streaming
    const botResponseText = getBotResponse(inputText);
    
    simulateStreaming(botResponseText, () => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { text: 'Book a Puja', action: () => setInputText('I want to book a puja') },
    { text: 'Check Pricing', action: () => setInputText('What are the prices?') },
    { text: 'Availability', action: () => setInputText('Is Hari Om ji available?') },
    { text: 'Required Items', action: () => setInputText('What items do I need to prepare?') },
    { text: 'Contact Info', action: () => setInputText('How can I contact Hari Om ji?') },
    { text: 'Services', action: () => setInputText('What services does Hari Om ji provide?') }
  ];

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[9999] w-16 h-16 bg-red-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-white text-2xl hover:scale-110 hover:bg-red-700"
        style={{ 
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999 
        }}
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div 
          className="fixed bottom-24 right-6 z-[9999] w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-red-200 overflow-hidden flex flex-col" 
          style={{ 
            position: 'fixed',
            bottom: '100px',
            right: '24px',
            zIndex: 9999 
          }}
        >
          {/* Header */}
          <div className="bg-red-600 p-4 text-white">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="Pandit Services Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Pandit Services Assistant</h3>
                <p className="text-xs opacity-90">Ask about Hari Om ji's services</p>
              </div>
            </div>
          </div>

          {/* Quick Actions Tabs */}
          <div className="p-3 border-b border-gray-200 bg-gray-50">
            <p className="text-xs text-gray-600 mb-2">Quick questions:</p>
            <div className="flex flex-wrap gap-1">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => {
                    action.action();
                    handleSendMessage();
                  }}
                  className="text-xs px-3 py-1 bg-white hover:bg-red-50 border border-gray-200 hover:border-red-300 rounded-full transition-colors text-gray-700 hover:text-red-600"
                >
                  {action.text}
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-2xl text-sm ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800 rounded-bl-md'
                      : 'bg-red-600 text-white rounded-br-md'
                  }`}
                >
                  <div 
                    className="whitespace-pre-line" 
                    dangerouslySetInnerHTML={{ __html: message.text }}
                  />
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {/* Streaming message */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-xs p-3 rounded-2xl rounded-bl-md bg-gray-100 text-gray-800 text-sm">
                  <div className="whitespace-pre-line">
                    <span dangerouslySetInnerHTML={{ __html: streamingText }} />
                    <span className="animate-pulse text-gray-600">|</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>


          {/* Input Box */}
          <div className="p-4 border-t border-red-200 bg-white">
            <div className="flex space-x-2 items-end">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your question or use quick tabs above..."
                className="flex-1 p-3 border-2 border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="p-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}