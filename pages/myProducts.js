import GeneralLayout from "@/components/common/Layout/GeneralLayout";
import AuthorizedPremium from "@/components/common/authorizedPremium/authorizedPremium";
import MyProducts from "@/components/products/myProducts/MyProducts";
import React from "react";

const myProducts = () => {
  return (
    <GeneralLayout>
      <AuthorizedPremium>
        <MyProducts />
      </AuthorizedPremium>
    </GeneralLayout>
  );
};

export default myProducts;
