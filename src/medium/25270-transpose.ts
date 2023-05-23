/*
  25270 - Transpose
  -------
  by Apollo Wayne (@Shinerising) #medium #array #math

  ### Question

  The transpose of a matrix is an operator which flips a matrix over its diagonal; that is, it switches the row and column indices of the matrix A by producing another matrix, often denoted by A<sup>T</sup>.

  ```ts
  type Matrix = Transpose <[[1]]>; // expected to be [[1]]
  type Matrix1 = Transpose <[[1, 2], [3, 4]]>; // expected to be [[1, 3], [2, 4]]
  type Matrix2 = Transpose <[[1, 2, 3], [4, 5, 6]]>; // expected to be [[1, 4], [2, 5], [3, 6]]
  ```

  > View on GitHub: https://tsch.js.org/25270
*/

/* _____________ Your Code Here _____________ */

/** Appends each Row[i] to each M_T[i].
 *
 * AppendDown<[], [1,2,3]> => [[1],[2],[3]]
 * AppendDown<[[1],[2],[3]], [4,5,6]> => [[1,4],[2,5],[3,6]]
 */
type AppendDown<
  M_T extends number[][],
  Row extends number[],
  Result extends number[][] = []
> = Row extends [
  infer FirstVal extends number,
  ...infer RestVals extends number[]
]
  ? M_T extends [
      infer FirstRow extends number[],
      ...infer RestRows extends number[][]
    ]
    ? AppendDown<RestRows, RestVals, [...Result, [...FirstRow, FirstVal]]>
    : AppendDown<[], RestVals, [...Result, [FirstVal]]>
  : Result;

type Transpose<M extends number[][], M_T extends number[][] = []> = M extends [
  infer First extends number[],
  ...infer Rest extends number[][]
]
  ? Transpose<Rest, AppendDown<M_T, First>>
  : M_T;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "utils";

type cases = [
  Expect<Equal<Transpose<[]>, []>>,
  Expect<Equal<Transpose<[[1]]>, [[1]]>>,
  Expect<Equal<Transpose<[[1, 2]]>, [[1], [2]]>>,
  Expect<Equal<Transpose<[[1, 2], [3, 4]]>, [[1, 3], [2, 4]]>>,
  Expect<Equal<Transpose<[[1, 2, 3], [4, 5, 6]]>, [[1, 4], [2, 5], [3, 6]]>>,
  Expect<Equal<Transpose<[[1, 4], [2, 5], [3, 6]]>, [[1, 2, 3], [4, 5, 6]]>>,
  Expect<
    Equal<
      Transpose<[[1, 2, 3], [4, 5, 6], [7, 8, 9]]>,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9]]
    >
  >
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/25270/answer
  > View solutions: https://tsch.js.org/25270/solutions
  > More Challenges: https://tsch.js.org
*/
