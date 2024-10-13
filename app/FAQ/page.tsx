// TO IMPLEMENT using DaisyUI and TailwindCSS and typescript
// FEEDBACK FORM
// - Heading that says "We value your feedback"
// - Subheading that says "Let us know how we can improve your experience"
// - Name input field
// - Email input field
// - Type of feedback input field (dropdown with options: "Bug Report", "Feature Request", "General Feedback")
// - Message input field
// - Submit button
// FREQUENTLY ASKED QUESTIONS accordion
// - Heading that says "Frequently Asked Questions"
// - Accordion with any questions that could be asked

"use client";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

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
      {/* Feedback Form */}
      <section className="faq-content w-full max-w-2xl bg-lightGray rounded-lg shadow-lg p-6 mb-8 space-y-6">
        <h2 className="text-h2 font-semibold text-textPrimary font-primary text-center">
          We value your feedback
        </h2>
        <p className="text-textSecondary font-primary text-center">
          Let us know how we can improve your experience
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-primary text-textPrimary font-primary"
            value={feedback.name}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-primary text-textPrimary font-primary"
            value={feedback.email}
            onChange={handleInputChange}
          />
          <select
            name="type"
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-primary text-textPrimary font-primary"
            value={feedback.type}
            onChange={handleInputChange}
          >
            <option value="Bug Report">Bug Report</option>
            <option value="Feature Request">Feature Request</option>
            <option value="General Feedback">General Feedback</option>
          </select>
          <textarea
            name="message"
            placeholder="Your Message"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-textPrimary font-primary"
            rows={4}
            value={feedback.message}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-primary rounded-full font-primary hover:bg-primaryDark transition"
          >
            Submit Feedback
          </button>
        </form>
      </section>

      {/* Frequently Asked Questions */}
      <section className="faq-content w-full max-w-2xl bg-lightGray rounded-lg shadow-lg p-6">
        <h2 className="text-h2 font-semibold text-textPrimary font-primary text-center mb-4">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {/* DaisyUI Accordion */}
          {[
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
          ].map((faq, index) => (
            <div
              key={index}
              className="collapse collapse-plus border border-gray-300 rounded-lg"
            >
              <input type="checkbox" />
              <div className="collapse-title text-lg font-primary text-textPrimary">
                {faq.question}
              </div>
              <div className="collapse-content">
                <p className="text-textSecondary font-primary">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FeedbackAndFAQPage;
