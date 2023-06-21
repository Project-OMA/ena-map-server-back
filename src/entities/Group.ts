import { MapDTO } from './Map';
import { UserDTO } from './User';

export type CreateGroupDTO = {
  name: string;
  id_owner: number;
  users?: number[];
  maps?: number[];
};

export type UpdateGroupDTO = {
  name?: string;
  users?: number[];
  maps?: number[];
};

export type GroupDTO = {
  id: number;
  name: string;
  id_owner: number;
  created_at: Date;
  updated_at: Date;
  users?: UserDTO[];
  maps?: MapDTO[];
};

export default class Group {
  id: number;
  name: string;
  id_owner: number;
  created_at: Date;
  updated_at: Date;

  constructor(id: number, name: string, id_owner: number, url: string, created_at: Date, updated_at: Date) {
    this.id = id;
    this.name = name;
    this.id_owner = id_owner;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
