export interface filterOptions {
  name: string;
  type: "search" | "select" | "date";
  options?: { value: string; name: string }[];
}

export const brandsFilterOptions: filterOptions[] = [
  {
    name: "name",
    type: "search",
  },
];

export const sneakersFilterOptions: filterOptions[] = [
  {
    name: "model",
    type: "search",
  },
  {
    name: "colorway",
    type: "search",
  },
  {
    name: "brand",
    type: "select",
  },
  {
    name: "priceFrom",
    type: "search",
  },
  {
    name: "priceTo",
    type: "search",
  },
  {
    name: "sizes",
    type: "search",
  },
  {
    name: "ReleaseDateFrom",
    type: "date",
  },
  {
    name: "ReleaseDateTo",
    type: "date",
  },
];

export const rolesFilterOptions: filterOptions[] = [
  {
    name: "name",
    type: "search",
  },
];

export const usersFilterOptions: filterOptions[] = [
  {
    name: "name",
    type: "search",
  },
  {
    name: "email",
    type: "search",
  },
  {
    name: "address",
    type: "search",
  },
];

export const ordersFilterOptions: filterOptions[] = [
  {
    name: "email",
    type: "search",
  },
  {
    name: "name",
    type: "search",
  },
  {
    name: "sneaker",
    type: "search",
  },
  {
    name: "paymentStatus",
    type: "select",
    options: [
      {
        value: "0",
        name: "Pending",
      },
      {
        value: "1",
        name: "Completed",
      },
      {
        value: "2",
        name: "Failed",
      },
      {
        value: "3",
        name: "Cancelled",
      },
    ],
  },
  {
    name: "paymentMethod",
    type: "select",
    options: [
      {
        value: "0",
        name: "Card",
      },
      {
        value: "1",
        name: "Cash",
      },
    ],
  },
  {
    name: "orderStatus",
    type: "select",
    options: [
      {
        value: "0",
        name: "Pending",
      },
      {
        value: "1",
        name: "Created",
      },
      {
        value: "2",
        name: "Completed",
      },
      {
        value: "3",
        name: "Shipped",
      },
      {
        value: "4",
        name: "Canceled",
      },
      {
        value: "5",
        name: "Refunded",
      },
    ],
  },
  {
    name: "CreatedFrom",
    type: "date",
  },
  {
    name: "CreatedTo",
    type: "date",
  },
  {
    name: "TotalPriceFrom",
    type: "search",
  },
  {
    name: "TotalPriceTo",
    type: "search",
  },
];

export const ticketsFilterOptions: filterOptions[] = [
  {
    name: "Title",
    type: "search",
  },
  {
    name: "UserEmail",
    type: "search",
  },
  {
    name: "UserName",
    type: "search",
  },
  {
    name: "Status",
    type: "select",
    options: [
      {
        value: "0",
        name: "Open",
      },
      {
        value: "1",
        name: "Pending",
      },
      {
        value: "2",
        name: "Resolved",
      },
      {
        value: "3",
        name: "Closed",
      },
    ],
  },
  {
    name: "CreatedFrom",
    type: "date",
  },
  {
    name: "CreatedTo",
    type: "date",
  },
];
