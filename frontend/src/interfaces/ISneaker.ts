import { IBrand, tempBrand } from "./IBrand";
import { IImage, tempImage } from "./IImage";
import { ISize, tempSize } from "./ISize";

export interface ISneaker {
  id: number;
  model: string;
  colorway: string;
  price: number;
  releaseDate: Date;
  brand: IBrand;
  images: IImage[];
  sizes: ISize[];
  description: string;
  createdAt: Date;
}

export interface ISneakerAdmin {
  id: number;
  brand: {
    id: number;
    name: string;
  };
  model: string;
  colorway: string;
  description: string;
  price: number;
  sizes: string[];
  images: string[];
  releaseDate: string;
}

export const tempSneaker: ISneaker = {
  id: 0,
  model: "model",
  colorway: "colorway",
  price: 123,
  releaseDate: new Date("2023-12-27T12:34:56"),
  brand: tempBrand,
  images: [tempImage, tempImage, tempImage],
  sizes: [tempSize, tempSize, tempSize],
  description: "",
  createdAt: new Date("2023-12-27T12:34:56"),
};
