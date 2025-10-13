import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import FeePaymentDTO from '@/app/types/ScheduleFeeDTO';
import { ADD_FEE_COLLECTION_RETURN_ID } from '@/app/graphql/FeeCollection';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_DUE_PAY_LIST, GET_FEE_PAID_LIST } from '@/app/graphql/ScheduleFee';
import * as gConstants from '../../constants/constants';
import { useSelector } from '../../store';
import { GET_PAY_RECEIPT_BY_PAYMENT_ID } from '@/app/graphql/Receipt';
import ReceiptDTO, { RECEIPT } from '@/app/types/ReceiptDTO';

type StateType = {
  dtoFeePayment: FeePaymentDTO;
  tabIndex: number;
  arrFeePaymentDTO: FeePaymentDTO[];
  arrDuePaymentDTO: FeePaymentDTO[];
  arrPaidPaymentDTO: FeePaymentDTO[];
  dtoReceipt: ReceiptDTO;
  isLoading: boolean;
  breadcrumbsItems: BreadcrumbsItem[];
};

const useViewLead = () => {
  const INITIAL_STATE: StateType = Object.freeze({
    dtoFeePayment: {} as FeePaymentDTO,
    tabIndex: 0,
    dtoReceipt: RECEIPT,
    breadcrumbsItems: [{ label: 'Fee Payment Detail', href: '/payments/list' }, { label: 'View Fee Payment' }]
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
  const [generateReceipt, setGenerateReceipt] = useState(false);
  const { loginUser_id } = useSelector((state) => state.loginState);
  const { siteConfig } = useSelector((state) => state.siteConfigState);
  const [selectedReceipt, setSelectedReceipt] = useState<any | null>(null);
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [getFeePaidList] = useLazyQuery(GET_FEE_PAID_LIST, { fetchPolicy: 'network-only' });
  const [getDuePayList] = useLazyQuery(GET_DUE_PAY_LIST, { fetchPolicy: 'network-only' });

  const RAZORPAY_CONFIG = {
    scriptUrl: siteConfig.find((c) => c.key === 'RAZORPAY_SCRIPT_URL')?.value ?? '',
    publicKey: siteConfig.find((c) => c.key === 'RAZORPAY_PUBLIC_KEY')?.value ?? '',
    merchantName: siteConfig.find((c) => c.key === 'RAZORPAY_MERCHANT_NAME')?.value ?? ''
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = RAZORPAY_CONFIG.scriptUrl;
    script.async = true;
    script.onload = () => console.log('Razorpay script loaded successfully.');
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const [addFeeCollectionReturnId] = useMutation(ADD_FEE_COLLECTION_RETURN_ID);
  const [getPayReceiptByPaymentId] = useLazyQuery(GET_PAY_RECEIPT_BY_PAYMENT_ID, { fetchPolicy: 'network-only' });

  const addPaymentDetails = useCallback(
    async (response: any, price: number, duePayment: FeePaymentDTO) => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const result = await addFeeCollectionReturnId({
          variables: {
            course_id: duePayment.course_id,
            learner_id: duePayment.learner_id,
            payment_date: today,
            payment_mode: gConstants.PAY_MODE,
            cheque_number: '',
            fee_amount: duePayment.fee_amount,
            fee_month: duePayment.fee_month,
            fee_year: duePayment.fee_year,
            currency: gConstants.CURRENCY,
            transaction_id: duePayment.transaction_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            remarks: '',
            status: gConstants.STATUS_PAID,
            breakup_id: duePayment.id,
            source_flag: gConstants.SOURCE_FLAG_MISCELLANEOUS
          }
        });
        const newPaymentId = result?.data?.addFeeCollectionReturnId ?? 0;
        getPayReceiptInfo(newPaymentId);
        setGenerateReceipt(true);
        return newPaymentId;
      } catch (error) {
        console.error('Error adding payment:', error);
        throw error;
      }
    },
    [addFeeCollectionReturnId]
  );

  const handlePayNow = (course: string, fee: number, duePayment: FeePaymentDTO) => {
    if (!(window as any).Razorpay) {
      console.error('Razorpay SDK not loaded properly.');
      return;
    }
    const options = {
      key: RAZORPAY_CONFIG.publicKey,
      amount: fee * 100,
      currency: gConstants.CURRENCY,
      name: RAZORPAY_CONFIG.merchantName,
      description: `Payment for ${course}`,
      handler: async (response: any) => {
        await addPaymentDetails(response, fee, duePayment);
      },
      prefill: {
        // name: loginUser,
        name: state.dtoFeePayment.student_name,
        email: 'aitm.help@gmail.com',
        contact: '8750779557'
      },
      theme: {
        color: '#3399cc'
      }
    };
    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  const getFeeDueList = useCallback(async (): Promise<void> => {
    setState({ isLoading: true } as StateType);
    let arrDuePaymentDTO: FeePaymentDTO[] = [];
    const { error, data } = await getDuePayList({
      variables: {
        learner_id: loginUser_id
      }
    });
    if (!error && Array.isArray(data.getDuePayList)) {
      arrDuePaymentDTO = data.getDuePayList.map((item: FeePaymentDTO, index: number) => ({
        ...item,
        id: item.id != null ? parseInt(item.id.toString()) : Date.now() + index
      }));
    }
    setState({
      arrDuePaymentDTO,
      isLoading: false,
      arrSelectedId: []
    } as unknown as StateType);
  }, [getDuePayList, loginUser_id]);

  useEffect(() => {
    getFeeDueList();
  }, [getFeeDueList]);

  const getFeePaid = useCallback(async (): Promise<void> => {
    setState({ isLoading: true } as StateType);
    let arrPaidPaymentDTO: FeePaymentDTO[] = [];
    const { error, data } = await getFeePaidList({
      variables: {
        learner_id: loginUser_id
      }
    });
    if (!error && Array.isArray(data.getFeePaidList)) {
      arrPaidPaymentDTO = data.getFeePaidList.map((item: FeePaymentDTO, index: number) => ({
        ...item,
        id: item.id != null ? parseInt(item.id.toString()) : Date.now() + index
      }));
    }
    setState({
      arrPaidPaymentDTO,
      isLoading: false,
      arrSelectedId: []
    } as unknown as StateType);
  }, [getFeePaidList, loginUser_id]);

  useEffect(() => {
    getFeePaid();
  }, [getFeePaid]);

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

  const calculatePayableAmount = (total_amount?: string | number, fine?: string | number, discount?: string | number): number => {
    return Number(total_amount || 0) + Number(fine || 0) - Number(discount || 0);
  };

  function formatDate(date: string | Date): string {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  const handleTabChange = useCallback(async (event: React.SyntheticEvent<Element, Event>, newValue: number): Promise<void> => {
    setState({ tabIndex: newValue } as StateType);
  }, []);

  return {
    state,
    handleTabChange,
    formatDate,
    handlePayNow,
    calculatePayableAmount,
    selectedReceipt,
    setSelectedReceipt,
    generateReceipt,
    setGenerateReceipt
  };
};

export default useViewLead;
