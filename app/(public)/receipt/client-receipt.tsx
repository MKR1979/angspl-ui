"use client";
import React, { useRef } from "react";
import useReceipt from "./useReceipt";
import * as constants from '../constants/constants';
import * as gConstants from '../../constants/constants';
import './receipt.css';
import MyBox from "@/app/custom-components/MyBox";
import { FaWhatsapp } from "react-icons/fa";


const ClientReceipt = () => {
  const { state } = useReceipt();
  const printRef = useRef<HTMLDivElement>(null);
  const phoneNumber = gConstants.WHATSAPP_PHONE;

    const handlePrint = () => {       
    if (printRef.current) {
      const printContent = printRef.current.innerHTML;
      const originalContent = document.body.innerHTML;
      
      document.body.innerHTML = printContent;
      window.print();
      document.body.innerHTML = originalContent;
      window.location.reload(); // Reload to restore page
    }
  };

  return (
    <MyBox
      sx={{
        maxWidth: '800px',
        backgroundColor: 'white',
        padding: "5px 20px",
        borderRadius: '10px',
        border: '3px solid rgba(7, 8, 8, 0.87)',
        justifyContent: 'center',
        gap: '2',
        margin: '100px auto',
      }}
    >
      <div ref={printRef}>
      <button onClick={handlePrint} style={{ marginTop:'0',padding: "10px 10px", cursor: "pointer",color:'white', backgroundColor:' #1976d2',marginLeft: '85%' }}>
        Print Receipt
      </button>
        <h2 className="container1">{constants.RECEIPT}</h2>
        <img
          src="logo.png"
          alt="Internship"
          style={{ width: '200px', height: 'auto', borderRadius: '10px' }}
        />
        <div className="container">
          <h3 className="text-xl font-bold text-center">{gConstants.COMPANY}</h3>
          <p><strong>Address:</strong> {gConstants.FULL_ADDRESS}</p>
           <p><strong>Email:</strong> {gConstants.CONTACT_EMAIL} / <strong>Phone No:</strong>{gConstants.CONTACT_PHONE_NO}</p>
          <p><strong>Site url:</strong> {gConstants.SITE_URL_ONLINE}</p>
          <hr className="my-2" />
          <div className="text-sm text-gray-700">
            <p><strong>Admission No:</strong> {constants.ADMISSION_PREFIX + state.dtoReceipt.id}</p>
            <p><strong>Admission Date:</strong> {state.dtoReceipt.admission_date}</p>
            <p><strong>Student Name:</strong> {state.dtoReceipt.first_name + " " + state.dtoReceipt.last_name}</p>
            <p><strong>Course Name:</strong> {state.dtoReceipt.course_name}</p>
            <p><strong>Amount Paid:</strong> ₹{state.dtoReceipt.price}</p>
          </div>
          <hr className="my-2" />
          <p className="text-center text-sm text-gray-500">
            Thank you for your admission!
          </p>
          <p><strong>Print Date:</strong> {new Date().toLocaleDateString('en-GB')}</p>
          <a
            href={`https://wa.me/${phoneNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-button"
          >
            <FaWhatsapp size={30} color="green" className="whatsapp-icon" />
          </a>
        </div>
      </div>
    </MyBox>
  );
};

export default ClientReceipt;
