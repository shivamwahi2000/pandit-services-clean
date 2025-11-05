'use client';

import { useState } from 'react';

interface Service {
  name: string;
  category: string;
  duration: string;
  description: string;
}

interface WhatsAppBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
  language: 'en' | 'hi';
}

export default function WhatsAppBookingModal({ isOpen, onClose, service, language }: WhatsAppBookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    pincode: '',
    preferredDate: '',
    preferredTime: '',
    guestCount: '',
    specialRequirements: ''
  });

  const content = {
    en: {
      title: 'Book Service',
      subtitle: 'Fill details to send WhatsApp message to Pandit Ji',
      name: 'Full Name',
      phone: 'Phone Number',
      email: 'Email (Optional)',
      address: 'Complete Address',
      pincode: 'PIN Code',
      preferredDate: 'Preferred Date',
      preferredTime: 'Preferred Time',
      guestCount: 'Expected Guests',
      specialRequirements: 'Special Requirements',
      sendWhatsApp: 'Send WhatsApp Message',
      cancel: 'Cancel',
      required: 'Required fields *'
    },
    hi: {
      title: 'सेवा बुक करें',
      subtitle: 'पंडित जी को व्हाट्सऐप संदेश भेजने के लिए विवरण भरें',
      name: 'पूरा नाम',
      phone: 'फोन नंबर',
      email: 'ईमेल (वैकल्पिक)',
      address: 'पूरा पता',
      pincode: 'पिन कोड',
      preferredDate: 'पसंदीदा तारीख',
      preferredTime: 'पसंदीदा समय',
      guestCount: 'अपेक्षित मेहमान',
      specialRequirements: 'विशेष आवश्यकताएं',
      sendWhatsApp: 'व्हाट्सऐप संदेश भेजें',
      cancel: 'रद्द करें',
      required: 'आवश्यक फील्ड *'
    }
  };

  const generateWhatsAppMessage = () => {
    if (!service) return '';

    const message = `🙏 *नमस्ते पंडित जी*

📿 *सेवा बुकिंग का अनुरोध*

*सेवा विवरण:*
• सेवा: ${service.name}
• श्रेणी: ${service.category}
• अवधि: ${service.duration}
• विवरण: ${service.description}

*ग्राहक विवरण:*
• नाम: ${formData.name}
• फोन: ${formData.phone}
${formData.email ? `• ईमेल: ${formData.email}` : ''}

*स्थान विवरण:*
• पता: ${formData.address}
• पिन कोड: ${formData.pincode}

*कार्यक्रम विवरण:*
• पसंदीदा तारीख: ${formData.preferredDate}
• पसंदीदा समय: ${formData.preferredTime}
• अपेक्षित मेहमान: ${formData.guestCount}

${formData.specialRequirements ? `*विशेष आवश्यकताएं:*
${formData.specialRequirements}` : ''}

कृपया उपलब्धता और शुल्क की पुष्टि करें। धन्यवाद! 🙏`;

    return encodeURIComponent(message);
  };

  const handleSendWhatsApp = () => {
    if (!formData.name || !formData.phone || !formData.address || !formData.preferredDate) {
      alert(language === 'en' ? 'Please fill all required fields' : 'कृपया सभी आवश्यक फील्ड भरें');
      return;
    }

    const message = generateWhatsAppMessage();
    const whatsappNumber = '+919340337323'; // WhatsApp number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999999] p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="bg-red-600 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className={`text-xl font-bold mb-2 ${language === 'hi' ? 'heading-hi' : 'heading-en'}`}>
                {content[language].title}
              </h2>
              <p className={`text-sm opacity-90 ${language === 'hi' ? 'body-hi' : ''}`}>
                {content[language].subtitle}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Service Info */}
        <div className="p-4 bg-gray-50 border-b">
          <h3 className={`font-semibold text-gray-800 ${language === 'hi' ? 'heading-hi' : 'heading-en'}`}>
            {service.name}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{service.description}</p>
          <div className="flex gap-4 text-xs text-gray-500 mt-2">
            <span>⏱️ {service.duration}</span>
            <span>📂 {service.category}</span>
          </div>
        </div>

        {/* Form */}
        <div className="p-6">
          <p className="text-xs text-gray-500 mb-4">{content[language].required}</p>
          
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className={`block text-sm font-medium text-gray-700 mb-1 ${language === 'hi' ? 'body-hi' : ''}`}>
                {content[language].name} *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder={language === 'en' ? 'Enter your full name' : 'अपना पूरा नाम दर्ज करें'}
              />
            </div>

            {/* Phone */}
            <div>
              <label className={`block text-sm font-medium text-gray-700 mb-1 ${language === 'hi' ? 'body-hi' : ''}`}>
                {content[language].phone} *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="+91 98765 43210"
              />
            </div>

            {/* Email */}
            <div>
              <label className={`block text-sm font-medium text-gray-700 mb-1 ${language === 'hi' ? 'body-hi' : ''}`}>
                {content[language].email}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Address and PIN */}
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className={`block text-sm font-medium text-gray-700 mb-1 ${language === 'hi' ? 'body-hi' : ''}`}>
                  {content[language].address} *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder={language === 'en' ? 'House/Flat, Area, City' : 'घर/फ्लैट, इलाका, शहर'}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-1 ${language === 'hi' ? 'body-hi' : ''}`}>
                  {content[language].pincode}
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="110001"
                />
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-1 ${language === 'hi' ? 'body-hi' : ''}`}>
                  {content[language].preferredDate} *
                </label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-1 ${language === 'hi' ? 'body-hi' : ''}`}>
                  {content[language].preferredTime}
                </label>
                <input
                  type="time"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>

            {/* Guest Count */}
            <div>
              <label className={`block text-sm font-medium text-gray-700 mb-1 ${language === 'hi' ? 'body-hi' : ''}`}>
                {content[language].guestCount}
              </label>
              <input
                type="number"
                name="guestCount"
                value={formData.guestCount}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="10"
              />
            </div>

            {/* Special Requirements */}
            <div>
              <label className={`block text-sm font-medium text-gray-700 mb-1 ${language === 'hi' ? 'body-hi' : ''}`}>
                {content[language].specialRequirements}
              </label>
              <textarea
                name="specialRequirements"
                value={formData.specialRequirements}
                onChange={handleInputChange}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder={language === 'en' ? 'Any specific requirements, timing preferences, or traditions...' : 'कोई विशिष्ट आवश्यकताएं, समय की प्राथमिकताएं, या परंपराएं...'}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {content[language].cancel}
            </button>
            <button
              onClick={handleSendWhatsApp}
              className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.492"/>
              </svg>
              {content[language].sendWhatsApp}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}