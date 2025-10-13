'use client';

import { useSelector } from '../../store';
import ClientVisionContactUs from './vision-contact-us';
import ClientAdhyayanContactUs from './adhyayan-contact-us';

export default function ContactUsClient() {
  const { companyInfo } = useSelector((state) => state.globalState);

  switch (companyInfo?.company_name) {
    case 'Vision College':
      return <ClientVisionContactUs />;
    case 'Adhyayan Technology':
      return <ClientAdhyayanContactUs />;
    default:
      return <ClientAdhyayanContactUs />;
  }
}
