import Link from "next/link";
import React from "react";

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <section className="pb-20">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-semibold text-textPrimary font-primary">
        {title}
      </h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{children}</div>
  </section>
);

export default Section;
