import { useState } from "react";
import { addNewBrandFormInputs } from "../../../constants/addNewFormInputs";
import { IBrand } from "../../../interfaces/IBrand";
import { FormInput, TextArea } from "../../FormInput/FormInput";
import styles from "./EditItem.module.scss";
import { IImage, tempImage } from "../../../interfaces/IImage";
import MainButton from "../../Button/Button";
import {
  hasValidationErrors,
  validateInputOnBlur,
} from "../../../utils/userUtilis";
import api from "../../../api/apiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getPath } from "../../../utils/apiUtilis";

interface IEditBrand {
  brand: IBrand;
}

interface IEditBrand {
  brand: IBrand;
}

function EditBrand({ brand }: IEditBrand) {
  const [formData, setFormData] = useState<IBrand>({
    id: brand.id,
    name: brand.name,
    description: brand.description,
    logo: { ...brand.logo },
  });

  const [newLogo, setNewLogo] = useState<IImage | undefined | null>(null);

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | null>
  >({});
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    validateInputOnBlur(
      name,
      value,
      addNewBrandFormInputs,
      setValidationErrors
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectFile = e.target.files ? e.target.files[0] : null;
    const reader = new FileReader();

    if (selectFile) {
      reader.readAsDataURL(selectFile);
      reader.onload = () => {
        setNewLogo({
          id: brand.logo.id,
          extension: brand.logo.extension,
          path: reader.result as string,
        });
        setFormData((prevData) => ({
          ...prevData,
          logo: tempImage,
        }));
      };
    }
  };

  const getUpdatedData = (): any => {
    const updatedData: any = {
      name: formData.name,
      description: formData.description,
    };

    if (newLogo) {
      updatedData.logoPath = newLogo.path.split(",")[1];
    }

    return updatedData;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const hasErrors = hasValidationErrors(validationErrors);

    if (hasErrors) {
      setFormError("Please fix the errors in the form before submitting.");
      return;
    }

    const brandData = getUpdatedData();

    try {
      const response = await api.put(`/brands/${brand.id}`, brandData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.status === 200) {
        toast.success(`Item updated.`, {
          onClose: () => {
            navigate("/dashboard/brands");
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={styles.updateForm} onSubmit={handleSubmit}>
      {addNewBrandFormInputs.map((input, index) => (
        <div className={styles.formItem} key={index}>
          <label>{input.placeholder}</label>
          {input.type === "textarea" ? (
            <TextArea
              name={input.name}
              value={formData["description"]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          ) : input.name === "logoPath" ? (
            <div className={styles.imageUploadContainer}>
              <FormInput
                type={input.type}
                name={input.name}
                onChange={(e) => {
                  handleChange(e);
                  handleImageUpload(e);
                }}
              />

              <div className={styles.imageContainer}>
                {newLogo ? (
                  <img
                    src={newLogo.path}
                    alt="New Logo Preview"
                    className={styles.imagePreview}
                  />
                ) : (
                  <img
                    src={getPath(formData.logo.path)}
                    alt="Old Logo"
                    className={styles.imagePreview}
                  />
                )}
              </div>
            </div>
          ) : (
            <FormInput
              type={input.type}
              name={input.name}
              value={formData["name"]}
              onChange={(e) => {
                handleChange(e);
              }}
              onBlur={handleBlur}
            />
          )}
          <span className={styles.inputError}>
            {validationErrors[input.name]}
          </span>
        </div>
      ))}
      <div className={styles.formButton}>
        <span className={styles.inputError}>{formError}</span>
        <MainButton text="Update" type="submit" />
      </div>
    </form>
  );
}

export default EditBrand;
