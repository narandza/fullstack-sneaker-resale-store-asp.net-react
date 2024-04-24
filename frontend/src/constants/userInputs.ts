export type userInputsType = {
  type:
    | "text"
    | "password"
    | "email"
    | "textarea"
    | "file"
    | "number"
    | "date"
    | "select"
    | "checkbox";
  placeholder: string;
  name: string;
  validation: string;
}[];

export const editUserInformation: userInputsType = [
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
