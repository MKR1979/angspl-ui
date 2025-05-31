import { useCallback, useEffect, useReducer } from 'react';
import ReceiptDTO, { RECEIPT } from '@/app/types/ReceiptDTO';
import { useLazyQuery } from '@apollo/client';
import { GET_RECEIPT } from '@/app/graphql/Receipt';

interface ErrorMessageType {
  admission_date: string | null;
  course_name: string | null;
  first_name: string | null;
  last_name: string | null;
  price: number | null;
}

type StateType = {
  dtoReceipt: ReceiptDTO;
  errorMessages: ErrorMessageType;
};

const useReceipt = () => {
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    admission_date: null,
    course_name: null,
    first_name: null,
    last_name: null,
    price: null,
    });

  const INITIAL_STATE: StateType = Object.freeze({
    dtoReceipt: RECEIPT,
    errorMessages: { ...ERROR_MESSAGES },
  });

  const reducer = (state: StateType, action: Partial<StateType>): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [getReceipt] = useLazyQuery(GET_RECEIPT, {
    fetchPolicy: 'network-only', 
  });

  const getReceiptInfo = useCallback(async (): Promise<void> => {
    const { data } = await getReceipt({
      variables: {
        id: state.dtoReceipt.id
      }
    })  
  setState({ dtoReceipt: data.getReceipt || RECEIPT }); 
  }, [getReceipt]);

  useEffect(() => {
    getReceiptInfo();
  }, [getReceiptInfo]);

  return { state };
};

export default useReceipt;
