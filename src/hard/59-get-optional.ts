/*
  59 - Get Optional
  -------
  by Zheeeng (@zheeeng) #hard #utils #infer

  ### Question

  Implement the advanced util type `GetOptional<T>`, which remains all the optional fields

  For example

  ```ts
  type I = GetOptional<{ foo: number, bar?: string }> // expected to be { bar?: string }
  ```

  > View on GitHub: https://tsch.js.org/59
*/

/* _____________ Your Code Here _____________ */

type GetOptional<T> = {
  [K in keyof T as {} extends Pick<T, K> ? K : never]: T[K];
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "utils";

type case1 = GetOptional<{ foo: number; bar?: string }>;
type case2 = GetOptional<{ foo: undefined; bar?: undefined }>;

type cases = [
  Expect<Equal<GetOptional<{ foo: number; bar?: string }>, { bar?: string }>>,
  Expect<
    Equal<GetOptional<{ foo: undefined; bar?: undefined }>, { bar?: undefined }>
  >
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/59/answer
  > View solutions: https://tsch.js.org/59/solutions
  > More Challenges: https://tsch.js.org
*/
