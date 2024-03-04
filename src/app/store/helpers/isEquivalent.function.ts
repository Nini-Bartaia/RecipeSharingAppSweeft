import { refineObject } from './refineObject.function';
import { isEqual } from 'lodash';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEquivalent = (a: any, b: any) => {
  const a1 = refineObject(a);
  const b1 = refineObject(b);

  return isEqual(a1, b1);
};
