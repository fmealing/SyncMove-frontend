import React, { useEffect, useState } from "react";
import FAQItem from "./FAQItem";

// Load FAQ data from a JSON file
const FAQAccordion: React.FC = () => {
  const [faqData, setFaqData] = useState<
    { question: string; answer: string }[]
  >([]);

  useEffect(() => {
    // Fetch the FAQ data from the JSON file
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
      <h2 className="text-h2 font-semibold text-textPrimary font-primary text-center mb-4">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <FAQItem key={index} {...faq} />
        ))}
      </div>
    </section>
  );
};

export default FAQAccordion;
