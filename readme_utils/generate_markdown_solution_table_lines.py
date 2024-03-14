import re
from dataclasses import dataclass
from typing import List, Literal

import pyperclip  # type: ignore[import-untyped]

SOLUTION_FILE_NAME_REGEX = r"(\d+)-(.+).ts"


@dataclass
class Challenge:
    number: int
    title: str
    solution_file_name: str
    solution_file_path: str


Difficulty = Literal["easy", "medium", "hard"]


def get_sorted_markdown_solution_table_lines(
    solution_file_names_str: str, difficulty: Difficulty = "easy"
):
    # pylint: disable=line-too-long
    """Generates a markdown table of the challenge numbers, names, and file names based on the input
    string of whitespace-separated challenge file names (output from an `ls` call).

    The markdown table lines will be copied to the clipboard (in addition to returning them as a
    string), for easy pasting into the README.

    Args:
        solution_file_names_str (str): A string of whitespace-separated solution file names.

    >>> get_sorted_markdown_solution_table_lines("11-tuple-to-object.ts     18-length-of-tuple.ts\n4-pick.ts")
    Copied to clipboard / returned (newline-separated string):
    | 4 | [Pick](https://tsch.js.org/4) | [4-pick.ts](src/easy/4-pick.ts) |
    | 11 | [Tuple to Object](https://tsch.js.org/11) | [11-tuple-to-object.ts](src/easy/11-tuple-to-object.ts) |
    | 18 | [Length of Tuple](https://tsch.js.org/18) | [18-length-of-tuple.ts](src/easy/18-length-of-tuple.ts) |
    """
    challenges: List[Challenge] = get_parsed_challenges(
        solution_file_names_str=solution_file_names_str, difficulty=difficulty
    )
    sorted_challenges = sorted(challenges, key=lambda challenge: challenge.number)
    sorted_markdown_table_lines = map(get_markdown_table_line, sorted_challenges)
    sorted_markdown_table_lines_str = "\n".join(sorted_markdown_table_lines)
    pyperclip.copy(sorted_markdown_table_lines_str)
    return sorted_markdown_table_lines_str


def get_parsed_challenges(
    solution_file_names_str: str, difficulty: Difficulty
) -> List[Challenge]:
    parsed_challenges = []
    solution_file_names = solution_file_names_str.split()
    for solution_file_name in solution_file_names:
        parsed_challenge = get_parsed_challenge(
            solution_file_name=solution_file_name, difficulty=difficulty
        )
        parsed_challenges.append(parsed_challenge)
    return parsed_challenges


def get_parsed_challenge(solution_file_name: str, difficulty: Difficulty) -> Challenge:
    solution_regex_match = re.match(SOLUTION_FILE_NAME_REGEX, solution_file_name)
    if solution_regex_match is None:
        raise ValueError(
            f"Solution file name {solution_file_name} does not match the expected format."
        )
    number_str, kebab_case_name = solution_regex_match.groups()
    number = int(number_str)
    title_case_name = kebab_case_name.replace("-", " ").title()
    return Challenge(
        number=number,
        title=title_case_name,
        solution_file_name=solution_file_name,
        solution_file_path=f"src/{difficulty}/{solution_file_name}",
    )


def get_markdown_table_line(challenge: Challenge) -> str:
    num = challenge.number
    challenge_title_and_link = f"[{challenge.title}](https://tsch.js.org/{num})"
    solution_name_and_link = (
        f"[{challenge.solution_file_name}]({challenge.solution_file_path})"
    )
    return f"| {num} | {challenge_title_and_link} | {solution_name_and_link} |"
