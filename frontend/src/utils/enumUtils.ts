import { enumConversion } from "../constants/orders";

export const getEnumValue = (
  enumId: number,
  enumType: enumConversion[]
): string => {
  const obj = enumType.find((item) => item.id === enumId);
  return obj ? obj.value : "Unknown";
};
