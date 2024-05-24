import {User} from "./user";

export interface Book {
  readonly id: number,
  readonly author: string,
  readonly title: string,
  readonly language: string,
  readonly fileKey: string,
  readonly reviewAndRatings: BookReviewsAndRatings[],
  readonly averageRating: number,
  readonly cover: Array<string>,
  readonly user: User
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

export interface BookReviewsAndRatings {
  readonly user: User,
  readonly bookReview: BookReview,
  readonly bookRating: BookRating
}
export interface BookReview {
  readonly id: number,
  readonly reviewContent: string,
  readonly user: User
}

export interface BookRating {
  readonly id: number,
  readonly ratingValue: number,
  readonly user: User
}

export interface CreateBookReview {
  readonly content: string,
}

export interface CreateBookRating {
  readonly ratingValue: number
}
