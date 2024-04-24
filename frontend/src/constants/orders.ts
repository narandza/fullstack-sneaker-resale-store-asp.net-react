export type enumConversion = {
  id: number;
  value: string;
};

export const OrderStatus: enumConversion[] = [
  {
    id: 1,
    value: "Pending",
  },
  {
    id: 2,
    value: "Created",
  },
  {
    id: 3,
    value: "Completed",
  },
  {
    id: 4,
    value: "Shipped",
  },
  {
    id: 5,
    value: "Canceled",
  },
  {
    id: 6,
    value: "Refunded",
  },
];

export const PaymentMethod: enumConversion[] = [
  {
    id: 1,
    value: "Card",
  },
  {
    id: 2,
    value: "Cash",
  },
];

export const PaymentStatus: enumConversion[] = [
  {
    id: 1,
    value: "Pending",
  },
  {
    id: 2,
    value: "Completed",
  },
  {
    id: 3,
    value: "Failed",
  },
  {
    id: 4,
    value: "Canceled",
  },
];

export const TicketStatus: enumConversion[] = [
  {
    id: 1,
    value: "Open",
  },
  {
    id: 2,
    value: "Pending",
  },
  {
    id: 3,
    value: "Resolved",
  },
  {
    id: 4,
    value: "Closed",
  },
];
