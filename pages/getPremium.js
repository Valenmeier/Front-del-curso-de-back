import GeneralLayout from "@/components/common/Layout/GeneralLayout";
import Authorized from "@/components/common/authorized/authorized";
import GetPremium from "@/components/premium/GetPremium";
import React from "react";

const getPremium = () => {
  return (
    <GeneralLayout>
      <Authorized>
        <GetPremium />
      </Authorized>
    </GeneralLayout>
  );
};

export default getPremium;
