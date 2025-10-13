// 'use client';
// import pdfjsLib from 'pdfjs-dist/legacy/build/pdf'; 
// // import * as pdfjsLib from 'pdfjs-dist';

// // PDF.js worker (required)
// pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// export type QuizOption = {
//   option_text: string;
//   is_correct: boolean;
//   explanation: string;
// };

// export type QuizQuestion = {
//   question: string;
//   options: QuizOption[];
//   explanation: string;
//   status: string;
// };

// /**
//  * Parse an array of lines (text) into quiz JSON
//  * Logic is same as DOCX line parser
//  */
// export const parseLinesToQuizJson = async (lines: string[]) => {
//   if (!lines.length) throw new Error('No content to parse');

//   const questions: QuizQuestion[] = [];
//   let currentQuestion: QuizQuestion | null = null;
//   let optionLines: string[] = [];
//   let correctAnswers: string[] = [];
//   let explanationText = '';

//   const optionPrefixRegex = /^([a-zA-Z]|\d+|[ivxlcdm]+)[\.\)\-\:]\s*/i;
//   const questionPrefixRegex = /^(q(us)?|que|ques|question)\s?\d*[\.\-\:\)\s]+/i;
//   const explanationRegex = /^(exp|expl|explanation)[\-\.\:\)]\s*/i;
//   const answerRegex = /^(ans|answer)[\.\:\)]\s*/i;

//   const finalizeQuestion = () => {
//     if (!currentQuestion || !optionLines.length) return;

//     const options: QuizOption[] = optionLines.map(line => {
//       const match = line.match(optionPrefixRegex);
//       const prefix = match?.[1]?.toLowerCase() ?? '';
//       const optionText = line.replace(optionPrefixRegex, '').trim();
//       const isCorrect = correctAnswers.map(a => a.toLowerCase()).includes(prefix);
//       return { option_text: optionText, is_correct: isCorrect, explanation: isCorrect ? explanationText : '' };
//     });

//     currentQuestion.options = options;
//     questions.push(currentQuestion);

//     currentQuestion = null;
//     optionLines = [];
//     correctAnswers = [];
//     explanationText = '';
//   };

//   for (let i = 0; i < lines.length; i++) {
//     const line = lines[i];
//     if (questionPrefixRegex.test(line)) {
//       finalizeQuestion();
//       currentQuestion = { question: line.replace(questionPrefixRegex, '').trim(), options: [], explanation: '', status: 'NEW' };
//     } else if (optionPrefixRegex.test(line)) {
//       optionLines.push(line);
//     } else if (answerRegex.test(line)) {
//       correctAnswers = line.replace(answerRegex, '').split(',').map(a => a.trim().toLowerCase()).filter(Boolean);
//     } else if (explanationRegex.test(line)) {
//       explanationText = line.replace(explanationRegex, '').trim();
//     } else if (currentQuestion && !optionLines.length) {
//       currentQuestion.question += ' ' + line;
//     } else if (optionLines.length && !answerRegex.test(line) && !explanationRegex.test(line)) {
//       optionLines[optionLines.length - 1] += ' ' + line;
//     }
//   }

//   finalizeQuestion();
//   return [{ questions }];
// };

// /**
//  * Extract all lines of text from a PDF file
//  */
// export const extractPdfLines = async (file: File): Promise<string[]> => {
//   const arrayBuffer = await file.arrayBuffer();
//   const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

//   const lines: string[] = [];
//   for (let i = 1; i <= pdf.numPages; i++) {
//     const page = await pdf.getPage(i);
//     const textContent = await page.getTextContent();
//     const pageText = textContent.items
//       .map(item => (item as any).str)
//       .join(' ');
//     lines.push(...pageText.split(/\r?\n/).map(l => l.trim()).filter(Boolean));
//   }

//   return lines;
// };

// // export const extractPdfLines = async (file: File): Promise<string[]> => {
// //   const arrayBuffer = await file.arrayBuffer();
// //   const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

// //   const lines: string[] = [];

