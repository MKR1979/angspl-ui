import PizZip from 'pizzip';
import { DOMParser } from '@xmldom/xmldom';
import * as Constants from '../../constants/constants';

type QuizOption = {
  option_text: string;
  is_correct: boolean;
  explanation: string;
};

type QuizQuestion = {
  question: string;
  options: QuizOption[];
  explanation: string;
  status: string;
};

// Helper to parse XML string
function str2xml(str: string) {
  if (str.charCodeAt(0) === 65279) {
    // remove BOM
    str = str.substr(1);
  }
  return new DOMParser().parseFromString(str, 'text/xml');
}

// Extract paragraphs from DOCX content
function getParagraphs(content: ArrayBuffer): string[] {
  const zip = new PizZip(content);
  const xml = str2xml(zip.files['word/document.xml'].asText());
  const paragraphsXml = xml.getElementsByTagName('w:p');
  const paragraphs: string[] = [];

  for (let i = 0; i < paragraphsXml.length; i++) {
    let fullText = '';
    const textsXml = paragraphsXml[i].getElementsByTagName('w:t');
    for (let j = 0; j < textsXml.length; j++) {
      const textXml = textsXml[j];
      if (textXml.childNodes && textXml.childNodes[0]) {
        fullText += textXml.childNodes[0].nodeValue;
      }
    }
    if (fullText) paragraphs.push(fullText.trim());
  }
  return paragraphs;
}

export const parseDocxToQuizJson = async (arrayBuffer: ArrayBuffer) => {
  const lines = getParagraphs(arrayBuffer);

  if (!lines.length) throw new Error('The DOCX file is empty or improperly formatted.');

  const questions: QuizQuestion[] = [];
  let currentQuestion: QuizQuestion | null = null;
  let optionLines: string[] = [];
  let correctAnswers: string[] = [];
  let explanationText = '';

  //const questionPrefixRegex = /^(q(us)?|que|ques|question)[:\-\.\)\s]/i;  // working perfectly
  //const optionPrefixRegex = /^(\(?[a-zA-Z0-9ivxlcdm]+\)?)[\.\)\-\:\s]+/i;  //working but not for Option 1
  // const optionPrefixRegex = /^(?:Option\s*)?(\(?[a-zA-Z0-9ivxlcdm]+\)?)[\.\)\-\:\s]+/i;
  const optionPrefixRegex = /^([a-zA-Z]|\d+|[ivxlcdm]+)[\.\)\-\:]\s+(.+)/i;

  // const optionPrefixRegex = /^([a-zA-Z]|\d+|[ivxlcdm]+)[\.\)\-\:]\s*/i; // working but not for Q1
  const questionPrefixRegex = /^(q(us)?|que|ques|question)\s?\d*[\.\-\:\)\s]+/i;
  const explanationRegex = /^(exp|expl|explanation)[\-\.\:\)]\s*/i;
  const answerRegex = /^(ans|answer)[\.\:\)]\s*/i;

  // const answerRegex = /^(ans|answer)[\.\:\)\s]*\s*/i
  // const optionPrefixRegex = /^(\(?[a-zA-Z0-9ivxlcdm]+\)?)[\.\)\-\:\s]+/i;

  // const finalizeQuestion = () => {
  //   if (!currentQuestion || !optionLines.length) return;

  //   const options: QuizOption[] = optionLines.map((line) => {
  //     const match = line.match(optionPrefixRegex);
  //     const prefix = match?.[1]?.toLowerCase() ?? '';
  //     const optionText = line.replace(optionPrefixRegex, '').trim();
  //     const isCorrect = correctAnswers.map((a) => a.toLowerCase()).includes(prefix);

  //     return {
  //       option_text: optionText,
  //       is_correct: isCorrect,
  //       explanation: isCorrect ? explanationText : ''
  //     };
  //   });

  //   currentQuestion.options = options;
  //   questions.push(currentQuestion);

  //   currentQuestion = null;
  //   optionLines = [];
  //   correctAnswers = [];
  //   explanationText = '';
  // };

