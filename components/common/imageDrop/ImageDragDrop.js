import React, { useCallback, useState } from "react";
import Styles from "./ImageDragDrop.module.css";

const ImageDragDrop = ({ onImageDrop }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [imageURL, setImageURL] = useState("");

  const handleRemoveImage = () => {
    setImageURL("");
    onImageDrop(null);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length) {
      const imageFile = files[0];
      if (imageFile.type.startsWith("image/")) {
        onImageDrop(imageFile);
        setImageURL(URL.createObjectURL(imageFile));
      } else {
        alert("Por favor, sube solamente imágenes.");
      }
    }
  };

  const handleFileInput = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile.type.startsWith("image/")) {
      onImageDrop(imageFile);
      setImageURL(URL.createObjectURL(imageFile));
    } else {
      alert("Por favor, sube solamente imágenes.");
    }
  };

  return (
    <div
      className={`${Styles.dropArea} ${isDragOver ? Styles.dragOver : ""}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        className={Styles.fileInput}
        onChange={handleFileInput}
      />
      {imageURL ? (
        <>
          <img className={Styles.uploadedImage} src={imageURL} alt="Uploaded" />
          <button className={Styles.removeButton} onClick={handleRemoveImage}>
            &times;
          </button>
        </>
      ) : (
        <p>
          Haz clic aquí para subir la imagen
          <br />o arrastra el archivo
        </p>
      )}
    </div>
  );
};

export default ImageDragDrop;
