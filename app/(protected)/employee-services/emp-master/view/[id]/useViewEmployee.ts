import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import EmpMasterDTO from '@/app/types/EmpMasterDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_EMPLOYEE } from '@/app/graphql/EmpMaster';
import * as Constants from '../../../../constants/constants';
import { dispatch } from '../../../../../store/';
import { setIsEditMode } from '@/app/store/slices/siteConfigState';
import * as gMessageConstants from '../../../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';

type StateType = {
  dtoEmpMaster: EmpMasterDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoEmpMaster: EmpMasterDTO;
};

const useViewEmployee = ({ dtoEmpMaster }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoEmpMaster: dtoEmpMaster,
    breadcrumbsItems: [{ label: 'Employee', href: `/${Constants.ADMIN_EMP_DASHBOARD}/emp-master/list` }, { label: 'View Employee' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
  const showSnackbar = useSnackbar();
  const [state, setEmployee] = useReducer(reducer, INITIAL_STATE);
  const [getEmployee] = useLazyQuery(GET_EMPLOYEE, { fetchPolicy: 'network-only' });

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoEmpMaster: EmpMasterDTO = {} as EmpMasterDTO;
      const { error, data } = await getEmployee({
        variables: {
          id: state.dtoEmpMaster.id
        }
      });
      if (!error && data) {
        dtoEmpMaster = data.getEmployee;
      }
      setEmployee({ dtoEmpMaster: dtoEmpMaster } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getEmployee, state.dtoEmpMaster.id]);

  useEffect(() => {
    if (state.dtoEmpMaster.id > 0) {
      getData();
    }
  }, [state.dtoEmpMaster.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      dispatch(setIsEditMode(true));
      router.push(`/${Constants.ADMIN_EMP_DASHBOARD}/emp-master/edit/` + state.dtoEmpMaster.id);
    },
    [router, state.dtoEmpMaster.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/${Constants.ADMIN_EMP_DASHBOARD}/emp-master/list`);
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewEmployee;
