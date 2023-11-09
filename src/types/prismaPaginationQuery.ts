export interface PrismaPaginationQuery {
    select: object;
    orderBy?: object;
    where?: object;
    take?: number;
    skip?: number;
}