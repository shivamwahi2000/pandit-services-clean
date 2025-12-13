'use client';

import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLocale } from 'next-intl';

export default function SevaPage() {
  const locale = useLocale();

  const content = {
    en: {
      title: 'Transform Lives Through',
      titleAccent: 'Sacred Seva',
      subtitle: 'Join us in creating meaningful change through the timeless tradition of selfless service',
      comingSoon: 'Coming Soon',
      contactHeading: 'Ready to Make a Difference?',
      contactMessage: 'Our comprehensive Seva programs are being carefully crafted to serve the community. Connect with us to learn how you can participate in these sacred opportunities.',
      whatsappButton: 'Connect on WhatsApp',
      callButton: 'Schedule a Call',
      sevaTypes: 'Upcoming Seva Initiatives',
      quote: 'Service is the highest duty',
      quoteHindi: 'सेवा परमो धर्मः'
    },
    hi: {
      title: 'पवित्र सेवा के माध्यम से',
      titleAccent: 'जीवन बदलें',
      subtitle: 'निःस्वार्थ सेवा की कालातीत परंपरा के माध्यम से सार्थक परिवर्तन लाने में हमारे साथ शामिल हों',
      comingSoon: 'जल्द आ रहा है',
      contactHeading: 'बदलाव लाने के लिए तैयार हैं?',
      contactMessage: 'हमारे व्यापक सेवा कार्यक्रम समुदाय की सेवा के लिए सावधानीपूर्वक तैयार किए जा रहे हैं। इन पवित्र अवसरों में आप कैसे भाग ले सकते हैं यह जानने के लिए हमसे जुड़ें।',
      whatsappButton: 'व्हाट्सऐप पर जुड़ें',
      callButton: 'कॉल शेड्यूल करें',
      sevaTypes: 'आगामी सेवा पहल',
      quote: 'सेवा सर्वोच्च कर्तव्य है',
      quoteHindi: 'सेवा परमो धर्मः'
    }
  };

  const sevaPrograms = [
    {
      icon: '🐄',
      name: { en: 'Gau Seva', hi: 'गौ सेवा' },
      color: 'from-amber-400 to-orange-500',
      image: '/seva/gau-seva.jpg'
    },
    {
      icon: '🍚',
      name: { en: 'Annadaan', hi: 'अन्नदान' },
      color: 'from-green-400 to-emerald-500',
      image: '/seva/annadaan.jpg'
    },
    {
      icon: '🛕',
      name: { en: 'Temple Care', hi: 'मंदिर देखभाल' },
      color: 'from-red-400 to-rose-500',
      image: '/seva/temple.jpg'
    },
    {
      icon: '📚',
      name: { en: 'Education', hi: 'शिक्षा' },
      color: 'from-blue-400 to-indigo-500',
      image: '/seva/education.jpg'
    },
    {
      icon: '💊',
      name: { en: 'Medical Aid', hi: 'चिकित्सा सहायता' },
      color: 'from-purple-400 to-pink-500',
      image: '/seva/medical.jpg'
    },
    {
      icon: '🎉',
      name: { en: 'Celebrations', hi: 'समारोह' },
      color: 'from-yellow-400 to-amber-500',
      image: '/seva/celebrations.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <Header />

      <main className="relative">
        {/* Content Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">

            {/* Coming Soon Badge */}
            <div className="flex justify-center mb-8 animate-fade-in">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-full blur opacity-75 animate-pulse"></div>
                <span className="relative inline-flex items-center gap-2 px-6 py-2 bg-white border-2 border-orange-400 rounded-full text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                  </span>
                  {content[locale as keyof typeof content].comingSoon}
                </span>
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-12 space-y-4">
              <h1 className={`text-5xl md:text-7xl font-bold text-gray-900 ${
                locale === 'hi' ? 'heading-hi' : 'heading-en'
              }`}>
                {content[locale as keyof typeof content].title}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 animate-gradient">
                  {content[locale as keyof typeof content].titleAccent}
                </span>
              </h1>
              <p className={`text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed ${
                locale === 'hi' ? 'body-hi' : ''
              }`}>
                {content[locale as keyof typeof content].subtitle}
              </p>
            </div>

            {/* Sacred Quote */}
            <div className="flex justify-center mb-16">
              <div className="group relative max-w-md">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                <div className="relative px-8 py-6 bg-white/95 backdrop-blur-md border border-white/50 rounded-2xl shadow-xl">
                  <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 text-center">
                    {content[locale as keyof typeof content].quoteHindi}
                  </p>
                  <p className={`text-sm text-gray-600 text-center mt-2 ${
                    locale === 'hi' ? 'body-hi' : ''
                  }`}>
                    {content[locale as keyof typeof content].quote}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className="max-w-3xl mx-auto mb-20">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition duration-500 animate-gradient-xy"></div>

                <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50 p-8 md:p-12">
                  <div className="text-center space-y-6">
                    <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 ${
                      locale === 'hi' ? 'heading-hi' : 'heading-en'
                    }`}>
                      {content[locale as keyof typeof content].contactHeading}
                    </h2>
                    <p className={`text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed ${
                      locale === 'hi' ? 'body-hi' : ''
                    }`}>
                      {content[locale as keyof typeof content].contactMessage}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                      <a
                        href="https://wa.me/919340337323?text=Hello, I would like to know more about Seva opportunities"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative w-full sm:w-auto"
                      >
                        <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur opacity-40 group-hover:opacity-70 transition duration-300"></div>
                        <div className="relative flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.703"/>
                          </svg>
                          <span>{content[locale as keyof typeof content].whatsappButton}</span>
                        </div>
                      </a>

                      <a
                        href="tel:+919340337323"
                        className="group relative w-full sm:w-auto"
                      >
                        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur opacity-40 group-hover:opacity-70 transition duration-300"></div>
                        <div className="relative flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.57a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.57-2.3-.57-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                          </svg>
                          <span>{content[locale as keyof typeof content].callButton}</span>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seva Programs Preview */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
          <div className="max-w-7xl mx-auto">
            <h2 className={`text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16 ${
              locale === 'hi' ? 'heading-hi' : 'heading-en'
            }`}>
              {content[locale as keyof typeof content].sevaTypes}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sevaPrograms.map((program, index) => (
                <div
                  key={index}
                  className="group relative"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${program.color} rounded-3xl blur opacity-40 group-hover:opacity-70 transition duration-300`}></div>
                  <div className="relative h-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20 overflow-hidden">
                    {/* Image Section */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={program.image}
                        alt={program.name.en}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <h3 className={`text-xl font-bold text-gray-900 text-center ${
                        locale === 'hi' ? 'heading-hi' : ''
                      }`}>
                        {program.name[locale as keyof typeof program.name]}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom decoration */}
            <div className="mt-20 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 rounded-full blur-xl opacity-20"></div>
                <div className="relative flex items-center gap-2 px-8 py-4 bg-white/90 backdrop-blur-sm rounded-full border border-orange-200 shadow-lg">
                  <span className="text-2xl">✨</span>
                  <p className={`text-gray-700 font-medium ${locale === 'hi' ? 'body-hi' : ''}`}>
                    {locale === 'en' ? 'Many more programs coming soon...' : 'और भी बहुत से कार्यक्रम जल्द आ रहे हैं...'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -50px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(50px, 50px) scale(1.05);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes gradient-xy {
          0%, 100% {
            background-position: 0% 0%;
          }
          25% {
            background-position: 100% 0%;
          }
          50% {
            background-position: 100% 100%;
          }
          75% {
            background-position: 0% 100%;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }

        .animate-gradient-xy {
          background-size: 400% 400%;
          animation: gradient-xy 15s ease infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
