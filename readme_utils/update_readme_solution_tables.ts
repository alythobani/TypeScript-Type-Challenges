import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import {
  Difficulty,
  get_sorted_markdown_solution_table_lines,
} from "./generate_markdown_solution_table_lines.js";

function generateReadmeTable(
  difficulty: Difficulty,
  solutionFileNamesStr: string
): string {
  const headerLine = `| # | Challenge | Solution |`;
  const headerSeparatorLine = `|---|-----|-------|`;
  const tableLinesStr = get_sorted_markdown_solution_table_lines(
    solutionFileNamesStr,
    difficulty
  );
  return [headerLine, headerSeparatorLine, tableLinesStr].join("\n");
}

function updateReadme(
  difficulty: Difficulty,
  solutionFileNamesStr: string
): void {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const readmePath = path.join(__dirname, "..", "README.md");
  const readmeContents = fs.readFileSync(readmePath, "utf8");
  const newTable = generateReadmeTable(difficulty, solutionFileNamesStr);
  const [tableStart, tableEnd] = getTableSeparators(difficulty);
  const updatedReadmeContents = readmeContents.replace(
    new RegExp(`${tableStart}(.|\\n)*${tableEnd}`),
    `${tableStart}\n${newTable}\n${tableEnd}`
  );
  fs.writeFileSync(readmePath, updatedReadmeContents);
}

function getTableSeparators(difficulty: Difficulty): [string, string] {
  const tableStart = `<!-- ${difficulty.toUpperCase()} START -->`;
  const tableEnd = `<!-- ${difficulty.toUpperCase()} END -->`;
  console.log(tableStart);
  console.log(tableEnd);
  return [tableStart, tableEnd];
}

function main(): void {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const difficulties: Difficulty[] = ["easy", "medium", "hard"];
  for (const difficulty of difficulties) {
    console.log(`===\nUpdating ${difficulty} table...\n`);
    const solutionFileNamesStr = fs
      .readdirSync(path.join(__dirname, "..", "src", difficulty))
      .join(" ");
    console.log(solutionFileNamesStr);
    updateReadme(difficulty, solutionFileNamesStr);
    console.log(`${difficulty} table updated!\n\n`);
  }
}

main();
