import { JwtPayload } from "jwt-decode";

interface IDecodedToken extends JwtPayload {
  Id: string;
  Email: string;
  Role: string;
  UseCases: number[];
}

export default IDecodedToken;
