"use client";
import React from "react";

// Styles for the spinner animation
const styles = {
  container: `flex items-center justify-center h-screen bg-lightGray`,
  spinnerContainer: `relative w-64 h-64`,
  spinner: `absolute top-0 left-0 w-full h-full border-8 border-t-primary border-secondary rounded-full animate-spin`,
  logo: `absolute inset-0 h-20 m-auto`,
  text: `text-primary text-xl mt-6 font-primary animate-pulse`,
};

const LoadingScreen: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className="flex flex-col items-center justify-center">
        {/* Spinner and Logo */}
        <div className={styles.spinnerContainer}>
          <div className={styles.spinner}></div>
          <img src="/logo.png" alt="Logo" className={styles.logo} />
        </div>

        {/* Loading Text */}
        <p className={styles.text}>Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
