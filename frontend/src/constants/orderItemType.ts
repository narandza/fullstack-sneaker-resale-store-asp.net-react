export type orderItemsType = {
  id: number;
  items: {
    sneakerId: number;
    price: number;
    brand: string;
    model: string;
    colorway: string;
    imagePath: string;
  }[];
  orderStatus: string;
  paymentMethod: string;
  paymentStatus: string;
  total: number;
  createdAt: string;
  user: {
    name: string;
    address: string;
  };
};
