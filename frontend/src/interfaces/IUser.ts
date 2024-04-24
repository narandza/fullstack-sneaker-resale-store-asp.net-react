interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: IAddress;
  roleId: number;
  roleName: string;
}

export interface IAddress {
  addressId: number;
  streetAddress: string;
  city: string;
  postalCode: number;
}

export default IUser;
