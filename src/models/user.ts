export interface IUser {
  firstName?: string;
  lastName?: string;
  username: string;
  password: string;
  confirmPassword?: string;
}

export interface ILogin {
  username: string;
  password: string;
}
