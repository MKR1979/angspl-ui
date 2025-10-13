'use client';
import { useSelector } from '../../store';
import AdmissionCollege from './adm-college/page';
import AdmisisonSchool from './adm-school/page';
import AdmisisonTech from './adm-tech/page';

export default function AdmissionPageClient() {
  const { companyInfo } = useSelector((state) => state.globalState);

  switch (companyInfo?.company_type) {
    case 'College':
      return <AdmissionCollege />;
    case 'School':
      return <AdmisisonSchool />;
          case 'Technology':
      return <AdmisisonTech />;
    default:
      return <AdmisisonTech />;
  }
}
