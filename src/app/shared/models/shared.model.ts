export type Nullable<T> =
  | T
  | null

export type Optional<T> =
  | T
  | undefined

export type Coalable<T> =
  | Nullable<T>
  | Optional<T>
