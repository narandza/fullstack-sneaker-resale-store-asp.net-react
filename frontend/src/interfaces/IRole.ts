export interface IRole {
  id: number;
  name: string;
  roleUseCases: number[];
  roleUsers: {
    emails: string[];
  };
}
