export class User {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export const login = (email: string, password: string) => {
  return new User(email, password);
};
