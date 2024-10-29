import React, { useEffect, useState } from "react";
import FAQItem from "./FAQItem";

interface FAQCategory {
  category: string;
  faqs: { question: string; answer: string }[];
}

const FAQAccordion: React.FC = () => {
  const [faqData, setFaqData] = useState<FAQCategory[]>([]);

  useEffect(() => {
    const loadFAQData = async () => {
      try {
        const response = await fetch("faqData.json");
        const data = await response.json();
        setFaqData(data);
      } catch (error) {
        console.error("Error loading FAQ data:", error);
      }
    };

    loadFAQData();
  }, []);

  return (
    <section className="faq-content w-full max-w-2xl bg-lightGray rounded-lg shadow-lg p-6">
      <h2 className="text-h2 font-semibold text-textPrimary font-['Roboto'] text-center mb-4">
        Frequently Asked Questions
      </h2>
      {faqData.map((categoryData, categoryIndex) => (
        <div key={categoryIndex} className="mb-6">
          <h3 className="text-2xl font-semibold text-primary mb-2 font-['Roboto']">
            {categoryData.category}
          </h3>
          {/* Horizontal Divider */}
          <div className="border-b border-textPrimary mb-4"></div>
          <div className="space-y-4">
            {categoryData.faqs.map((faq, faqIndex) => (
              <FAQItem key={faqIndex} {...faq} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default FAQAccordion;
