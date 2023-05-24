import AdminComponent from "@/components/admin/AdminComponent";
import GeneralLayout from "@/components/common/Layout/GeneralLayout";
import AuthorizedAdmin from "@/components/common/authorizedAdmin/authorizedAdmin";
import React from "react";

const panelAdmin = () => {
  return (
    <GeneralLayout>
      <AuthorizedAdmin>
        <AdminComponent />
      </AuthorizedAdmin>
    </GeneralLayout>
  );
};

export default panelAdmin;
