declare interface FindAll<T> {
  result: any;
  pagination: {
    currentPage: number;
    nextPage: number;
    prevPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    lastPage: number;
    count: number;
    take: number;
  };
}
