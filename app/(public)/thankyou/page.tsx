
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Thank You'
};

export const revalidate = 0;

export default function ThankyouPage() {
  return (
    <div style={{  marginTop:'100px', width: '100%', textAlign: 'center' }}>
      <div className="bg-white shadow-lg rounded-2xl p-6 md:p-10 max-w-md w-full relative">
        <Image 
          src="/congratulation.png5.png" 
          alt="Congratulations" 
          width={120} 
          height={120} 
          className="mx-auto mb-4"
        />
         <h1 style={{  fontSize: '50px', color: ' #FF8C00' }}>Congratulations! 
         </h1>
        <p ><strong>Thank you for your message. We will get back to you soon!😊</strong></p>
      </div>
    </div>
  );
}
