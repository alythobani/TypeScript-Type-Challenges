/*
  114 - CamelCase
  -------
  by Anthony Fu (@antfu) #hard #template-literal

  ### Question

  Implement `CamelCase<T>` which converts `snake_case` string to `camelCase`.

  For example

  ```ts
  type camelCase1 = CamelCase<'hello_world_with_types'> // expected to be 'helloWorldWithTypes'
  type camelCase2 = CamelCase<'HELLO_WORLD_WITH_TYPES'> // expected to be same as previous one
  ```

  > View on GitHub: https://tsch.js.org/114
*/

/* _____________ Your Code Here _____________ */

import { Letter } from "src/utils/letter.js";

type CamelCase<S extends string> =
  S extends `${infer FirstWord}_${infer FirstLetterOfSecondWord}${infer Rest}`
    ? FirstLetterOfSecondWord extends Letter
      ? `${Lowercase<FirstWord>}${Uppercase<FirstLetterOfSecondWord>}${CamelCase<Rest>}`
      : `${Lowercase<FirstWord>}_${CamelCase<`${FirstLetterOfSecondWord}${Rest}`>}`
    : Lowercase<S>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "utils";

type case1 = CamelCase<"foobar">;
type case2 = CamelCase<"FOOBAR">;
type case3 = CamelCase<"foo_bar">;
type case4 = CamelCase<"foo__bar">;
type case5 = CamelCase<"foo_$bar">;
type case6 = CamelCase<"foo_bar_">;
type case7 = CamelCase<"foo_bar__">;
type case8 = CamelCase<"foo_bar_$">;
type case9 = CamelCase<"foo_bar_hello_world">;
type case10 = CamelCase<"HELLO_WORLD_WITH_TYPES">;
type case11 = CamelCase<"-">;
type case12 = CamelCase<"">;
type case13 = CamelCase<"😎">;

type cases = [
  Expect<Equal<CamelCase<"foobar">, "foobar">>,
  Expect<Equal<CamelCase<"FOOBAR">, "foobar">>,
  Expect<Equal<CamelCase<"foo_bar">, "fooBar">>,
  Expect<Equal<CamelCase<"foo__bar">, "foo_Bar">>,
  Expect<Equal<CamelCase<"foo_$bar">, "foo_$bar">>,
  Expect<Equal<CamelCase<"foo_bar_">, "fooBar_">>,
  Expect<Equal<CamelCase<"foo_bar__">, "fooBar__">>,
  Expect<Equal<CamelCase<"foo_bar_$">, "fooBar_$">>,
  Expect<Equal<CamelCase<"foo_bar_hello_world">, "fooBarHelloWorld">>,
  Expect<Equal<CamelCase<"HELLO_WORLD_WITH_TYPES">, "helloWorldWithTypes">>,
  Expect<Equal<CamelCase<"-">, "-">>,
  Expect<Equal<CamelCase<"">, "">>,
  Expect<Equal<CamelCase<"😎">, "😎">>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/114/answer
  > View solutions: https://tsch.js.org/114/solutions
  > More Challenges: https://tsch.js.org
*/
