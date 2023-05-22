/*
  4425 - Greater Than
  -------
  by ch3cknull (@ch3cknull) #medium #array

  ### Question

  In This Challenge, You should implement a type `GreaterThan<T, U>` like `T > U`

  Negative numbers do not need to be considered.

  For example

  ```ts
  GreaterThan<2, 1> //should be true
  GreaterThan<1, 1> //should be false
  GreaterThan<10, 100> //should be false
  GreaterThan<111, 11> //should be true
  ```

  Good Luck!

  > View on GitHub: https://tsch.js.org/4425
*/

/* _____________ Your Code Here _____________ */

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type DigitStr = `${Digit}`;

type GreaterThanDict = {
  "0": Exclude<DigitStr, "0">;
  "1": Exclude<DigitStr, "0" | "1">;
  "2": Exclude<DigitStr, "0" | "1" | "2">;
  "3": Exclude<DigitStr, "0" | "1" | "2" | "3">;
  "4": Exclude<DigitStr, "0" | "1" | "2" | "3" | "4">;
  "5": "6" | "7" | "8" | "9";
  "6": "7" | "8" | "9";
  "7": "8" | "9";
  "8": "9";
  "9": never;
};

type GreaterThanDigitVersion<
  D1 extends DigitStr,
  D2 extends DigitStr
> = D1 extends GreaterThanDict[D2] ? true : false;

type NumStrToDigitStrArr<
  NumStr extends string,
  Result extends unknown[] = []
> = NumStr extends `${infer L}${infer Rest}`
  ? NumStrToDigitStrArr<Rest, [...Result, L]>
  : Result extends DigitStr[] // coerce return type into DigitStr[]
  ? Result
  : never;

type NumToDigitStrArr<N extends number> = NumStrToDigitStrArr<`${N}`>;

type GreaterThanDigitArrayVersion<
  TA extends DigitStr[],
  UA extends DigitStr[],
  NumTDigits extends number = TA["length"],
  NumUDigits extends number = UA["length"]
> = NumTDigits extends NumUDigits
  ? TA extends [
      infer TDigit extends DigitStr,
      ...infer TRest extends DigitStr[]
    ]
    ? UA extends [
        infer UDigit extends DigitStr,
        ...infer URest extends DigitStr[]
      ]
      ? GreaterThanDigitVersion<TDigit, UDigit> extends true
        ? true
        : GreaterThanDigitVersion<UDigit, TDigit> extends true
        ? false
        : GreaterThanDigitArrayVersion<TRest, URest>
      : never
    : false
  : GreaterThan<NumTDigits, NumUDigits>;

type GreaterThan<
  T extends number,
  U extends number
> = GreaterThanDigitArrayVersion<NumToDigitStrArr<T>, NumToDigitStrArr<U>>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "utils";

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<10, 9>, true>>,
  Expect<Equal<GreaterThan<9, 10>, false>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
  Expect<Equal<GreaterThan<1234567891011, 1234567891010>, true>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4425/answer
  > View solutions: https://tsch.js.org/4425/solutions
  > More Challenges: https://tsch.js.org
*/
