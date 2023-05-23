/*
  16259 - ToPrimitive
  -------
  by 前端子鱼 (@mwc) #medium

  ### Question

  Convert a property of type literal (label type) to a primitive type.

  For example

  ```typescript
  type X = {
    name: 'Tom',
    age: 30,
    married: false,
    addr: {
      home: '123456',
      phone: '13111111111'
    }
  }

  type Expected = {
    name: string,
    age: number,
    married: boolean,
    addr: {
      home: string,
      phone: string
    }
  }
  type Todo = ToPrimitive<X> // should be same as `Expected`
  ```

  > View on GitHub: https://tsch.js.org/16259
*/

/* _____________ Your Code Here _____________ */

type ToPrimitiveArray<
  A extends unknown[],
  Res extends unknown[] = []
> = A extends [infer F, ...infer R]
  ? ToPrimitiveArray<R, [...Res, ToPrimitive<F>]>
  : Res;

type ToPrimitiveReadonlyArray<
  A extends readonly unknown[],
  Res extends readonly unknown[] = readonly []
> = A extends readonly [infer F, ...infer R]
  ? ToPrimitiveReadonlyArray<R, readonly [...Res, ToPrimitive<F>]>
  : Res;

type ToPrimitive<T> = T extends string
  ? string
  : T extends number
  ? number
  : T extends boolean
  ? boolean
  : T extends Function
  ? Function
  : T extends any[]
  ? ToPrimitiveArray<T>
  : T extends readonly any[]
  ? ToPrimitiveReadonlyArray<T>
  : { [K in keyof T]: ToPrimitive<T[K]> };

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "utils";

type PersonInfo = {
  name: "Tom";
  age: 30;
  married: false;
  addr: {
    home: "123456";
    phone: "13111111111";
  };
  hobbies: ["sing", "dance"];
  readonlyArr: readonly ["test"];
  fn: () => any;
};

type ExpectedResult = {
  name: string;
  age: number;
  married: boolean;
  addr: {
    home: string;
    phone: string;
  };
  hobbies: [string, string];
  readonlyArr: readonly [string];
  fn: Function;
};

type actual = ToPrimitive<PersonInfo>;

type cases = [Expect<Equal<ToPrimitive<PersonInfo>, ExpectedResult>>];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/16259/answer
  > View solutions: https://tsch.js.org/16259/solutions
  > More Challenges: https://tsch.js.org
*/
