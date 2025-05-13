import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import AdmissionDTO from '@/app/types/AdmissionDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_ADMISSION } from '@/app/graphql/Admission';
type StateType = {
  dtoAdmission: AdmissionDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoAdmission: AdmissionDTO;
};

const useViewAdmission = ({ dtoAdmission }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoAdmission: dtoAdmission,
    breadcrumbsItems: [{ label: 'Admission', href: '/admissions/list' }, { label: 'View Admission' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setAdmission] = useReducer(reducer, INITIAL_STATE);

  const [getAdmission] = useLazyQuery(GET_ADMISSION, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoAdmission: AdmissionDTO = {} as AdmissionDTO;
    const { error, data } = await getAdmission({
      variables: {
        id: state.dtoAdmission.id
      }
    });
    if (!error && data) {
      dtoAdmission = data.getAdmission;
    }
    setAdmission({ dtoAdmission: dtoAdmission } as StateType);
  }, [getAdmission, state.dtoAdmission.id]);

  useEffect(() => {
    if (state.dtoAdmission.id > 0) {
      getData();
    }
  }, [state.dtoAdmission.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/admissions/edit/' + state.dtoAdmission.id);
    },
    [router, state.dtoAdmission.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/admissions/list');
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewAdmission;
