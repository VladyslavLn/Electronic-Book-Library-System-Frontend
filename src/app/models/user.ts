export interface User {
  readonly id: number,
  readonly firstName: string,
  readonly lastName: string,
  readonly email: string
}

export interface UpdateUser {
  readonly firstName: string,
  readonly lastName: string,
}
