export type Nullable<T> =
  | T
  | null

export type Optional<T> =
  | T
  | undefined

export type Coalable<T> =
  | Nullable<T>
  | Optional<T>

export type ParameterizedString<T = any> = Extract<T, (...args: any) => string>

export type Prefix<T extends string, prefix extends string> = `${prefix}${T}`

export type PartialBy<T, P extends keyof T> =
  & Omit<T, P>
  & Partial<Pick<T, P>>

export type RequiredBy<T, P extends keyof T> =
  & Omit<T, P>
  & Required<Pick<T, P>>

export type Day =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'
