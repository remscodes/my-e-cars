export function getOrThrow(value: any, errorMessage: string): typeof value | never {
  if (!value) throw errorMessage;
  return value;
}
