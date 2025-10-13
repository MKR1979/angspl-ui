import React, { ChangeEvent, useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import FeeCollectionDTO, { FEE_COLLECTION } from '@/app/types/FeeCollectionDTO';
import { ADD_FEE_COLLECTION_RETURN_ID, UPDATE_FEE_COLLECTION, GET_FEE_COLLECTION } from '@/app/graphql/FeeCollection';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
import * as gMessageConstants from '../../../constants/messages-constants';
import { COURSE_LOOKUP } from '@/app/graphql/Course';
import { FEE_HEAD_LOOKUP } from '@/app/graphql/FeeHead';
import { USER_LOOKUP } from '@/app/graphql/User';
import LookupDTO from '@/app/types/LookupDTO';
import { arrPayCollStatusLookup, getLocalTime, arrSessionYearType } from '@/app/common/Configuration';
import { GET_PAY_RECEIPT_BY_PAYMENT_ID } from '@/app/graphql/Receipt';
import ReceiptDTO, { RECEIPT } from '@/app/types/ReceiptDTO';
import { GET_FEE_HEAD } from '@/app/graphql/FeeHead';
import FeeHeadDTO, { FEE_HEAD } from '@/app/types/FeeHeadDTO';
import * as Constants from '../../constants/constants';
import * as gConstants from '../../../constants/constants';
import { useSelector } from '../../../store';
import dayjs from 'dayjs';

type ErrorMessageType = {
  payment_id: number | null;
  student_name: string | null;
  learner_id: number | null;
  course_id: number | null;
  course_name: string | null;
  payment_mode: string | null;
  cheque_number: string | null;
  start_date: string | null;
  total_amount: number | null;
  fee_month: string | null;
  fee_year: string | null;
  fee_amount: string | null;
  payment_date: string | null;
  method: string | null;
  transaction_id: string | null;
  status: string | null;
  fee_head: string | null;
};

type StateType = {
  dtoFeeCollection: FeeCollectionDTO;
  arrCourseLookup: LookupDTO[];
  arrFeeHeadLookup: LookupDTO[];
  arrUserLookup: LookupDTO[];
  arrStatusLookup: LookupDTO[];
  arrSessionYearLookup: LookupDTO[];
  dtoReceipt: ReceiptDTO;
  dtoFeeHead: FeeHeadDTO;
  isLoading: boolean;
  open1: boolean;
  open2: boolean;
  open3: boolean;
  open6: boolean;
  open4: boolean;
  open5: boolean;
  open7: boolean;
  base_course_price: number;
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoFeeCollection: FeeCollectionDTO;
};

const useFeeCollectionEntry = ({ dtoFeeCollection }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    payment_id: null,
    student_name: null,
    learner_id: null,
    course_id: null,
    course_name: null,
    payment_mode: null,
    cheque_number: null,
    start_date: null,
    total_amount: null,
    fee_month: null,
    fee_year: null,
    fee_amount: null,
    payment_date: null,
    method: null,
    transaction_id: null,
    status: null,
    base_course_price: null,
    fee_head: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoFeeCollection: dtoFeeCollection,
    arrCourseLookup: [] as LookupDTO[],
    arrFeeHeadLookup: [] as LookupDTO[],
    arrUserLookup: [] as LookupDTO[],
    arrStatusLookup: arrPayCollStatusLookup,
    arrSessionYearLookup: arrSessionYearType,
    dtoFeeHead: FEE_HEAD,
    dtoReceipt: RECEIPT,
    open1: false,
    open2: false,
    open3: false,
    open6: false,
    open4: false,
    open5: false,
    open7: false,
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
  const showSnackbar = useSnackbar();
  const [submitted, setSubmitted] = useState(false);
  const { companyInfo } = useSelector((state) => state.globalState);
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [saving, setSaving] = useState(false);
  const [getFeeHead] = useLazyQuery(GET_FEE_HEAD, { fetchPolicy: 'network-only' });
  const [getPayReceiptByPaymentId] = useLazyQuery(GET_PAY_RECEIPT_BY_PAYMENT_ID, { fetchPolicy: 'network-only' });
  const [addFeeCollectionReturnId] = useMutation(ADD_FEE_COLLECTION_RETURN_ID);
  const [updateFeeCollection] = useMutation(UPDATE_FEE_COLLECTION, {});
  const [getFeeCollection] = useLazyQuery(GET_FEE_COLLECTION, { fetchPolicy: 'network-only' });
  const [getUserLookup] = useLazyQuery(USER_LOOKUP, { fetchPolicy: 'network-only' });
  const [getCourseLookup] = useLazyQuery(COURSE_LOOKUP, { fetchPolicy: 'network-only' });
  const [getFeeHeadLookup] = useLazyQuery(FEE_HEAD_LOOKUP, { fetchPolicy: 'network-only' });
  const [selectedFeeHeadId, setSelectedFeeHeadId] = useState<number>(0);

  useEffect(() => {
    if (state.arrStatusLookup.length > 0 && !state.dtoFeeCollection.status) {
      const firstItem = state.arrStatusLookup[0];
      setState({
        ...state,
        dtoFeeCollection: {
          ...state.dtoFeeCollection,
          status: firstItem.text
        }
      });
    }
  }, [state.arrStatusLookup, state]);

  const getFeeHeadBaseAmt = useCallback(
    async (fee_head_id?: number): Promise<void> => {
      try {
        if (fee_head_id === undefined) {
          return;
        }
        let baseAmount = 0;
        const { error, data } = await getFeeHead({
          variables: { id: fee_head_id }
        });
        if (!error && data?.getFeeHead) {
          baseAmount = data.getFeeHead.base_amount ?? 0;
        }
        setState({
          dtoFeeCollection: {
            ...state.dtoFeeCollection,
            fee_amount: baseAmount
          }
        } as StateType);
      } catch (err) {
        console.error('Error loading quiz question:', err);
        showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
      }
    },
    [getFeeHead, state.dtoFeeCollection]
  );

  useEffect(() => {
    if (selectedFeeHeadId > 0) {
      getFeeHeadBaseAmt(selectedFeeHeadId);
      setSelectedFeeHeadId(0);
    }
  }, [selectedFeeHeadId, getFeeHeadBaseAmt]);

  const getCourseData = useCallback(async (): Promise<void> => {
    try {
      let arrCourseLookup: LookupDTO[] = [];
      const { error, data } = await getCourseLookup({
        variables: {
          group_name: companyInfo.company_type
        }
      });
      if (!error && data) {
        arrCourseLookup = data.getCourseLookup;
      }
      setState({ arrCourseLookup: arrCourseLookup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getCourseLookup, companyInfo.company_type]);

  const getFeeHeadData = useCallback(async (): Promise<void> => {
    try {
      let arrFeeHeadLookup: LookupDTO[] = [];
      const { error, data } = await getFeeHeadLookup();
      if (!error && data) {
        arrFeeHeadLookup = data.getFeeHeadLookup;
      }
      setState({ arrFeeHeadLookup: arrFeeHeadLookup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getFeeHeadLookup]);

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
      let dtoFeeCollection: FeeCollectionDTO = FEE_COLLECTION;
      const { error, data } = await getFeeCollection({
        variables: {
          id: state.dtoFeeCollection.id
        }
      });
      if (!error && data) {
        dtoFeeCollection = data.getFeeCollection;
      }
      setState({ dtoFeeCollection: dtoFeeCollection } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getFeeCollection, state.dtoFeeCollection.id]);

  useEffect(() => {
    getUserData();
    getCourseData();
    getFeeHeadData();
  }, [getUserData, getCourseData, getFeeHeadData]);

  useEffect(() => {
    if (state.dtoFeeCollection.id > 0) {
      getFeePlanData();
    }
  }, [state.dtoFeeCollection.id, getFeePlanData]);

  const getPayReceiptInfo = useCallback(
    async (id?: number): Promise<void> => {
      const targetId = id;
      const { data } = await getPayReceiptByPaymentId({
        variables: {
          payment_id: targetId
        }
      });
      setState({
        ...state,
        dtoReceipt: data.getPayReceiptByPaymentId || RECEIPT
      });
    },
    [getPayReceiptByPaymentId, state]
  );

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoFeeCollection: {
          ...state.dtoFeeCollection,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoFeeCollection]
  );

  const onCourseChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoFeeCollection: {
          ...state.dtoFeeCollection,
          course_name: (value as LookupDTO).text,
          course_id: (value as LookupDTO).id
        }
      } as StateType);
    },
    [state.dtoFeeCollection]
  );

  const onFeeHeadChange = useCallback(
    async (event: any, value: unknown) => {
      const head = value as LookupDTO | null;
      if (!head?.id) return;
      setState({
        ...state,
        dtoFeeCollection: {
          ...state.dtoFeeCollection,
          fee_head: head.text,
          fee_head_id: head.id
        }
      } as StateType);
      setSelectedFeeHeadId(head.id);
    },
    [state]
  );

  const validateCourse = useCallback(async () => {
    if (state.dtoFeeCollection.course_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoFeeCollection.course_name]);

  const onCourseBlur = useCallback(async () => {
    const course_name = await validateCourse();
    setState({ errorMessages: { ...state.errorMessages, course_name: course_name } } as StateType);
  }, [validateCourse, state.errorMessages]);

  const validateFeeYear = useCallback(async () => {
    const value = String(state.dtoFeeCollection.fee_year).trim();
    if (value === '') {
      return gMessageConstants.REQUIRED_FIELD;
    }
    return null;
  }, [state.dtoFeeCollection.fee_year]);

  const onFeeYearBlur = useCallback(async () => {
    const fee_year = await validateFeeYear();
    setState({ errorMessages: { ...state.errorMessages, fee_year: fee_year } } as StateType);
  }, [validateFeeYear, state.errorMessages]);

  const onFeeMonthChange = useCallback(
    async (event: any, value: unknown) => {
      const selectedValue = (value as LookupDTO)?.text ?? '';
      setState({
        dtoFeeCollection: {
          ...state.dtoFeeCollection,
          fee_month: selectedValue
        }
      } as StateType);
    },
    [state.dtoFeeCollection]
  );

  const validateFeeMonth = useCallback(async () => {
    if (state.dtoFeeCollection.fee_month.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoFeeCollection.fee_month]);

  const onFeeMonthBlur = useCallback(async () => {
    const fee_month = await validateFeeMonth();
    setState({ errorMessages: { ...state.errorMessages, fee_month: fee_month } } as StateType);
  }, [validateFeeMonth, state.errorMessages]);

  const validateFeeHead = useCallback(async () => {
    if (state.dtoFeeCollection.fee_head.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoFeeCollection.fee_head]);

  const onFeeHeadBlur = useCallback(async () => {
    const fee_head = await validateFeeHead();
    setState({ errorMessages: { ...state.errorMessages, fee_head: fee_head } } as StateType);
  }, [validateFeeHead, state.errorMessages]);

  const onStudentNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoFeeCollection: {
          ...state.dtoFeeCollection,
          student_name: (value as LookupDTO).text,
          learner_id: (value as LookupDTO).id
        }
      } as StateType);
    },
    [state.dtoFeeCollection]
  );

  const validateStudent = useCallback(async () => {
    if (state.dtoFeeCollection.student_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoFeeCollection.student_name]);

  const onStudentBlur = useCallback(async () => {
    const student_name = await validateStudent();
    setState({ errorMessages: { ...state.errorMessages, student_name: student_name } } as StateType);
  }, [validateStudent, state.errorMessages]);

  const validatePaymentDate = useCallback(async () => {
    if (
      state.dtoFeeCollection.payment_date == null ||
      dayjs(getLocalTime(state.dtoFeeCollection.payment_date)).format('MM/DD/YYYY') === '12/31/1899'
    ) {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoFeeCollection.payment_date]);

  const onPaymentDateBlur = useCallback(async () => {
    const payment_date = await validatePaymentDate();
    setState({ errorMessages: { ...state.errorMessages, payment_date: payment_date } } as StateType);
  }, [validatePaymentDate, state.errorMessages]);

  const onPaymentDateChange = useCallback(
    async (value: any): Promise<void> => {
      setState({ dtoFeeCollection: { ...state.dtoFeeCollection, payment_date: value } } as StateType);
    },
    [state.dtoFeeCollection]
  );

  const onPaymentModeChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoFeeCollection: {
          ...state.dtoFeeCollection,
          payment_mode: (value as LookupDTO).text ?? ''
        }
      } as StateType);
    },
    [state.dtoFeeCollection]
  );

  const validatePaymentMode = useCallback(async () => {
    if (state.dtoFeeCollection.payment_mode.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoFeeCollection.payment_mode]);

  const onPaymentModeBlur = useCallback(async () => {
    const payment_mode = await validatePaymentMode();
    setState({ errorMessages: { ...state.errorMessages, payment_mode: payment_mode } } as StateType);
  }, [validatePaymentMode, state.errorMessages]);

  const onStatusChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoFeeCollection: {
          ...state.dtoFeeCollection,
          status: (value as LookupDTO).text ?? ''
        }
      } as StateType);
    },
    [state.dtoFeeCollection]
  );

  const onFeeYearChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoFeeCollection: {
          ...state.dtoFeeCollection,
          fee_year: (value as LookupDTO).text ?? ''
        }
      } as StateType);
    },
    [state.dtoFeeCollection]
  );

  const validateStatus = useCallback(async () => {
    if (state.dtoFeeCollection?.status.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoFeeCollection?.status]);

  const onStatusBlur = useCallback(async () => {
    const status = await validateStatus();
    setState({ errorMessages: { ...state.errorMessages, status: status } } as StateType);
  }, [validateStatus, state.errorMessages]);

  const onAmountChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      setState({
        dtoFeeCollection: {
          ...state.dtoFeeCollection,
          fee_amount: Number(value) || 0
        }
      } as StateType);
    },
    [state.dtoFeeCollection]
  );

  const validateAmount = useCallback(() => {
    const fee_amount = Number(state.dtoFeeCollection.fee_amount);
    if (isNaN(fee_amount) || fee_amount <= 0) {
      return 'Required Field! ';
    }
    return null;
  }, [state.dtoFeeCollection.fee_amount]);

  const onAmountBlur = useCallback(async () => {
    const fee_amount = await validateAmount();
    setState({ errorMessages: { ...state.errorMessages, fee_amount: fee_amount } } as StateType);
  }, [validateAmount, state.errorMessages]);

  const validateChequeNo = useCallback(() => {
    const cheque = state.dtoFeeCollection.cheque_number?.trim() || '';
    if (cheque === '') {
      return null;
    }
    if (!/^\d{6,12}$/.test(cheque)) {
      return gMessageConstants.INVALID;
    }
    if (/^(\d)\1+$/.test(cheque)) {
      return gMessageConstants.INVALID;
    }
    return null;
  }, [state.dtoFeeCollection.cheque_number]);

  const onChequeNoBlur = useCallback(async () => {
    const cheque_number = await validateChequeNo();
    setState({ errorMessages: { ...state.errorMessages, cheque_number: cheque_number } } as StateType);
  }, [validateChequeNo, state.errorMessages]);

  const onChequeNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, ''); // Remove non-digit characters

    if (digitsOnly.length <= gConstants.CGPA_HIGHEST) {
      onInputChange({
        ...e,
        target: { ...e.target, value: digitsOnly, name: 'cheque_number' }
      });
    }
  };

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.student_name = await validateStudent();
    if (errorMessages.student_name) {
      isFormValid = false;
    }
    errorMessages.payment_mode = await validatePaymentMode();
    if (errorMessages.payment_mode) {
      isFormValid = false;
    }
    errorMessages.course_name = await validateCourse();
    if (errorMessages.course_name) {
      isFormValid = false;
    }
    errorMessages.fee_head = await validateFeeHead();
    if (errorMessages.fee_head) {
      isFormValid = false;
    }
    errorMessages.fee_month = await validateFeeMonth();
    if (errorMessages.fee_month) {
      isFormValid = false;
    }
    errorMessages.fee_year = await validateFeeYear();
    if (errorMessages.fee_year) {
      isFormValid = false;
    }
    errorMessages.fee_amount = await validateAmount();
    if (errorMessages.fee_amount) {
      isFormValid = false;
    }
    errorMessages.payment_date = await validatePaymentDate();
    if (errorMessages.payment_date) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [
    validateStudent,
    validateCourse,
    validatePaymentMode,
    validateFeeHead,
    validateFeeMonth,
    validateFeeYear,
    validateAmount,
    validatePaymentDate
  ]);

  function formatDate(date: string | Date): string {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (saving) return;
      setSaving(true);
      try {
        if (await validateForm()) {
          if (state.dtoFeeCollection.id === 0) {
            const result = await addFeeCollectionReturnId({
              variables: {
                course_id: state.dtoFeeCollection.course_id,
                learner_id: state.dtoFeeCollection.learner_id,
                payment_date: state.dtoFeeCollection.payment_date,
                payment_mode: state.dtoFeeCollection.payment_mode,
                cheque_number: state.dtoFeeCollection.cheque_number,
                fee_head_id: state.dtoFeeCollection.fee_head_id,
                fee_amount: state.dtoFeeCollection.fee_amount,
                fee_month: state.dtoFeeCollection.fee_month,
                fee_year: Number(state.dtoFeeCollection.fee_year),
                remarks: state.dtoFeeCollection.remarks,
                status: state.dtoFeeCollection.status
              }
            });
            if (result?.data?.addFeeCollectionReturnId > 0) {
              showSnackbar(gMessageConstants.SNACKBAR_UPDATE_RECORD, 'success');
              const newPaymentId = result?.data?.addFeeCollectionReturnId;
              getPayReceiptInfo(newPaymentId);
              setSubmitted(true);
            } else {
              showSnackbar(gMessageConstants.SNACKBAR_INSERT_FAILED, 'error');
            }
          } else {
            const { data } = await updateFeeCollection({
              variables: {
                id: state.dtoFeeCollection.id,
                course_id: state.dtoFeeCollection.course_id,
                learner_id: state.dtoFeeCollection.learner_id,
                payment_date: state.dtoFeeCollection.payment_date,
                payment_mode: state.dtoFeeCollection.payment_mode,
                cheque_number: state.dtoFeeCollection.cheque_number,
                fee_head_id: state.dtoFeeCollection.fee_head_id,
                fee_amount: state.dtoFeeCollection.fee_amount,
                fee_month: state.dtoFeeCollection.fee_month,
                fee_year: Number(state.dtoFeeCollection.fee_year),
                remarks: state.dtoFeeCollection.remarks,
                status: state.dtoFeeCollection.status
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_UPDATE_RECORD, 'success');
              router.push(`/${Constants.ADMIN_PAYMENT_MODULES}/fee-collection/list`);
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
    [saving, validateForm, addFeeCollectionReturnId, updateFeeCollection, state.dtoFeeCollection, router]
  );

  const onClearClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setState({
        dtoFeeCollection: { ...FEE_COLLECTION, id: state.dtoFeeCollection.id },
        errorMessages: { ...ERROR_MESSAGES }
      } as StateType);
    },
    [state.dtoFeeCollection.id, ERROR_MESSAGES]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/${Constants.ADMIN_PAYMENT_MODULES}/fee-collection/list`);
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

  const setOpen5 = useCallback(async (): Promise<void> => {
    setState({ open5: true } as StateType);
  }, []);

  const setClose5 = useCallback(async (): Promise<void> => {
    setState({ open5: false } as StateType);
  }, []);
  const setOpen6 = useCallback(async (): Promise<void> => {
    setState({ open6: true } as StateType);
  }, []);

  const setClose6 = useCallback(async (): Promise<void> => {
    setState({ open6: false } as StateType);
  }, []);

  const setOpen7 = useCallback(async (): Promise<void> => {
    setState({ open7: true } as StateType);
  }, []);

  const setClose7 = useCallback(async (): Promise<void> => {
    setState({ open7: false } as StateType);
  }, []);

  return {
    state,
    saving,
    submitted,
    onInputChange,
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
    setOpen5,
    setClose5,
    setOpen6,
    setClose6,
    setOpen7,
    setClose7,
    onCourseBlur,
    onStudentBlur,
    onCourseChange,
    onStudentNameChange,
    onAmountChange,
    onAmountBlur,
    onStatusChange,
    onStatusBlur,
    onPaymentModeBlur,
    onPaymentModeChange,
    calculatePayableAmount,
    formatDate,
    onPaymentDateChange,
    onPaymentDateBlur,
    onChequeNoBlur,
    onChequeNoChange,
    onFeeMonthBlur,
    onFeeMonthChange,
    onFeeYearBlur,
    onFeeYearChange,
    onFeeHeadBlur,
    onFeeHeadChange
  };
};

export default useFeeCollectionEntry;
