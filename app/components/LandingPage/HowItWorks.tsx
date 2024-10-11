import React from "react";

const steps = [
  {
    heading: "Step 1: Create Your Profile",
    subheading:
      "Get started by creating a personalized profile to find the best workout partners.",
    imageUrl: "/howItWorks/step1.jpg",
  },
  {
    heading: "Step 2: Match with Partners",
    subheading:
      "Our algorithm matches you with fitness partners based on your goals and preferences.",
    imageUrl: "/howItWorks/step2.jpg",
  },
  {
    heading: "Step 3: Start Your Fitness Journey",
    subheading:
      "Connect, schedule, and work out together. Achieve your goals with a supportive partner.",
    imageUrl: "/howItWorks/step3.jpg",
  },
];

const HowItWorks: React.FC = () => {
  return (
    <div className="bg-primary/10 py-16">
      <h2 className="text-center text-textPrimary text-h2 font-bold font-primary leading-[57.50px] pb-8">
        How It Works
      </h2>
      <div className="flex flex-col items-center space-y-12">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            } items-center md:justify-between max-w-6xl mx-auto`}
          >
            {/* Image */}
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src={step.imageUrl}
                alt={step.heading}
                className="w-3/4 md:w-full h-auto rounded-full"
              />
            </div>

            {/* Text */}
            <div className="w-full md:w-1/2 px-6 md:px-12 mt-8 md:mt-0 text-center md:text-left">
              <h3 className="text-h3 font-bold text-textPrimary font-primary mb-4">
                {step.heading}
              </h3>
              <p className="text-lg text-textSecondary font-medium font-primary">
                {step.subheading}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
