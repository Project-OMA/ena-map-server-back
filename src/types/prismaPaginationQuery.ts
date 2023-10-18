export interface PrismaPaginationQuery {
    select: object;
    orderBy?: object;
    where?: {
      name: {
        contains: string;
      };
    };
    take?: number;
    skip?: number;
}