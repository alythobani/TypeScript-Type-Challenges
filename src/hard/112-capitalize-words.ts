/*
  112 - Capitalize Words
  -------
  by Anthony Fu (@antfu) #hard #template-literal

  ### Question

  Implement `CapitalizeWords<T>` which converts the first letter of **each word of a string** to uppercase and leaves the rest as-is.

  For example

  ```ts
  type capitalized = CapitalizeWords<'hello world, my friends'> // expected to be 'Hello World, My Friends'
  ```

  > View on GitHub: https://tsch.js.org/112
*/

/* _____________ Your Code Here _____________ */

import { Letter } from "src/utils/letter.js";

type CapitalizeWords<
  S extends string,
  WordAcc extends string = "",
  ReturnAcc extends string = ""
> = S extends `${infer L}${infer Rest}`
  ? L extends Letter
    ? CapitalizeWords<Rest, `${WordAcc}${L}`, ReturnAcc>
    : CapitalizeWords<Rest, "", `${ReturnAcc}${Capitalize<WordAcc>}${L}`>
  : `${ReturnAcc}${Capitalize<WordAcc>}`;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "utils";

type case1 = CapitalizeWords<"foobar">;
type case2 = CapitalizeWords<"FOOBAR">;
type case3 = CapitalizeWords<"foo bar">;
type case4 = CapitalizeWords<"foo bar hello world">;
type case5 = CapitalizeWords<"foo bar.hello,world">;
type case6 =
  CapitalizeWords<"aa!bb@cc#dd$ee%ff^gg&hh*ii(jj)kk_ll+mm{nn}oo|pp🤣qq">;

type cases = [
  Expect<Equal<CapitalizeWords<"foobar">, "Foobar">>,
  Expect<Equal<CapitalizeWords<"FOOBAR">, "FOOBAR">>,
  Expect<Equal<CapitalizeWords<"foo bar">, "Foo Bar">>,
  Expect<Equal<CapitalizeWords<"foo bar hello world">, "Foo Bar Hello World">>,
  Expect<Equal<CapitalizeWords<"foo bar.hello,world">, "Foo Bar.Hello,World">>,
  Expect<
    Equal<
      CapitalizeWords<"aa!bb@cc#dd$ee%ff^gg&hh*ii(jj)kk_ll+mm{nn}oo|pp🤣qq">,
      "Aa!Bb@Cc#Dd$Ee%Ff^Gg&Hh*Ii(Jj)Kk_Ll+Mm{Nn}Oo|Pp🤣Qq"
    >
  >,
  Expect<Equal<CapitalizeWords<"">, "">>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/112/answer
  > View solutions: https://tsch.js.org/112/solutions
  > More Challenges: https://tsch.js.org
*/
