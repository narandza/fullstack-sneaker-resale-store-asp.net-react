// useImageUpload.ts
import { useState } from "react";

const useImageUpload = () => {
  const [image, setImage] = useState<string | undefined | ArrayBuffer | null>();

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFormValues: React.Dispatch<React.SetStateAction<{}>>
  ) => {
    const selectFile = e.target.files ? e.target.files[0] : null;
    const reader = new FileReader();

    if (selectFile) {
      reader.readAsDataURL(selectFile);
      reader.onload = () => {
        if (isImageValid(reader.result as string)) {
          setImage(reader.result);

          const base64Image = reader.result as string;
          const base64Data = base64Image.split(",")[1];
          setFormValues((prevValues: any) => ({
            ...prevValues,
            [e.target.name]: base64Data,
          }));
        } else {
        }
      };
    }
  };

  const isImageValid = (base64Image: string): boolean => {
    const matchResult = base64Image.match(
      /^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,/
    );

    if (!matchResult) {
      return false;
    }

    const [, mimeType] = matchResult;

    const allowedExtensions = ["jpg", "png"];

    const [, extension] = mimeType.split("/");

    return allowedExtensions.includes(extension.toLowerCase());
  };

  return { image, handleImageUpload };
};

export default useImageUpload;
