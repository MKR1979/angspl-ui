'use client';
import React, { useRef } from 'react';
import './MyPayReceipt.css';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyButton from '@/app/custom-components/MyButton';
import MyLogo from '@/app/custom-components/MyLogo';
import * as gConstants from '../../constants/constants';

interface SuccessMessageProps {
  company_id: number;
  company_name: string;
  company_code: string;
  company_type: string;
  domain_name: string;
  receipt_number: string;
  payment_date: Date | null;
  payment_mode: string;
  fee_amount: number;
  user_password: string;
  onCancel?: () => void;
}

const SuccessMessageAdm: React.FC<SuccessMessageProps> = ({
  company_id,
  company_name,
  company_code,
  company_type,
  domain_name,
  receipt_number,
  payment_date,
  payment_mode,
  fee_amount,
  user_password,
  onCancel
}) => {
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
              <p>RECEIPT - CUSTOMER COPY</p>
            </div>
          </div>
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
                <strong>CUSTOMER NAME:</strong> {company_name}
              </span>
              <span>
                <strong>CUSTOMER ID:</strong> {company_code}
              </span>
            </div>
            <div className="receipt-line">
              <span>
                <strong>Payment Mode:</strong> {payment_mode}
              </span>
              <span>
                <strong>Transaction ID:</strong> {company_id || 'N/A'}
              </span>
            </div>
          </div>
          <div className="thank-you">
            🎉Congratulations! Your {company_type} <strong>{company_name}</strong> has been successfully registered. Your website domain{' '}
            <strong>{domain_name}</strong> is now active and ready to use.
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
          <div className="user-pass">
            <p>
              <strong>Login ID:</strong> {(company_code || '').toLowerCase()}
            </p>
            <p>
              <strong>Password:</strong> {user_password}
            </p>
            <p >
              <strong>Note:</strong> <span style={{fontSize:'12px',color:'orange',fontWeight:'bold' }}>***Please change your password immediately after your first login for security reasons.</span>
            </p>
          </div>
          <div className="thank-you">
            <p>
              <strong>Thank you for your payment, {company_name}.</strong> We appreciate your timely transaction towards becoming our valued
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
