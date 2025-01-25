import React, { ChangeEvent, useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import TaxDTO, { TAX } from '@/app/types/TaxDTO';
import { ADD_TAX, UPDATE_TAX, GET_TAX } from '@/app/graphql/Tax';
import { GET_TAX_TAX_DESCRIPTION_EXIST } from '@/app/graphql/Tax';
import toast from 'react-hot-toast';

type ErrorMessageType = {
  tax_description: string | null;
  tax_percentage: string | null;
};

type StateType = {
  dtoTax: TaxDTO;
  saveDisabled: boolean;
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoTax: TaxDTO;
};

const useTaxEntry = ({ dtoTax }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    tax_description: null,
    tax_percentage: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoTax: dtoTax,
    saveDisabled: false,
    errorMessages: { ...ERROR_MESSAGES }
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [addTax] = useMutation(ADD_TAX, {});

  const [updateTax] = useMutation(UPDATE_TAX, {});

  const [getTax] = useLazyQuery(GET_TAX, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getTaxTaxDescriptionExist] = useLazyQuery(GET_TAX_TAX_DESCRIPTION_EXIST, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoTax: TaxDTO = TAX;
    const { error, data } = await getTax({
      variables: {
        id: state.dtoTax.id
      }
    });
    if (!error && data?.getTax) {
      dtoTax = data.getTax;
    }
    setState({ dtoTax: dtoTax } as StateType);
  }, [getTax, state.dtoTax.id]);

  const IsTaxDescriptionExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getTaxTaxDescriptionExist({
      variables: {
        id: state.dtoTax.id,
        tax_description: state.dtoTax.tax_description
      }
    });
    if (!error && data?.getTaxTaxDescriptionExist) {
      exist = data.getTaxTaxDescriptionExist;
    }
    return exist;
  }, [getTaxTaxDescriptionExist, state.dtoTax.id, state.dtoTax.tax_description]);

  useEffect(() => {
    if (state.dtoTax.id > 0) {
      getData();
    }
  }, [state.dtoTax.id, getData]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      switch (event.target.name) {
        case 'tax_percentage':
          setState({
            dtoTax: {
              ...state.dtoTax,
              [event.target.name]: Number(event.target.value)
            }
          } as unknown as StateType);
          break;
        default:
          setState({
            dtoTax: {
              ...state.dtoTax,
              [event.target.name]: event.target.value
            }
          } as StateType);
      }
    },
    [state.dtoTax]
  );

  const validateTaxDescription = useCallback(async () => {
    if (state.dtoTax.tax_description.trim() === '') {
      return 'Tax Description is required';
    } else if (await IsTaxDescriptionExist()) {
      return 'Tax Description already exists';
    } else {
      return null;
    }
  }, [state.dtoTax.tax_description, IsTaxDescriptionExist]);

  const onTaxDescriptionBlur = useCallback(async () => {
    const tax_description = await validateTaxDescription();
    setState({ errorMessages: { ...state.errorMessages, tax_description: tax_description } } as StateType);
  }, [validateTaxDescription, state.errorMessages]);

  const validateTaxPercentage = useCallback(async () => {
    if (state.dtoTax.tax_percentage === 0) {
      return 'Tax Percentage is required';
    } else {
      return null;
    }
  }, [state.dtoTax.tax_percentage]);

  const onTaxPercentageBlur = useCallback(async () => {
    const tax_percentage = await validateTaxPercentage();
    setState({ errorMessages: { ...state.errorMessages, tax_percentage: tax_percentage } } as StateType);
  }, [validateTaxPercentage, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.tax_description = await validateTaxDescription();
    if (errorMessages.tax_description) {
      isFormValid = false;
    }
    errorMessages.tax_percentage = await validateTaxPercentage();
    if (errorMessages.tax_percentage) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateTaxDescription, validateTaxPercentage]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      try {
        setState({ saveDisabled: true } as StateType);
        event.preventDefault();

        if (await validateForm()) {
          if (state.dtoTax.id === 0) {
            const { data } = await addTax({
              variables: {
                tax_description: state.dtoTax.tax_description,
                tax_percentage: state.dtoTax.tax_percentage
              }
            });
            if (data?.addTax) {
              toast.success('record saved successfully');
              router.push('/taxes/list');
            } else {
              toast.error('Failed to save the record');
            }
          } else {
            const { data } = await updateTax({
              variables: {
                id: state.dtoTax.id,
                tax_description: state.dtoTax.tax_description,
                tax_percentage: state.dtoTax.tax_percentage
              }
            });
            if (data?.updateTax) {
              toast.success('record saved successfully');
              router.push('/taxes/list');
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
    [validateForm, addTax, state.dtoTax, router, updateTax]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/taxes/list');
    },
    [router]
  );

  return {
    state,
    onInputChange,
    onTaxDescriptionBlur,
    onTaxPercentageBlur,
    onSaveClick,
    onCancelClick
  };
};

export default useTaxEntry;
