import GeneralLayout from "@/components/common/Layout/GeneralLayout";
import Authorized from "@/components/common/authorized/authorized";
import CompleteProfile from "@/components/profile/completeProfile/CompleteProfile";

import React from "react";

const profile = () => {
  return (
    <GeneralLayout>
      <Authorized>
        <CompleteProfile />
      </Authorized>
    </GeneralLayout>
  );
};

export default profile;
