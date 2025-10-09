'use client';
import React, { useRef } from 'react';
import './MyPayReceipt.css';
import { useSelector } from '../../store';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyButton from '@/app/custom-components/MyButton';
import { PASSWORD } from '../../(public)/constants/constants';
import { getAcademicSession } from '@/app/common/currentSession';

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
  course_name,
  learner_id,
  user_name,
  is_data_exist,
  student_name,
  receipt_number,
  payment_date,
  payment_mode,
  fee_head,
  fee_amount,
  onCancel
}) => {

  const { companyInfo } = useSelector((state) => state.globalState);

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
            <img src={companyInfo.logo_url} alt="School Logo" className="receipt-logo" />
            <div>
              <strong style={{ fontSize: '20px' }}>{companyInfo.company_name}</strong>
              <p>RECEIPT - OFFICE COPY</p>
            </div>
          </div>

          <div className="receipt-top">
            <div className="receipt-line">
              <span>
                <strong>RECP NO:</strong> {receipt_number}
              </span>
              <span>
                {/* <strong>DATE:</strong> {payment_date?.toLocaleDateString('en-IN')} */}
                <strong>DATE:</strong> {new Date().toLocaleDateString('en-IN')}
              </span>
            </div>
            <div className="receipt-line">
              <span>
                <strong>SCHOLAR NO:</strong> {learner_id}
              </span>
              <span>
                <strong>SESSION:</strong> {getAcademicSession()}
              </span>
            </div>
            <div className="receipt-line">
              <span>
                <strong>CLASS:</strong> {course_name}
              </span>
            </div>
          </div>
          <p className="receipt-paragraph">
            Received with thanks a sum of <strong>Rs. {fee_amount?.toLocaleString('en-IN')}.00</strong> (Rupees{' '}
            {fee_amount?.toLocaleString('en-IN')} Only) from <strong>{student_name}</strong> towards Fee as detailed below:
          </p>
          <div className="receipt-details">
            <div className="receipt-line">
              <span>
                <strong>Mode :</strong> {payment_mode}
              </span>
              <span>
                {/* <strong>Payment Date :</strong> {payment_date?.toLocaleDateString('en-IN')} */}
                <strong>Payment Date :</strong> {payment_date ? new Date(payment_date).toLocaleDateString('en-IN') : 'N/A'}
              </span>
            </div>
            <div className="receipt-line">
              <span>
                <strong>Transaction ID :</strong> {'N/A'}
              </span>
            </div>
          </div>
          <table className="fee-table">
            <thead>
              <tr>
                <th>Fee Head</th>
                <th>Amount Paid</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Payment Type</td>
                <td>{fee_head}</td>
              </tr>
              <tr>
                <td>Fee Amount</td>
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

          {/* 🔹 Credentials Section */}
          {user_name && (
            <div
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                marginTop: '10px',
                borderRadius: '4px',
                background: '#f9f9f9',
                fontSize: '14px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <strong>Login Credentials:</strong>
              <span style={{ marginLeft: '10px' }}>
                User Name: <b>{user_name}</b>
              </span>
              {is_data_exist !== 'true' && (
                <span>
                  Password: <b>{PASSWORD}</b>
                </span>
              )}
              {/* <span>
                Password: <b>{PASSWORD}</b>
              </span> */}
            </div>
          )}

          <div className="thank-you">
            {user_name ? (
              <>
                <p>
                  <strong>Thank you for enrolling in the course, {student_name}.</strong>
                  We’re excited to have you onboard!
                </p>
              </>
            ) : (
              <p>
                <strong>Thank you for your payment, {student_name}.</strong>
                We appreciate your timely transaction towards the academic session {getAcademicSession()}.
              </p>
            )}
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
