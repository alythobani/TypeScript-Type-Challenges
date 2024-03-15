/*
  2257 - MinusOne
  -------
  by Mustafo Faiz (@fayzzzm) #medium #math

  ### Question

  Given a number (always positive) as a type. Your type should return the number decreased by one.

  For example:

  ```ts
  type Zero = MinusOne<1> // 0
  type FiftyFour = MinusOne<55> // 54
  ```

  > View on GitHub: https://tsch.js.org/2257
*/

/* _____________ Your Code Here _____________ */

// Note: Does not work for numbers that are too high (TS stops the deep recursion) or negatives (which the question said shouldn't
// happen anyway).

type MinusOne<T extends number, A extends unknown[] = []> = T extends 0
  ? -1
  : T extends [...A, 1]["length"]
  ? A["length"]
  : MinusOne<T, [...A, 1]>;

/* _____________ An awesome solution from https://github.com/type-challenges/type-challenges/issues/13507 _____________ */
// type ParseInt<T extends string> = T extends `${infer Digit extends number}`
//   ? Digit
//   : never;
// type ReverseString<S extends string> = S extends `${infer First}${infer Rest}`
//   ? `${ReverseString<Rest>}${First}`
//   : "";
// type RemoveLeadingZeros<S extends string> = S extends "0"
//   ? S
//   : S extends `${"0"}${infer R}`
//   ? RemoveLeadingZeros<R>
//   : S;
// type InternalMinusOne<S extends string> =
//   S extends `${infer Digit extends number}${infer Rest}`
//     ? Digit extends 0
//       ? `9${InternalMinusOne<Rest>}`
//       : `${[9, 0, 1, 2, 3, 4, 5, 6, 7, 8][Digit]}${Rest}`
//     : never;
// type MinusOne<T extends number> = ParseInt<
//   RemoveLeadingZeros<ReverseString<InternalMinusOne<ReverseString<`${T}`>>>>
// >;
// type test = MinusOne<9007199254740992>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "utils";

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  // @ts-expect-error
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<0>, -1>>,
  // @ts-expect-error
  Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2257/answer
  > View solutions: https://tsch.js.org/2257/solutions
  > More Challenges: https://tsch.js.org
*/
