export interface CreateMap {
  name: string;
  thumb_url: string;
  url: string;
}

export interface UpdateMap {
  name?: string;
  thumb_url?: string;
  url?: string;
}

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
