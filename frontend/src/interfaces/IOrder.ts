export interface IOrder {
  id: number;
  orderStatus: number;
  paymentMethod: number;
  paymentStatus: number;
  items: {
    id: number;
  }[];
}
