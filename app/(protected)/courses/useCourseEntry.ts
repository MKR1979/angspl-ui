import React, { ChangeEvent, useCallback, useEffect, useReducer,useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import CourseDTO, { COURSE } from '@/app/types/CourseDTO';
import LookupDTO from '@/app/types/LookupDTO';
import { arrCourseStatus } from '@/app/common/Configuration';
import { arrCourseCategory } from '@/app/common/Configuration';
import { ADD_COURSE, UPDATE_COURSE, GET_COURSE, UPLOAD_COURSE_IMAGE } from '@/app/graphql/Course';
import * as constants from '../constants/constants'

type ErrorMessageType = {
  course_name: string | null;
  course_code: string | null;
  price: number | null;
  duration: string | null;
  category: string | null;
  logo_url: string | null;
  documents_path: string | null;
  status: string | null;
  is10threq:boolean;
  is12threq:boolean;
  isgradreq:boolean;
  ispgreq:boolean;
  isphotoidreq:boolean;
  is_paid: boolean;
};

type StateType = {
  dtoCourse: CourseDTO;
  open1: boolean;
  open2: boolean;
  arrQuizLookup:LookupDTO[];
  arrCourseStausLookup: LookupDTO[];
  arrCourseCategoryLookup:LookupDTO[];
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoCourse: CourseDTO;
};

const useCourseEntry = ({ dtoCourse }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    course_name: null,
    course_code: null,
    price:  null,
    duration:  null,
    category:  null, 
    logo_url:  null,
    documents_path:  null,
    status: null,
    is10threq: false,
    is12threq: false,
    isgradreq: false,
    ispgreq: false,
    isphotoidreq: false,
    is_paid: false,
    } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoCourse: dtoCourse,
    open1: false,
    open2: false,
    arrCourseStausLookup: arrCourseStatus,
    arrCourseCategoryLookup: arrCourseCategory,
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [addCourse] = useMutation(ADD_COURSE, {});

  const [updateCourse] = useMutation(UPDATE_COURSE, {});

  const [getCourse] = useLazyQuery(GET_COURSE, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [singleUpload] = useMutation(UPLOAD_COURSE_IMAGE, {});

  const getData = useCallback(async (): Promise<void> => {
    let dtoCourse: CourseDTO = COURSE;
    const { error, data } = await getCourse({
      variables: {
        id: state.dtoCourse.id
      }
    });
    if (!error && data) {
      dtoCourse = data.getCourse;
    }
    setState({ dtoCourse: dtoCourse } as StateType);
  }, [getCourse, state.dtoCourse.id]);

  useEffect(() => {
    if (state.dtoCourse.id > 0) {
      getData();
    }
  },
  [state.dtoCourse.id, getData]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, type, checked, value } = event.target;
  
      setState({
        dtoCourse: {
          ...state.dtoCourse,
          [name]: type === "checkbox" ? checked : name === "price" ? Number(value) : value
        }
      } as StateType);
    },
    [state.dtoCourse]
  );

  const onCourseCategoryChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoCourse: {
          ...state.dtoCourse,
          category: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoCourse]
  )

  const validateCourseName = useCallback(async () => {
    if (state.dtoCourse.course_name.trim() === '') {
      return 'course Name is required';
    } else {
      return null;
    }
  }, [state.dtoCourse.course_name]);

  const validateCourseCode = useCallback(async () => {
    if (state.dtoCourse.course_code.trim() === '') {
      return 'course Code is required';
    } else {
      return null;
    }
  }, [state.dtoCourse.course_code]);

  const validateDuration = useCallback(async () => {
    if (state.dtoCourse.duration.trim() === '') {
      return 'Duration  is required';
    } else {
      return null;
    }
  }, [state.dtoCourse.duration]);

  const onCourseNameBlur = useCallback(async () =>
    {
      const course_name = await validateCourseName();
      setState({ errorMessages: { ...state.errorMessages, course_name: course_name } } as StateType);
    }, [validateCourseName, state.errorMessages]);


    const onCourseCodeBlur = useCallback(async () =>
      {
        const course_code = await validateCourseCode();
        setState({ errorMessages: { ...state.errorMessages, course_code: course_code } } as StateType);
      }, [validateCourseCode, state.errorMessages]);

      const onDurationBlur = useCallback(async () =>
       {
          const duration = await validateDuration();
          setState({ errorMessages: { ...state.errorMessages, duration: duration } } as StateType);
        }, [validateDuration, state.errorMessages]);   

  const validateCategory = useCallback(async () => {
    if (state.dtoCourse.category.trim() === '') {
      return 'Status is required';
    } else {
      return null;
    }
  }, [state.dtoCourse.category]);

  const onCourseStatusChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoCourse: {
          ...state.dtoCourse,
          status: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoCourse]
  )
  const validateStatus = useCallback(async () => {
    if (state.dtoCourse.status.trim() === '') {
      return 'Status is required';
    } else {
      return null;
    }
  }, [state.dtoCourse.status]);
  const onStatusBlur = useCallback(async () =>
    {
      const status = await validateStatus();
      setState({ errorMessages: { ...state.errorMessages, status: status } } as StateType);
    }, [validateStatus, state.errorMessages]);

    const onCategoryBlur = useCallback(async () =>
      {
        const category = await validateCategory();
        setState({ errorMessages: { ...state.errorMessages, category: category } } as StateType);
      }, [validateCategory, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.course_name = await validateCourseName();
    if (errorMessages.course_name) {
      isFormValid = false;
    }
    errorMessages.course_code = await validateCourseCode();
    if (errorMessages.course_code) {
      isFormValid = false;
    }

    errorMessages.duration = await validateDuration();
    if (errorMessages.duration) {
      isFormValid = false;
    }
    errorMessages.status = await validateStatus();
    if (errorMessages.status) {
      isFormValid = false;
    }
    errorMessages.category = await validateCategory();
    if (errorMessages.category) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateCourseName,validateStatus,validateCategory,validateCourseCode,validateDuration]);
  
  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (await validateForm()) {
        if (state.dtoCourse.id === 0) {
          const { data } = await addCourse({
            variables: {
              ...state.dtoCourse
            }
          });
          if (data) {
            router.push('/courses/list');
          }
        } else {
          const { data } = await updateCourse({
            variables: {
              ...state.dtoCourse
            }
          });
          if (data) {
            router.push('/courses/list');
          }
        }
      }
    },
    [validateForm, addCourse, state.dtoCourse, router, updateCourse]
  );

  const onClearClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setState({ dtoCourse: { ...COURSE, id: state.dtoCourse.id }, errorMessages: { ...ERROR_MESSAGES } } as StateType);
    },
    [state.dtoCourse.id, ERROR_MESSAGES]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/courses/list');
    },
    [router]
    );
     const UploadImage = useCallback(async () => {
      const files = (document.getElementById('Course_image') as any)!.files;
      console.log(files);
      if (files.length == 0) {
        return;
      }
      const { data } = await singleUpload({
        variables: {
          files: files
        }
      });
      if (data) {
        setState({ dtoCourse: { ...state.dtoCourse, logo_url: constants.LOGO_PATH+data.singleUpload[0].filename } } as StateType);
      }
    }, [singleUpload, state.dtoCourse]);

    const UploadImage1 = useCallback(async () => {
      const files = (document.getElementById('Course_image') as any)!.files;
      console.log(files);
      if (files.length == 0) {
        return;
      }
      const { data } = await singleUpload({
        variables: {
          files: files
        }
      });
      if (data) {
        setState({ dtoCourse: { ...state.dtoCourse, documents_path: constants.COURSE_DOC_PATH+data.singleUpload[0].filename } } as StateType);
      }
    }, [singleUpload, state.dtoCourse]);
    
   const setOpen1 = useCallback(async (): Promise<void> => {
     setState({ open1: true } as StateType);
   }, []);
   const setOpen2 = useCallback(async (): Promise<void> => {
     setState({ open2: true } as StateType);
   }, []);
  const setClose1 = useCallback(async (): Promise<void> => {
    setState({ open1: false } as StateType);
  }, []);

  const setClose2 = useCallback(async (): Promise<void> => {
    setState({ open2: false } as StateType);
  }, []);

 const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const toggleDocument = (doc: string) => {
    setSelectedDocs((prev) =>
      prev.includes(doc)
        ? prev.filter((d) => d !== doc)
        : [...prev, doc]
    );
  };

  return {
    state,
    onInputChange,
    onCourseNameBlur,
    onStatusBlur,
    onCategoryBlur,
    onCourseCodeBlur,
    onDurationBlur,
    onCourseStatusChange,
    onCourseCategoryChange,
    singleUpload,
    UploadImage,
    UploadImage1,
    onSaveClick,
    onClearClick,
    onCancelClick,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    toggleDocument,
    selectedDocs
  };
};

export default useCourseEntry;
