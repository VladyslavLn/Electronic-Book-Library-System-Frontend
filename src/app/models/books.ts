import {User} from "./user";

export interface Book {
  readonly id: number,
  readonly author: string,
  readonly title: string,
  readonly language: string,
  readonly fileKey: string,
  readonly reviews: BookReview[],
  readonly ratings: BookRating[],
  readonly averageRating: number
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

export interface BookReview {
  readonly id: number,
  readonly reviewContent: string,
  readonly user: User
}

export interface CreateBookReview {
  readonly content: string,
}

export interface BookRating {
  readonly id: number,
  readonly ratingValue: number,
  readonly user: User
}

export interface CreateBookRating {
  readonly ratingValue: number
}
