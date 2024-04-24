import IUser from "../../../interfaces/IUser";
import styles from "./UserInfo.module.scss";
import MainButton from "../../Button/Button";
import { useState } from "react";
import { FormInput } from "../../FormInput/FormInput";
import {
  checkEmailUniqueness,
  setUserToLocalStorage,
  validateInputOnBlur,
} from "../../../utils/userUtilis";
import api from "../../../api/apiService";
import { ConfirmModal } from "../../Modal/Modals";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { editUserInformation } from "../../../constants/userInputs";

interface IUserInfo {
  user: IUser;
}

interface IEditUserFormData {
  firstName: string;
  lastName: string;
  email: string;
  streetAddress: string;
  city: string;
  postalCode: number;
}

const userInformation: { name: string; text: string }[] = [
  {
    name: "firstName",
    text: "first name",
  },
  {
    name: "lastName",
    text: "last name",
  },
  {
    name: "email",
    text: "email",
  },
  {
    name: "address",
    text: "address",
  },
];

function UserInfo({ user }: IUserInfo) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem("token");
  const [editUserFormData, setEditUserFormData] = useState<IEditUserFormData>({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    streetAddress: user.address.streetAddress,
    city: user.address.city,
    postalCode: user.address.postalCode,
  });
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | null>
  >({});
  const hasValidationErrors = Object.values(validationErrors).some(
    (error) => error !== ""
  );
  const [formError, setFormError] = useState("");
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditUserFormData({
      ...editUserFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateInputOnBlur(name, value, editUserInformation, setValidationErrors);
  };

  const handleEditButton = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (hasValidationErrors) {
      setFormError("Please fix the errors in the form before submitting.");
      return;
    }

    if (editUserFormData.email !== user.email) {
      const isNewEmailUnique = editUserFormData.email
        ? await checkEmailUniqueness(editUserFormData.email)
        : false;

      if (!isNewEmailUnique) {
        setValidationErrors((prev) => ({
          ...prev,
          email:
            "email already exists. please provide a different email address.",
        }));
        return;
      }
    }

    setPasswordModalOpen(true);
  };

  const handlePasswordConfirm = async (password: string) => {
    try {
      const response = await api.post("/auth", {
        email: user.email,
        password: password,
      });

      if (response.status === 200) {
        const { token } = response.data;
        setUserToLocalStorage(token);
        setIsPasswordCorrect(true);
        setPasswordModalOpen(false);

        handleConfirm(password);
      } else if (response.status === 401) {
        setFormError("Invalid password");
        setIsPasswordCorrect(false);
        setPasswordModalOpen(false);
      }
    } catch (error: any) {
      console.error("An error occurred during authentication:", error);
    }
  };

  const handleConfirm = async (password: string) => {
    console.log(password);
    if (!token || token === null) {
      navigate("/login");
    }

    if (isPasswordCorrect) {
      setFormError("Password authentication failed.");
      return;
    }

    if (
      editUserFormData.streetAddress !== user.address.streetAddress ||
      editUserFormData.city !== user.address.city ||
      editUserFormData.postalCode !== user.address.postalCode
    ) {
      const updateUserAddressData = {
        streetAddress: editUserFormData.streetAddress,
        city: editUserFormData.city,
        postalCode: editUserFormData.postalCode,
      };

      try {
        const response = await api.put(
          `/addresses/${user.address.addressId}`,
          updateUserAddressData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 401) {
          navigate("/login");
        }
      } catch (error) {
        console.error(error);
      }
    }

    const updatedUserData = {
      firstName: editUserFormData.firstName,
      lastName: editUserFormData.lastName,
      email: editUserFormData.email,
      roleId: localStorage.getItem("userRole"),
      password: password,
    };

    try {
      const response = await api.put(`/users/${user.id}`, updatedUserData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success("Page successfully updated!", {
          onClose: () => window.location.reload(),
        });
      }
      if (response.status === 401) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.userInfo}>
      {isEditing ? (
        <div className={styles.editUser}>
          <form onSubmit={handleSubmit}>
            {editUserInformation.map((item, index) => {
              const inputValue =
                item.name === "streetAddress"
                  ? editUserFormData.streetAddress
                  : item.name === "city"
                  ? editUserFormData.city
                  : item.name === "postalCode"
                  ? String(editUserFormData.postalCode)
                  : editUserFormData[item.name as keyof IEditUserFormData];
              return (
                <div className={styles.editInfoRow} key={index}>
                  <label className={styles.editLabel}>
                    {item.placeholder}:
                  </label>
                  <FormInput
                    type={item.type}
                    value={inputValue as string}
                    name={item.name}
                    onChange={handleOnChange}
                    onBlur={handleBlur}
                  />
                  <span className={styles.inputError}>
                    {validationErrors[item.name]}
                  </span>
                </div>
              );
            })}
            <div className={styles.submitContainer}>
              <MainButton
                type="submit"
                text="update"
                className={styles.submitButton}
              />
              <span className={styles.submitError}>{formError}</span>
            </div>
          </form>
          <div className={styles.editPassword}></div>
        </div>
      ) : (
        <>
          {userInformation.map((item, index) => {
            const userValue = user[item.name as keyof IUser] || "";

            return (
              <div className={styles.infoRow} key={index}>
                <span className={styles.label}>{item.text}:</span>
                <span className={styles.value}>
                  {typeof userValue === "object"
                    ? `${userValue.streetAddress}, ${userValue.city}, ${userValue.postalCode}`
                    : userValue}
                </span>
              </div>
            );
          })}
        </>
      )}

      <MainButton
        text={isEditing ? "return" : "edit"}
        className={styles.editButton}
        onClick={handleEditButton}
      />

      <ConfirmModal
        isOpen={isPasswordModalOpen}
        onCancel={() => setPasswordModalOpen(false)}
        onConfirm={handlePasswordConfirm}
        heading="Password Confirmation"
        description="Please enter your password to confirm the changes."
        inputType="password"
      />
      <ToastContainer />
    </div>
  );
}

export default UserInfo;
