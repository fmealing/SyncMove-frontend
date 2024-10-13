import React from "react";

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => (
  <div className="collapse collapse-plus border border-gray-300 rounded-lg">
    <input type="checkbox" />
    <div className="collapse-title text-lg font-primary text-textPrimary">
      {question}
    </div>
    <div className="collapse-content">
      <p className="text-textSecondary font-primary">{answer}</p>
    </div>
  </div>
);

export default FAQItem;
