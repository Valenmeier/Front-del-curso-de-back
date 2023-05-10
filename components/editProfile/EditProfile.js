import React from "react";
import ImageDragDrop from "../common/imageDrop/ImageDragDrop";
import Styles from "./editProfile.module.css";

const EditProfile = () => {
  let handleImageDrop = (imageFile) => {
    console.log("Imagen cargada", imageFile);
  };
  return (
    <section className={Styles.infoContainer}>
      <div className={Styles.profileImage}>
        <ImageDragDrop onImageDrop={handleImageDrop} />
      </div>
    </section>
  );
};

export default EditProfile;
