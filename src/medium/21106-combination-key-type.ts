/*
  21106 - Combination key type
  -------
  by Nauxscript (@Nauxscript) #medium

  ### Question

  1. Combine multiple modifier keys, but the same modifier key combination cannot appear.
  2. In the `ModifierKeys` provided, the priority of the previous value is higher than the latter value; that is, `cmd ctrl` is OK, but `ctrl cmd` is not allowed.

  > View on GitHub: https://tsch.js.org/21106
*/

/* _____________ Your Code Here _____________ */

// 实现 Combs
type Combs<
  T extends string[],
  Result extends string = never,
  Key1 extends string = never
> = T extends [infer F extends string, ...infer Rest extends string[]]
  ? [Key1] extends [never]
    ? Combs<Rest, Result, never> | Combs<Rest, Result, F>
    : Combs<Rest, Result | `${Key1} ${F}`, never> | Combs<Rest, Result, Key1>
  : Result;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "utils";

type ModifierKeys = ["cmd", "ctrl", "opt", "fn"];
type CaseTypeOne =
  | "cmd ctrl"
  | "cmd opt"
  | "cmd fn"
  | "ctrl opt"
  | "ctrl fn"
  | "opt fn";

type actual = Combs<ModifierKeys>;

type cases = [Expect<Equal<Combs<ModifierKeys>, CaseTypeOne>>];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/21106/answer
  > View solutions: https://tsch.js.org/21106/solutions
  > More Challenges: https://tsch.js.org
*/
