import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import ScheduleFeeDTO from '@/app/types/ScheduleFeeDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_FEE_PLAN, GET_FEE_PLAN_BREAKUP } from '@/app/graphql/ScheduleFee';
import * as gConstants from '../../../../../constants/constants';
import * as Constants from '../../../../constants/constants';
import { useSelector } from '../../../../../store';
import { ADD_FEE_COLLECTION_RETURN_ID } from '@/app/graphql/FeeCollection';
import { GET_PAY_RECEIPT_BY_PAYMENT_ID } from '@/app/graphql/Receipt';
import ReceiptDTO, { RECEIPT } from '@/app/types/ReceiptDTO';
import * as gMessageConstants from '../../../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';

type StateType = {
  dtoScheduleFee: ScheduleFeeDTO;
  tabIndex: number;
  arrScheduleFeeDTO: ScheduleFeeDTO[];
  isLoading: boolean;
  dtoReceipt: ReceiptDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoScheduleFee: ScheduleFeeDTO;
};

const useViewScheduleFee = ({ dtoScheduleFee }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoScheduleFee: dtoScheduleFee,
    tabIndex: 0,
    dtoReceipt: RECEIPT,
    breadcrumbsItems: [
      { label: 'Fee Payment Detail', href: `/${Constants.ADMIN_PAYMENT_MODULES}/schedule-fee/list` },
      { label: 'View Fee Payment' }
    ]
  } as StateType);
  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
  const showSnackbar = useSnackbar();
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const { siteConfig } = useSelector((state) => state.siteConfigState);
  const [generateReceipt, setGenerateReceipt] = useState(false);
  const [getFeePlanBreakup] = useLazyQuery(GET_FEE_PLAN_BREAKUP, { fetchPolicy: 'network-only' });
  const [getFeePlan] = useLazyQuery(GET_FEE_PLAN, { fetchPolicy: 'network-only' });
  const [addFeeCollectionReturnId] = useMutation(ADD_FEE_COLLECTION_RETURN_ID);
  const [getPayReceiptByPaymentId] = useLazyQuery(GET_PAY_RECEIPT_BY_PAYMENT_ID, { fetchPolicy: 'network-only' });

  const RAZORPAY_CONFIG = {
    scriptUrl: siteConfig.find((c) => c.key === 'RAZORPAY_SCRIPT_URL')?.value ?? '',
    publicKey: siteConfig.find((c) => c.key === 'RAZORPAY_PUBLIC_KEY')?.value ?? '',
    merchantName: siteConfig.find((c) => c.key === 'RAZORPAY_MERCHANT_NAME')?.value ?? ''
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => console.log('Razorpay script loaded successfully.');
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const addPaymentDetails = useCallback(
    async (response: any, price: number, duePayment: ScheduleFeeDTO) => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const result = await addFeeCollectionReturnId({
          variables: {
            course_id: duePayment.course_id,
            learner_id: duePayment.learner_id,
            payment_date: today,
            payment_mode: gConstants.PAY_MODE,
            cheque_number: '',
            // fee_head_id: gConstants.FEE_HEAD_COURSE,
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
            source_flag: gConstants.SOURCE_FLAG_ADMISSION
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

  const handlePayNow = (course: string, fee: number, duePayment: ScheduleFeeDTO) => {
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
        name: state.dtoScheduleFee.student_name,
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

  const getMappedStartFrom = (selectedValue: string): string => {
    switch (selectedValue) {
      case 'Q1':
        return 'April - June';
      case 'Q2':
        return 'July - September';
      case 'Q3':
        return 'October - December';
      case 'Q4':
        return 'January - March';
      case 'H1':
        return 'April - September';
      case 'H2':
        return 'October - March';
      default:
        return selectedValue;
    }
  };

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoScheduleFee: ScheduleFeeDTO = {} as ScheduleFeeDTO;
      const { error, data } = await getFeePlan({
        variables: {
          id: state.dtoScheduleFee.id
        }
      });
      if (!error && data) {
        dtoScheduleFee = {
          ...data.getFeePlan,
          start_date: getMappedStartFrom(data.getFeePlan.start_date)
        };
      }
      setState({ dtoScheduleFee } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getFeePlan, state.dtoScheduleFee.id]);

  const getFeeBreakup = useCallback(async (): Promise<void> => {
    setState({ isLoading: true } as StateType);
    let arrScheduleFeeDTO: ScheduleFeeDTO[] = [];
    const { error, data } = await getFeePlanBreakup({
      variables: {
        fee_plan_id: state.dtoScheduleFee.id
      }
    });
    if (!error && Array.isArray(data.getFeePlanBreakup)) {
      arrScheduleFeeDTO = data.getFeePlanBreakup.map((item: ScheduleFeeDTO, index: number) => ({
        ...item,
        id: item.id != null ? parseInt(item.id.toString()) : Date.now() + index,
        fee_cycle_code: getMappedStartFrom(item.fee_cycle_code) // ✅ apply mapping
      }));
    }
    setState({
      arrScheduleFeeDTO,
      isLoading: false,
      arrSelectedId: []
    } as unknown as StateType);
  }, [getFeePlanBreakup, state.dtoScheduleFee.id]);

  useEffect(() => {
    if (state.dtoScheduleFee.id > 0) {
      getData();
      getFeeBreakup();
    }
  }, [state.dtoScheduleFee.id, getData, getFeeBreakup]);

  // const onEditClick = useCallback(
  //   async (event: React.MouseEvent<HTMLElement>) => {
  //     event.preventDefault();
  //     router.push(`/${Constants.ADMIN_PAYMENT_MODULES}/schedule-fee/edit/` + state.dtoScheduleFee.id);
  //   },
  //   [router, state.dtoScheduleFee.id]
  // );

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

  const handleTabChange = useCallback(async (event: React.SyntheticEvent<Element, Event>, newValue: number): Promise<void> => {
    setState({ tabIndex: newValue } as StateType);
  }, []);

  return {
    state,
    generateReceipt,
    onCancelClick,
    handleTabChange,
    // onEditClick,
    getMonthName,
    formatDate,
    setGenerateReceipt,
    handlePayNow,
    calculatePayableAmount
  };
};

export default useViewScheduleFee;
