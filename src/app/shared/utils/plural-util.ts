export function plural(value: string, count: number): string {
  return (count > 1) ? `${value}s` : value;
}
