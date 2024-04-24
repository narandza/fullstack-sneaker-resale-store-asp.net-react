import { jwtDecode } from "jwt-decode";
import api from "../api/apiService";
import IDecodedToken from "../interfaces/IDecodedToken";
import { userInputsType } from "../constants/userInputs";

export type ValidationErrors = Record<string, string | null>;

export const validateInput = (
  ruleName: string,
  value: string | null,
  ruleParam?: string
): string | null | true => {
  if (value === null || value === undefined) {
    return "This field is required.";
  }

  switch (ruleName) {
    case "NotEmpty":
      return value?.trim() === "" ? "This field is required." : null;

    case "MaxLength":
      return value?.length > Number(ruleParam || 0)
        ? `Cannot exceed ${ruleParam} characters.`
        : null;

    case "EmailAddress":
      return !/^\S+@\S+\.\S+$/.test(value || "")
        ? "Invalid email address."
        : null;

    case "PasswordValidation":
      return validatePassword(value || "");

    case "ConfirmPassword":
      const passwordValue = value; // Since ConfirmPassword doesn't need formData
      return passwordValue !== ruleParam ? "Passwords do not match" : null;

    case "Length":
      return value?.length !== Number(ruleParam || 0)
        ? `Must be ${ruleParam} digits long`
        : null;

    case "Digits":
      return !/^\d+$/.test(value || "") ? "Must contain only digits" : null;

    default:
      return true;
  }
};

export const validatePassword = (password: string): string | null | true => {
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const digitRegex = /\d/;
  const specialCharRegex = /\W|_/g;

  const isUppercaseValid = uppercaseRegex.test(password);
  const isLowercaseValid = lowercaseRegex.test(password);
  const isDigitValid = digitRegex.test(password);
  const isSpecialCharValid = specialCharRegex.test(password);

  if (!isUppercaseValid) {
    return "Password must contain at least one uppercase letter.";
  }

  if (!isLowercaseValid) {
    return "Password must contain at least one lowercase letter.";
  }

  if (!isDigitValid) {
    return "Password must contain at least one digit.";
  }

  if (!isSpecialCharValid) {
    return "Password must contain at least one special character";
  }

  return null;
};

export const validateInputOnBlur = (
  name: string,
  value: string,
  inputs: userInputsType,
  setValidationErrors: React.Dispatch<
    React.SetStateAction<Record<string, string | null>>
  >
): void => {
  const validationRules = inputs.find(
    (input) => input.name === name
  )?.validation;

  if (validationRules) {
    const rules = validationRules.split("|");
    let errors: string[] = [];

    for (const rule of rules) {
      const [ruleName, ruleParam] = rule.split(":");
      const validationResult = validateInput(ruleName, value, ruleParam);

      if (validationResult !== true) {
        errors.push(validationResult as string);
      }
    }

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errors.length > 0 ? errors.join("") : null,
    }));
  }
};

export const hasValidationErrors = (
  validationErrors: Record<string, string | null>
) => Object.values(validationErrors).some((error) => error !== "");

export const checkEmailUniqueness = async (email: string): Promise<boolean> => {
  try {
    const response = await api.get("/users");

    const users = response.data.items;

    if (Array.isArray(users)) {
      return users.every((user: any) => user.email !== email);
    } else {
      throw new Error("Unexpected response format from /users endpoint");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const setUserToLocalStorage = (token: string) => {
  if (token === null) return;
  localStorage.setItem("token", token);

  const decodedToken = jwtDecode<IDecodedToken>(token);

  const user = {
    id: decodedToken.Id,
    email: decodedToken.Email,
    role: decodedToken.Role,
    useCases: decodedToken.UseCases,
  };

  localStorage.setItem("userId", user.id);
  localStorage.setItem("userEmail", user.email);
  localStorage.setItem("userRole", user.role);
  localStorage.setItem("userUseCases", JSON.stringify(user.useCases));
};

export const checkIfUserIsAdmin = (): boolean => {
  const userRole = localStorage.getItem("userRole");
  if (userRole === "1") {
    return true;
  }
  return false;
};

export const getFavorites = async (token: string | null) => {
  try {
    const response = await api.get("/favorites", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 200) {
      return response.data.items;
    }

    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const deleteFavorite = async (
  sneakerId: number,
  token: string | null
) => {
  try {
    const response = await api.delete(`/favorites/${sneakerId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 204) {
      return true;
    }

    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// export const findUsersAddressId = async (userId: number): Promise<number> => {
// const token = localStorage.getItem("token");
// if(!token || userId === 0 || !userId){
//   return 0;
// }

// try {
// const response = await api.get("/")
// }
// catch(error){
//   console.error(error)
// }

// }
