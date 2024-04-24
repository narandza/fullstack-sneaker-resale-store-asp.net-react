import styles from "./ProductImageCollection.module.scss";
import { useState, useRef } from "react";

import { BiZoomIn, BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { getPath } from "../../utils/apiUtilis";
import { ImageModal } from "../Modal/Modals";

interface IProductImageCollection {
  images: string[];
}

function ProductImageCollection({ images }: IProductImageCollection) {
  const iconSize = "1.5em";
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modal, setModal] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const scrollToImage = (index: number) => {
    if (imageContainerRef.current) {
      const imageWidth = imageContainerRef.current.clientWidth;
      imageContainerRef.current.scrollTo({
        left: index * imageWidth,
        behavior: "smooth",
      });
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      scrollToImage(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
      scrollToImage(currentIndex + 1);
    }
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];

    if (touch && imageContainerRef.current) {
      const imageWidth = imageContainerRef.current.clientWidth;
      const newIndex = Math.floor(
        imageContainerRef.current.scrollLeft / imageWidth
      );
      setCurrentIndex(Math.max(0, Math.min(newIndex, images.length - 1)));
    }
  };

  const handleShowImage = (image: string) => {
    setModalImage(image);
    setModal(true);
  };

  return (
    <div className={styles.imageCollection}>
      <div
        className={styles.collectionImages}
        ref={(el) => (imageContainerRef.current = el)}
        onTouchMove={handleTouchMove}
      >
        {images.map((image, index) => (
          <div
            className={
              index === 0 ? styles.firstImageContainer : styles.imageContainer
            }
            key={index}
          >
            <span
              className={styles.imageZoomInBtn}
              onClick={() => {
                handleShowImage(getPath(image));
              }}
            >
              <BiZoomIn size={iconSize} className={styles.zoomInBtn} />
            </span>
            <img
              src={getPath(image)}
              alt={`${index + 1}`}
              className={index === 0 ? styles.firstImage : styles.image}
            />
          </div>
        ))}
      </div>
      <div className={styles.imageController}>
        <div className={styles.imageController}>
          <div
            className={`${styles.controllerArrow} ${
              currentIndex === 0 ? styles.disabled : ""
            }`}
            onClick={handlePrevious}
          >
            <BiChevronLeft size={iconSize} />
          </div>
          <div className={styles.controllerCounter}>{`${currentIndex + 1}/${
            images.length
          }`}</div>
          <div
            className={`${styles.controllerArrow} ${
              currentIndex === images.length - 1 ? styles.disabled : ""
            }`}
            onClick={handleNext}
          >
            <BiChevronRight size={iconSize} />
          </div>
        </div>
      </div>
      <ImageModal
        isOpen={modal}
        image={modalImage}
        onClose={() => {
          setModal(!modal);
        }}
      />
    </div>
  );
}

export default ProductImageCollection;
