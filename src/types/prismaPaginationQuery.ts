export interface PrismaPaginationQuery {
    select: {
      id: boolean;
      name: boolean;
      email: boolean;
      type: boolean;
      sub: boolean;
      created_at: boolean;
      updated_at: boolean;
    };
    orderBy?: object;
    where?: {
      name: {
        contains: string;
      };
    };
    take?: number;
    skip?: number;
}