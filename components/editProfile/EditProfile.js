import React, { useState } from "react";
import ImageDragDrop from "../common/imageDrop/ImageDragDrop";
import Styles from "./editProfile.module.css";
import { useData } from "@/context/dataContext"; 
import { useRouter } from "next/router"; 

const EditProfile = () => {
  const [image, setImage] = useState(null);
  const dataUserCurrent = useData(); 
  const router = useRouter(); 

  const handleImageDrop = (imageFile) => {
    setImage(imageFile);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("profile_image", image);

    try {
      const response = await fetch("/api/uploadImportantDocument", {
        
        method: "POST",
        headers: {
          token: dataUserCurrent.token,
          uid: dataUserCurrent.userData.response.response.userId,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.status === 200) {
        router.reload(); 
      } else {
        console.error("Error al subir la imagen:", data.response);
      }
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  };

  return (
    <section className={Styles.infoContainer}>
      <div className={Styles.profileImage}>
        <ImageDragDrop onImageDrop={handleImageDrop} />
      </div>
      {image ? <button onClick={handleUpload}>Subir</button> : ""}
    </section>
  );
};

export default EditProfile;
