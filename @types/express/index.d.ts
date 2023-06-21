import { UserToken } from '../../src/types/UserToken';

declare global {
  namespace Express {
    export interface Request {
      user: UserToken;
    }
  }
}
