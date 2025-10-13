'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import useViewReceipt from './useViewPaymentReceipt';
import ReceiptDTO from '@/app/types/ReceiptDTO';
import PaymentReceipt from '../../../../../custom-components/payment-receipt/MyPaymentReceipt';
import './view-payment-receipt.css';

type Props = {
  dtoReceipt: ReceiptDTO;
};

const ClientViewPaymentReceipt = ({ dtoReceipt }: Props) => {
  console.log(dtoReceipt);
  const { state } = useViewReceipt({ dtoReceipt });

  return (
    <PaymentReceipt
      course_name={state.dtoReceipt.course_name}
      learner_id={state.dtoReceipt.learner_id ?? 0}
      student_name={state.dtoReceipt.student_name}
      receipt_number={state.dtoReceipt.receipt_number}
      payment_date={state.dtoReceipt.payment_date}
      payment_mode={state.dtoReceipt.payment_mode}
      cheque_number={state.dtoReceipt.cheque_number}
      fee_head={state.dtoReceipt.fee_head}
      fee_amount={state.dtoReceipt.fee_amount}
      remarks={state.dtoReceipt.remarks}
      status={state.dtoReceipt.status}
    />
  );
};

export default memo(ClientViewPaymentReceipt, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});