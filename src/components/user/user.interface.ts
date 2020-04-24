import { User } from '../../entities/User.entity';

export interface UsersList {
  list: User[],
  page: number,
  pages: number,
  totalCount: number;
}
