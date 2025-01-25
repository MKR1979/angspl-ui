import React, { ChangeEvent, useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import UnitDTO, { UNIT } from '@/app/types/UnitDTO';
import { ADD_UNIT, UPDATE_UNIT, GET_UNIT } from '@/app/graphql/Unit';
import { GET_UNIT_UNIT_CODE_EXIST, GET_UNIT_UNIT_NAME_EXIST } from '@/app/graphql/Unit';
import toast from 'react-hot-toast';

type ErrorMessageType = {
  unit_name: string | null;
  unit_code: string | null;
};

type StateType = {
  dtoUnit: UnitDTO;
  saveDisabled: boolean;
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoUnit: UnitDTO;
};

const useUnitEntry = ({ dtoUnit }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    unit_name: null,
    unit_code: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoUnit: dtoUnit,
    saveDisabled: false,
    errorMessages: { ...ERROR_MESSAGES }
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [addUnit] = useMutation(ADD_UNIT, {});

  const [updateUnit] = useMutation(UPDATE_UNIT, {});

  const [getUnit] = useLazyQuery(GET_UNIT, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getUnitUnitCodeExist] = useLazyQuery(GET_UNIT_UNIT_CODE_EXIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getUnitUnitNameExist] = useLazyQuery(GET_UNIT_UNIT_NAME_EXIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoUnit: UnitDTO = UNIT;
    const { error, data } = await getUnit({
      variables: {
        id: state.dtoUnit.id
      }
    });
    if (!error && data?.getUnit) {
      dtoUnit = data.getUnit;
    }
    setState({ dtoUnit: dtoUnit } as StateType);
  }, [getUnit, state.dtoUnit.id]);

  const IsUnitCodeExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getUnitUnitCodeExist({
      variables: {
        id: state.dtoUnit.id,
        unit_code: state.dtoUnit.unit_code
      }
    });
    if (!error && data?.getUnitUnitCodeExist) {
      exist = data.getUnitUnitCodeExist;
    }
    return exist;
  }, [getUnitUnitCodeExist, state.dtoUnit.id, state.dtoUnit.unit_code]);

  const IsUnitNameExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getUnitUnitNameExist({
      variables: {
        id: state.dtoUnit.id,
        unit_name: state.dtoUnit.unit_name
      }
    });
    if (!error && data?.getUnitUnitNameExist) {
      exist = data.getUnitUnitNameExist;
    }
    return exist;
  }, [getUnitUnitNameExist, state.dtoUnit.id, state.dtoUnit.unit_name]);

  useEffect(() => {
    if (state.dtoUnit.id > 0) {
      getData();
    }
  }, [state.dtoUnit.id, getData]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoUnit: {
          ...state.dtoUnit,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoUnit]
  );

  const validateUnitName = useCallback(async () => {
    if (state.dtoUnit.unit_name.trim() === '') {
      return 'Unit Name is required';
    } else if (await IsUnitNameExist()) {
      return 'Unit Name already exists';
    } else {
      return null;
    }
  }, [state.dtoUnit.unit_name, IsUnitNameExist]);

  const onUnitNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const unit_name = await validateUnitName();
      setState({ errorMessages: { ...state.errorMessages, unit_name: unit_name } } as StateType);
    }, [validateUnitName, state.errorMessages]);

  const validateUnitCode = useCallback(async () => {
    if (state.dtoUnit.unit_code.trim() === '') {
      return 'Unit Code is required';
    } else if (await IsUnitCodeExist()) {
      return 'Unit Code already exists';
    } else {
      return null;
    }
  }, [state.dtoUnit.unit_code, IsUnitCodeExist]);

  const onUnitCodeBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const unit_code = await validateUnitCode();
      setState({ errorMessages: { ...state.errorMessages, unit_code: unit_code } } as StateType);
    }, [validateUnitCode, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.unit_name = await validateUnitName();
    if (errorMessages.unit_name) {
      isFormValid = false;
    }
    errorMessages.unit_code = await validateUnitCode();
    if (errorMessages.unit_code) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateUnitName, validateUnitCode]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      try {
        setState({ saveDisabled: true } as StateType);
        event.preventDefault();

        if (await validateForm()) {
          if (state.dtoUnit.id === 0) {
            const { data } = await addUnit({
              variables: {
                unit_code: state.dtoUnit.unit_code,
                unit_name: state.dtoUnit.unit_name
              }
            });
            if (data?.addUnit) {
              toast.success('record saved successfully');
              router.push('/units/list');
            } else {
              toast.error('Failed to save the record');
            }
          } else {
            const { data } = await updateUnit({
              variables: {
                id: state.dtoUnit.id,
                unit_code: state.dtoUnit.unit_code,
                unit_name: state.dtoUnit.unit_name
              }
            });
            if (data?.updateUnit) {
              toast.success('record saved successfully');
              router.push('/units/list');
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
    [validateForm, addUnit, state.dtoUnit, router, updateUnit]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/units/list');
    },
    [router]
  );

  return {
    state,
    onInputChange,
    onUnitNameBlur,
    onUnitCodeBlur,
    onSaveClick,
    onCancelClick
  };
};

export default useUnitEntry;
