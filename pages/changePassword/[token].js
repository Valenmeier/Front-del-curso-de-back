import GeneralLayout from "@/components/common/Layout/GeneralLayout";
import { useRouter } from "next/router";
import TokenSection from "@/components/session/changePassword/token";

const Token = () => {
  const router = useRouter();
  const { token } = router.query;
  return (
    <GeneralLayout>
      <TokenSection token={token} />
    </GeneralLayout>
  );
};

export default Token;
