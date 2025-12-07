'use client';

import { useState } from 'react';

interface Course {
  id: number;
  title: string;
  category: string;
  duration: string;
  level: string;
  price: string;
  mode: string;
  description: string;
  instructor: string;
}

interface WhatsAppEnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
  language: 'en' | 'hi';
}

export default function WhatsAppEnrollmentModal({ isOpen, onClose, course, language }: WhatsAppEnrollmentModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    pincode: '',
    preferredStartDate: '',
    preferredMode: '',
    experience: '',
    specialRequirements: ''
  });

  const content = {
    en: {
      title: 'Enroll in Course',
      subtitle: 'Fill details to send WhatsApp message for course enrollment',
      name: 'Full Name',
      phone: 'Phone Number',
      email: 'Email (Optional)',
      address: 'Complete Address',
      pincode: 'PIN Code',
      preferredStartDate: 'Preferred Start Date',
      preferredMode: 'Preferred Mode (Online/Offline)',
      experience: 'Previous Experience (Optional)',
      specialRequirements: 'Special Requirements',
      sendWhatsApp: 'Send WhatsApp Message',
      cancel: 'Cancel',
      required: 'Required fields *'
    },
    hi: {
      title: 'पाठ्यक्रम में नामांकन करें',
      subtitle: 'पाठ्यक्रम नामांकन के लिए व्हाट्सएप संदेश भेजने हेतु विवरण भरें',
      name: 'पूरा नाम',
      phone: 'फोन नंबर',
      email: 'ईमेल (वैकल्पिक)',
      address: 'पूरा पता',
      pincode: 'पिन कोड',
      preferredStartDate: 'पसंदीदा शुरुआत दिनांक',
      preferredMode: 'पसंदीदा माध्यम (ऑनलाइन/ऑफलाइन)',
      experience: 'पूर्व अनुभव (वैकल्पिक)',
      specialRequirements: 'विशेष आवश्यकताएं',
      sendWhatsApp: 'व्हाट्सएप संदेश भेजें',
      cancel: 'रद्द करें',
      required: 'आवश्यक फील्ड *'
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateWhatsAppMessage = () => {
    if (!course) return '';

    const message = language === 'hi'
      ? `नमस्ते! मैं ${course.title} में नामांकन करना चाहता हूं

📚 पाठ्यक्रम विवरण:
- अवधि: ${course.duration}
- स्तर: ${course.level}
- मूल्य: ${course.price}
- माध्यम: ${course.mode}
- प्रशिक्षक: ${course.instructor}

👤 छात्र विवरण:
- नाम: ${formData.name}
- फोन: ${formData.phone}
- ईमेल: ${formData.email || 'प्रदान नहीं किया गया'}
- पता: ${formData.address}
- पिन कोड: ${formData.pincode}

📅 प्राथमिकताएं:
- पसंदीदा शुरुआत दिनांक: ${formData.preferredStartDate}
- पसंदीदा माध्यम: ${formData.preferredMode}
- पूर्व अनुभव: ${formData.experience || 'कोई नहीं'}

📝 विशेष आवश्यकताएं:
${formData.specialRequirements || 'कोई नहीं'}

कृपया नामांकन की पुष्टि करें और आगे का विवरण साझा करें।`
      : `Hi! I want to enroll in ${course.title}

📚 Course Details:
- Duration: ${course.duration}
- Level: ${course.level}
- Price: ${course.price}
- Mode: ${course.mode}
- Instructor: ${course.instructor}

👤 Student Details:
- Name: ${formData.name}
- Phone: ${formData.phone}
- Email: ${formData.email || 'Not provided'}
- Address: ${formData.address}
- PIN Code: ${formData.pincode}

📅 Preferences:
- Preferred Start Date: ${formData.preferredStartDate}
- Preferred Mode: ${formData.preferredMode}
- Previous Experience: ${formData.experience || 'None'}

📝 Special Requirements:
${formData.specialRequirements || 'None'}

Please confirm enrollment and share further details.`;

    return encodeURIComponent(message);
  };

  const handleWhatsAppSend = () => {
    if (!formData.name || !formData.phone || !formData.address || !formData.pincode) {
      alert(language === 'en' ? 'Please fill all required fields' : 'कृपया सभी आवश्यक फील्ड भरें');
      return;
    }

    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/919340337323?text=${message}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999999] p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className={`text-xl font-bold text-primary ${
                language === 'hi' ? 'heading-hi' : 'heading-en'
              }`}>
                {content[language].title}
              </h2>
              <p className={`text-sm text-text-secondary ${
                language === 'hi' ? 'body-hi' : ''
              }`}>
                {content[language].subtitle}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-text-secondary hover:text-primary transition-colors"
            >
              ✕
            </button>
          </div>

          {course && (
            <div className="mb-4 p-3 bg-elevations rounded-lg">
              <h3 className={`font-semibold text-primary ${
                language === 'hi' ? 'heading-hi' : 'heading-en'
              }`}>
                {course.title}
              </h3>
              <p className="text-sm text-text-secondary">{course.duration} • {course.level}</p>
              <p className="text-accent font-bold">{course.price}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-1">
                {content[language].name} *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1">
                {content[language].phone} *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1">
                {content[language].email}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1">
                {content[language].address} *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1">
                {content[language].pincode} *
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1">
                {content[language].preferredStartDate}
              </label>
              <input
                type="date"
                name="preferredStartDate"
                value={formData.preferredStartDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1">
                {content[language].preferredMode}
              </label>
              <select
                name="preferredMode"
                value={formData.preferredMode}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">{language === 'hi' ? 'माध्यम चुनें' : 'Select Mode'}</option>
                <option value={language === 'hi' ? 'ऑनलाइन' : 'Online'}>{language === 'hi' ? 'ऑनलाइन' : 'Online'}</option>
                <option value={language === 'hi' ? 'ऑफलाइन' : 'Offline'}>{language === 'hi' ? 'ऑफलाइन' : 'Offline'}</option>
                <option value={language === 'hi' ? 'दोनों' : 'Both'}>{language === 'hi' ? 'दोनों' : 'Both'}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1">
                {content[language].experience}
              </label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder={language === 'en' ? 'e.g., Beginner, 2 years, etc.' : 'जैसे शुरुआती, 2 साल, आदि'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1">
                {content[language].specialRequirements}
              </label>
              <textarea
                name="specialRequirements"
                value={formData.specialRequirements}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder={language === 'en' ? 'Any specific requirements or questions...' : 'कोई विशेष आवश्यकताएं या प्रश्न...'}
              />
            </div>
          </div>

          <p className="text-xs text-text-secondary mt-4 mb-4">
            {content[language].required}
          </p>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-line rounded-lg text-text-secondary hover:bg-elevations transition-colors"
            >
              {content[language].cancel}
            </button>
            <button
              onClick={handleWhatsAppSend}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <span>📱</span>
              {content[language].sendWhatsApp}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}