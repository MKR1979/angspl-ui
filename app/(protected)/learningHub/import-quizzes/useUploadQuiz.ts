import React, { useCallback, useState, useEffect, useReducer, ChangeEvent } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { ADD_QUIZ_DATA } from '@/app/graphql/Quiz';
import Papa from 'papaparse';
import pdftotext from 'react-pdftotext';
import { parseDocxToQuizJson } from './docxParser';
import { parsePdfToQuizJson } from './pdfParser';
import { COURSE_LOOKUP } from '@/app/graphql/Course';
import LookupDTO from '@/app/types/LookupDTO';
import { arrQuizStatus, arrQuizType, capitalizeWords } from '@/app/common/Configuration';
import QuizDTO, { QUIZ } from '@/app/types/QuizDTO';
import { GET_QUIZ_QUIZ_NAME_EXIST } from '@/app/graphql/Quiz';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
import * as Constants from '../../constants/constants';
import * as gMessageConstants from '../../../constants/messages-constants';

type ErrorMessageType = {
  course_id: number | null;
  course_name: string | null;
  quiz_name: string | null;
  quiz_code: string | null;
  quiz_type: string | null;
  exam_duration: number | null;
  status: string | null;
};

type StateType = {
  dtoQuiz: QuizDTO;
  arrCourseLookup: LookupDTO[];
  arrQuizStatusLookup: LookupDTO[];
  arrQuizTypeLookup: LookupDTO[];
  errorMessages: ErrorMessageType;
  open1: boolean;
  open2: boolean;
  open3: boolean;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoQuiz: QuizDTO;
  arrCourseLookup: LookupDTO[];
};

