export interface IImage {
  id: number;
  path: string;
  extension: "png" | "jpg" | "jpeg";
}

export const tempImage: IImage = {
  id: 0,
  path: "default.jpg",
  extension: "jpg",
};
