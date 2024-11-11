export type AccessTokenType = string | undefined

export type TokenPayloadType = {
  admin: boolean
  exp: number
  user_id: string
}

export type FilterParams = {
  limit?: number
  offSet?: number
  sort?: 'asc' | 'desc'
  sortBy?: string
  field?: string
}

export enum Sort {
  Ascending = 'asc',
  Descending = 'desc',
}

export enum SortBy {
  CreatedAt = 'created_at',
  Price = 'price',
  Star = 'star',
}
