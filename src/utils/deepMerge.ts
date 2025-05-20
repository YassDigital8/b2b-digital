function deepMerge<T>(target: T, source: Partial<T>): T {
  const output = { ...target };

  for (const key in source) {
    const sourceValue = source[key];
    const targetValue = target[key];

    if (
      sourceValue &&
      typeof sourceValue === "object" &&
      !Array.isArray(sourceValue) &&
      targetValue &&
      typeof targetValue === "object"
    ) {
      output[key] = deepMerge(targetValue, sourceValue);
    } else {
      output[key] = sourceValue as any;
    }
  }

  return output;
}
export default deepMerge