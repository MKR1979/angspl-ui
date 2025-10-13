'use client';
import React from 'react';
import './successMessageAdmDesk.css';
import useAdmissionDesk from './useAdmCollege';
import { useSelector } from '../../../store';
import MyButton from '@/app/custom-components/MyButton';
import MyTypography from '@/app/custom-components/MyTypography';

interface SuccessMessageProps {
  name: string;
  user_id: number;
  course_id: number;
  course: string;
  father_name: string;
  mother_name: string;
  dob: Date | null;
  category: string;
  phone_no: string;
  email: string;
  admissionNumber: string | null;
  current_session: string;
  payable_amount: number;
}

const SuccessMessageAdm: React.FC<SuccessMessageProps> = ({
  name,
  user_id,
  course_id,
  course,
  father_name,
  mother_name,
  dob,
  category,
  phone_no,
  email,
  admissionNumber,
  current_session,
  payable_amount
}) => {
  const { handlePayNow } = useAdmissionDesk();
  const { companyInfo } = useSelector((state) => state.globalState);
  return (
    <div className="admission-form-container">
      <div className="admission-form-card">
        <div className="admission-form-header">
          <img src={companyInfo.logo_url} alt="School Logo" className="school-logo" />
          <h2>Registration Form {current_session}</h2>
        </div>

        <div className="admission-form-body">
          <div className="row">
            <span className="label">Registration No</span>
            <span className="value">{admissionNumber}</span>
          </div>

          <div className="row">
            <span className="label">Admission Class:</span>
            <span className="value">{course}</span>
          </div>

          <div className="row">
            <span className="label">Student Name</span>
            <span className="value">{name}</span>
          </div>

          <div className="row">
            <span className="label">Father Name</span>
            <span className="value">{father_name}</span>
          </div>

          <div className="row">
            <span className="label">Mother Name</span>
            <span className="value">{mother_name}</span>
          </div>

          <div className="row">
            <span className="label">DOB</span>
            <span className="value">{dob ? dob.toLocaleDateString('en-IN') : ''}</span>
          </div>

          <div className="row">
            <span className="label">Category</span>
            <span className="value">{category}</span>
          </div>

          <div className="row">
            <span className="label">Phone No.</span>
            <span className="value">{phone_no}</span>
          </div>

          <div className="row">
            <span className="label">Email</span>
            <span className="value">{email}</span>
          </div>

          <div className="row">
            <span className="label">Amount</span>
            <span className="value">₹{payable_amount}/-</span>
            {payable_amount <= 0 && (
              <MyTypography color="error">
                No payable amount available to pay.
              </MyTypography>
            )}
          </div>
        </div>

        <div className="admission-form-footer">
          <MyButton
            onClick={() => handlePayNow(course, payable_amount, course_id, user_id)}
            className="pay-now-button"
            disabled={payable_amount <= 0}
          >
            Pay Now
          </MyButton>
        </div>
        <MyTypography
          className="already-msg2"
          component="div"
          sx={{ display: 'flex', justifyContent: 'right', width: '100%', size: '12px', mt: 4 }} >
          <a
            onClick={() => window.history.back()} style={{ marginLeft: '16px', cursor: 'pointer', }} >
            ← Go Back
          </a>
        </MyTypography>
      </div>
    </div>
  );
};

export default SuccessMessageAdm;
