export type CreateMapConvert = {
  id_owner: number;
  tag: string;
  name: string;
  thumb_url?: string;
  files: any;
  url?: string;
};


export type UpdateMapConvert = {
  name?: string;
  thumb_url?: string;
  url?: string;
  tag?: string;
  files?: any;
  last_file_name?: string;
  new_file?: string;
};


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
  files?: any;
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
  id_owner: number;
  tag: string;
  created_at: Date;
  updated_at: Date;

  constructor(
    id: number,
    name: string,
    thumb_url: string,
    url: string,
    id_owner: number,
    tag: string,
    created_at: Date,
    updated_at: Date,
  ) {
    this.id = id;
    this.name = name;
    this.thumb_url = thumb_url;
    this.url = url;
    this.id_owner = id_owner;
    this.tag = tag;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
