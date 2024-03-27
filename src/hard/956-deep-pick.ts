/*
  956 - DeepPick
  -------
  by hiroya iizuka (@hiroyaiizuka) #hard #deep

  ### Question

  Implement a type DeepPick, that extends Utility types `Pick`.
  A type takes two arguments.


  For example:

  ```ts
  type obj = {
    name: 'hoge',
    age: 20,
    friend: {
      name: 'fuga',
      age: 30,
      family: {
        name: 'baz',
        age: 1
      }
    }
  }

  type T1 = DeepPick<obj, 'name'>   // { name : 'hoge' }
  type T2 = DeepPick<obj, 'name' | 'friend.name'>  // { name : 'hoge' } & { friend: { name: 'fuga' }}
  type T3 = DeepPick<obj, 'name' | 'friend.name' |  'friend.family.name'>  // { name : 'hoge' } &  { friend: { name: 'fuga' }} & { friend: { family: { name: 'baz' }}}

  ```

  > View on GitHub: https://tsch.js.org/956
*/

/* _____________ Your Code Here _____________ */

type UnionToIntersection<U> = (U extends U ? (x: U) => 0 : never) extends (
  x: infer V
) => 0
  ? V
  : never;

type DeepPickHelper<O, S extends string> = S extends S
  ? S extends keyof O
    ? { [K in S]: O[K] }
    : S extends `${infer FirstKey extends string & keyof O}.${infer R}`
      ? { [K in FirstKey]: DeepPickHelper<O[K], R> }
      : never
  : never;

type DeepPick<O, S extends string> = UnionToIntersection<DeepPickHelper<O, S>>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "utils";

type Obj = {
  a: number;
  b: string;
  c: boolean;
  obj: {
    d: number;
    e: string;
    f: boolean;
    obj2: {
      g: number;
      h: string;
      i: boolean;
    };
  };
  obj3: {
    j: number;
    k: string;
    l: boolean;
  };
};

type case1 = DeepPick<Obj, "">;
type case2 = DeepPick<Obj, "a">;
type case3 = DeepPick<Obj, "a" | "">;
type case4 = DeepPick<Obj, "a" | "obj.e">;
type case5 = DeepPick<Obj, "a" | "obj.e" | "obj.obj2.i">;

type cases = [
  Expect<Equal<DeepPick<Obj, "">, unknown>>,
  Expect<Equal<DeepPick<Obj, "a">, { a: number }>>,
  Expect<Equal<DeepPick<Obj, "a" | "">, { a: number } & unknown>>,
  Expect<
    Equal<DeepPick<Obj, "a" | "obj.e">, { a: number } & { obj: { e: string } }>
  >,
  Expect<
    Equal<
      DeepPick<Obj, "a" | "obj.e" | "obj.obj2.i">,
      { a: number } & { obj: { e: string } } & { obj: { obj2: { i: boolean } } }
    >
  >,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/956/answer
  > View solutions: https://tsch.js.org/956/solutions
  > More Challenges: https://tsch.js.org
*/