// //   for (let i = 1; i <= pdf.numPages; i++) {
// //     const page = await pdf.getPage(i);
// //     const textContent = await page.getTextContent();
// //     // Specify type for item
// //     const pageText = textContent.items
// //       .map((item: { str: string }) => item.str) // cast item to correct type
// //       .join(' ');

// //     // Specify type for l
// //     lines.push(...pageText.split(/\r?\n/).map((l: string) => l.trim()).filter(Boolean));
// //   }

// //   return lines;
// // };

// /**
//  * Parse a PDF file into quiz JSON
//  */
// export const parsePdfToQuizJson = async (file: File) => {
//   const lines = await extractPdfLines(file);
//   if (!lines.length) throw new Error('PDF file is empty or unreadable.');
//   return parseLinesToQuizJson(lines);
// };


//*********************************** */



// pdfParser.ts
// 'use client'; // make sure this runs only on client

// export type QuizOption = {
//   option_text: string;
//   is_correct: boolean;
//   explanation: string;
// };

// export type QuizQuestion = {
//   question: string;
//   options: QuizOption[];
//   explanation: string;
//   status: string;
// };

// // Function to parse lines (same logic as DOCX)
// export const parseLinesToQuizJson = async (lines: string[]) => {
//   if (!lines.length) throw new Error('No content to parse');

//   const questions: QuizQuestion[] = [];
//   let currentQuestion: QuizQuestion | null = null;
//   let optionLines: string[] = [];
//   let correctAnswers: string[] = [];
//   let explanationText = '';

//   const optionPrefixRegex = /^([a-zA-Z]|\d+|[ivxlcdm]+)[\.\)\-\:]\s*/i;
//   const questionPrefixRegex = /^(q(us)?|que|ques|question)\s?\d*[\.\-\:\)\s]+/i;
//   const explanationRegex = /^(exp|expl|explanation)[\-\.\:\)]\s*/i;
//   const answerRegex = /^(ans|answer)[\.\:\)]\s*/i;

//   const finalizeQuestion = () => {
//     if (!currentQuestion || !optionLines.length) return;

//     const options: QuizOption[] = optionLines.map(line => {
//       const match = line.match(optionPrefixRegex);
//       const prefix = match?.[1]?.toLowerCase() ?? '';
//       const optionText = line.replace(optionPrefixRegex, '').trim();
//       const isCorrect = correctAnswers.map(a => a.toLowerCase()).includes(prefix);
//       return { option_text: optionText, is_correct: isCorrect, explanation: isCorrect ? explanationText : '' };
//     });

//     currentQuestion.options = options;
//     questions.push(currentQuestion);

//     currentQuestion = null;
//     optionLines = [];
//     correctAnswers = [];
//     explanationText = '';
//   };

//   for (let i = 0; i < lines.length; i++) {
//     const line = lines[i];
//     if (questionPrefixRegex.test(line)) {
//       finalizeQuestion();
//       currentQuestion = { question: line.replace(questionPrefixRegex, '').trim(), options: [], explanation: '', status: 'NEW' };
//     } else if (optionPrefixRegex.test(line)) {
//       optionLines.push(line);
//     } else if (answerRegex.test(line)) {
//       correctAnswers = line.replace(answerRegex, '').split(',').map(a => a.trim().toLowerCase()).filter(Boolean);
//     } else if (explanationRegex.test(line)) {
//       explanationText = line.replace(explanationRegex, '').trim();
//     } else if (currentQuestion && !optionLines.length) {
//       currentQuestion.question += ' ' + line;
//     } else if (optionLines.length && !answerRegex.test(line) && !explanationRegex.test(line)) {
//       optionLines[optionLines.length - 1] += ' ' + line;
//     }
//   }

//   finalizeQuestion();
//   return [{ questions }];
// };

