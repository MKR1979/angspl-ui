
"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ClientReceipt from "./client-receipt";

const ReceiptContent = () => {
  const searchParams = useSearchParams();

  const courseName = searchParams.get("courseName") ?? "";
  const studentName = searchParams.get("studentName") ?? "";
  const amount = searchParams.get("amount");
  const parsedAmount = amount ? parseFloat(amount) : NaN;
  const userName = searchParams.get("userName") ?? "";

  if (isNaN(parsedAmount)) {
    return <p>Invalid payment request.</p>;
  }
  return <ClientReceipt courseName={courseName} studentName={studentName} amount={parsedAmount} userName={userName}/>;
};

const ReceiptPage = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ReceiptContent />
    </Suspense>
  );
};

export default ReceiptPage;
