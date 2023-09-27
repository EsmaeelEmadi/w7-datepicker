export const sliceNumber = (
  event: KeyboardEvent,
  maxLength: number
): string => {
  const {key} = event;
  const targetValue = (event.target as HTMLDivElement).textContent;

  if (isNaN(Number(key))) {
    throw new Error(`input value should be number`);
  }

  const valueAsString = targetValue + key;
  const sliced = valueAsString.slice(valueAsString.length - maxLength);
  return sliced;
};
