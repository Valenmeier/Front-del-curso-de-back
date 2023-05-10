import GeneralLayout from "@/components/common/Layout/GeneralLayout";
import Authorized from "@/components/common/authorized/authorized";
import Profile from "@/components/profile/Profile";

import React from "react";

const profile = () => {
  return (
    <GeneralLayout>
      <Authorized>
        <Profile />
      </Authorized>
    </GeneralLayout>
  );
};

export default profile;
