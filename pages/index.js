import GeneralLayout from "@/components/common/Layout/GeneralLayout";
import HomeContainer from "@/components/home/HomeContainer/index";

export default function Home() {
  return (
    <>
      <GeneralLayout title="Inicio - MeierCommerce">
        <HomeContainer />
      </GeneralLayout>
    </>
  );
}
