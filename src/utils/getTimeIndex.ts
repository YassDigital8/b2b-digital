function mapNumber(n: number): number | null {
  if (n % 2 === 0 && n >= 2) {
    return (n - 2) / 2;
  }
  return null; // or throw an error if input is invalid
}