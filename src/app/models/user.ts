export interface User {
  readonly id: number,
  firstName: string,
  lastName: string,
  readonly email: string,
  readonly roles: string[]
}

export interface UpdateUser {
  readonly firstName: string,
  readonly lastName: string,
}

export interface UserJwt {
  readonly userId: number,
  readonly email: string,
  readonly roles: string[]
}
