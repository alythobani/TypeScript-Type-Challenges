/*
  399 - Tuple Filter
  -------
  by Ryo Hanafusa (@softoika) #hard #tuple #infer

  ### Question

  Implement a type `FilterOut<T, F>` that filters out items of the given type `F` from the tuple `T`.

  For example,
  ```ts
  type Filtered = FilterOut<[1, 2, null, 3], null> // [1, 2, 3]
  ```

  > View on GitHub: https://tsch.js.org/399
*/

/* _____________ Your Code Here _____________ */

type FilterOut<T extends unknown[], F, Acc extends unknown[] = []> = T extends [
  infer First,
  ...infer Rest
]
  ? FilterOut<Rest, F, [First] extends [F] ? Acc : [...Acc, First]>
  : Acc;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "utils";

type case0 = FilterOut<[1, 2, 3, 4], 3>;
type case1 = FilterOut<[], never>;
type case2 = FilterOut<[never], never>;
type case3 = FilterOut<["a", never], never>;
type case4 = FilterOut<[1, never, "a"], never>;
type case5 = FilterOut<
  [never, 1, "a", undefined, false, null],
  never | null | undefined
>;
type case6 = FilterOut<
  [number | null | undefined, never],
  never | null | undefined
>;

type cases = [
  Expect<Equal<case0, [1, 2, 4]>>,
  Expect<Equal<case1, []>>,
  Expect<Equal<case2, []>>,
  Expect<Equal<case3, ["a"]>>,
  Expect<Equal<case4, [1, "a"]>>,
  Expect<Equal<case5, [1, "a", false]>>,
  Expect<Equal<case6, [number | null | undefined]>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/399/answer
  > View solutions: https://tsch.js.org/399/solutions
  > More Challenges: https://tsch.js.org
*/
