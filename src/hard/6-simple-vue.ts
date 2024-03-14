/*
  6 - Simple Vue
  -------
  by Anthony Fu (@antfu) #hard #this #application #vue

  ### Question

  Implement a simpiled version of a Vue-like typing support.

  By providing a function name `SimpleVue` (similar to `Vue.extend` or `defineComponent`), it should properly infer the `this` type inside computed and methods.

  In this challenge, we assume that SimpleVue take an Object with `data`, `computed` and `methods` fields as it's only argument,

  - `data` is a simple function that returns an object that exposes the context `this`, but you won't be accessible to other computed values or methods.

  - `computed` is an Object of functions that take the context as `this`, doing some calculation and returns the result. The computed results should be exposed to the context as the plain return values instead of functions.

  - `methods` is an Object of functions that take the context as `this` as well. Methods can access the fields exposed by `data`, `computed` as well as other `methods`. The different between `computed` is that `methods` exposed as functions as-is.

  The type of `SimpleVue`'s return value can be arbitrary.

  ```ts
  const instance = SimpleVue({
    data() {
      return {
        firstName: 'Type',
        lastName: 'Challenges',
        amount: 10,
      }
    },
    computed: {
      fullName() {
        return this.firstName + ' ' + this.lastName
      }
    },
    methods: {
      hi() {
        alert(this.fullName.toLowerCase())
      }
    }
  })
  ```

  > View on GitHub: https://tsch.js.org/6
*/

/* _____________ Your Code Here _____________ */

type DataBase = {
  [dataField: string]: unknown;
};

type ComputedBase = {
  [computedField: string]: () => unknown;
};

type MethodsBase = {
  [methodName: string]: () => unknown;
};

type ComputedFields<C extends ComputedBase> = {
  [K in keyof C]: C[K] extends () => infer R ? R : never;
};

/** Attempted the following, but it didn't work to resolve all test cases. It seems maybe it's not
 * possible without using the "magical" `ThisType` utility type.
 * See: https://github.com/type-challenges/type-challenges/issues/11#issuecomment-687556070
 */

// type WithThisContext<M, ThisContext> = {
//   [MKey in keyof M]: M[MKey] extends () => infer MRet
//     ? (this: ThisContext) => MRet
//     : never;
// };

type WithThisContext<M, ThisContext> = M & ThisType<ThisContext>;

type SimpleVueOptions<
  D extends DataBase,
  C extends ComputedBase,
  M extends MethodsBase
> = {
  data: (this: void) => D;
  computed: WithThisContext<C, D>;
  methods: WithThisContext<M, D & ComputedFields<C> & M>;
};

declare function SimpleVue<
  D extends DataBase,
  C extends ComputedBase,
  M extends MethodsBase
>(options: SimpleVueOptions<D, C, M>): any;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "utils";

SimpleVue({
  data() {
    // @ts-expect-error
    this.firstName;
    // @ts-expect-error
    this.getRandom();
    // @ts-expect-error
    this.data();

    return {
      firstName: "Type",
      lastName: "Challenges",
      amount: 10,
    };
  },
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
  },
  methods: {
    getRandom() {
      return Math.random();
    },
    hi() {
      alert(this.amount);
      alert(this.fullName.toLowerCase());
      alert(this.getRandom());
    },
    test() {
      const fullName = this.fullName;
      const cases: [Expect<Equal<typeof fullName, string>>] = [] as any;
    },
  },
});

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/6/answer
  > View solutions: https://tsch.js.org/6/solutions
  > More Challenges: https://tsch.js.org
*/