//   const finalizeQuestion = () => {
//   if (!currentQuestion) return;

//   // yaha check laga diya
//   if (!optionLines.length) {
//     throw new Error(`Question "${currentQuestion.question}" Some options are missing. Check the DOCX.`);
//   }

//   const options: QuizOption[] = optionLines.map((line) => {
//     const match = line.match(optionPrefixRegex);
//     const prefix = match?.[1]?.toLowerCase() ?? '';
//     const optionText = match?.[2]?.trim() ?? '';
//     const isCorrect = correctAnswers.map((a) => a.toLowerCase()).includes(prefix);

//       return {
//       option_text: optionText,
//       is_correct: isCorrect,
//       explanation: isCorrect ? explanationText : ''
//     };
//   });

//   currentQuestion.options = options;
//   questions.push(currentQuestion);

//   currentQuestion = null;
//   optionLines = [];
//   correctAnswers = [];
//   explanationText = '';
// };

const finalizeQuestion = () => {
  if (!currentQuestion) return;

  // Store in local variable to satisfy TypeScript
  const question = currentQuestion;

  // Validate options
  if (!optionLines.length) {
    throw new Error(`Question "${question.question}" is missing options. Check the DOCX.`);
  }

  // Validate correct answers
  if (!correctAnswers.length) {
    throw new Error(`Question "${question.question}" has no correct answer. Check the DOCX.`);
  }

  // Validate explanation
  // if (!explanationText.trim()) {
  //   throw new Error(`Question "${question.question}" is missing explanation. Check the DOCX.`);
  // }

  // Build options
  const options: QuizOption[] = optionLines.map((line) => {
    const match = line.match(optionPrefixRegex);
    const prefix = match?.[1]?.toLowerCase() ?? '';
    const optionText = match?.[2]?.trim() ?? '';

    const isCorrectByPrefix = correctAnswers.map((a) => a.toLowerCase()).includes(prefix);
    const isCorrectByText = correctAnswers.some(
      (a) => a.trim().toLowerCase() === optionText.toLowerCase()
    );

    const isCorrect = isCorrectByPrefix || isCorrectByText;

    return {
      option_text: optionText,
      is_correct: isCorrect,
      explanation: isCorrect ? explanationText : ''
    };
  });

  // Ensure all correctAnswers exist in options
  correctAnswers.forEach((answer) => {
    const found = options.some(
      (opt) =>
        opt.option_text.toLowerCase() === answer.toLowerCase() ||
        optionLines.some((line) => line.match(optionPrefixRegex)?.[1]?.toLowerCase() === answer.toLowerCase())
    );
    if (!found) {
      throw new Error(
        `Question "${question.question}" has a correct answer "${answer}" that does not match any option.`
      );
    }
  });

  question.options = options;
  questions.push(question);

  // Reset temp variables
  currentQuestion = null;
  optionLines = [];
  correctAnswers = [];
  explanationText = '';
};



  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Question detection (Q:, Qus:, Question:)
    if (questionPrefixRegex.test(line)) {
      finalizeQuestion();
      currentQuestion = {
        question: line.replace(questionPrefixRegex, '').trim(),
        options: [],
        explanation: '',
        status: Constants.IMPORT_QUIZ_DOCX_STATUS
      };
    }
    // Option detection
    else if (optionPrefixRegex.test(line)) {
      optionLines.push(line);
    }
    // Answer detection
    else if (answerRegex.test(line)) {
      correctAnswers = line
        .replace(answerRegex, '')
        .split(',')
        .map((ans) => ans.trim().toLowerCase())
        .filter(Boolean);
    } else if (explanationRegex.test(line)) {
      explanationText = line.replace(explanationRegex, '').trim();
    }
    // Multi-line question continuation
    else if (currentQuestion && !optionLines.length) {
      currentQuestion.question += ' ' + line;
    }
    // Multi-line option continuation
    else if (optionLines.length && !answerRegex.test(line) && !explanationRegex.test(line)) {
      optionLines[optionLines.length - 1] += ' ' + line;
    }
  }

  finalizeQuestion();

  return [{ questions }];
};
