export interface iUser {
  id: string;
  email: string;
  username: string;
  password: string;
  userType: {
    id: number;
    description: string;
  };
}
