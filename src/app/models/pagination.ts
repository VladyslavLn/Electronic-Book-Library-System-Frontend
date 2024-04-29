export type ResponseWithPagination<T> = {
  readonly content: T[];
  readonly pageable: {
    readonly sort: {
      readonly unsorted: boolean;
      readonly sorted: boolean;
      readonly empty: boolean;
    };
    readonly pageNumber: number;
    readonly pageSize: number;
    readonly offset: number;
    readonly paged: boolean;
    readonly unpaged: boolean;
  };
  readonly totalPages: number;
  readonly totalElements: number;
  readonly last: boolean;
  readonly first: boolean;
  readonly numberOfElements: number;
  readonly size: number;
  readonly number: number;
  readonly sort: {
    readonly unsorted: boolean;
    readonly sorted: boolean;
    readonly empty: boolean;
  };
  readonly empty: boolean;
}
