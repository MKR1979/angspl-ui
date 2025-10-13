import React, { ChangeEvent, useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import ScheduleFeeDTO, { SCHEDULE_FEE } from '@/app/types/ScheduleFeeDTO';
import { ADD_FEE_PLAN, UPDATE_FEE_PLAN, GET_FEE_PLAN } from '@/app/graphql/ScheduleFee';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
import * as gMessageConstants from '../../../constants/messages-constants';
import * as gConstants from '../../../constants/constants';
import {
  COURSE_LOOKUP_BY_USER_ID,
  // GET_COURSE_BY_USER_ID
} from '@/app/graphql/Course';
import { USER_LOOKUP } from '@/app/graphql/User';
import {
  arrFeePaymentFrequencyMonthly, arrFeePaymentFrequencyQuarterly,
  arrFeePaymentType, arrFeePaymentFrequencyHalfYearly
} from '@/app/common/Configuration';
import LookupDTO from '@/app/types/LookupDTO';
import { arrStatusLookup } from '@/app/common/Configuration';
import * as Constants from '../../constants/constants';
import { useSelector } from '../../../store';

type ErrorMessageType = {
  payment_id: number | null;
  admission_id: number | null;
  student_name: string | null;
  learner_id: number | null;
  course_id: number | null;
  course_name: string | null;
  payment_frequency: string | null;
  start_date: string | null;
  total_amount: string | null;
  payment_date: Date | null;
  method: string | null;
  transaction_id: string | null;
  status: string | null;
};

type StateType = {
  dtoScheduleFee: ScheduleFeeDTO;
  arrCourseLookup: LookupDTO[];
  arrUserLookup: LookupDTO[];
  arrStatusLookup: LookupDTO[];
  isLoading: boolean;
  open1: boolean;
  open2: boolean;
  open3: boolean;
  open4: boolean;
  open6: boolean;
  base_course_price: number;
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoScheduleFee: ScheduleFeeDTO;
};

const useScheduleFeeEntry = ({ dtoScheduleFee }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    payment_id: null,
    admission_id: null,
    student_name: null,
    learner_id: null,
    course_id: null,
    course_name: null,
    payment_frequency: null,
    start_date: null,
    total_amount: null,
    payment_date: null,
    method: null,
    transaction_id: null,
    status: null,
    base_course_price: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoScheduleFee: dtoScheduleFee,
    arrCourseLookup: [] as LookupDTO[],
    arrUserLookup: [] as LookupDTO[],
    arrStatusLookup: arrStatusLookup,
    open1: false,
    open2: false,
    open3: false,
    open4: false,
    open6: false,
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
  const showSnackbar = useSnackbar();
  const { companyInfo } = useSelector((state) => state.globalState);
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [saving, setSaving] = useState(false);
  const [addFeePlan] = useMutation(ADD_FEE_PLAN, {});
  const [updateFeePlan] = useMutation(UPDATE_FEE_PLAN, {});
  const [getFeePlan] = useLazyQuery(GET_FEE_PLAN, { fetchPolicy: 'network-only' });
  const [getUserLookup] = useLazyQuery(USER_LOOKUP, { fetchPolicy: 'network-only' });
  const [getCourseByUserIdLookup] = useLazyQuery(COURSE_LOOKUP_BY_USER_ID, { fetchPolicy: 'network-only' });

  useEffect(() => {
    if (state.arrStatusLookup.length > 0 && !state.dtoScheduleFee.status) {
      const firstItem = state.arrStatusLookup[0];
      setState({
        ...state,
        dtoScheduleFee: {
          ...state.dtoScheduleFee,
          status: firstItem.text
        }
      });
    }
  }, [state.arrStatusLookup, state]);

  const getCourseData = useCallback(async (user_id: number): Promise<void> => {
    try {
      let arrCourseLookup: LookupDTO[] = [];
      const { error, data } = await getCourseByUserIdLookup({
        variables: {
          user_id : user_id,
          group_name: companyInfo.company_type,
          source_flag: gConstants.SOURCE_FLAG_SCHEDULE
        }
      });
      if (!error && data) {
        arrCourseLookup = data.getCourseByUserIdLookup;
      }
      
      setState({ arrCourseLookup: arrCourseLookup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getCourseByUserIdLookup, companyInfo.company_type]);

  const getUserData = useCallback(async (): Promise<void> => {
    try {
      let arrUserLookup: LookupDTO[] = [];
      const { error, data } = await getUserLookup({
        variables: {
          type_name: gMessageConstants.STUDENT_TYPE_NAME
        }
      });
      if (!error && data) {
        arrUserLookup = data.getUserLookup;
      }
      setState({ arrUserLookup: arrUserLookup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getUserLookup]);

  const getFeePlanData = useCallback(async (): Promise<void> => {
    try {
      let dtoScheduleFee: ScheduleFeeDTO = SCHEDULE_FEE;
      const { error, data } = await getFeePlan({
        variables: {
          id: state.dtoScheduleFee.id
        }
      });
      if (!error && data) {
        dtoScheduleFee = data.getFeePlan;
      }
      setState({ dtoScheduleFee: dtoScheduleFee } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getFeePlan, state.dtoScheduleFee.id]);

  useEffect(() => {
    getUserData(); 
  }, [getUserData]);
  
  useEffect(() => {
    if (state.dtoScheduleFee.id > 0) {
      getFeePlanData();
    }
  }, [state.dtoScheduleFee.id, getFeePlanData]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoScheduleFee: {
          ...state.dtoScheduleFee,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoScheduleFee]
  );

  const validateAmount = useCallback(() => {
    const total_amount = Number(state.dtoScheduleFee.total_amount);
    if (isNaN(total_amount) || total_amount <= 0) {
      return 'Required Field! ';
    }
    return null;
  }, [state.dtoScheduleFee.total_amount]);

  const onAmountBlur = useCallback(async () => {
    const total_amount = await validateAmount();
    setState({ errorMessages: { ...state.errorMessages, total_amount: total_amount } } as StateType);
  }, [validateAmount, state.errorMessages]);

  const onAmountChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const updatedDto = {
        ...state.dtoScheduleFee,
        [name]: name === 'total_amount' || name === 'discount' || name === 'fine_amount' ? Number(value) : value
      };
      const total = Number(updatedDto.total_amount) || 0;
      const discount = Number(updatedDto.discount) || 0;
      const fine = Number(updatedDto.fine_amount) || 0;
      updatedDto.net_amount = total - discount + fine;
      setState({
        dtoScheduleFee: updatedDto
      } as StateType);
    },
    [state.dtoScheduleFee]
  );

  const onStartDateChange = useCallback(
    async (event: any, value: unknown) => {
      const selectedValue = (value as LookupDTO)?.text ?? '';
      setState({
        dtoScheduleFee: {
          ...state.dtoScheduleFee,
          start_date: selectedValue
        }
      } as StateType);
    },
    [state.dtoScheduleFee]
  );

  const validateStartDate = useCallback(async () => {
    if (state.dtoScheduleFee.start_date.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoScheduleFee.start_date]);

  const onStartDateBlur = useCallback(async () => {
    const start_date = await validateStartDate();
    setState({ errorMessages: { ...state.errorMessages, start_date: start_date } } as StateType);
  }, [validateStartDate, state.errorMessages]);

  const calculateFeeAmount = (baseAmount: number, start_date: string): number => {
    const freq = start_date?.toLowerCase();
    if (freq === 'monthly') return Number((baseAmount / 12).toFixed(2));
    if (freq === 'quarterly') return Number((baseAmount / 4).toFixed(2));
    return baseAmount;
  };

  const onPaymentTypeChange = useCallback(
    async (event: any, value: unknown) => {
      const selectedFrequency = (value as LookupDTO).text;
      const baseAmount = state.dtoScheduleFee.base_course_price ?? 0;
      const calculatedAmount = calculateFeeAmount(baseAmount, selectedFrequency);
      let startDateValue = '';
      if (selectedFrequency?.toLowerCase() === 'yearly') {
        startDateValue = 'Year';
      }
      // if (selectedFrequency?.toLowerCase() === 'half-yearly') {
      //   startDateValue = 'H1';
      // }
      setState({
        dtoScheduleFee: {
          ...state.dtoScheduleFee,
          payment_frequency: selectedFrequency,
          start_date: startDateValue,
          fee_amount: calculatedAmount
        }
      } as StateType);
    },
    [state.dtoScheduleFee]
  );

  const validatePaymentType = useCallback(async () => {
    if (state.dtoScheduleFee.payment_frequency.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoScheduleFee.payment_frequency]);

  const onPaymentTypeBlur = useCallback(async () => {
    const payment_frequency = await validatePaymentType();
    setState({ errorMessages: { ...state.errorMessages, payment_frequency: payment_frequency } } as StateType);
  }, [validatePaymentType, state.errorMessages]);

  const onCourseChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoScheduleFee: {
          ...state.dtoScheduleFee,
          course_name: (value as LookupDTO).text,
          course_id: (value as LookupDTO).id
        }
      } as StateType);
    },
    [state.dtoScheduleFee]
  );

  const validateCourse = useCallback(async () => {
    if (state.dtoScheduleFee.course_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoScheduleFee.course_name]);

  const onCourseBlur = useCallback(async () => {
    const course_name = await validateCourse();
    setState({ errorMessages: { ...state.errorMessages, course_name: course_name } } as StateType);
  }, [validateCourse, state.errorMessages]);

  const onStudentNameChange = useCallback(
    async (event: any, value: any) => {
      setState({
        dtoScheduleFee: {
          ...state.dtoScheduleFee,
          learner_id: (value as LookupDTO).id,
          student_name: (value as LookupDTO).text,
          course_id: 0,
          course_name: ''
        }
      } as StateType);
      getCourseData(Number(value?.id));
    },
    [state.dtoScheduleFee]
  );

  const validateStudent = useCallback(async () => {
    if (state.dtoScheduleFee.student_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoScheduleFee.student_name]);

  const onStudentBlur = useCallback(async () => {
    const student_name = await validateStudent();
    setState({ errorMessages: { ...state.errorMessages, student_name: student_name } } as StateType);
  }, [validateStudent, state.errorMessages]);

  const onStatusChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoScheduleFee: {
          ...state.dtoScheduleFee,
          status: (value as LookupDTO).text ?? ''
        }
      } as StateType);
    },
    [state.dtoScheduleFee]
  );

  const validateStatus = useCallback(async () => {
    if (state.dtoScheduleFee?.status.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoScheduleFee?.status]);

  const onStatusBlur = useCallback(async () => {
    const status = await validateStatus();
    setState({ errorMessages: { ...state.errorMessages, status: status } } as StateType);
  }, [validateStatus, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.student_name = await validateStudent();
    if (errorMessages.student_name) {
      isFormValid = false;
    }
    errorMessages.course_name = await validateCourse();
    if (errorMessages.course_name) {
      isFormValid = false;
    }
    errorMessages.payment_frequency = await validatePaymentType();
    if (errorMessages.payment_frequency) {
      isFormValid = false;
    }
    errorMessages.status = await validateStatus();
    if (errorMessages.status) {
      isFormValid = false;
    }
    errorMessages.total_amount = await validateAmount();
    if (errorMessages.total_amount) {
      isFormValid = false;
    }
    errorMessages.start_date = await validateStartDate();
    if (errorMessages.start_date) {
      isFormValid = false;
    }

    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateStudent, validateCourse, validatePaymentType, validateStatus, validateAmount, validateStartDate]);

  function formatDate(date: string | Date): string {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  function getMonthName(monthNumber: number): string {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    return monthNames[monthNumber - 1] ?? '';
  }

  const validateNetAmount = (netAmount: number, paymentFrequency: string): boolean => {
    if (netAmount < 0) {
      showSnackbar('Net amount cannot be less than 0', 'error');
      return false;
    }
    let divisor = 1;
    switch (paymentFrequency.toLowerCase()) {
      case 'monthly':
        divisor = 12;
        break;
      case 'quarterly':
        divisor = 4;
      case 'half-yearly':
        divisor = 2;
        break;
      default:
        divisor = 1;
    }
    if (netAmount / divisor < 1) {
      showSnackbar(`Net amount per ${paymentFrequency} must be at least 1`, 'error');
      return false;
    }
    return true;
  };

  function getMappedValue(selectedValue: string) {
    console.log('selectedvalue', selectedValue)
    switch (selectedValue) {
      case 'April - June':
        return 'Q1';
      case 'July - September':
        return 'Q2';
      case 'October - December':
        return 'Q3';
      case 'January - March':
        return 'Q4';
      case 'April - September':
        return 'H1';
      case 'October - March':
        return 'H2';
      default:
        return selectedValue; // fallback to original value if no match
    }
  }
  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (saving) return;
      setSaving(true);
      const v_start_date = getMappedValue(state.dtoScheduleFee.start_date);
      try {
        if (await validateForm()) {
          if (!validateNetAmount(Number(state.dtoScheduleFee.net_amount), state.dtoScheduleFee.payment_frequency)) {
            setSaving(false);
            return;
          }
          if (state.dtoScheduleFee.id === 0) {
            const { data } = await addFeePlan({
              variables: {
                course_id: state.dtoScheduleFee.course_id,
                learner_id: state.dtoScheduleFee.learner_id,
                payment_frequency: state.dtoScheduleFee.payment_frequency,
                start_date: v_start_date,
                discount: Number(state.dtoScheduleFee.discount),
                fine_amount: Number(state.dtoScheduleFee.fine_amount),
                total_amount: Number(state.dtoScheduleFee.total_amount),
                net_amount: Number(state.dtoScheduleFee.net_amount),
                status: state.dtoScheduleFee.status
              }
            });
            if (data?.addFeePlan) {
              showSnackbar(gMessageConstants.SNACKBAR_UPDATE_RECORD, 'success');
              router.push(`/${Constants.ADMIN_PAYMENT_MODULES}/schedule-fee/list`);
            } else {
              showSnackbar(gMessageConstants.SNACKBAR_INSERT_FAILED, 'error');
            }
          } else {
            const { data } = await updateFeePlan({
              variables: {
                id: state.dtoScheduleFee.id,
                course_id: state.dtoScheduleFee.course_id,
                learner_id: state.dtoScheduleFee.learner_id,
                payment_frequency: state.dtoScheduleFee.payment_frequency,
                start_date: v_start_date,
                discount: Number(state.dtoScheduleFee.discount),
                fine_amount: Number(state.dtoScheduleFee.fine_amount),
                total_amount: Number(state.dtoScheduleFee.total_amount),
                net_amount: Number(state.dtoScheduleFee.net_amount),
                status: state.dtoScheduleFee.status
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_UPDATE_RECORD, 'success');
              router.push(`/${Constants.ADMIN_PAYMENT_MODULES}/schedule-fee/list`);
            }
          }
        }
      } catch (error: any) {
        console.error('Error adding fee payment:', error);
        showSnackbar(gMessageConstants.SNACKBAR_INSERT_FAILED, 'error');
      } finally {
        setSaving(false);
      }
    },
    [saving, validateForm, addFeePlan, updateFeePlan, state.dtoScheduleFee, router]
  );

  const onClearClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setState({
        dtoScheduleFee: { ...SCHEDULE_FEE, id: state.dtoScheduleFee.id },
        errorMessages: { ...ERROR_MESSAGES }
      } as StateType);
    },
    [state.dtoScheduleFee.id, ERROR_MESSAGES]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/${Constants.ADMIN_PAYMENT_MODULES}/schedule-fee/list`);
    },
    [router]
  );

  const calculatePayableAmount = (total_amount?: string | number, fine?: string | number, discount?: string | number): number => {
    return Number(total_amount || 0) + Number(fine || 0) - Number(discount || 0);
  };

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

  const setOpen4 = useCallback(async (): Promise<void> => {
    setState({ open4: true } as StateType);
  }, []);

  const setClose4 = useCallback(async (): Promise<void> => {
    setState({ open4: false } as StateType);
  }, []);
  const setOpen6 = useCallback(async (): Promise<void> => {
    setState({ open6: true } as StateType);
  }, []);

  const setClose6 = useCallback(async (): Promise<void> => {
    setState({ open6: false } as StateType);
  }, []);

  return {
    state,
    saving,
    onSaveClick,
    onClearClick,
    onCancelClick,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    setOpen3,
    setClose3,
    setOpen4,
    setClose4,
    setOpen6,
    setClose6,
    onCourseBlur,
    onStudentBlur,
    onCourseChange,
    onStudentNameChange,
    onAmountChange,
    onAmountBlur,
    arrFeePaymentFrequencyMonthly,
    arrFeePaymentFrequencyQuarterly,
    arrFeePaymentType,
    arrFeePaymentFrequencyHalfYearly,
    // onFineAmountChange,
    // onDiscountAmountChange,
    onStatusChange,
    onStatusBlur,
    onStartDateBlur,
    onPaymentTypeBlur,
    onStartDateChange,
    onPaymentTypeChange,
    calculatePayableAmount,
    getMonthName,
    formatDate,
    onInputChange
  };
};

export default useScheduleFeeEntry;
