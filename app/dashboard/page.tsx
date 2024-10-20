import React from "react";
import AuthWrapper from "../components/AuthWrapper";
import Dashboard from "./dashboard";

const DashboardPage = () => {
  return (
    <AuthWrapper>
      <Dashboard />
    </AuthWrapper>
  );
};

export default DashboardPage;
