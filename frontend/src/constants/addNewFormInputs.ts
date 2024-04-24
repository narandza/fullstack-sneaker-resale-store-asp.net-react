import { userInputsType } from "./userInputs";

export const addNewRoleFormInputs: userInputsType = [
  {
    type: "text",
    name: "name",
    placeholder: "Role name",
    validation: "NotEmpty",
  },
  {
    type: "checkbox",
    name: "RoleUseCaseIds ",
    placeholder: "Role premmisons",
    validation: "NotEmpty",
  },
];

export const addNewBrandFormInputs: userInputsType = [
  {
    type: "text",
    placeholder: "Name",
    name: "name",
    validation: "NotEmpty|MaxLenght:50",
  },
  {
    type: "textarea",
    placeholder: "Description",
    name: "description",
    validation: "NotEmpty",
  },
  {
    type: "file",
    placeholder: "Upload Logo",
    name: "logoPath",
    validation: "NotEmpty",
  },
];

export const addNewSneakerFormInputs: userInputsType = [
  {
    type: "text",
    placeholder: "Model name",
    name: "model",
    validation: "NotEmpty",
  },
  {
    type: "text",
    placeholder: "Colorway",
    name: "colorway",
    validation: "NotEmpty",
  },
  {
    type: "number",
    placeholder: "Enter price",
    name: "price",
    validation: "GreaterThan:0",
  },
  {
    type: "textarea",
    placeholder: "Description",
    name: "description",
    validation: "NotEmpty",
  },
  {
    type: "date",
    placeholder: "Release date",
    name: "releaseDate",
    validation: "NotEmpty",
  },
  {
    type: "select",
    placeholder: "Select a brand",
    name: "brandId",
    validation: "NotEmpty",
  },
  {
    type: "file",
    placeholder: "Upload images",
    name: "images",
    validation: "NotEmpty",
  },
  {
    type: "checkbox",
    placeholder: "Sizes",
    name: "sizes",
    validation: "NotEmpty",
  },
];

export const addNewStaffFormInputs: userInputsType = [
  {
    type: "text",
    placeholder: "First name",
    name: "firstName",
    validation: "NotEmpty",
  },
  {
    type: "text",
    placeholder: "Last name",
    name: "lastName",
    validation: "NotEmpty",
  },
  {
    type: "text",
    placeholder: "User name",
    name: "email",
    validation: "NotEmpty",
  },
  {
    type: "text",
    placeholder: "Generate password",
    name: "password",
    validation: "NotEmpty|PasswordValidation",
  },
  {
    type: "select",
    placeholder: "Select role",
    name: "roleId",
    validation: "NotEmpty",
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
