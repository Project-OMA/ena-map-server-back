export type CreateMapDTO = {
  id_owner: number;
  tag: string;
  name: string;
  thumb_url?: string;
  url?: string;
};

export type UpdateMapDTO = {
  name?: string;
  thumb_url?: string;
  url?: string;
  tag?: string;
};

export type MapDTO = {
  id: number;
  id_owner: number;
  name: string;
  thumb_url: string;
  url: string;
  tag: string;
  created_at: Date;
  updated_at: Date;
};

export default class Map {
  id: number;
  name: string;
  thumb_url: string;
  url: string;
  created_at: Date;
  updated_at: Date;

  constructor(id: number, name: string, thumb_url: string, url: string, created_at: Date, updated_at: Date) {
    this.id = id;
    this.name = name;
    this.thumb_url = thumb_url;
    this.url = url;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
