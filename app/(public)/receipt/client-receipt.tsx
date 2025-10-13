'use client';
import React, { useRef } from 'react';
import useReceipt from './useReceipt';
import * as Constants from '../constants/constants';
import * as gConstants from '../../constants/constants';
import './receipt.css';
import MyBox from '@/app/custom-components/MyBox';
import { FaWhatsapp } from 'react-icons/fa';
import { useSelector } from '../../store';

const ClientReceipt = () => {
  const { state } = useReceipt();
  const printRef = useRef<HTMLDivElement>(null);
  // const phoneNumber = Constants.WHATSAPP_PHONE;

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

  const { companyInfo } = useSelector((state) => state.globalState);

  return (
    <MyBox
      sx={{
        maxWidth: '800px',
        backgroundColor: 'white',
        padding: '5px 20px',
        borderRadius: '10px',
        border: '3px solid rgba(7, 8, 8, 0.87)',
        justifyContent: 'center',
        gap: '2',
        margin: '100px auto'
      }}
    >
      <div ref={printRef}>
        <button
          onClick={handlePrint}
          style={{
            marginTop: '0',
            padding: '10px 10px',
            cursor: 'pointer',
            color: 'white',
            backgroundColor: ' #1976d2',
            marginLeft: '85%'
          }}
        >
          Print Receipt
        </button>
        <h2 className="container1">{Constants.RECEIPT}</h2>
        <img src={companyInfo.logo_url} alt="Receipt" style={{ width: '200px', height: 'auto', borderRadius: '10px' }} />
        <div className="container">
          <h3 className="text-xl font-bold text-center">{companyInfo.company_name}</h3>
          <p>
            <strong>Address:</strong> {companyInfo.company_address}
          </p>
          <p>
            <strong>Email:</strong> {companyInfo.company_email} | <strong>Phone No:</strong>
            {companyInfo.company_phone_no}
          </p>
          <p>
            <strong>Site url:</strong> {companyInfo.domain_name}
          </p>
          <hr className="my-2" />
          <div className="text-sm text-gray-700">
            <p>
              <strong>Admission No:</strong> {gConstants.ADMISSION_PREFIX + state.dtoReceipt.id}
            </p>
            <p>
              <strong>Admission Date:</strong> {state.dtoReceipt.admission_date}
            </p>
            <p>
              <strong>Student Name:</strong> {state.dtoReceipt.first_name + ' ' + state.dtoReceipt.last_name}
            </p>
            <p>
              <strong>Course Name:</strong> {state.dtoReceipt.course_name}
            </p>
            <p>
              <strong>Amount Paid:</strong> ₹{state.dtoReceipt.price}
            </p>
          </div>
          <hr className="my-2" />
          <p className="text-center text-sm text-gray-500">Thank you for your admission!</p>
          <p>
            <strong>Print Date:</strong> {new Date().toLocaleDateString('en-GB')}
          </p>
          <a href={`https://wa.me/${companyInfo.company_phone_no}`} target="_blank" rel="noopener noreferrer" className="whatsapp-button">
            <FaWhatsapp size={30} color="green" className="whatsapp-icon" />
          </a>
        </div>
      </div>
    </MyBox>
  );
};

export default ClientReceipt;
