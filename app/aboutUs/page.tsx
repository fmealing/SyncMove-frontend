"use client";
import Link from "next/link";
import React from "react";
import {
  FaGlobe,
  FaHandshake,
  FaHeart,
  FaLinkedin,
  FaTwitter,
  FaUsers,
} from "react-icons/fa";
import SEO from "../components/SEO";

const AboutUsPage: React.FC = () => {
  return (
    <>
      <SEO
        title="About SyncMove | Find Workout Partners Near You"
        description="Learn more about SyncMove, our mission to connect fitness enthusiasts, and the values that drive us."
        keywords="fitness, workout partners, SyncMove, community, inclusivity, motivation"
      />
      <div className="about-background flex flex-col items-center w-full min-h-screen p-8 space-y-16">
        {/* Introduction Section */}
        <section className="about-content text-center max-w-3xl space-y-4 pb-10">
          <h1 className="text-h1 font-primary font-semibold text-white">
            About SyncMove
          </h1>
          <p className="text-lg text-lightGray font-primary">
            SyncMove is built to help fitness enthusiasts find and connect with
            local workout partners. We believe that achieving your fitness goals
            is easier when you're part of a supportive community.
          </p>
        </section>

        {/* Founder Section */}
        <section className="about-content relative w-full max-w-lg bg-white rounded-lg shadow-lg p-10 text-center space-y-6">
          <div className="relative w-56 h-56 rounded-full bg-white border-4 border-primary shadow-lg mx-auto -mt-28">
            <img
              src="/avatars/avatar-developer.jpg"
              alt="Florian Mealing"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="mt-16">
            <h2 className="text-h2 font-primary font-semibold text-primary">
              Florian Mealing
            </h2>
            <p className="text-textSecondary font-primary">
              Founder & Developer
            </p>
            <p className="text-textPrimary font-primary mt-4">
              With a passion for technology and fitness, I started SyncMove to
              bring people together through shared fitness goals. My goal is to
              make it easier for people to find workout partners who can
              motivate and support each other on their fitness journeys.
            </p>
            {/* Social Links */}
            <div className="flex justify-center gap-4 mt-6">
              <a
                href="https://www.linkedin.com/in/florian-mealing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primaryDark transition"
              >
                <FaLinkedin size={32} />
              </a>
              <a
                href="https://www.linkedin.com/in/florian-mealing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primaryDark transition"
              >
                <FaTwitter size={32} />
              </a>
            </div>
          </div>
        </section>

        {/* Vision and Values Section */}
        <section className="about-content relative w-full max-w-2xl bg-[#00254c] rounded-lg p-10 text-center shadow-md">
          <div className="flex justify-center gap-6 mb-6">
            <div className="flex flex-col items-center text-white">
              <FaGlobe size={40} />
              <p className="font-primary mt-2">Inclusivity</p>
            </div>
            <div className="flex flex-col items-center text-white">
              <FaHeart size={40} />
              <p className="font-primary mt-2">Motivation</p>
            </div>
            <div className="flex flex-col items-center text-white">
              <FaUsers size={40} />
              <p className="font-primary mt-2">Community</p>
            </div>
          </div>
          <h2 className="text-h2 font-primary font-semibold text-white mt-4">
            Our Vision & Values
          </h2>
          <p className="text-lg text-lightGray font-primary mt-4">
            At SyncMove, we value inclusivity, motivation, and community. Our
            vision is to create a global platform where fitness enthusiasts of
            all levels can find supportive workout partners and build lasting
            connections.
          </p>
        </section>

        {/* Call to Action */}
        <section className="about-content text-center w-full max-w-xl bg-white p-10 rounded-lg shadow-lg flex flex-col items-center justify-center">
          <p className="text-lg text-textSecondary font-primary">
            Follow our journey as we work towards building a connected fitness
            community!
          </p>
          <button className="mt-4 flex items-center justify-center gap-2 bg-primary text-white font-primary text-lg px-8 py-3 rounded-full hover:bg-primaryDark transition">
            <Link
              href="/FAQ"
              className="flex items-center justify-center gap-2"
            >
              <FaHandshake size={24} />
              Connect with Us
            </Link>
          </button>
        </section>
      </div>
    </>
  );
};

export default AboutUsPage;
