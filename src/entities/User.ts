export interface CreateUser {
  name: string;
  email: string;
  password: string;
  type: number;
}

export interface UpdateUser {
  name?: string;
  email?: string;
  password?: string;
  type?: number;
}

export interface ReadUser {
  id: number;
  name: string;
  email: string;
  password: string;
  type: number;
  created_at: Date;
  updated_at: Date;
}

export default class User {
  id: number;
  name: string;
  email: string;
  password: string;
  type: number;
  created_at: Date;
  updated_at: Date;

  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    type: number,
    created_at: Date,
    updated_at: Date,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
