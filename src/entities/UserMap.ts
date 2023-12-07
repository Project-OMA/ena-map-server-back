export interface UpdateUserMapDTO {
    id_user?: number;
    id_map?: number;
    in_completed: boolean;
  }
  
  export type CreateUserMapDTO = {
    id_user: number;
    id_map: number;
    in_completed: boolean;
  };
  
  export type UserMapDTO = {
    id_user: number;
    id_map: number;
    in_completed: boolean;
  };
  