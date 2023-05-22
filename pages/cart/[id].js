import React from "react";

import GeneralLayout from "@/components/common/Layout/GeneralLayout";
import Authorized from "@/components/common/authorized/authorized";

import CartComponent from "@/components/cartComponent/CartComponent";

const CartId = () => {
  return (
    <GeneralLayout>
      <Authorized>
        <CartComponent />
      </Authorized>
    </GeneralLayout>
  );
};

export default CartId;
