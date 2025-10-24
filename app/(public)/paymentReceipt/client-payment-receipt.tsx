'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { GET_COMPANY_PAY_RECEIPT_BY_PAYMENT_ID } from '@/app/graphql/Receipt';
import { useLazyQuery } from '@apollo/client';
import PaymentReceipt from '../../custom-components/payment-receipt/MyCompanyReceipt';

interface ClientReceiptProps {
  id?: number;
  userName?: string;
  isDataExist?: string;
}
const ClientReceipt: React.FC<ClientReceiptProps> = ({ id }) => {
  const [getCompanyPayReceiptByPaymentId] = useLazyQuery(GET_COMPANY_PAY_RECEIPT_BY_PAYMENT_ID, { fetchPolicy: 'network-only' });
  const [generateReceipt, setGenerateReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);

  const getPayReceiptInfo = useCallback(async (): Promise<void> => {
    if (!id) return;
    const { data } = await getCompanyPayReceiptByPaymentId({
      variables: {
        payment_id: id,
      }
    });
    if (data?.getCompanyPayReceiptByPaymentId) {
      setReceiptData(data.getCompanyPayReceiptByPaymentId);
      setGenerateReceipt(true);
    }
  }, [id, getCompanyPayReceiptByPaymentId]);

  useEffect(() => {
    if (!generateReceipt) {
      getPayReceiptInfo();
    }
  }, [generateReceipt, getPayReceiptInfo]);

  return (
    <PaymentReceipt
      company_id={receiptData?.company_id ?? 0}
      company_name={receiptData?.company_name}
      company_code={receiptData?.company_code}
      company_type={receiptData?.company_type}
      domain_name={receiptData?.domain_name}
      receipt_number={receiptData?.receipt_number}
      payment_date={receiptData?.payment_date}
      payment_mode={receiptData?.payment_mode}
      fee_amount={receiptData?.fee_amount}
      user_password={receiptData?.user_password}
    />
  );
};

export default ClientReceipt;
