/*
  545 - printf
  -------
  by null (@Bestmain-YS) #hard #template-literal

  ### Question

  Implement `Format<T extends string>` generic.

  For example,

  ```ts
  type FormatCase1 = Format<"%sabc"> // FormatCase1 : string => string
  type FormatCase2 = Format<"%s%dabc"> // FormatCase2 : string => number => string
  type FormatCase3 = Format<"sdabc"> // FormatCase3 :  string
  type FormatCase4 = Format<"sd%abc"> // FormatCase4 :  string
  ```

  > View on GitHub: https://tsch.js.org/545
*/

/* _____________ Your Code Here _____________ */

type ReplacementMap = {
  s: string;
  d: number;
};

type ReplacementKey = keyof ReplacementMap;
type ReplacementType = ReplacementMap[ReplacementKey];

type Format<T extends string> = ArgTypesToFunction<ReversedReplacementTypes<T>>;

type ReversedReplacementTypes<
  T extends string,
  Acc extends ReplacementType[] = [],
> = T extends `${string}%${infer RK}${infer Rest}`
  ? ReversedReplacementTypes<
      Rest,
      [...(RK extends ReplacementKey ? [ReplacementMap[RK]] : []), ...Acc]
    >
  : Acc;

type ArgTypesToFunction<
  ReversedArgTypes extends ReplacementType[],
  Acc = string,
> = ReversedArgTypes extends [
  infer ArgType extends ReplacementType,
  ...infer Rest extends ReplacementType[],
]
  ? ArgTypesToFunction<Rest, (arg: ArgType) => Acc>
  : Acc;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "utils";

type case1 = Format<"abc">;
type case2 = Format<"a%%%sbc">;
type case3 = Format<"a%dbc">;
type case4 = Format<"a%%dbc">;
type case5 = Format<"a%%%dbc">;
type case6 = Format<"a%dbc%s">;
type case7 = Format<"a%dbc%s%s">;

type cases = [
  Expect<Equal<case1, string>>,
  Expect<Equal<case2, (s1: string) => string>>,
  Expect<Equal<case3, (d1: number) => string>>,
  Expect<Equal<case4, string>>,
  Expect<Equal<case5, (d1: number) => string>>,
  Expect<Equal<case6, (d1: number) => (s1: string) => string>>,
  Expect<Equal<case7, (d1: number) => (s1: string) => (s2: string) => string>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/545/answer
  > View solutions: https://tsch.js.org/545/solutions
  > More Challenges: https://tsch.js.org
*/
