'use client';
import React, { useRef } from "react";
import * as constants from '../constants/constants';
import * as gConstants from '../../constants/constants';
import './receipt.css';
import MyBox from "@/app/custom-components/MyBox";
import { FaWhatsapp } from "react-icons/fa";
interface ClientReceiptProps {
  courseName?: string;
  studentName?: string;
  amount?: number;
  userName?: string;
}
const ClientReceipt: React.FC<ClientReceiptProps> = ({ courseName, studentName, amount,userName }) => {
  const currentDate = new Date().toLocaleDateString('en-GB'); // Formats as DD/MM/YYYY
  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = () => {
    if (printRef.current) {
      const printContent = printRef.current.innerHTML;
      const newWindow = window.open("", "_blank");
      newWindow?.document.write(`<html><head><title>Print Receipt</title></head><body>${printContent}</body></html>`);
      newWindow?.document.close();
      newWindow?.print();
    }
  };
  return (
    <MyBox
      sx={{
        maxWidth: '800px',
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '10px',
        border: '3px solid rgba(7, 8, 8, 0.87)',
        justifyContent: 'center',
        gap: '2',
        margin: '100px auto',
      }}
    >
      <h2 className="container1">{constants.RECEIPT}</h2>
      <img 
        src="logo.png" 
        alt="Internship" 
        style={{ width: '200px', height: 'auto', borderRadius: '10px' }} 
      />
        <div ref={printRef}>
      <button onClick={handlePrint} style={{ marginTop:'0',padding: "10px 10px", cursor: "pointer",color:'white', backgroundColor:' #1976d2',marginLeft: '85%' }}>
        Print Receipt
      </button>
      <div className="container">
        <h3 className="text-xl font-bold text-center">{gConstants.COMPANY}</h3>
        <p><strong>Address:</strong> {gConstants.FULL_ADDRESS}</p>
        <p><strong>Email:</strong> {gConstants.CONTACT_EMAIL} / <strong>Phone No:</strong>{gConstants.CONTACT_PHONE_NO}</p>
        <p><strong>Site url:</strong> {gConstants.SITE_URL_ONLINE}</p>
        <hr className="my-2" />

        {/* Conditional Rendering */}
        <div className="text-sm text-gray-700">         
          <p><strong>Student Name:</strong> {studentName}</p>
          <p><strong>Course Name:</strong> {courseName}</p>
          <p><strong>Amount Paid:</strong> ₹{amount}</p>
        </div>
        <hr className="my-2" />
        <p className="text-center text-sm text-gray-500">Thank you for your payment!</p>
        <p><strong>Print Date:</strong> {currentDate}</p>
        <p>
          <strong>Login Credentials:</strong> <br />
          <strong>Username:</strong> {userName} <br />
          <strong>Password:</strong> {gConstants.PASSWORD} <br />       
        </p>
        <a
      href={`https://wa.me/${gConstants.WHATSAPP_PHONE}`}
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
