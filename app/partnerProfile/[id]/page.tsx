import React from "react";
import AuthWrapper from "@/app/components/AuthWrapper";
import PartnerProfile from "./partnerProfile";

const PartnerProfilePage = ({ params }: { params: { id: string } }) => {
  return (
    <AuthWrapper>
      <PartnerProfile params={params} />
    </AuthWrapper>
  );
};

export default PartnerProfilePage;
