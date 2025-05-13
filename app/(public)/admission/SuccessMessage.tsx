
"use client";

import React from "react";
import "./successMessage.css";
import useAdmission from './useAdmission';

interface SuccessMessageProps {
  name: string;
  course: string;
  fee: number;
  admissionNumber: string | null;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ name, course, fee, admissionNumber }) => {
  const{handlePayNow} = useAdmission();
    return (
    <div className="success-container">
      <div className="success-message">
        <h2 className="success-container h2">
          Thank you for your application, {name}! Your admission number is <strong>{admissionNumber}</strong>.
        </h2>
        <p className="success-container p">
          You have applied for the <strong>{course}</strong> course.
        </p>
        <p className="success-container p">
          The total course fee is INR <strong>{fee}</strong>.
        </p>
        <button  onClick={() => handlePayNow(course, fee)} className="pay-now-button">
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;