const useUploadQuiz = ({ dtoQuiz, arrCourseLookup }: Props) => {
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    course_id: null,
    course_name: null,
    quiz_name: null,
    quiz_code: null,
    quiz_type: null,
    exam_duration: null,
    status: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    arrCourseLookup: arrCourseLookup,
    dtoQuiz: dtoQuiz,
    open1: false,
    open2: false,
    open3: false,
    arrQuizStatusLookup: arrQuizStatus,
    arrQuizTypeLookup: arrQuizType,
    errorMessages: { ...ERROR_MESSAGES },
    breadcrumbsItems: [{ label: 'Quizzes' }, { label: 'Add Quiz' }]
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const showSnackbar = useSnackbar();
  // const useUploadQuiz = () => {
  const [addQuizData] = useMutation(ADD_QUIZ_DATA);
  const [quizData, setQuizData] = useState<any[]>([]);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [uploadStatusType, setUploadStatusType] = useState<'success' | 'warning' | 'error' | ''>('');
  const [transformedData, setTransformedData] = useState<any>(null);
  const [getCourseLookup] = useLazyQuery(COURSE_LOOKUP, { fetchPolicy: 'network-only' });
  const [getQuizQuizNameExist] = useLazyQuery(GET_QUIZ_QUIZ_NAME_EXIST, { fetchPolicy: 'network-only' });

  useEffect(() => {
    if (state.arrQuizStatusLookup.length > 0 && !state.dtoQuiz.status) {
      const firstItem = state.arrQuizStatusLookup[0];
      setState({
        ...state,
        dtoQuiz: {
          ...state.dtoQuiz,
          status: firstItem.text // or firstItem.id if you store status by id
        }
      });
    }
  }, [state.arrQuizStatusLookup]);

  const IsQuizNameExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getQuizQuizNameExist({
      variables: {
        id: state.dtoQuiz.id,
        quiz_name: state.dtoQuiz.quiz_name
      }
    });
    if (!error && data) {
      exist = data.getQuizQuizNameExist;
    }
    return exist;
  }, [getQuizQuizNameExist, state.dtoQuiz?.id, state.dtoQuiz.quiz_name]);

  const getCourse = useCallback(async (): Promise<void> => {
    try {
      let arrCourseLookup: LookupDTO[] = [];
      const { error, data } = await getCourseLookup();
      if (!error && data) {
        arrCourseLookup = data.getCourseLookup;
      }
      setState({ arrCourseLookup: arrCourseLookup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getCourseLookup]);

  useEffect(() => {
    getCourse();
  }, [getCourse]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const capitalizedValue = capitalizeWords(value);
      setState({
        dtoQuiz: {
          ...state.dtoQuiz,
          [name]: capitalizedValue
        }
      } as StateType);
    },
    [state.dtoQuiz]
  );

  const onCodeChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value.toUpperCase();
      value = value.replace(/[^A-Z0-9]/g, '');
      setState({
        dtoQuiz: {
          ...state.dtoQuiz,
          quiz_code: value
        }
      } as StateType);
    },
    [state.dtoQuiz]
  );

  const onCourseNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoQuiz: { ...state.dtoQuiz, course_id: (value as LookupDTO).id, course_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoQuiz]
  );

  const validateCourse = useCallback(async () => {
    if (state.dtoQuiz.course_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoQuiz.course_name]);

  const onCourseBlur = useCallback(async () => {
    const course_name = await validateCourse();
    setState({ errorMessages: { ...state.errorMessages, course_name: course_name } } as StateType);
  }, [validateCourse, state.errorMessages]);

  const validateQuizName = useCallback(async () => {
    if (state.dtoQuiz.quiz_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else if (await IsQuizNameExist()) {
      return 'Quiz already exists';
    } else {
      return null;
    }
  }, [state.dtoQuiz.quiz_name, IsQuizNameExist]);

  const onQuizNameBlur = useCallback(async () => {
    const quiz_name = await validateQuizName();
    setState({ errorMessages: { ...state.errorMessages, quiz_name: quiz_name } } as StateType);
  }, [validateQuizName, state.errorMessages]);

  const validateQuizCode = useCallback(async () => {
    if (state.dtoQuiz.quiz_code.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoQuiz.quiz_code]);

  const onQuizCodeBlur = useCallback(async () => {
    const quiz_code = await validateQuizCode();
    setState({ errorMessages: { ...state.errorMessages, quiz_code: quiz_code } } as StateType);
  }, [validateQuizCode, state.errorMessages]);

  const onQuizTypeChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoQuiz: {
          ...state.dtoQuiz,
          quiz_type: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoQuiz]
  );

  const onQuizStatusChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoQuiz: {
          ...state.dtoQuiz,
          status: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoQuiz]
  );
  const validateStatus = useCallback(async () => {
    if (state.dtoQuiz.status.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoQuiz.status]);

  const onQuizStatusBlur = useCallback(async () => {
    const status = await validateStatus();
    setState({ errorMessages: { ...state.errorMessages, status: status } } as StateType);
  }, [validateStatus, state.errorMessages]);

  const validateQuizType = useCallback(async () => {
    if (state.dtoQuiz.quiz_type.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoQuiz.quiz_type]);

  const onQuizTypeBlur = useCallback(async () => {
    const quiz_type = await validateQuizType();
    setState({ errorMessages: { ...state.errorMessages, quiz_type: quiz_type } } as StateType);
  }, [validateQuizType, state.errorMessages]);

  const onExamDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, '');
    if (digitsOnly.length <= Constants.EXAM_DURATION_LENGTH) {
      onInputChange({
        ...e,
        target: { ...e.target, value: digitsOnly, name: 'exam_duration' }
      });
    }
  };

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.quiz_name = await validateQuizName();
    if (errorMessages.quiz_name) {
      isFormValid = false;
    }
    errorMessages.course_name = await validateCourse();
    if (errorMessages.course_name) {
      isFormValid = false;
    }
    errorMessages.quiz_type = await validateQuizType();
    if (errorMessages.quiz_type) {
      isFormValid = false;
    }
    errorMessages.status = await validateStatus();
    if (errorMessages.status) {
      isFormValid = false;
    }
    errorMessages.quiz_code = await validateQuizCode();
    if (errorMessages.quiz_code) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateQuizName, validateCourse, validateQuizType, validateStatus, validateQuizCode]);

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileName = file.name.toLowerCase();
    const isCSV = fileName.endsWith('.csv');
    const isJSON = fileName.endsWith('.json');
    const isDOCX = fileName.endsWith('.docx');
    const isPDF = fileName.endsWith('.pdf');

    if (!isCSV && !isJSON && !isDOCX && !isPDF) {
      setUploadStatus('Please upload a .csv or .json, or .docx or .pdf file.');
      setUploadStatusType('warning');
      showSnackbar('Please upload valid file type.', 'warning');
      return;
    }

    const transformFlatToNested = (flatData: any[]) => {
      if (flatData.length === 0) return { data: { AddQuizData: [] } };
      const questionMap = new Map<string, any>();

      for (const row of flatData) {
        if (!row.question || typeof row.question !== 'string') continue;
        const questionKey = row.question.trim();

        if (!questionMap.has(questionKey)) {
          questionMap.set(questionKey, {
            question: row.question,
            status: row.status,
            options: []
          });
        }

        questionMap.get(questionKey)!.options.push({
          option_text: row.option_text,
          is_correct: String(row.is_correct).toLowerCase() === 'true',
          explanation: row.explanation
        });
      }

      return Array.from(questionMap.values());
    };
    try {
      if (isDOCX) {
        const arrayBuffer = await file.arrayBuffer();
        const parsedDocx = await parseDocxToQuizJson(arrayBuffer);
        console.log('Parsed DOCX:', parsedDocx);

        if (!parsedDocx || parsedDocx.length === 0 || !parsedDocx[0].questions?.length) {
          showSnackbar('Invalid or empty DOCX quiz file', 'error');
          setUploadStatus('Invalid or empty DOCX quiz file.');
          setUploadStatusType('error');
          return;
        }

        setQuizData(parsedDocx);
        setTransformedData({ data: { AddQuizData: parsedDocx } });
        showSnackbar(gMessageConstants.SNACKBAR_READY_TO_UPLOAD, 'info');
        setUploadStatus('DOCX parsed successfully. Ready to upload.');
        setUploadStatusType('success');
        return;
      }
      // PDF file
      if (isPDF) {
        const text = await pdftotext(file);
        console.log('Extracted PDF text:', text);
        if (!text) throw new Error('PDF file is empty or unreadable.');
        const cleanedText = text.replace(/\s+/g, ' ');
        const lines = cleanedText.split(/(?=Q[:\-]|\bQus\)|Question)/); 
        console.log('extracted text after splitting :', lines);
        const parsedPdf = await parsePdfToQuizJson(lines);

        if (!parsedPdf || !parsedPdf[0]?.questions?.length) {
          showSnackbar('Invalid or empty PDF quiz file', 'error');
          setUploadStatus('Invalid or empty PDF quiz file.');
          setUploadStatusType('error');
          return;
        }

        setQuizData(parsedPdf);
        setTransformedData({ data: { AddQuizData: parsedPdf } });
        showSnackbar('PDF parsed successfully. Ready to upload.', 'success');
        setUploadStatus('PDF parsed successfully. Ready to upload.');
        setUploadStatusType('success');
        return;
      }
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target?.result as string;
        let parsedData: any[] = [];

        if (isJSON) {
          parsedData = JSON.parse(text);
          setTransformedData(parsedData);
        } else if (isCSV) {
          const result = Papa.parse(text, {
            header: true,
            skipEmptyLines: true
          });
          parsedData = result.data as any[];
          if (!parsedData[0]?.question || !parsedData[0]?.option_text) {
            showSnackbar('Invalid CSV file.', 'error');
            setUploadStatus('Invalid CSV file. Please refer to the sample file format.');
            setUploadStatusType('error');
            console.log('for redeployment');
            return;
          }
          const nestedQuestions = transformFlatToNested(parsedData);
          setTransformedData({
            data: {
              AddQuizData: [
                {
                  questions: nestedQuestions
                }
              ]
            }
          });
        }
        setQuizData(parsedData);
        showSnackbar(gMessageConstants.SNACKBAR_READY_TO_UPLOAD, 'info');
        setUploadStatus('File parsed successfully. Ready to upload.');
        setUploadStatusType('success');
      };

      if (isJSON || isCSV) reader.readAsText(file);
    } catch (error) {
      console.error('Upload error:', error);
      showSnackbar(gMessageConstants.SNACKBAR_INSERT_FAILED, 'error');
      setUploadStatus('Upload failed!');
      setUploadStatusType('error');
    }
  }, []);

  const handleUploadClick = useCallback(async () => {
    const isValid = await validateForm();
    if (!isValid) {
      showSnackbar('Kindly fill out the form.', 'warning');
      setUploadStatus('Kindly fill out the form.');
      setUploadStatusType('warning');
      return;
    }
    if (!transformedData) {
      showSnackbar('Please select a file first.', 'warning');
      setUploadStatus('No quiz data to upload. Please select a file first.');
      setUploadStatusType('warning');
      return;
    }
    try {
      const { data } = await addQuizData({
        variables: {
          course_id: state.dtoQuiz.course_id,
          quiz_name: state.dtoQuiz.quiz_name,
          quiz_code: state.dtoQuiz.quiz_code,
          quiz_type: state.dtoQuiz.quiz_type,
          exam_duration: Number(state.dtoQuiz.exam_duration),
          status: state.dtoQuiz.status,
          rawJson: JSON.stringify(transformedData)
        }
      });
      if (data?.addQuizData) {
        showSnackbar(gMessageConstants.SNACKBAR_INSERT_RECORD, 'success');
        setUploadStatus('Upload successful!');
        setUploadStatusType('success');
        setState({
          dtoQuiz: { ...QUIZ, id: state.dtoQuiz.id },
          errorMessages: { ...ERROR_MESSAGES }
        } as StateType);
        setTransformedData(null);
        setQuizData([]);
      } else {
        showSnackbar(gMessageConstants.SNACKBAR_INSERT_FAILED, 'error');
        setUploadStatus('Upload failed or duplicate.');
        setUploadStatusType('error');
      }
    } catch (error) {
      console.error('Upload error:', error);
      showSnackbar(gMessageConstants.SNACKBAR_INSERT_FAILED, 'error');
      setUploadStatus('Upload failed!');
      setUploadStatusType('error');
    }
  }, [addQuizData, transformedData, validateForm, state.dtoQuiz]);

  const onClearClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setState({ dtoQuiz: { ...QUIZ, id: state.dtoQuiz.id }, errorMessages: { ...ERROR_MESSAGES } } as StateType);
      setUploadStatus('');
      setUploadStatusType('');
    },
    [state.dtoQuiz.id, ERROR_MESSAGES]
  );

  const setOpen1 = useCallback(async (): Promise<void> => {
    setState({ open1: true } as StateType);
  }, []);
  const setOpen2 = useCallback(async (): Promise<void> => {
    setState({ open2: true } as StateType);
  }, []);
  const setOpen3 = useCallback(async (): Promise<void> => {
    setState({ open3: true } as StateType);
  }, []);
  const setClose1 = useCallback(async (): Promise<void> => {
    setState({ open1: false } as StateType);
  }, []);

  const setClose2 = useCallback(async (): Promise<void> => {
    setState({ open2: false } as StateType);
  }, []);
  const setClose3 = useCallback(async (): Promise<void> => {
    setState({ open3: false } as StateType);
  }, []);

  return {
    handleFileUpload,
    quizData,
    uploadStatus,
    uploadStatusType,
    handleUploadClick,
    state,
    onQuizNameBlur,
    onInputChange,
    onCodeChange,
    onCourseBlur,
    onCourseNameChange,
    onQuizStatusChange,
    onQuizStatusBlur,
    onQuizTypeBlur,
    onQuizTypeChange,
    onQuizCodeBlur,
    onExamDurationChange,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    setOpen3,
    setClose3,
    onClearClick
  };
};

export default useUploadQuiz;
