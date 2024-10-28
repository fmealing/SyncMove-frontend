import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import toast from "react-hot-toast";

interface FeedbackFormProps {
  feedback: {
    name: string;
    email: string;
    type: string;
    message: string;
  };
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ feedback, onChange }) => {
  const [state, handleSubmit] = useForm("xbljdqln");

  if (state.succeeded) {
    toast.success("Feedback submitted successfully!");
  }

  return (
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
          onChange={onChange}
        />
        <ValidationError prefix="Name" field="name" errors={state.errors} />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-primary text-textPrimary font-primary"
          value={feedback.email}
          onChange={onChange}
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />

        <select
          name="type"
          className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-primary text-textPrimary font-primary"
          value={feedback.type}
          onChange={onChange}
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
          onChange={onChange}
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />

        <button
          type="submit"
          disabled={state.submitting}
          className="w-full px-4 py-2 text-white bg-primary rounded-full font-primary hover:bg-primaryDark transition"
        >
          Submit Feedback
        </button>
      </form>
    </section>
  );
};

export default FeedbackForm;
