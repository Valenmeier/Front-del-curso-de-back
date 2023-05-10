import GeneralLayout from "@/components/common/Layout/GeneralLayout";
import Authorized from "@/components/common/authorized/authorized";

const chat = () => {
  return <GeneralLayout>
    <Authorized>
      <div>Chat</div>
    </Authorized>
  </GeneralLayout>;
};

export default chat;
