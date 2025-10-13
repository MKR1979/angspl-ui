'use client';
import React, { useRef } from 'react';
import './MyPayReceipt.css';
// import { useSelector } from '../../store';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyButton from '@/app/custom-components/MyButton';
import MyLogo from '@/app/custom-components/MyLogo';
import * as gConstants from '../../constants/constants';
// import { PASSWORD } from '../../(public)/constants/constants';
// import { getAcademicSession } from '@/app/common/currentSession';

interface SuccessMessageProps {
  course_name: string;
  learner_id: number;
  user_name?: string;
  is_data_exist?: string;
  student_name: string;
  receipt_number: string;
  payment_date: Date | null;
  payment_mode: string;
  cheque_number: string;
  fee_head: string;
  fee_amount: number;
  remarks: string;
  status: string;
  onCancel?: () => void;
}

const SuccessMessageAdm: React.FC<SuccessMessageProps> = ({
  learner_id,
  student_name,
  receipt_number,
  payment_date,
  payment_mode,
  fee_head,
  fee_amount,
  onCancel
}) => {
  // const { companyInfo } = useSelector((state) => state.globalState);

  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = () => {
    if (printRef.current) {
      const printContent = printRef.current.innerHTML;
      const originalContent = document.body.innerHTML;
      document.body.innerHTML = printContent;
      window.print();
      document.body.innerHTML = originalContent;
      window.location.reload();
    }
  };

  return (
    <>
      <div className="receipt-container-outer">
        <div ref={printRef} className="receipt-container">

          <div className="school-info">
          <div className="receipt-logo">
              <MyLogo />
            </div>
            <div>
              <strong style={{ fontSize: '20px' }}>{gConstants.COMPANY}</strong>
              <p>RECEIPT - OFFICE COPY</p>
            </div>
          </div> 
          
          {/* <div className="company-header">
         <img src={companyInfo.logo_url} alt="Company Logo" className="receipt-logo" /> 
            <div className="receipt-logo">
              <MyLogo />
            </div>
            <div>
              <strong style={{ fontSize: '22px' }}>{companyInfo.company_name}</strong>
              <p>RECEIPT - CUSTOMER COPY</p>
            </div>
          </div> */}

          <div className="receipt-top">
            <div className="receipt-line">
              <span>
                <strong>RECEIPT NO:</strong> {receipt_number}
              </span>
              <span>
                <strong>DATE:</strong> {payment_date ? new Date(payment_date).toLocaleDateString('en-IN') : 'N/A'}
              </span>
            </div>
            <div className="receipt-line">
              <span>
                <strong>CUSTOMER NAME:</strong> {student_name}
              </span>
              <span>
                <strong>CUSTOMER ID:</strong> {learner_id}
              </span>
            </div>
            <div className="receipt-line">
              <span>
                <strong>Payment Mode:</strong> {payment_mode}
              </span>
              <span>
                <strong>Transaction ID:</strong> {fee_head || 'N/A'}
              </span>
            </div>
          </div>

          <table className="fee-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount Paid</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Registration / Service Fee</td>
                <td>₹{fee_amount}</td>
              </tr>
              <tr>
                <td>
                  <strong>Total Paid</strong>
                </td>
                <td>
                  <strong>₹{fee_amount?.toLocaleString('en-IN')}</strong>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="thank-you">
            <p>
              <strong>Thank you for your payment, {student_name}.</strong> We appreciate your timely transaction towards becoming our valued
              customer.
            </p>
            <p>This is a system generated receipt and does not require any signature.</p>
          </div>
        </div>

        <MyCardActions sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
          <MyButton onClick={handlePrint}>Print</MyButton>
          <MyButton onClick={() => (onCancel ? onCancel() : window.history.back())}>Cancel</MyButton>
        </MyCardActions>
      </div>
    </>
  );
};

export default SuccessMessageAdm;