export function capitalize<T extends string>(str: T): Capitalize<T> {
  return `${str.at(0)}${str.slice(1)}` as Capitalize<T>;
}
