export const waitTimeout = async (s: number) => {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve();
    }, s * 1000);
  });
}

export const waitTimer = async (s: number) => {
  return Promise.resolve;
}