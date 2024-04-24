import { useState } from "react";
import { UseCases } from "../../../constants/UseCases";
import { addNewRoleFormInputs } from "../../../constants/addNewFormInputs";
import { IRole } from "../../../interfaces/IRole";
import MainButton from "../../Button/Button";
import { Checkbox, FormInput } from "../../FormInput/FormInput";
import styles from "./EditItem.module.scss";
import {
  hasValidationErrors,
  validateInputOnBlur,
} from "../../../utils/userUtilis";
import api from "../../../api/apiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface IEditRole {
  role: IRole;
}

function EditRole({ role }: IEditRole) {
  const navigate = useNavigate();
  const [roleData, setRoleData] = useState({
    id: role.id,
    name: role.name,
    roleUseCaseIds: role.roleUseCases,
  });
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | null>
  >({});
  const [formError, setFormError] = useState("");

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    validateInputOnBlur(name, value, addNewRoleFormInputs, setValidationErrors);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoleData({
      ...roleData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheck = (checkedItems: number[]) => {
    setRoleData({
      ...roleData,
      roleUseCaseIds: checkedItems,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const hasErrors = hasValidationErrors(validationErrors);

    if (hasErrors) {
      setFormError("Please fix the errors in the form before submitting.");
      return;
    }

    try {
      const response = await api.put(`/roles/${role.id}`, roleData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        toast.success(`Item updated.`, {
          onClose: () => {
            navigate("/dashboard/roles");
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={styles.updateForm} onSubmit={handleSubmit}>
      {addNewRoleFormInputs.map((input, index) => (
        <div className={styles.formItem} key={index}>
          <label className={styles.formLabel}>{input.placeholder}:</label>
          {input.type === "checkbox" ? (
            <Checkbox
              options={UseCases}
              onCheckChange={handleCheck}
              checkedValues={roleData.roleUseCaseIds}
              name="is"
            />
          ) : (
            <FormInput
              type={input.type}
              name={input.name}
              value={roleData.name}
              onChange={handleChange}
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

export default EditRole;
