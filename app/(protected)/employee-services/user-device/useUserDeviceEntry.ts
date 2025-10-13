'use client';
import { ChangeEvent, useCallback, useEffect, useReducer, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import UserDeviceDTO, { USER_DEVICE } from '@/app/types/UserDeviceDTO';
import { GET_USER_DEVICE, UPDATE_USER_DEVICE } from '@/app/graphql/UserDevice';
import { useRouter } from 'next/navigation';
import { arrDeviceMappingType } from '@/app/common/Configuration';
import LookupDTO from '@/app/types/LookupDTO';
import * as Constants from '../../constants/constants';
import * as gMessageConstants from '../../../constants/messages-constants';
import { useSnackbar } from '../../../custom-components/SnackbarProvider';

type ErrorMessageType = {
  user_id: number | null;
  name: string | null;
  device_id: string | null;
  device_info: string | null;
  status: string | null;
  remarks: string | null;
};

type StateType = {
  dtoUserDevice: UserDeviceDTO;
  arrDeviceMappingTypeLookup: LookupDTO[];
  open1: boolean;
  errorMessages: ErrorMessageType;
  isLoading: boolean;
};

type Props = {
  dtoUserDevice: UserDeviceDTO;
};

const useUserDeviceEntry = ({ dtoUserDevice }: Props) => {
  const router = useRouter();

  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    user_id: null,
    name: null,
    device_id: null,
    device_info: null,
    status: null,
    remarks: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoUserDevice: dtoUserDevice,
    open1: false,
    arrDeviceMappingTypeLookup: arrDeviceMappingType,
    errorMessages: { ...ERROR_MESSAGES },
    isLoading: true
  } as StateType);

  const reducer = (state: StateType, action: Partial<StateType>): StateType => {
    return { ...state, ...action };
  };

  const showSnackbar = useSnackbar();
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [saving, setSaving] = useState(false);
  const [updateUserDevice] = useMutation(UPDATE_USER_DEVICE);
  const [getUserDevice] = useLazyQuery(GET_USER_DEVICE, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  useEffect(() => {
    if (
      state.arrDeviceMappingTypeLookup.length > 0 &&
      !state.dtoUserDevice.status
    ) {
      const firstItem = state.arrDeviceMappingTypeLookup[0];
      setState({
        ...state,
        dtoUserDevice: {
          ...state.dtoUserDevice,
          status: firstItem.text, // or firstItem.id if you store status by id
        }
      });
    }
  }, [state.arrDeviceMappingTypeLookup]);

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoUserDevice: UserDeviceDTO = USER_DEVICE;
      const { error, data } = await getUserDevice({
        variables: {
          id: state.dtoUserDevice.id
        }
      });
      if (!error && data) {
        dtoUserDevice = data.getUserDevice;
      }
      setState({ dtoUserDevice: dtoUserDevice } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getUserDevice, state.dtoUserDevice?.id]);

  useEffect(() => {
    if (state.dtoUserDevice?.id > 0) {
      getData();
    }
  }, [state.dtoUserDevice?.id, getData]);

  const validateRemarks = useCallback(async () => {
    if (state.dtoUserDevice.remarks.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoUserDevice.remarks]);

  const onRemarksBlur = useCallback(async () => {
    const remarks = await validateRemarks();
    setState({ errorMessages: { ...state.errorMessages, remarks: remarks } } as StateType);
  }, [validateRemarks, state.errorMessages]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoUserDevice: {
          ...state.dtoUserDevice,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoUserDevice]
  );

  const validateStatus = useCallback(async () => {
    if (state.dtoUserDevice?.status.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoUserDevice.status]);

  const onStatusChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoUserDevice: {
          ...state.dtoUserDevice,
          status: (value as LookupDTO).text ?? ''
        }
      } as StateType);
    },
    [state.dtoUserDevice]
  );

  const onStatusBlur = useCallback(async () => {
    const status = await validateStatus();
    setState({ errorMessages: { ...state.errorMessages, status: status } } as StateType);
  }, [validateStatus, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.status = await validateStatus();
    if (errorMessages.status) {
      isFormValid = false;
    }
    errorMessages.remarks = await validateRemarks();
    if (errorMessages.remarks) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateStatus, validateRemarks]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (saving) return; // prevent multiple clicks while saving
      setSaving(true);
      try {
        if (await validateForm()) {
          const { data } = await updateUserDevice({
            variables: {
              id: state.dtoUserDevice.id,
              user_id: state.dtoUserDevice.user_id,
              status: state.dtoUserDevice.status,
              remarks: state.dtoUserDevice.remarks
            }
          });
          if (data) {
            showSnackbar(gMessageConstants.SNACKBAR_UPDATE_RECORD, 'success');
            router.push(`/${Constants.ADMIN_EMP_DASHBOARD}/user-device/list`);
          }
        }
      } catch (error: any) {
        console.error('Error while saving user device:', error);
        showSnackbar(gMessageConstants.SNACKBAR_UPDATE_FAILED, 'error');
      } finally {
        setSaving(false); // ensure this always runs
      }
    },
    [state.dtoUserDevice, updateUserDevice, router, validateForm]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/${Constants.ADMIN_EMP_DASHBOARD}/user-device/list`);
    },
    [router]
  );

  const setOpen1 = useCallback(async (): Promise<void> => {
    setState({ open1: true } as StateType);
  }, []);
  const setClose1 = useCallback(async (): Promise<void> => {
    setState({ open1: false } as StateType);
  }, []);

  return {
    state,
    onSaveClick,
    onCancelClick,
    setOpen1,
    setClose1,
    onStatusBlur,
    onStatusChange,
    saving,
    onInputChange,
    onRemarksBlur
  };
};

export default useUserDeviceEntry;
