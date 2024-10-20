"use client";
import React, { useState } from "react";
import FeedbackForm from "../components/faq/FeedbackForm";
import FAQAccordion from "../components/faq/FAQAccordion";

const FeedbackAndFAQPage: React.FC = () => {
  // Feedback form state
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    type: "General Feedback",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFeedback((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Feedback submitted", feedback);
    // TODO: Implement API call to submit feedback
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen p-8 bg-lightGray faq-background">
      <FeedbackForm
        feedback={feedback}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
      />
      <FAQAccordion />
    </div>
  );
};

export default FeedbackAndFAQPage;
