import { useState } from "react";
import MainButton from "../../Button/Button";
import { FormInput } from "../../FormInput/FormInput";
import styles from "./ChangePassword.module.scss";
import {
  setUserToLocalStorage,
  validateInputOnBlur,
} from "../../../utils/userUtilis";
import { useNavigate } from "react-router-dom";
import api from "../../../api/apiService";
import IUser from "../../../interfaces/IUser";
import { toast } from "react-toastify";
import { userInputsType } from "../../../constants/userInputs";

const formInputs: userInputsType = [
  {
    type: "password",
    name: "password",
    placeholder: "enter old password",
    validation: "NotEmpty|PasswordValidation",
  },
  {
    type: "password",
    name: "confirmPassword",
    placeholder: "confirm password",
    validation: "NotEmpty",
  },
  {
    type: "password",
    name: "newPassword",
    placeholder: "enter a new password",
    validation: "NotEmpty|PasswordValidation",
  },
];

type changePasswordFormDataType = {
  password: string;
  confirmPassword: string;
  newPassword: string;
};

interface IChangePassword {
  user: IUser;
}

function ChangePassword({ user }: IChangePassword) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState<changePasswordFormDataType>({
    password: "",
    confirmPassword: "",
    newPassword: "",
  });

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | null>
  >({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateInputOnBlur(name, value, formInputs, setValidationErrors);

    if (name === "password" && value !== formData.confirmPassword) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match.",
      }));
    } else if (name === "confirmPassword" && value !== formData.password) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match.",
      }));
    } else if (name === "confirmPassword" && value === formData.password) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: null,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token || token === null) {
      navigate("/login");
    }

    const hasValidationErrors = Object.values(validationErrors).some(
      (error) => error !== ""
    );

    if (
      formData.password === "" ||
      formData.confirmPassword === "" ||
      formData.newPassword === ""
    ) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        submit: "Please fill in all fields",
      }));
    }

    if (hasValidationErrors) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        submit: "Please fix all errors, before submiting.",
      }));
    }

    try {
      const response = await api.post("auth", {
        email: user.email,
        password: formData.password,
      });

      if (response.data !== null) {
        const { token } = response.data;
        setUserToLocalStorage(token);

        updateUserPassword(formData.newPassword);
      } else {
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          submit: "Invalid password, please enter your current password again.",
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateUserPassword = async (newPassword: string) => {
    try {
      const response = await api.put(
        `/users/${user.id}`,
        {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          roleId: localStorage.getItem("userRole"),
          password: newPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        toast.success("Password updated!", {
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
    <form className={styles.changePasswordForm} onSubmit={handleSubmit}>
      {formInputs.map((input, index) => (
        <div className={styles.formInputContainer} key={index}>
          <label className={styles.inputLabel}>{input.placeholder}:</label>
          <FormInput
            type={input.type}
            name={input.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <span className={styles.inputError}>
            {validationErrors[input.name]}
          </span>
        </div>
      ))}
      <div className={styles.submitButtonContainer}>
        <span className={styles.inputError}>{validationErrors["submit"]}</span>
        <MainButton
          type="submit"
          text="Update Password"
          className={styles.submitButton}
        />
      </div>
    </form>
  );
}

export default ChangePassword;
