export interface PagedList<T> {
    limit: number;
    page: number;
    count: number;
    data: T[];
}