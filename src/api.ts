export const callMockApi = (): Promise<{ resultText: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ resultText: "This is a mock response" });
    }, 500);
  });
};
