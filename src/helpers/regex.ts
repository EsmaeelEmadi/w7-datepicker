// PATTERNS

// const numberRegex = /^\d+$/; // NOTE: for an string
const numberRegex = /^\d$/; // NOTE: for a single char

export function isNumber(input: string): boolean {
  return numberRegex.test(input);
}
