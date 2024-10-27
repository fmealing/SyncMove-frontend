// TODO: Replace this version with the actual version once I get it from the law student

"use client";
import React from "react";
import { FaBackward } from "react-icons/fa";

const TermsAndConditions: React.FC = () => {
  return (
    <div className="min-h-screen bg-lightGray flex flex-col items-center py-10 px-6">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8 space-y-6">
        <h1 className="text-h1 font-primary font-bold text-textPrimary text-center mb-4">
          Terms and Conditions
        </h1>

        <section className="space-y-4">
          <h2 className="text-xl font-primary font-semibold text-textPrimary">
            0. Zero Dilly Dallying
          </h2>
          <p className="text-textSecondary text-base font-primary">
            The user agrees to not participate in any activity that can be
            viewed as "dallying" or being a "silly goose".
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-primary font-semibold text-textPrimary">
            1. Introduction
          </h2>
          <p className="text-textSecondary text-base font-primary">
            Welcome to SyncMove. By creating an account and accessing our
            services, you agree to these Terms and Conditions. Please read them
            carefully to understand your rights and obligations.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-primary font-semibold text-textPrimary">
            2. Account Registration
          </h2>
          <p className="text-textSecondary text-base font-primary">
            You agree to provide accurate and complete information when
            registering an account with us. You are responsible for keeping your
            account secure and notifying us of any unauthorized use.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-primary font-semibold text-textPrimary">
            3. Privacy Policy
          </h2>
          <p className="text-textSecondary text-base font-primary">
            Your privacy is important to us. By using SyncMove, you consent to
            our collection and use of personal information as outlined in our
            Privacy Policy.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-primary font-semibold text-textPrimary">
            4. Use of Services
          </h2>
          <p className="text-textSecondary text-base font-primary">
            You agree to use our platform responsibly and avoid any activity
            that could harm SyncMove or other users. Prohibited uses include
            unauthorized data collection, account sharing, and disruptive
            behavior.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-primary font-semibold text-textPrimary">
            5. Intellectual Property
          </h2>
          <p className="text-textSecondary text-base font-primary">
            All content on SyncMove, including text, graphics, and logos, is
            owned by or licensed to SyncMove. You may not reproduce, distribute,
            or otherwise use our content without permission.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-primary font-semibold text-textPrimary">
            6. Termination of Account
          </h2>
          <p className="text-textSecondary text-base font-primary">
            We reserve the right to suspend or terminate accounts that violate
            these Terms. You may also close your account at any time by
            contacting support.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-primary font-semibold text-textPrimary">
            7. Limitation of Liability
          </h2>
          <p className="text-textSecondary text-base font-primary">
            SyncMove provides its services as-is, without warranties of any
            kind. We are not liable for any damages or losses arising from your
            use of our platform.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-primary font-semibold text-textPrimary">
            8. Amendments
          </h2>
          <p className="text-textSecondary text-base font-primary">
            We may update these Terms from time to time. We will notify users of
            significant changes. Continued use of SyncMove constitutes
            acceptance of the updated terms.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-primary font-semibold text-textPrimary">
            9. Contact Information
          </h2>
          <p className="text-textSecondary text-base font-primary">
            For questions regarding these Terms, please contact us at
            florianmealing@gmail.com
          </p>
        </section>

        <button
          onClick={() => window.history.back()}
          className="mt-8 px-4 py-2 bg-primary text-white rounded-full font-semibold hover:bg-primaryDark transition flex items-center justify-center gap-2"
        >
          <FaBackward />
          Back to Signup
        </button>
      </div>
    </div>
  );
};

export default TermsAndConditions;
