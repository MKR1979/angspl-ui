import React, { ChangeEvent, useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import LocationDTO, { LOCATION } from '@/app/types/LocationDTO';
import { ADD_LOCATION, UPDATE_LOCATION, GET_LOCATION } from '@/app/graphql/Location';
import LookupDTO from '@/app/types/LookupDTO';
import { COUNTRY_LOOKUP } from '@/app/graphql/Country';
import { STATE_LOOKUP } from '@/app/graphql/state';
import toast from 'react-hot-toast';

type ErrorMessageType = {
  location_name: string | null;
  address: string | null;
  city_name: string | null;
  state_id: string | null;
  country_id: string | null;
  zip_code: string | null;
};

type StateType = {
  dtoLocation: LocationDTO;
  open1: boolean;
  open2: boolean;
  arrStateLookup: LookupDTO[];
  arrCountryLookup: LookupDTO[];
  saveDisabled: boolean;
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoLocation: LocationDTO;
  arrCountryLookup: LookupDTO[];
};

const useLocationEntry = ({ dtoLocation, arrCountryLookup }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    location_name: null,
    address: null,
    city_name: null,
    state_id: null,
    country_id: null,
    zip_code: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoLocation: dtoLocation,
    open1: false,
    open2: false,
    open3: false,
    open4: false,
    open5: false,
    open6: false,
    open7: false,
    arrStateLookup: [],
    arrCountryLookup: arrCountryLookup,
    saveDisabled: false,
    errorMessages: { ...ERROR_MESSAGES }
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [addLocation] = useMutation(ADD_LOCATION, {});

  const [updateLocation] = useMutation(UPDATE_LOCATION, {});

  const [getLocation] = useLazyQuery(GET_LOCATION, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getCountryLookup] = useLazyQuery(COUNTRY_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getStateLookup] = useLazyQuery(STATE_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData4 = useCallback(async (): Promise<void> => {
    let arrCountryLookup: LookupDTO[] = [];
    const { error, data } = await getCountryLookup();
    if (!error && data?.getCountryLookup) {
      arrCountryLookup = data.getCountryLookup;
    }
    setState({ arrCountryLookup: arrCountryLookup } as StateType);
  }, [getCountryLookup]);

  const getData5 = useCallback(async (): Promise<void> => {
    let arrStateLookup: LookupDTO[] = [];
    const { error, data } = await getStateLookup({
      variables: {
        country_id: state.dtoLocation.country_id
      }
    });
    if (!error && data?.getStateLookup) {
      arrStateLookup = data.getStateLookup;
    }
    setState({ arrStateLookup: arrStateLookup } as StateType);
  }, [getStateLookup, state.dtoLocation.country_id]);

  const getData = useCallback(async (): Promise<void> => {
    let dtoLocation: LocationDTO = LOCATION;
    const { error, data } = await getLocation({
      variables: {
        id: state.dtoLocation.id
      }
    });
    if (!error && data?.getLocation) {
      dtoLocation = data.getLocation;
    }
    setState({ dtoLocation: dtoLocation } as StateType);
  }, [getLocation, state.dtoLocation.id]);

  useEffect(() => {
    if (state.dtoLocation.id > 0) {
      getData();
    }
    getData4();
  }, [state.dtoLocation.id, getData, getData4]);

  useEffect(() => {
    getData5();
  }, [getData5, state.dtoLocation.country_id]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      // setState({
      //   dtoLocation: {
      //     ...state.dtoLocation,
      //     [event.target.name]: event.target.value
      //   }
      // } as StateType);
      switch (event.target.name) {
        case 'capacity':
          setState({
            dtoLocation: {
              ...state.dtoLocation,
              [event.target.name]: parseInt(event.target.value)
            }
          } as StateType);
          break;
        default:
          setState({
            dtoLocation: {
              ...state.dtoLocation,
              [event.target.name]: event.target.value
            }
          } as StateType);
      }
    },
    [state.dtoLocation]
  );

  const onStateNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoLocation: { ...state.dtoLocation, state_id: (value as LookupDTO).id, state_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoLocation]
  );

  const onCountryNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoLocation: { ...state.dtoLocation, country_id: (value as LookupDTO).id, country_name: (value as LookupDTO).text }
      } as StateType);
    },
    [state.dtoLocation]
  );

  const validateLocationName = useCallback(async () => {
    if (state.dtoLocation.location_name.trim() === '') {
      return 'Location Name is required';
    } else {
      return null;
    }
  }, [state.dtoLocation.location_name]);

  const onLocationNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const location_name = await validateLocationName();
      setState({ errorMessages: { ...state.errorMessages, location_name: location_name } } as StateType);
    }, [validateLocationName, state.errorMessages]);

  const validateAddress = useCallback(async () => {
    if (state.dtoLocation.address.trim() === '') {
      return 'Address is required';
    } else {
      return null;
    }
  }, [state.dtoLocation.address]);

  const onAddressBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const address = await validateAddress();
      setState({ errorMessages: { ...state.errorMessages, address: address } } as StateType);
    }, [validateAddress, state.errorMessages]);

  const validateCityName = useCallback(async () => {
    if (state.dtoLocation.city_name.trim() === '') {
      return ' City Name is required';
    } else {
      return null;
    }
  }, [state.dtoLocation.city_name]);

  const onCityNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const city_name = await validateCityName();
      setState({ errorMessages: { ...state.errorMessages, city_name: city_name } } as StateType);
    }, [validateCityName, state.errorMessages]);

  const validateStateName = useCallback(async () => {
    if (state.dtoLocation.state_id === 0) {
      return ' State Name is required';
    } else {
      return null;
    }
  }, [state.dtoLocation.state_id]);

  const onStateNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const state_id = await validateStateName();
      setState({ errorMessages: { ...state.errorMessages, state_id: state_id } } as StateType);
    }, [validateStateName, state.errorMessages]);

  const validateCountryName = useCallback(async () => {
    if (state.dtoLocation.country_id === 0) {
      return ' Country Name is required';
    } else {
      return null;
    }
  }, [state.dtoLocation.country_id]);

  const onCountryNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const country_id = await validateCountryName();
      setState({ errorMessages: { ...state.errorMessages, country_id: country_id } } as StateType);
    }, [validateCountryName, state.errorMessages]);

  const validateZipCode = useCallback(async () => {
    if (state.dtoLocation.zip_code.trim() === '') {
      return ' Zip Code is required';
    } else {
      return null;
    }
  }, [state.dtoLocation.zip_code]);

  const onZipCodeBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const zip_code = await validateZipCode();
      setState({ errorMessages: { ...state.errorMessages, zip_code: zip_code } } as StateType);
    }, [validateZipCode, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.location_name = await validateLocationName();
    if (errorMessages.location_name) {
      isFormValid = false;
    }
    errorMessages.address = await validateAddress();
    if (errorMessages.address) {
      isFormValid = false;
    }
    errorMessages.city_name = await validateCityName();
    if (errorMessages.city_name) {
      isFormValid = false;
    }
    errorMessages.state_id = await validateStateName();
    if (errorMessages.state_id) {
      isFormValid = false;
    }
    errorMessages.country_id = await validateCountryName();
    if (errorMessages.country_id) {
      isFormValid = false;
    }
    errorMessages.zip_code = await validateZipCode();
    if (errorMessages.zip_code) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateLocationName, validateAddress, validateCityName, validateStateName, validateCountryName, validateZipCode]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      try {
        setState({ saveDisabled: true } as StateType);
        event.preventDefault();
        if (await validateForm()) {
          if (state.dtoLocation.id === 0) {
            const { data } = await addLocation({
              variables: {
                location_name: state.dtoLocation.location_name,
                description: state.dtoLocation.description,
                capacity: state.dtoLocation.capacity,
                address: state.dtoLocation.address,
                city_name: state.dtoLocation.city_name,
                state_id: state.dtoLocation.state_id,
                country_id: state.dtoLocation.country_id,
                zip_code: state.dtoLocation.zip_code
              }
            });
            if (data?.addLocation) {
              toast.success('record saved successfully');
              router.push('/locations/list');
            } else {
              toast.error('Failed to save the record');
            }
          } else {
            const { data } = await updateLocation({
              variables: {
                id: state.dtoLocation.id,
                location_name: state.dtoLocation.location_name,
                description: state.dtoLocation.description,
                capacity: state.dtoLocation.capacity,
                address: state.dtoLocation.address,
                city_name: state.dtoLocation.city_name,
                state_id: state.dtoLocation.state_id,
                country_id: state.dtoLocation.country_id,
                zip_code: state.dtoLocation.zip_code
              }
            });
            if (data?.updateLocation) {
              toast.success('record saved successfully');
              router.push('/locations/list');
            } else {
              toast.error('Failed to save the record');
            }
          }
        }
      } catch {
        toast.error('Failed to save the record');
      } finally {
        setState({ saveDisabled: false } as StateType);
      }
    },
    [validateForm, addLocation, state.dtoLocation, router, updateLocation]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/locations/list');
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

  return {
    state,
    onInputChange,
    onStateNameChange,
    onCountryNameChange,
    onLocationNameBlur,
    onAddressBlur,
    onCityNameBlur,
    onStateNameBlur,
    onCountryNameBlur,
    onZipCodeBlur,
    onSaveClick,
    onCancelClick,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2
  };
};

export default useLocationEntry;
