import React, { useState } from 'react';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 pb-4">
      <button
        className="flex justify-between items-center w-full text-left font-medium text-gray-900 hover:text-blue-600 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className="text-sm md:text-base">{question}</span>
        <span className="ml-4 flex-shrink-0">
          {isOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </span>
      </button>
      <div
        className={`mt-2 text-sm text-gray-600 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="pb-2">{answer}</p>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Is Gracia Nova safe to use?",
      answer: "Yes, Gracia Nova is formulated by experts and made with natural ingredients, ensuring a safe and effective solution without harmful side effects."
    },
    {
      question: "How quickly does Gracia Nova work?",
      answer: "You can experience the tightening effects of Gracia Nova within just 30 minutes, providing rapid results for enhanced confidence in intimate moments."
    },
    {
      question: "Can Gracia Nova be used regularly?",
      answer: "Gracia Nova is designed for occasional use. Follow the recommended usage guidelines for optimal results, and consult with a healthcare professional if you have any concerns."
    },
    {
      question: "Is the packaging discreet?",
      answer: "Absolutely. We understand the importance of privacy. Gracia Nova is delivered in secure and confidential packaging to ensure your discretion and peace of mind."
    },
    {
      question: "How long do the effects of Gracia Nova last?",
      answer: "The effects of Gracia Nova may vary from person to person. For sustained benefits, follow the recommended usage guidelines and enjoy the enhanced sensations during intimate moments."
    },
    {
      question: "Can Gracia Nova be used by all women?",
      answer: "Gracia Nova is suitable for most women. However, if you have specific health concerns or conditions, it's advisable to consult with a healthcare professional before use."
    },
    {
      question: "Can I use Gracia Nova with other intimate products?",
      answer: "Gracia Nova is formulated to be compatible with the most intimate products. However, for personalized advice, consult with a healthcare professional."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Frequently Asked Questions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* First Column */}
        <div className="space-y-6">
          {faqs.slice(0, 4).map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => toggleFAQ(index)}
            />
          ))}
        </div>
        
        {/* Second Column */}
        <div className="space-y-6">
          {faqs.slice(4).map((faq, index) => (
            <FAQItem
              key={index + 4}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index + 4}
              onClick={() => toggleFAQ(index + 4)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;