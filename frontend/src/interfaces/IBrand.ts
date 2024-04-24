import { IImage, tempImage } from "./IImage";

export interface IBrand {
  id: number;
  name: string;
  description: string;
  logo: IImage;
}

export const tempBrand: IBrand = {
  id: 0,
  name: "brand name",
  description: " ",
  logo: tempImage,
};
