import clipboard from "clipboardy";

const SOLUTION_FILE_NAME_REGEX = /^(\d+)-(.+)\.ts$/;

export type Challenge = {
  number: number;
  title: string;
  solution_file_name: string;
  solution_file_path: string;
};

export type Difficulty = "easy" | "medium" | "hard";

export function get_sorted_markdown_solution_table_lines(
  solution_file_names_str: string,
  difficulty: Difficulty = "easy"
) {
  const challenges = get_parsed_challenges(solution_file_names_str, difficulty);
  const sortedChallenges = challenges.sort((a, b) => a.number - b.number);
  const sortedMarkdownTableLines = sortedChallenges.map(getMarkdownTableLine);
  const sortedMarkdownTableLinesStr = sortedMarkdownTableLines.join("\n");
  clipboard.writeSync(sortedMarkdownTableLinesStr);
  return sortedMarkdownTableLinesStr;
}

function get_parsed_challenges(
  solution_file_names_str: string,
  difficulty: Difficulty
): Challenge[] {
  const parsedChallenges = [];
  const solutionFileNames = solution_file_names_str.split(/\s+/);
  for (const solutionFileName of solutionFileNames) {
    const parsedChallenge = get_parsed_challenge(solutionFileName, difficulty);
    parsedChallenges.push(parsedChallenge);
  }
  return parsedChallenges;
}

function get_parsed_challenge(
  solution_file_name: string,
  difficulty: Difficulty
): Challenge {
  const solutionRegexMatch = solution_file_name.match(SOLUTION_FILE_NAME_REGEX);
  if (solutionRegexMatch === null) {
    throw new Error(
      `Solution file name ${solution_file_name} does not match the expected format.`
    );
  }
  const [_, numberStr, kebabCaseName] = solutionRegexMatch;
  const number = parseInt(numberStr, 10);
  const titleCaseName = kebabCaseName
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
  return {
    number,
    title: titleCaseName,
    solution_file_name,
    solution_file_path: `src/${difficulty}/${solution_file_name}`,
  };
}

function getMarkdownTableLine(challenge: Challenge): string {
  const num = challenge.number;
  const challengeTitleAndLink = `[${challenge.title}](https://tsch.js.org/${num})`;
  const solutionNameAndLink = `[${challenge.solution_file_name}](${challenge.solution_file_path})`;
  return `| ${num} | ${challengeTitleAndLink} | ${solutionNameAndLink} |`;
}
