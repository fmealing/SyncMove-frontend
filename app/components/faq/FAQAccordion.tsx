import React from "react";
import FAQItem from "./FAQItem";

const faqData = [
  {
    question: "How do I submit feedback?",
    answer:
      "You can submit feedback using the form above, including your name, email, and message.",
  },
  {
    question: "Can I report a bug?",
    answer:
      "Yes, select 'Bug Report' from the feedback type dropdown and describe the issue.",
  },
  {
    question: "Where can I request new features?",
    answer:
      "Use the feedback form to request new features by selecting 'Feature Request' from the type dropdown.",
  },
];

const FAQAccordion: React.FC = () => (
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

export default FAQAccordion;
