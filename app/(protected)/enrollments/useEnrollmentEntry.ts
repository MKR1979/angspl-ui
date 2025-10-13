import React, { ChangeEvent, useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import EnrollmentDTO, { ENROLLMENT } from '@/app/types/EnrollmentDTO';
import { ADD_ENROLLMENT, UPDATE_ENROLLMENT, GET_ENROLLMENT } from '@/app/graphql/Enrollment';
import LookupDTO from '@/app/types/LookupDTO';
import { USER_LOOKUP } from '@/app/graphql/User';
// import dayjs from 'dayjs';
// import { getLocalTime } from '@/app/common/Configuration';
import { arrStatusLookup } from '@/app/common/Configuration';
import { COURSE_LOOKUP } from '@/app/graphql/Course';
import * as gMessageConstants from '../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
// import * as gConstants from '../../constants/constants';
import { validateDateTime } from '@/app/common/validationDate';

type ErrorMessageType = {
  user_name: string | null;
  course_id: string | null;
  enrollment_date: string | null;
  end_date: string | null;
  paid_amount: string | null;
  status: string | null;
};

type StateType = {
  dtoEnrollment: EnrollmentDTO;
  open1: boolean;
  open2: boolean;
  open3: boolean;
  arrCourseLookup: LookupDTO[];
  arrUserLookup: LookupDTO[];
  arrStatusLookup: LookupDTO[];
  saveDisabled: boolean;
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoEnrollment: EnrollmentDTO;
};

const useEnrollmentEntry = ({ dtoEnrollment }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    user_name: null,
    enrollment_date: null,
    end_date: null,
    status: null,
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoEnrollment: dtoEnrollment,
    open1: false,
    open2: false,
    open3: false,
    arrCourseLookup: [] as LookupDTO[],
    arrUserLookup: [] as LookupDTO[],
    arrStatusLookup: arrStatusLookup,
    saveDisabled: false,
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  // const showSnackbar = useSnackbar();
  const [addEnrollment] = useMutation(ADD_ENROLLMENT, {});

  const [updateEnrollment] = useMutation(UPDATE_ENROLLMENT, {});



  const [getEnrollment] = useLazyQuery(GET_ENROLLMENT, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });
  const showSnackbar = useSnackbar();
  const [getUserLookup] = useLazyQuery(USER_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getCourseLookup] = useLazyQuery(COURSE_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  useEffect(() => {
    if (
      state.arrStatusLookup.length > 0 &&
      !state.dtoEnrollment.status
    ) {
      const firstItem = state.arrStatusLookup[0];
      setState({
        ...state,
        dtoEnrollment: {
          ...state.dtoEnrollment,
          status: firstItem.text,
        }
      });
    }
  }, [state.arrStatusLookup]);

  const getUserData = useCallback(async (): Promise<void> => {
    try {
      let arrUserLookup: LookupDTO[] = [];
      const { error, data } = await getUserLookup();
      if (!error && data?.getUserLookup) {
        arrUserLookup = data.getUserLookup;
      }
      setState({ arrUserLookup: arrUserLookup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getUserLookup]);

  const getCourseData = useCallback(async (): Promise<void> => {
    try {
      let arrCourseLookup: LookupDTO[] = [];
      const { error, data } = await getCourseLookup();
      if (!error && data?.getCourseLookup) {
        arrCourseLookup = data.getCourseLookup;
      }
      setState({ arrCourseLookup: arrCourseLookup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getCourseLookup]);

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoEnrollment: EnrollmentDTO = ENROLLMENT;
      const { error, data } = await getEnrollment({
        variables: {
          id: state.dtoEnrollment.id
        }
      });
      if (!error && data?.getEnrollment) {
        dtoEnrollment = data.getEnrollment;
        dtoEnrollment = {
          ...dtoEnrollment,
          enrollment_date: dtoEnrollment.enrollment_date,
          end_date: dtoEnrollment.end_date
        };
      }
      setState({ dtoEnrollment: dtoEnrollment } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getEnrollment, state.dtoEnrollment.id]);

  const setDefaultValues = useCallback(async () => {
    //const dtoUser: UserDTO = await getMyProfile();
    setState({
      dtoEnrollment: {
        ...state.dtoEnrollment,
        user_id: dtoEnrollment.user_id,
        user_name: dtoEnrollment.user_name
      }
    } as StateType);
  }, [state.dtoEnrollment]);

  useEffect(() => {
    if (state.dtoEnrollment.id > 0) {
      getData();
    } else {
      setDefaultValues();
    }
    getUserData();
    getCourseData();

  }, []);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      switch (event.target.name) {
        case 'paid_amount':
          setState({
            dtoEnrollment: {
              ...state.dtoEnrollment,
              [event.target.name]: Number(event.target.value)
            }
          } as StateType);
          break;
        default:
          setState({
            dtoEnrollment: {
              ...state.dtoEnrollment,
              [event.target.name]: event.target.value
            }
          } as StateType);
      }
    },
    [state.dtoEnrollment]
  );

  const validatePaidAmount = useCallback(async () => {
    const value = state.dtoEnrollment.paid_amount;
    if (value === null || value === undefined || Number.isNaN(value) || value === 0) {
      return gMessageConstants.REQUIRED_FIELD;
    }
    return null;
  }, [state.dtoEnrollment.paid_amount]);

  const onPaidAmountBlur = useCallback(async () => {
    const paid_amount = await validatePaidAmount();
    setState({ errorMessages: { ...state.errorMessages, paid_amount: paid_amount } } as StateType);
  }, [validatePaidAmount, state.errorMessages]);


  const onCourseNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoEnrollment: {
          ...state.dtoEnrollment,
          course_id: (value as LookupDTO).id,
          course_name: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoEnrollment]
  );

  const onUserNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoEnrollment: {
          ...state.dtoEnrollment,
          user_id: (value as LookupDTO).id,
          user_name: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoEnrollment]
  );

  const onStartDateTimeChange = useCallback(
    async (value: any): Promise<void> => {
      setState({ dtoEnrollment: { ...state.dtoEnrollment, enrollment_date: value } } as StateType);
    },
    [state.dtoEnrollment]
  );

  // const validateStartDateTime = useCallback(async () => {
  //   const start = dayjs(state.dtoEnrollment.enrollment_date);
  //   const end = dayjs(state.dtoEnrollment.end_date);
  //   if (
  //     !state.dtoEnrollment.enrollment_date ||
  //     dayjs(getLocalTime(state.dtoEnrollment.enrollment_date)).format('MM/DD/YYYY') === '12/31/1899'
  //   ) {
  //     return gMessageConstants.REQUIRED_FIELD;
  //   }

  //   if (!state.dtoEnrollment.enrollment_date || dayjs(state.dtoEnrollment.enrollment_date).isValid() === false) {
  //     return gMessageConstants.REQUIRED_FIELD;
  //   }

  //   if (end.isValid() && start.isAfter(end)) {
  //     return 'Start time must be before end time.';
  //   }
  //   return null;
  // }, [state.dtoEnrollment.enrollment_date, state.dtoEnrollment.end_date]);

  const validateStartDateTime = useCallback(() => {
    return validateDateTime({
      startDate: state.dtoEnrollment.enrollment_date,
      endDate: state.dtoEnrollment.end_date,
      type: 'start',
      label: 'Start Time',
      allowPast: false,
    });
  }, [state.dtoEnrollment.enrollment_date, state.dtoEnrollment.end_date]);

  const onStartDateTimeBlur = useCallback(async () => {
    const enrollment_date = await validateStartDateTime();
    setState({ errorMessages: { ...state.errorMessages, enrollment_date: enrollment_date } } as StateType);
  }, [validateStartDateTime, state.errorMessages]);

  // const validateEndDateTime = useCallback(async () => {
  //   if (state.dtoEnrollment.end_date == null || dayjs(getLocalTime(state.dtoEnrollment.end_date)).format('MM/DD/YYYY') === '12/31/1899') {
  //     return gMessageConstants.REQUIRED_FIELD;
  //   } else {
  //     return null;
  //   }
  // }, [state.dtoEnrollment.end_date]);

  const validateEndDateTime = useCallback(() => {
    return validateDateTime({
      startDate: state.dtoEnrollment.enrollment_date,
      endDate: state.dtoEnrollment.end_date,
      type: 'end',
      label: 'End Time',
      allowPast: false,
    });
  }, [state.dtoEnrollment.enrollment_date, state.dtoEnrollment.end_date]);


  const onEndDateTimeBlur = useCallback(async () => {
    const end_date = await validateEndDateTime();
    setState({ errorMessages: { ...state.errorMessages, end_date: end_date } } as StateType);
  }, [validateEndDateTime, state.errorMessages]);

  const onEndDateTimeChange = useCallback(
    async (value: any): Promise<void> => {
      const dobError = await validateEndDateTime();

      setState({
        ...state,
        dtoEnrollment: {
          ...state.dtoEnrollment,
          end_date: value
        },
        errorMessages: {
          ...state.errorMessages,
          end_date: dobError
        }
      } as StateType);
    },
    [state, validateEndDateTime]
  );

  const validateUsertName = useCallback(async () => {
    if (state.dtoEnrollment.user_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoEnrollment.user_name]);

  const validateStatus = useCallback(async () => {
    if (state.dtoEnrollment.status.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoEnrollment.status]);

  const onStatusBlur = useCallback(async () => {
    const status = await validateStatus();
    setState({ errorMessages: { ...state.errorMessages, status: status } } as StateType);
  }, [validateStatus, state.errorMessages]);

  const onStatusChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoEnrollment: {
          ...state.dtoEnrollment,
          status: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoEnrollment]
  );

  const onUserNameBlur = useCallback(async () => {
    const user_name = await validateUsertName();
    setState({ errorMessages: { ...state.errorMessages, user_name: user_name } } as StateType);
  }, [validateUsertName, state.errorMessages]);

  const validateCourseName = useCallback(async () => {
    if (state.dtoEnrollment.course_id === 0) {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoEnrollment.course_id]);

  const onCourseNameBlur = useCallback(async () => {
    const course_id = await validateCourseName();
    setState({ errorMessages: { ...state.errorMessages, course_id: course_id } } as StateType);
  }, [validateCourseName, state.errorMessages]);


  const validateUserName = useCallback(async () => {
    if (state.dtoEnrollment.user_id === 0) {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoEnrollment.course_id]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.user_name = await validateUserName();
    if (errorMessages.user_name) {
      isFormValid = false;
    }
    errorMessages.course_id = await validateCourseName();
    if (errorMessages.course_id) {
      isFormValid = false;
    }
    errorMessages.enrollment_date = await validateStartDateTime();
    if (errorMessages.enrollment_date) {
      isFormValid = false;
    }
    errorMessages.end_date = await validateEndDateTime();
    if (errorMessages.end_date) {
      isFormValid = false;
    }
    errorMessages.paid_amount = await validatePaidAmount();
    if (errorMessages.paid_amount) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateStartDateTime, validateEndDateTime, validateCourseName, validateUserName, validatePaidAmount]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      try {
        setState({ saveDisabled: true } as StateType);
        event.preventDefault();

        if (await validateForm()) {
          if (state.dtoEnrollment.id === 0) {
            const { data } = await addEnrollment({
              variables: {
                user_id: state.dtoEnrollment.user_id,
                course_id: state.dtoEnrollment.course_id,
                enrollment_date: state.dtoEnrollment.enrollment_date,
                end_date: state.dtoEnrollment.end_date,
                paid_amount: Number(state.dtoEnrollment.paid_amount),
                status: state.dtoEnrollment.status
              }
            });
            if (data?.addEnrollment) {
              showSnackbar(gMessageConstants.SNACKBAR_INSERT_RECORD, 'success');
              router.push('/enrollments/list');
            } else {
              showSnackbar(gMessageConstants.SNACKBAR_INSERT_FAILED, 'error');
            }
          } else {
            const { data } = await updateEnrollment({
              variables: {
                id: state.dtoEnrollment.id,
                user_id: state.dtoEnrollment.user_id,
                course_id: state.dtoEnrollment.course_id,
                enrollment_date: state.dtoEnrollment.enrollment_date,
                end_date: state.dtoEnrollment.end_date,
                paid_amount: Number(state.dtoEnrollment.paid_amount),
                status: state.dtoEnrollment.status
              }
            });
            if (data?.updateEnrollment) {
              showSnackbar(gMessageConstants.SNACKBAR_UPDATE_RECORD, 'success');
              router.push('/enrollments/list');
            } else {
              showSnackbar(gMessageConstants.SNACKBAR_UPDATE_FAILED, 'error');
            }
          }
        }
      } catch {
        showSnackbar(gMessageConstants.SNACKBAR_INSERT_FAILED, 'error');
      } finally {
        setState({ saveDisabled: false } as StateType);
      }
    },
    [validateForm, addEnrollment, state.dtoEnrollment, router, updateEnrollment]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/enrollments/list');
    },
    [router]
  );

  const setOpen1 = useCallback(async (): Promise<void> => {
    setState({ open1: true } as StateType);
  }, []);
  const setClose1 = useCallback(async (): Promise<void> => {
    setState({ open1: false } as StateType);
  }, []);
  const setOpen2 = useCallback(async (): Promise<void> => {
    setState({ open2: true } as StateType);
  }, []);
  const setClose2 = useCallback(async (): Promise<void> => {
    setState({ open2: false } as StateType);
  }, []);
  const setOpen3 = useCallback(async (): Promise<void> => {
    setState({ open3: true } as StateType);
  }, []);
  const setClose3 = useCallback(async (): Promise<void> => {
    setState({ open3: false } as StateType);
  }, []);

  return {
    state,
    onInputChange,
    onCourseNameChange,
    onStartDateTimeChange,
    onEndDateTimeChange,
    onUserNameChange,
    onUserNameBlur,
    onStartDateTimeBlur,
    onEndDateTimeBlur,
    onCourseNameBlur,
    onSaveClick,
    onCancelClick,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    setOpen3,
    setClose3,
    onStatusChange,
    onStatusBlur,
    onPaidAmountBlur,
  };
};

export default useEnrollmentEntry;
// function handleStartTimeChange(value: any) {
//   throw new Error('Function not implemented.');
// }

// function handleEndTimeChange(value: any) {
//   throw new Error('Function not implemented.');
// }


