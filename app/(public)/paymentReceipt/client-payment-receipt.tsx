'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { GET_PAY_RECEIPT_BY_PAYMENT_ID } from '@/app/graphql/Receipt';
import { useLazyQuery } from '@apollo/client';
import PaymentReceipt from '../../custom-components/payment-receipt/MyPaymentReceipt';

interface ClientReceiptProps {
  id?: number;
  userName?: string;
  isDataExist?: string;
}
const ClientReceipt: React.FC<ClientReceiptProps> = ({ id, userName, isDataExist }) => {
  const [getPayReceiptByPaymentId] = useLazyQuery(GET_PAY_RECEIPT_BY_PAYMENT_ID, { fetchPolicy: 'network-only' });

  const [generateReceipt, setGenerateReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);

  const getPayReceiptInfo = useCallback(async (): Promise<void> => {
    if (!id) return;
    const { data } = await getPayReceiptByPaymentId({
      variables: {
        payment_id: id
      }
    });
    if (data?.getPayReceiptByPaymentId) {
      setReceiptData(data.getPayReceiptByPaymentId);
      setGenerateReceipt(true);
    }
  }, [id, getPayReceiptByPaymentId]);

  useEffect(() => {
    if (!generateReceipt) {
      getPayReceiptInfo();
    }
  }, [generateReceipt, getPayReceiptInfo]);

  return (
    <PaymentReceipt
      course_name={receiptData?.course_name}
      learner_id={receiptData?.learner_id ?? 0}
      user_name={userName ?? ''}
      is_data_exist={isDataExist ?? ''}
      student_name={receiptData?.student_name}
      receipt_number={receiptData?.receipt_number}
      payment_date={receiptData?.payment_date}
      payment_mode={receiptData?.payment_mode}
      cheque_number={receiptData?.cheque_number}
      fee_head={receiptData?.fee_head}
      fee_amount={receiptData?.fee_amount}
      remarks={receiptData?.remarks}
      status={receiptData?.status}
    />
  );
};

export default ClientReceipt;