// //   export const parsePdfToQuizJson = async (file: File) => {
// //   if (typeof window === 'undefined') {
// //     throw new Error('PDF parsing must run on client side');
// //   }
// //   // ✅ Use browser build
// //   const pdfjsLib = await import('pdfjs-dist/build/pdf');
// //   pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
// //   const arrayBuffer = await file.arrayBuffer();
// //   const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
// //   const lines: string[] = [];
// //   for (let i = 1; i <= pdf.numPages; i++) {
// //     const page = await pdf.getPage(i);
// //     const textContent = await page.getTextContent();
// //     const pageText = textContent.items.map((item: any) => item.str).join(' ');
// //     lines.push(
// //       ...pageText.split(/\r?\n/).map((l: string) => l.trim()).filter(Boolean)
// //     );
// //   }

// //   if (!lines.length) throw new Error('PDF file is empty or unreadable.');
// //   return parseLinesToQuizJson(lines);
// // };


// // PDF parsing
// export const parsePdfToQuizJson = async (file: File) => {
//   const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf'); // dynamic import
//   pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

//   const arrayBuffer = await file.arrayBuffer();
//   const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

//   const lines: string[] = [];
//   for (let i = 1; i <= pdf.numPages; i++) {
//     const page = await pdf.getPage(i);
//     const textContent = await page.getTextContent();
//     const pageText = textContent.items
//       .map((item: any) => item.str)
//       .join(' ');
//     lines.push(...pageText.split(/\r?\n/).map((l: string) => l.trim()).filter(Boolean));
//   }
//   if (!lines.length) throw new Error('PDF file is empty or unreadable.');
//   return parseLinesToQuizJson(lines);
// };



'use client';

export type QuizOption = {
  option_text: string;
  is_correct: boolean;
  explanation: string;
};

export type QuizQuestion = {
  question: string;
  options: QuizOption[];
  explanation: string;
  status: string;
};


export const parsePdfToQuizJson = async (lines: string[]) => {
  if (!lines.length) throw new Error('No content to parse');

  const questions: QuizQuestion[] = [];
  let currentQuestion: QuizQuestion | null = null;
  let optionLines: string[] = [];
  let correctAnswers: string[] = [];
  let explanationText = '';

  const optionPrefixRegex = /^([a-zA-Z]|\d+|[ivxlcdm]+)[\.\)\-\:]\s*/i;
  const questionPrefixRegex = /^(q(us)?|que|ques|question)\s?\d*[\.\-\:\)\s]+/i;
  const explanationRegex = /^(exp|expl|explanation)[\-\.\:\)]\s*/i;
  const answerRegex = /^(ans|answer)[\.\:\)]\s*/i;

  const finalizeQuestion = () => {
    if (!currentQuestion || !optionLines.length) return;

    const options: QuizOption[] = optionLines.map((line) => {
      const match = line.match(optionPrefixRegex);
      const prefix = match?.[1]?.toLowerCase() ?? '';
      const optionText = line.replace(optionPrefixRegex, '').trim();
      const isCorrect = correctAnswers.map(a => a.toLowerCase()).includes(prefix);

      return {
        option_text: optionText,
        is_correct: isCorrect,
        explanation: isCorrect ? explanationText : ''
      };
    });

    currentQuestion.options = options;
    questions.push(currentQuestion);

    currentQuestion = null;
    optionLines = [];
    correctAnswers = [];
    explanationText = '';
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (questionPrefixRegex.test(line)) {
      finalizeQuestion();
      currentQuestion = {
        question: line.replace(questionPrefixRegex, '').trim(),
        options: [],
        explanation: '',
        status: 'NEW'
      };
    } else if (optionPrefixRegex.test(line)) {
      optionLines.push(line);
    } else if (answerRegex.test(line)) {
      correctAnswers = line.replace(answerRegex, '')
        .split(',')
        .map(a => a.trim().toLowerCase())
        .filter(Boolean);
    } else if (explanationRegex.test(line)) {
      explanationText = line.replace(explanationRegex, '').trim();
    } else if (currentQuestion && !optionLines.length) {
      currentQuestion.question += ' ' + line;
    } else if (optionLines.length && !answerRegex.test(line) && !explanationRegex.test(line)) {
      optionLines[optionLines.length - 1] += ' ' + line; 
    }
  }

  finalizeQuestion();

  return [{ questions }];
};
