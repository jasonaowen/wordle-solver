import answers from './answers.json';
import allowed from './allowed.json';

const words = [...answers, ...allowed].sort();

// type character = '🟩' | '🟨' | '⬛' | '⬜';

interface Grid {
  lines: string[];
//  day?: number;
//  hard: boolean;
//  mode: 'light' | 'dark';
}

const generateRegex = (answer: string, line: string): RegExp => {
  const answerCharacters = new Set([...answer]);
  for (let i = 0; i < 5; i++) {
    if (line.charAt(i) === '🟩') {
      answerCharacters.delete(answer.charAt(i));
    }
  }
  const answerChars = [...answerCharacters.values()];

  const characterRegexes = [...line].map((character: string, index: number) => {
    switch (character) {
      case '🟩':
        return answer[index];
      case '🟨':
        return `[${answerChars.filter((c) => c !== answer.charAt(index)).join('')}]`;
      case '⬛':
      case '⬜':
        return '[^answer]';
      default:
        throw new Error('invalid grid character');
    }
  });
  return new RegExp(['^', ...characterRegexes, '$'].join(''));
};

const matches = (line: string, answer: string, word: string): boolean => (
  (generateRegex(answer, line)).test(word)
);

const wordExists = (line: string, answer: string): boolean => (
  words.some((word) => matches(line, answer, word))
);

const evaluate = (grid: Grid, answer: string): boolean => (
  grid.lines.every((line) => wordExists(line, answer))
);

const possibleAnswers = (grid: Grid): string[] => (
  answers.filter((answer) => evaluate(grid, answer))
);

/*
    '🟩🟩🟩🟩⬜',
    '🟩🟩🟩🟩⬜',
    '🟩🟩🟩🟩🟩',
*/
// type character = '🟩' | '🟨' | '⬛' | '⬜';
const grid: Grid = {
  lines: [
    '🟩🟩⬜🟨⬜',
    '🟩🟩🟩⬜⬜',
    '🟩🟩🟩🟩⬜',
    '🟩🟩🟩🟩🟩',
  ],
};
console.log(JSON.stringify(possibleAnswers(grid)));
