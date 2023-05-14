import Styles from "./styles.module.css";
import Image from "next/image";
import Link from "next/link";
import { useData } from "@/context/dataContext";
import Loader from "@/components/loader/Loader";
import { ProfileButtons } from "@/components/common/profileButtons/ProfileButtons";
import { preload } from "swr";

const Index = () => {
  let user = useData();
  if (user.isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className={Styles.videoFondo}>
        <video
          autoPlay
          loop
          onLoad={preload}
          muted
          src="https://res.cloudinary.com/dyjpscesp/video/upload/v1683766011/fondoInicio_p1bm2i.mp4"
        ></video>
      </div>
      <div className={Styles.homeContainer}>
        <div className={Styles.imageContainer}>
          <Image
            src="/images/logo.png"
            priority="true"
            fill
            sizes="(max-width: 768px) 10vw,
                        (max-width: 1200px) 50vw,
                        33vw"
            alt="Logo"
          />
        </div>
        <div className={Styles.bienvenida}>
          <h1>
            {user.userData?.response === "usuario no encontrado"
              ? "Bienvenido a MeierCommerce"
              : `Bienvenido ${user.userData?.response.response.user}`}
          </h1>
          <Link href="/products">Ver productos</Link>
        </div>
      </div>
      {user.userData?.response === "usuario no encontrado" ? (
        ``
      ) : (
        <ProfileButtons />
      )}
    </>
  );
};

export default Index;
