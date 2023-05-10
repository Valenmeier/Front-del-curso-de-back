import GeneralLayout from "@/components/common/Layout/GeneralLayout";
import Authorized from "@/components/common/authorized/authorized";
import EditProfile from "@/components/editProfile/EditProfile";
import React from "react";

const editProfile = () => {
  return (
    <GeneralLayout>
      <Authorized>
        <EditProfile />
      </Authorized>
    </GeneralLayout>
  );
};

export default editProfile;
