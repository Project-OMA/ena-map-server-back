export interface UpdateUserDTO {
  id?: number;
  name: string;
  email: string;
  type: number;
  password?: string;
}

export type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
  type: number;
};

export type UserDTO = {
  id: number;
  sub: string;
  name: string;
  email: string;
  password: string;
  type: number;
  created_at: Date;
  updated_at: Date;
};

export default class User {
  id: number;
  sub: string;
  name: string;
  email: string;
  password: string;
  type: number;
  created_at: Date;
  updated_at: Date;

  constructor(
    id: number,
    sub: string,
    name: string,
    email: string,
    password: string,
    type: number,
    created_at: Date,
    updated_at: Date,
  ) {
    this.id = id;
    this.sub = sub;
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
