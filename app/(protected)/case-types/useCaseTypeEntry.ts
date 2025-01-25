import React, { ChangeEvent, useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import CaseTypeDTO, { CASE_TYPE } from '@/app/types/CaseTypeDTO';
import { ADD_CASE_TYPE, UPDATE_CASE_TYPE, GET_CASE_TYPE, GET_CASE_TYPE_CASE_TYPE_NAME_EXIST } from '@/app/graphql/CaseType';
import toast from 'react-hot-toast';

type ErrorMessageType = {
  case_type_name: string | null;
};

type StateType = {
  dtoCaseType: CaseTypeDTO;
  saveDisabled: boolean;
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoCaseType: CaseTypeDTO;
};

const useCaseTypeEntry = ({ dtoCaseType }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    case_type_name: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoCaseType: dtoCaseType,
    saveDisabled: false,
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [addCaseType] = useMutation(ADD_CASE_TYPE, {});

  const [updateCaseType] = useMutation(UPDATE_CASE_TYPE, {});

  const [getCaseType] = useLazyQuery(GET_CASE_TYPE, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getCaseTypeCaseTypeNameExist] = useLazyQuery(GET_CASE_TYPE_CASE_TYPE_NAME_EXIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoCaseType: CaseTypeDTO = CASE_TYPE;
    const { error, data } = await getCaseType({
      variables: {
        id: state.dtoCaseType.id
      }
    });
    if (!error && data?.getCaseType) {
      dtoCaseType = data.getCaseType;
    }
    setState({ dtoCaseType: dtoCaseType } as StateType);
  }, [getCaseType, state.dtoCaseType.id]);

  const IsCaseTypeNameExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getCaseTypeCaseTypeNameExist({
      variables: {
        id: state.dtoCaseType.id,
        case_type_name: state.dtoCaseType.case_type_name
      }
    });
    if (!error && data?.getCaseTypeCaseTypeNameExist) {
      exist = data.getCaseTypeCaseTypeNameExist;
    }
    return exist;
  }, [getCaseTypeCaseTypeNameExist, state.dtoCaseType.id, state.dtoCaseType.case_type_name]);

  useEffect(() => {
    if (state.dtoCaseType.id > 0) {
      getData();
    }
  }, [state.dtoCaseType.id, getData]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoCaseType: {
          ...state.dtoCaseType,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoCaseType]
  );

  const validateCaseTypeName = useCallback(async () => {
    if (state.dtoCaseType.case_type_name.trim() === '') {
      return 'Case Type Name is required';
    }
    if (await IsCaseTypeNameExist()) {
      return 'Case Type Name already exists';
    } else {
      return null;
    }
  }, [state.dtoCaseType.case_type_name, IsCaseTypeNameExist]);

  const onCaseTypeNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const case_type_name = await validateCaseTypeName();
      setState({ errorMessages: { ...state.errorMessages, case_type_name: case_type_name } } as StateType);
    }, [validateCaseTypeName, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.case_type_name = await validateCaseTypeName();
    if (errorMessages.case_type_name) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateCaseTypeName]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      try {
        setState({ saveDisabled: true } as StateType);
        event.preventDefault();

        if (await validateForm()) {
          if (state.dtoCaseType.id === 0) {
            const { data } = await addCaseType({
              variables: {
                case_type_name: state.dtoCaseType.case_type_name
              }
            });
            if (data?.addCaseType) {
              toast.success('record saved successfully');
              router.push('/case-types/list');
            } else {
              toast.error('Failed to save the record');
            }
          } else {
            const { data } = await updateCaseType({
              variables: {
                id: state.dtoCaseType.id,
                case_type_name: state.dtoCaseType.case_type_name
              }
            });
            if (data?.updateCaseType) {
              toast.success('record saved successfully');
              router.push('/case-types/list');
            } else {
              toast.error('Failed to save the record');
            }
          }
        }
      } catch {
        toast.error('Failed to save the record');
      } finally {
        setState({ saveDisabled: false } as StateType);
      }
    },
    [validateForm, addCaseType, state.dtoCaseType, router, updateCaseType]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/case-types/list');
    },
    [router]
  );

  return {
    state,
    onInputChange,
    onCaseTypeNameBlur,
    onSaveClick,
    onCancelClick
  };
};

export default useCaseTypeEntry;
