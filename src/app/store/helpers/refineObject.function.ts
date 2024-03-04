// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const refineObject = (a: any) => {
  return JSON.parse(JSON.stringify(a ?? {}));
};
