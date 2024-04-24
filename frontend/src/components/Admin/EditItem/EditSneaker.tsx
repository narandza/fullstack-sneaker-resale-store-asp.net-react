import { useEffect, useState } from "react";
import { addNewSneakerFormInputs } from "../../../constants/addNewFormInputs";
import { ISneakerAdmin } from "../../../interfaces/ISneaker";
import { Checkbox, FormInput, TextArea } from "../../FormInput/FormInput";
import styles from "./EditItem.module.scss";
import { sizesUS } from "../../../constants/sizes";
import MainButton from "../../Button/Button";
import { getBrands } from "../../../utils/sneakerUtils";
import { IBrand } from "../../../interfaces/IBrand";
import { getPath } from "../../../utils/apiUtilis";
import api from "../../../api/apiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface IEditSneaker {
  sneaker: ISneakerAdmin;
}

function EditSneaker({ sneaker }: IEditSneaker) {
  const navigate = useNavigate();
  const [sneakerData, setSneakerData] = useState({
    id: sneaker.id,
    model: sneaker.model,
    colorway: sneaker.colorway,
    price: sneaker.price,
    releaseDate: sneaker.releaseDate,
    brand: { ...sneaker.brand },
    images: sneaker.images,
    sizes: sneaker.sizes,
    description: sneaker.description,
  });
  const [imagesBase64, setImagesBase64] = useState<string[]>([]);
  const [displayImages, setDisplayImages] = useState([""]);
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [checkedSizes, setCheckedSizes] = useState<number[]>(
    sizesUS
      .filter((size) => sneaker.sizes.includes(size.name))
      .map((size) => size.id)
  );

  useEffect(() => {
    const fetchBrands = async () => {
      const brands = await getBrands();
      setBrands(brands);
    };

    fetchBrands();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImages = e.target.files;

    if (selectedImages) {
      const fileReaders = Array.from(selectedImages).map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve(reader.result?.toString() || "");
          };
          reader.readAsDataURL(file);
        });
      });

      try {
        const images = await Promise.all(fileReaders);
        setImagesBase64((prevImages) => [
          ...prevImages,
          ...images.map((image) => image.split(",")[1]),
        ]);

        setDisplayImages(images);
      } catch (error) {
        console.error("Error reading files:", error);
      }
    }
  };

  const handleCheck = (checkedItems: number[]) => {
    setCheckedSizes(checkedItems);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSneakerData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const stringSizes = checkedSizes.map((size) => {
      return `${size}`;
    });

    interface RequestDataWithoutImages {
      id: number;
      model: string;
      colorway: string;
      price: number;
      description: string;
      releaseDate: string;
      brandId: number;
      sizes: string[];
    }

    interface RequestDataWithImages extends RequestDataWithoutImages {
      images: string[];
    }
    type RequestData = RequestDataWithoutImages | RequestDataWithImages;

    let requestData: RequestData = {
      id: sneakerData.id,
      model: sneakerData.model,
      colorway: sneakerData.colorway,
      price: sneakerData.price,
      description: sneakerData.description,
      releaseDate: sneakerData.releaseDate,
      brandId: sneakerData.brand.id,
      sizes: stringSizes,
    };

    if (imagesBase64.length > 0) {
      requestData = {
        ...requestData,
        images: imagesBase64,
      };
    }

    console.log(requestData);

    try {
      const request = await api.put(`/sneakers/${sneaker.id}`, requestData);

      if (request.status === 201) {
        toast.success("Sneaker updated, successfuly.", {
          onClose: () => {
            navigate("/dashboard/sneakers");
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={styles.updateForm} onSubmit={handleSubmit}>
      {addNewSneakerFormInputs.map((input, index) => (
        <div className={styles.formLabel} key={index}>
          <label className={styles.label}>{input.placeholder}</label>
          {input.type === "textarea" ? (
            <TextArea
              value={sneakerData.description}
              name={input.name}
              onChange={handleChange}
            />
          ) : input.type === "select" && input.name === "brandId" ? (
            <select name={input.name} value={sneakerData.brand.name}>
              <option value={sneakerData.brand.id}>
                {sneakerData.brand.name}
              </option>
              {brands &&
                brands.map((brand) => (
                  <option value={brand.id} key={brand.id}>
                    {brand.name}
                  </option>
                ))}
            </select>
          ) : input.type === "file" ? (
            <div className={styles.sneakerImages}>
              <div className={styles.uploadedImages}>
                <p>Current sneaker images</p>
                <div className={styles.uploadedImagesContainer}>
                  {sneakerData.images.map((image, index) => (
                    <img
                      className={styles.uploadedImage}
                      src={getPath(image)}
                      alt={sneakerData.model + index}
                      key={index}
                    />
                  ))}
                </div>
              </div>
              <div className={styles.reuploadImages}>
                <div className={styles.disclamer}>
                  <p className={styles.disclamerExlemation}>!</p>
                  <p>
                    When modifying sneaker images, it is imperative to upload
                    all images anew. Whether adding or removing images, ensure
                    that the entire set of images is re-uploaded to accurately
                    reflect the desired changes.
                  </p>
                </div>
                <FormInput
                  type={input.type}
                  name={input.name}
                  multiple
                  onChange={handleImageUpload}
                />
                <div className={styles.uploadedImages}>
                  <p>New sneaker images</p>
                  <div className={styles.uploadedImagesContainer}>
                    {displayImages &&
                      displayImages.map((image, index) =>
                        image !== "" ? (
                          <img
                            className={styles.uploadedImage}
                            src={image}
                            alt={sneakerData.model + index}
                            key={index + 90210}
                          />
                        ) : (
                          <p className={styles.msg}>
                            New images will be shown here.
                          </p>
                        )
                      )}
                  </div>
                </div>
              </div>
            </div>
          ) : input.type === "checkbox" ? (
            <Checkbox
              name={input.name}
              options={sizesUS}
              checkedValues={checkedSizes}
              onCheckChange={handleCheck}
            />
          ) : (
            <FormInput
              type={input.type}
              name={input.name}
              value={sneakerData[input.name as keyof ISneakerAdmin]}
              onChange={handleChange}
            />
          )}
          <span className={styles.inputError}></span>
        </div>
      ))}
      <div className={styles.formButton}>
        <span className={styles.inputError}></span>
        <MainButton text="Update" type="submit" />
      </div>
    </form>
  );
}

export default EditSneaker;
