import React, { ChangeEvent, useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import FeeHeadDTO, { FEE_HEAD } from '@/app/types/FeeHeadDTO';
import { ADD_FEE_HEAD, UPDATE_FEE_HEAD, GET_FEE_HEAD } from '@/app/graphql/FeeHead';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
import * as gMessageConstants from '../../../constants/messages-constants';
import { arrCommonStatus } from '@/app/common/Configuration';
import LookupDTO from '@/app/types/LookupDTO';
import { FEE_HEAD_CATEGORY_LOOKUP } from '@/app/graphql/FeeHeadCategory';
import * as Constants from '../../constants/constants';

type ErrorMessageType = {
  company_id: number | null;
  name: string | null;
  code: string | null;
  category_name: string | null;
  description: string | null;
  base_amount: number | null;
  is_mandatory: boolean;
  status: string | null;
};

type StateType = {
  dtoFeeHead: FeeHeadDTO;
  arrCommonStatusLookup: LookupDTO[];
  arrFeeHeadCategoryLookup: LookupDTO[];
  isLoading: boolean;
  open1: boolean;
  open2: boolean;
  saveDisabled: boolean;
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoFeeHead: FeeHeadDTO;
};

const useFeeHeadtEntry = ({ dtoFeeHead }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    company_id: null,
    name: null,
    code: null,
    category_name: null,
    description: null,
    is_mandatory: false,
    status: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoFeeHead: dtoFeeHead,
    arrCommonStatusLookup: arrCommonStatus,
    arrFeeHeadCategoryLookup: [] as LookupDTO[],
    open1: false,
    open2: false,
    saveDisabled: false,
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
  const showSnackbar = useSnackbar();
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [saving, setSaving] = useState(false);
  const [addFeeHead] = useMutation(ADD_FEE_HEAD, {});
  const [updateFeeHead] = useMutation(UPDATE_FEE_HEAD, {});
  const [getFeeHead] = useLazyQuery(GET_FEE_HEAD, { fetchPolicy: 'network-only' });
  const [getFeeHeadCategoryLookup] = useLazyQuery(FEE_HEAD_CATEGORY_LOOKUP, { fetchPolicy: 'network-only' });

  useEffect(() => {
    if (
      state.arrCommonStatusLookup.length > 0 &&
      !state.dtoFeeHead.status
    ) {
      const firstItem = state.arrCommonStatusLookup[0];
      setState({
        ...state,
        dtoFeeHead: {
          ...state.dtoFeeHead,
          status: firstItem.text,
        }
      });
    }
  }, [state.arrCommonStatusLookup]);

  const getFeeHeadData = useCallback(async (): Promise<void> => {
    try {
      let dtoFeeHead: FeeHeadDTO = FEE_HEAD;
      const { error, data } = await getFeeHead({
        variables: {
          id: state.dtoFeeHead.id
        }
      });
      if (!error && data) {
        dtoFeeHead = data.getFeeHead;
      }
      setState({ dtoFeeHead: dtoFeeHead } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getFeeHead, state.dtoFeeHead.id]);

  useEffect(() => {
    if (state.dtoFeeHead.id > 0) {
      getFeeHeadData();
    }
  }, [state.dtoFeeHead.id, getFeeHeadData]);

  const setDefaultValues = useCallback(async () => {
    setState({
      dtoFeeHead: {
        ...state.dtoFeeHead,
        fee_head_category_id: dtoFeeHead.fee_head_category_id,
        category_name: dtoFeeHead.category_name
      }
    } as StateType);
  }, [state.dtoFeeHead]);

  const getFeeHeadCategory = useCallback(async (): Promise<void> => {
    try {
      let arrFeeHeadCategoryLookup: LookupDTO[] = [];
      const { error, data } = await getFeeHeadCategoryLookup();
      if (!error && data?.getFeeHeadCategoryLookup) {
        arrFeeHeadCategoryLookup = data.getFeeHeadCategoryLookup;
      }
      setState({ arrFeeHeadCategoryLookup: arrFeeHeadCategoryLookup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getFeeHeadCategoryLookup]);

  useEffect(() => {
    if (state.dtoFeeHead.id > 0) {
      getFeeHeadData();
    } else {
      setDefaultValues();
    }
    getFeeHeadCategory();
  }, []);

  const onCategoryNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoFeeHead: {
          ...state.dtoFeeHead,
          fee_head_category_id: (value as LookupDTO).id,
          category_name: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoFeeHead]
  );
  const validateCategoryName = useCallback(async () => {
    if (state.dtoFeeHead.category_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoFeeHead.category_name]);

  const onCategoryNameBlur = useCallback(async () => {
    const category_name = await validateCategoryName();
    setState({ errorMessages: { ...state.errorMessages, category_name: category_name } } as StateType);
  }, [validateCategoryName, state.errorMessages]);

  const onPlainInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoFeeHead: {
          ...state.dtoFeeHead,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoFeeHead]
  );

  const validateName = useCallback(async () => {
    if (state.dtoFeeHead.name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoFeeHead.name]);

  const validateCode = useCallback(async () => {
    if (state.dtoFeeHead.code.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoFeeHead.code]);

  const onNameBlur = useCallback(async () => {
    const name = await validateName();
    setState({ errorMessages: { ...state.errorMessages, name: name } } as StateType);
  }, [validateName, state.errorMessages]);

  const onCodeBlur = useCallback(async () => {
    const code = await validateName();
    setState({ errorMessages: { ...state.errorMessages, code: code } } as StateType);
  }, [validateName, state.errorMessages]);

  const onStatusChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoFeeHead: {
          ...state.dtoFeeHead,
          status: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoFeeHead]
  );

  const validateStatus = useCallback(async () => {
    if (state.dtoFeeHead.status.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoFeeHead.status]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, type, checked, value } = event.target;
      setState({
        dtoFeeHead: {
          ...state.dtoFeeHead,
          [name]: type === 'checkbox' ? checked : name === 'price' ? Number(value) : value
        }
      } as StateType);
    },
    [state.dtoFeeHead]
  );

  const onStatusBlur = useCallback(async () => {
    const status = await validateStatus();
    setState({ errorMessages: { ...state.errorMessages, status: status } } as StateType);
  }, [validateStatus, state.errorMessages]);

  const validateAmount = useCallback(async () => {
    const base_amount = Number(state.dtoFeeHead.base_amount);
    if (base_amount === 0) {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoFeeHead.base_amount]);

  const onAmountBlur = useCallback(async () => {
    const base_amount = await validateAmount();
    setState({ errorMessages: { ...state.errorMessages, base_amount: base_amount } } as StateType);
  }, [validateAmount, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.name = await validateName();
    if (errorMessages.name) {
      isFormValid = false;
    }
    errorMessages.code = await validateCode();
    if (errorMessages.code) {
      isFormValid = false;
    }
    errorMessages.status = await validateStatus();
    if (errorMessages.status) {
      isFormValid = false;
    }
    errorMessages.category_name = await validateCategoryName();
    if (errorMessages.category_name) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateName, validateCode, validateStatus, validateCategoryName]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (saving) return;
      setSaving(true);
      try {
        if (await validateForm()) {
          if (state.dtoFeeHead.id === 0) {
            const { data } = await addFeeHead({
              variables: {
                fee_head_category_id: state.dtoFeeHead.fee_head_category_id,
                name: state.dtoFeeHead.name,
                code: state.dtoFeeHead.code,
                description: state.dtoFeeHead.description,
                base_amount: Number(state.dtoFeeHead.base_amount),
                is_mandatory: state.dtoFeeHead.is_mandatory,
                status: state.dtoFeeHead.status,

              }
            });
            if (data?.addFeeHead) {
              showSnackbar(gMessageConstants.SNACKBAR_UPDATE_RECORD, 'success');
              router.push(`/${Constants.ADMIN_PAYMENT_MODULES}/fee-heads/list`);
            } else {
              showSnackbar(gMessageConstants.SNACKBAR_INSERT_FAILED, 'error');
            }
          } else {
            const { data } = await updateFeeHead({
              variables: {
                id: state.dtoFeeHead.id,
                fee_head_category_id: state.dtoFeeHead.fee_head_category_id,
                name: state.dtoFeeHead.name,
                code: state.dtoFeeHead.code,
                description: state.dtoFeeHead.description,
                base_amount: Number(state.dtoFeeHead.base_amount),
                is_mandatory: state.dtoFeeHead.is_mandatory,
                status: state.dtoFeeHead.status,
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_UPDATE_RECORD, 'success');
              router.push(`/${Constants.ADMIN_PAYMENT_MODULES}/fee-heads/list`);
            }
          }
        }
      } catch (error: any) {
        console.error('Error adding fee head:', error);
        showSnackbar(gMessageConstants.SNACKBAR_INSERT_FAILED, 'error');
      } finally {
        setSaving(false);
      }
    },
    [saving, validateForm, addFeeHead, updateFeeHead, state.dtoFeeHead, router]
  );

  const onClearClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setState({
        dtoFeeHead: { ...FEE_HEAD, id: state.dtoFeeHead.id },
        errorMessages: { ...ERROR_MESSAGES }
      } as StateType);
    },
    [state.dtoFeeHead.id, ERROR_MESSAGES]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/${Constants.ADMIN_PAYMENT_MODULES}/fee-heads/list`);
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
    onCodeBlur,
    onNameBlur,
    onInputChange,
    onPlainInputChange,
    onStatusChange,
    onStatusBlur,
    onAmountBlur,
    onCategoryNameChange,
    onCategoryNameBlur,
  };
};

export default useFeeHeadtEntry;
