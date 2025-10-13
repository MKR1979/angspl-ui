import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import AdmissionReportDTO from '@/app/types/AdmissionReportDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_ADMISSION_SUMMARY } from '@/app/graphql/AdmissionReport';
import * as gConstants from '@/app/constants/constants';
import { useSelector } from '@/app/store';

type StateType = {
  dtoAdmissionReport: AdmissionReportDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoAdmissionReport: AdmissionReportDTO;
};

const useViewAdmissionSummary = ({ dtoAdmissionReport }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoAdmissionReport: dtoAdmissionReport,
    breadcrumbsItems: [
      { label: 'Admission Summary', href: `/${gConstants.ADMIN_STUDENT_DASHBOARD}/admission-summary/list` },
      { label: 'View Admission' }
    ]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
  const { companyInfo } = useSelector((state) => state.globalState);
  const [state, setAdmission] = useReducer(reducer, INITIAL_STATE);
  const [getAdmissionSummary] = useLazyQuery(GET_ADMISSION_SUMMARY, { fetchPolicy: 'network-only' });

  const getData = useCallback(async (): Promise<void> => {
    let dtoAdmissionReport: AdmissionReportDTO = {} as AdmissionReportDTO;
    const { error, data } = await getAdmissionSummary({
      variables: {
        id: state.dtoAdmissionReport.id,
        source_flag: companyInfo.company_type
      }
    });
    if (!error && data) {
      dtoAdmissionReport = data.getAdmissionSummary;
    }
    setAdmission({ dtoAdmissionReport: dtoAdmissionReport } as StateType);
  }, [getAdmissionSummary, state.dtoAdmissionReport.id, companyInfo.company_type]);

  useEffect(() => {
    if (state.dtoAdmissionReport.id > 0) {
      getData();
    }
  }, [state.dtoAdmissionReport.id, getData]);

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/${gConstants.ADMIN_STUDENT_DASHBOARD}/admission-summary/list`);
    },
    [router]
  );

  return {
    state,
    onCancelClick
  };
};

export default useViewAdmissionSummary;
