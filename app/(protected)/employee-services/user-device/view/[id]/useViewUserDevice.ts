import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import UserDeviceDTO from '@/app/types/UserDeviceDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_USER_DEVICE } from '@/app/graphql/UserDevice';
import * as Constants from '../../../../constants/constants';
import * as gMessageConstants from '../../../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';

type StateType = {
  dtoUserDevice: UserDeviceDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoUserDevice: UserDeviceDTO;
};

const useViewUserDevice = ({ dtoUserDevice }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoUserDevice: dtoUserDevice,
    breadcrumbsItems: [{ label: 'User Device', href: `/${Constants.ADMIN_EMP_DASHBOARD}/user-device/list` }, { label: 'View User Device' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setUserDevice] = useReducer(reducer, INITIAL_STATE);
const showSnackbar = useSnackbar();
  const [getUserDevice] = useLazyQuery(GET_USER_DEVICE, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    try {
    let dtoUserDevice: UserDeviceDTO = {} as UserDeviceDTO;
    const { error, data } = await getUserDevice({
      variables: {
        id: state.dtoUserDevice.id
      }
    });
    if (!error && data) {
      dtoUserDevice = data.getUserDevice;
    }
    setUserDevice({ dtoUserDevice: dtoUserDevice } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getUserDevice, state.dtoUserDevice.id]);

  useEffect(() => {
    if (state.dtoUserDevice.id > 0) {
      getData();
    }
  }, [state.dtoUserDevice.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/${Constants.ADMIN_EMP_DASHBOARD}/user-device/edit/` + state.dtoUserDevice.id);
    },
    [router, state.dtoUserDevice.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/${Constants.ADMIN_EMP_DASHBOARD}/user-device/list`);
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewUserDevice;
