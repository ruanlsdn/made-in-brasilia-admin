export interface iUser {
  id: string;
  username: string;
  password: string;
  userType: {
    id: number;
    description: string;
  };
}
