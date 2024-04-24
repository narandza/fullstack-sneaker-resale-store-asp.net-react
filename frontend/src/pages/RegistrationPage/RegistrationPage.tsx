import styles from "./RegstrationPage.module.scss";
import { FormInput } from "../../components/FormInput/FormInput";
import MainButton from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/apiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  checkEmailUniqueness,
  validateInputOnBlur,
} from "../../utils/userUtilis";
import { userInputsType } from "../../constants/userInputs";

function RegistrationPage() {
  const [formData, setFormData] = useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    confirmPassword: null,
    streetAddress: null,
    city: null,
    postalCode: null,
  });

  const inputs: userInputsType = [
    {
      type: "text",
      placeholder: "first name",
      name: "firstName",
      validation: "NotEmpty|MaxLength:50",
    },
    {
      type: "text",
      placeholder: "last name",
      name: "lastName",
      validation: "NotEmpty|MaxLength:50",
    },
    {
      type: "email",
      placeholder: "email",
      name: "email",
      validation: "NotEmpty|MaxLength:100|EmailAddress",
    },
    {
      type: "password",
      placeholder: "password",
      name: "password",
      validation: "NotEmpty|PasswordValidation",
    },
    {
      type: "password",
      placeholder: "retype password",
      name: "confirmPassword",
      validation: `NotEmpty|ConfirmPassword:${formData.password || ""}`,
    },
    {
      type: "text",
      placeholder: "Street address",
      name: "streetAddress",
      validation: "NotEmpty",
    },
    {
      type: "text",
      placeholder: "city",
      name: "city",
      validation: "NotEmpty|MaxLength:50",
    },
    {
      type: "text",
      placeholder: "postal code",
      name: "postalCode",
      validation: "NotEmpty|Length:5|Digits",
    },
  ];

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | null>
  >({});
  const [isRegisterButtonDisabled, setRegisterButtonDisabled] = useState(true);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const hasValidationErrors = Object.values(validationErrors).some(
    (error) => error !== ""
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateInputOnBlur(name, value, inputs, setValidationErrors);
  };

  const handleRegistration = async () => {
    if (hasValidationErrors) {
      setFormError("Please fix the errors in the form before submitting.");
      return;
    }

    const isEmailUnique = formData.email
      ? await checkEmailUniqueness(formData.email)
      : false;

    if (!isEmailUnique) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        email: "email already exists. please use a different email address.",
      }));
      return;
    }

    const registrationData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      address: {
        streetAddress: formData.streetAddress,
        city: formData.city,
        postalCode: formData.postalCode,
      },
    };

    try {
      const response = await api.post("/users", registrationData);

      if (response.status === 201) {
        toast.success("Registration successful");

        setTimeout(() => {
          navigate("/login", { state: registrationData.email });
        }, 3000);
      } else {
        toast.error("Server error occured. Please try again later.");
      }

      setFormError("");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setRegisterButtonDisabled(hasValidationErrors);
  }, [hasValidationErrors]);

  return (
    <section className={styles.register}>
      <h1 className={styles.registerHeading}>create an account</h1>
      {inputs.map((input, index) => (
        <>
          <FormInput
            type={input.type}
            placeholder={input.placeholder}
            name={input.name}
            key={index}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <span className={styles.inputError} key={Math.random()}>
            {validationErrors[input.name]}
          </span>
        </>
      ))}

      <span className={styles.inputError}>{formError}</span>
      <MainButton
        text="register"
        className={styles.signInBtn}
        onClick={handleRegistration}
        disabled={isRegisterButtonDisabled}
      />
      <Link to="/login" className={styles.registartionLink}>
        sign in
      </Link>
    </section>
  );
}

export default RegistrationPage;
