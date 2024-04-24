export interface ITicket {
  id: number;
  title: string;
  description: string;
  user: {
    email: string;
    firstName: string;
    lastName: string;
  };
  status: string;
}
