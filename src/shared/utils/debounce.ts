/**
 * Debounce function that delays the execution of a function
 * @param func The function to execute
 * @param wait The time to wait in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: Parameters<T>) => void>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    const callLater = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(callLater, wait);
  };
};
