import { useNavigate, useParams } from "react-router-dom";
import styles from "./AddNewPage.module.scss";
import { BiArrowBack } from "react-icons/bi";
import {
  Checkbox,
  FormInput,
  TextArea,
} from "../../../components/FormInput/FormInput";
import React, { useEffect, useState } from "react";
import { validateInputOnBlur } from "../../../utils/userUtilis";
import MainButton from "../../../components/Button/Button";
import api from "../../../api/apiService";
import { toast } from "react-toastify";
import { IBrand } from "../../../interfaces/IBrand";
import {
  addNewBrandFormInputs,
  addNewRoleFormInputs,
  addNewSneakerFormInputs,
  addNewStaffFormInputs,
} from "../../../constants/addNewFormInputs";
import { userInputsType } from "../../../constants/userInputs";
import { UseCases } from "../../../constants/UseCases";
import { IRole } from "../../../interfaces/IRole";
import useImageUpload from "../../../utils/imageUpload";
import { sizesUS } from "../../../constants/sizes";

function AddNewPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const heading = `add new ${category?.slice(0, -1)}`;
  const handleBack = () => {
    navigate(-1);
  };
  const [formValues, setFormValues] = useState({});
  const [formError, setFormError] = useState("");
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [roles, setRoles] = useState<IRole[]>([]);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | null>
  >({});
  const hasValidationErrors = Object.values(validationErrors).some(
    (error) => error !== ""
  );

  const inputs: userInputsType = (() => {
    switch (category) {
      case "brands":
        return addNewBrandFormInputs;
      case "sneakers":
        return addNewSneakerFormInputs;
      case "users":
        return addNewStaffFormInputs;
      case "roles":
        return addNewRoleFormInputs;
    }
    return [];
  })();

  const getBrands = async () => {
    try {
      const response = await api.get("/brands");
      if (response.status === 200) {
        setBrands(response.data.items);
      } else {
        setBrands([]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getRoles = async () => {
    try {
      const response = await api.get("/roles", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        setRoles(response.data.items);
      } else {
        setRoles([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBrands();
    getRoles();
    console.log(formValues);
  }, [formValues]);

  // IMAGE UPLOAD LOGIC

  const { image, handleImageUpload } = useImageUpload();

  // ROLE

  const mandatoryUseCases = UseCases.filter((useCase) => useCase.mandatory).map(
    (useCase) => useCase.id
  );

  const [roleUseCases, setRoleUseCases] = useState<number[]>(mandatoryUseCases);
  const [checkedSizes, setCheckedSizes] = useState<number[]>([]);

  const handleCheckChange = (checkedItems: number[]) => {
    if (category === "roles") {
      setRoleUseCases(checkedItems);
      setFormValues({
        ...formValues,
        RoleUseCaseIds: checkedItems,
      });
    }
    if (category === "sneakers") {
      setCheckedSizes(checkedItems);
      setFormValues({
        ...formValues,
        sizes: checkedItems,
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (category === "users") {
      if (
        name === "streetAddress" ||
        name === "city" ||
        name === "postalCode"
      ) {
        setFormValues((prevValues: any) => ({
          ...prevValues,
          address: {
            ...prevValues.address,
            [name]: value,
          },
        }));
      } else if (name === "email") {
        setFormValues((prevValues: any) => ({
          ...prevValues,
          [name]: value + "@pairun.com",
        }));
      } else {
        setFormValues((prevValues: any) => ({
          ...prevValues,
          [name]: value,
        }));
      }
    } else {
      setFormValues((prevValues: any) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    validateInputOnBlur(name, value, inputs, setValidationErrors);
  };

  const [sneakerImages, setSneakerImages] = useState<string[]>([]);
  const [displaySneakerImages, setDisplaySneakerImages] = useState([""]);

  const handleSneakerImagesUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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
        setSneakerImages((prevImages) => [
          ...prevImages,
          ...images.map((image) => image.split(",")[1]),
        ]);

        setDisplaySneakerImages(images);
      } catch (error) {
        console.error("Error reading files:", error);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // if (hasValidationErrors) {
    //   setFormError("Please fix the errors in the form before submitting.");
    //   return;
    // }

    console.log(formValues);
    setFormError("");

    const isEmptyObject = Object.keys(formValues).length === 0;

    if (isEmptyObject) {
      setFormError("Please fill in the form to countine");
      return;
    }

    if (category === "sneakers") {
      if (!sneakerImages) {
        setFormError("Please upload snekaer images.");
        return;
      }
      const stringSizes = checkedSizes.map(String);
      setFormValues({
        ...formValues,
        sizes: stringSizes,
        images: sneakerImages,
      });
    }

    try {
      const response = await api.post(`/${category}`, formValues, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 201) {
        toast.success("Success.", {
          onClose: () => navigate(-1),
        });
      } else if (response.status === 401) {
        navigate("/login", { state: "Session expired,please log in again" });
      } else {
        toast.error("An error has occured. Please try again later.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className={styles.addNew}>
      <div className={styles.backButton} onClick={handleBack}>
        <BiArrowBack />
        {heading}
      </div>
      <div className={styles.dataEntry}>
        <form className={styles.dataForm} onSubmit={handleSubmit}>
          {inputs &&
            inputs.map((item, index) => (
              <div className={styles.formItem} key={index}>
                <label className={styles.dataLabel}>{item.placeholder}:</label>
                {item.type === "textarea" ? (
                  <TextArea
                    name={item.name}
                    placeholder={item.placeholder}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                ) : item.type === "file" ? (
                  <div className={styles.imageUploadContainer}>
                    <FormInput
                      type={item.type}
                      name={item.name}
                      onChange={(e) => {
                        console.log("Category:", category);
                        console.log("Handling change...");
                        category === "sneakers"
                          ? handleSneakerImagesUpload(e)
                          : handleImageUpload(e, setFormValues);
                      }}
                      onBlur={handleBlur}
                      multiple={category === "sneakers"}
                    />

                    <div className={styles.imageContainer}>
                      {category === "sneakers"
                        ? displaySneakerImages &&
                          displaySneakerImages.map((image, index) =>
                            image !== "" ? (
                              <img
                                src={image}
                                alt={`sneaker${index}`}
                                key={index + 90210}
                                width={120}
                              />
                            ) : (
                              <></>
                            )
                          )
                        : image && (
                            <img
                              src={image as string}
                              alt=" preview"
                              width={200}
                            />
                          )}
                    </div>
                  </div>
                ) : item.type === "select" ? (
                  <select
                    className={styles.dropDown}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name={item.name}
                  >
                    <option value={0}>Select...</option>
                    {category === "sneakers" &&
                      brands?.map((brand, index) => (
                        <option value={brand.id} key={index}>
                          {brand.name}
                        </option>
                      ))}
                    {category === "users" &&
                      roles
                        ?.filter((role) => role.name !== "Customer")
                        .map((role, index) => (
                          <option value={role.id} key={index}>
                            {role.name}
                          </option>
                        ))}
                  </select>
                ) : item.type === "checkbox" ? (
                  <Checkbox
                    name={item.name}
                    placeholder={item.placeholder}
                    options={category === "sneakers" ? sizesUS : UseCases}
                    checkedValues={
                      category === "sneakers" ? checkedSizes : roleUseCases
                    }
                    onCheckChange={handleCheckChange}
                  />
                ) : item.name === "email" && category === "users" ? (
                  <div className={styles.userName}>
                    <FormInput
                      type={item.type}
                      name={item.name}
                      placeholder={item.placeholder}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <span className={styles.emailExtension}>@pairun.com</span>
                  </div>
                ) : (
                  <FormInput
                    type={item.type}
                    name={item.name}
                    placeholder={item.placeholder}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                )}
                <span className={styles.itemError}>
                  {validationErrors[item.name]}
                </span>
              </div>
            ))}
          <div className={styles.submitButtonContainer}>
            <span className={styles.formError}>{formError}</span>
            <MainButton
              type="submit"
              text={` ${heading}`}
              className={styles.submitButton}
              // disabled={hasValidationErrors}
            />
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddNewPage;
