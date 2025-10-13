import React, { ChangeEvent, useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import DistictDTO, { DISTRICT } from '@/app/types/DistrictDTO';
import { ADD_DISTRICT, UPDATE_DISTRICT, GET_DISTRICT } from '@/app/graphql/District';
import { COUNTRY_LOOKUP } from '@/app/graphql/Country';
import { STATE_LOOKUP } from '@/app/graphql/state';
import { arrCommonStatus, capitalizeWords } from '@/app/common/Configuration';
import LookupDTO from '@/app/types/LookupDTO';
import * as gMessageConstants from '../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';

type ErrorMessageType = {
  district_name: string | null;
  country_id: string | null;
  country_name: string | null;
  state_name: string | null;
  state_id: string | null;
  district_code: string | null;
  status: string | null;
};
type StateType = {
  dtoDistrict: DistictDTO;
  arrCountryLookup: LookupDTO[];
  arrStateLookup: LookupDTO[];
  arrCommonStatusLookup: LookupDTO[];
  errorMessages: ErrorMessageType;
  open1: boolean;
  open2: boolean;
  open3: boolean;
};

type Props = {
  dtoDistrict: DistictDTO;
};

const useDistrictEntry = ({ dtoDistrict }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    district_name: null,
    district_code: null,
    country_id: null,
    country_name: null,
    state_name: null,
    state_id: null,
    status: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoDistrict: dtoDistrict,
    arrCountryLookup: [] as LookupDTO[],
    arrStateLookup: [] as LookupDTO[],
    arrCommonStatusLookup: arrCommonStatus,
    errorMessages: { ...ERROR_MESSAGES },
    open1: false,
    open2: false,
    open3: false,
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [saving, setSaving] = useState(false);
  const showSnackbar = useSnackbar();
  const [addDistict] = useMutation(ADD_DISTRICT, {});

  const [updateDistict] = useMutation(UPDATE_DISTRICT, {});

  const [getCountryLookup] = useLazyQuery(COUNTRY_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });
  const [getStateLookup] = useLazyQuery(STATE_LOOKUP, { fetchPolicy: 'network-only' });
  const [getDistrict] = useLazyQuery(GET_DISTRICT, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  useEffect(() => {
    if (
      state.arrCommonStatusLookup.length > 0 &&
      !state.dtoDistrict.status
    ) {
      const firstItem = state.arrCommonStatusLookup[0];
      setState({
        ...state,
        dtoDistrict: {
          ...state.dtoDistrict,
          status: firstItem.text, // or firstItem.id if you store status by id
        }
      });
    }
  }, [state.arrCommonStatusLookup]);

  const getData1 = useCallback(async (): Promise<void> => {
    try {
      let arrCountryLookup: LookupDTO[] = [];
      const { error, data } = await getCountryLookup();
      if (!error && data) {
        arrCountryLookup = data.getCountryLookup;
      }
      setState({ arrCountryLookup: arrCountryLookup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getCountryLookup]);

  const getData2 = useCallback(async (): Promise<void> => {
    try {
      let arrStateLookup: LookupDTO[] = [];
      const { error, data } = await getStateLookup({
        variables: {
          country_id: state.dtoDistrict.country_id
        }
      });
      if (!error && data) {
        arrStateLookup = data.getStateLookup;
      }
      setState({ arrStateLookup: arrStateLookup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getStateLookup, state.dtoDistrict.country_id]);

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoDistrict: DistictDTO = DISTRICT;
      const { error, data } = await getDistrict({
        variables: {
          id: state.dtoDistrict.id
        }
      });
      if (!error && data) {
        console.log('data:' , data);
        dtoDistrict = { ...data.getDistrict };
        console.log('data we get:',dtoDistrict);
        dtoDistrict.stateLookupDTO = { id: dtoDistrict.state_id, text: dtoDistrict.state_name };
      }
      setState({ dtoDistrict: dtoDistrict } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getDistrict, state.dtoDistrict.id]);


    //     if (!error && data) {
    //       dtoAffiliate = data.getAffiliate;
    //     }
    //     setPhoneCopy(data.getAffiliate.phone_no);
    //     setEmailCopy(data.getAffiliate.email);
    //     setUserNameCopy(data.getAffiliate.user_name);
    //     setState({ dtoAffiliate: dtoAffiliate } as StateType);
    //   } catch (err) {
    //     console.error('Error loading quiz question:', err);
    //     showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    //   }
    // }, [getAffiliate, state.dtoAffiliate?.id]);

  useEffect(() => {
    getData1();
    getData2();
    if (state.dtoDistrict.id > 0) {
      getData();
    }
  }, [getData1, getData2, state.dtoDistrict.id, getData]);

  const onLookupValueChange = useCallback(
    (fieldBase: 'country' | 'state') => (event: any, value: unknown) => {
      setState({
        dtoDistrict: {
          ...state.dtoDistrict,
          [`${fieldBase}_id`]: (value as LookupDTO)?.id ?? 0,
          [`${fieldBase}_name`]: (value as LookupDTO)?.text ?? ''
        }
      } as StateType);
    },
    [state.dtoDistrict]
  );

  const validateStateName = useCallback(async () => {
    if (state.dtoDistrict.state_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoDistrict.state_name]);

  const onStateNameBlur = useCallback(async () => {
    const state_name = await validateStateName();
    setState({ ...state, errorMessages: { ...state.errorMessages, state_name: state_name, }, });
  }, [validateStateName, state]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const capitalizedValue = capitalizeWords(value);
      setState({
        dtoDistrict: {
          ...state.dtoDistrict,
          [name]: capitalizedValue
        }
      } as StateType);
    },
    [state.dtoDistrict]
  );

  const onCodeChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value.toUpperCase();
      value = value.replace(/[^A-Z0-9]/g, "");
      setState({
        dtoDistrict: {
          ...state.dtoDistrict,
          district_code: value,
        },
      } as StateType);
    },
    [state.dtoDistrict]
  );

  const validateCountryName = useCallback(async () => {
    if (state.dtoDistrict.country_id === 0) {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoDistrict.country_id]);

  const onCountryNameBlur = useCallback(async () => {
    const country_id = await validateCountryName();
    setState({ errorMessages: { ...state.errorMessages, country_id: country_id } } as StateType);
  }, [validateCountryName, state.errorMessages]);

  const validateDistrictName = useCallback(async () => {
    if (state.dtoDistrict.district_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoDistrict.district_name]);

  const onDistrictNameBlur = useCallback(async () => {
    const district_name = await validateDistrictName();
    setState({ errorMessages: { ...state.errorMessages, district_name: district_name } } as StateType);
  }, [validateDistrictName, state.errorMessages]);

  const onStatusChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoDistrict: {
          ...state.dtoDistrict,
          status: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoDistrict]
  );

  const validateStatus = useCallback(async () => {
    if (state.dtoDistrict.status.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoDistrict.status]);

  const onStatusBlur = useCallback(async () => {
    const status = await validateStatus();
    setState({ errorMessages: { ...state.errorMessages, status: status } } as StateType);
  }, [validateStatus, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.country_id = await validateCountryName();
    if (errorMessages.country_id) {
      isFormValid = false;
    }
    errorMessages.state_name = await validateStateName();
    if (errorMessages.state_name) {
      isFormValid = false;
    }
    errorMessages.district_name = await validateDistrictName();
    if (errorMessages.district_name) {
      isFormValid = false;
    }
    errorMessages.status = await validateStatus();
    if (errorMessages.status) {
      isFormValid = false;
    }

    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateStateName, validateCountryName, validateDistrictName, validateStatus]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (saving) return; // prevent multiple clicks while saving
      setSaving(true);
      try {
        if (await validateForm()) {
          if (state.dtoDistrict.id === 0) {
            const { data } = await addDistict({
              variables: {
                ...state.dtoDistrict
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_INSERT_RECORD, 'success');
              router.push('/districts/list');
            }
          } else {
            const { data } = await updateDistict({
              variables: {
                ...state.dtoDistrict
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_UPDATE_RECORD, 'success');
              router.push('/districts/list');
            }
          }
        }
      } catch (error: any) {
        console.error('Error while saving referral:', error);
        showSnackbar(gMessageConstants.SNACKBAR_INSERT_FAILED, 'error');
      } finally {
        setSaving(false); // ensure this always runs
      }
    },
    [validateForm, addDistict, state.dtoDistrict, router, updateDistict]
  );

  const onClearClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setState({ dtoDistrict: { ...DISTRICT, id: state.dtoDistrict.id }, errorMessages: { ...ERROR_MESSAGES } } as StateType);
    },
    [state.dtoDistrict.id, ERROR_MESSAGES]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/districts/list');
    },
    [router]
  );

  const setOpen1 = useCallback(async (): Promise<void> => {
    setState({ open1: true } as StateType);
  }, []);
  const setClose1 = useCallback(async (): Promise<void> => {
    setState({ open1: false } as StateType);
  }, []);

  const setOpen2 = useCallback(async (): Promise<void> => {
    setState({ open2: true } as StateType);
  }, []);
  const setClose2 = useCallback(async (): Promise<void> => {
    setState({ open2: false } as StateType);
  }, []);

  const setOpen3 = useCallback(async (): Promise<void> => {
    setState({ open3: true } as StateType);
  }, []);
  const setClose3 = useCallback(async (): Promise<void> => {
    setState({ open3: false } as StateType);
  }, []);

  return {
    state,
    onInputChange,
    onCodeChange,
    onStateNameBlur,
    onCountryNameBlur,
    onDistrictNameBlur,
    onSaveClick,
    onClearClick,
    onCancelClick,
    onLookupValueChange,
    saving,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    setOpen3,
    setClose3,
    onStatusChange,
    onStatusBlur
  };
};

export default useDistrictEntry;
