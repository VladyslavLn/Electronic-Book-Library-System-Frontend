export interface Book {
  readonly id: number,
  readonly author: string,
  readonly title: string,
  readonly language: string,
  readonly fileKey: string
}

export interface CreateBook {
  readonly author: string,
  readonly title: string,
  readonly language: string
}

export interface UpdateBook {
  readonly author: string,
  readonly title: string,
  readonly language: string
}
