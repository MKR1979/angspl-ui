'use client';
import { ChangeEvent, useCallback, useEffect, useReducer, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import AttendanceDTO, { ATTENDANCE } from '@/app/types/AttendanceDTO';
import { ADD_ATTENDANCE, GET_ATTENDANCE, UPDATE_ATTENDANCE } from '@/app/graphql/Attendance';
import { useRouter } from 'next/navigation';
import { useSelector } from '../../../store';
import { arrAttendanceType } from '@/app/common/Configuration';
import LookupDTO from '@/app/types/LookupDTO';
import * as Constants from '../../constants/constants';
import * as gMessageConstants from '../../../constants/messages-constants';
import { useSnackbar } from '../../../custom-components/SnackbarProvider';

type ErrorMessageType = {
  user_id: number | null;
  name: string | null;
  entry_type: string | null;
  attendance_time: string | null;
  latitude: number | null;
  longitude: number | null;
  distance_from_office: number | null;
  is_on_campus: boolean | null;
  device_info: string | null;
  ip_address: string | null;
  remarks: string | null;
};

type StateType = {
  dtoAttendance: AttendanceDTO;
  arrAttendanceTypeLookup: LookupDTO[];
  open1: boolean;
  errorMessages: ErrorMessageType;
  isLoading: boolean;
};

type Props = {
  dtoAttendance: AttendanceDTO;
};

const useAttendanceEntry = ({ dtoAttendance }: Props) => {
  const router = useRouter();

  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    user_id: null,
    name: null,
    entry_type: null,
    attendance_time: null,
    latitude: null,
    longitude: null,
    distance_from_office: null,
    is_on_campus: null,
    device_info: null,
    ip_address: null,
    remarks: null
  } as ErrorMessageType);

  const INITIAL_STATE: StateType = Object.freeze({
    dtoAttendance: dtoAttendance,
    open1: false,
    arrAttendanceTypeLookup: arrAttendanceType,
    errorMessages: { ...ERROR_MESSAGES },
    isLoading: true
  } as StateType);

  const reducer = (state: StateType, action: Partial<StateType>): StateType => {
    return { ...state, ...action };
  };

  const showSnackbar = useSnackbar();
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [saving, setSaving] = useState(false);
  const [addAttendance] = useMutation(ADD_ATTENDANCE);
  const [updateAttendance] = useMutation(UPDATE_ATTENDANCE);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { siteConfig } = useSelector((state) => state.siteConfigState);
  const [getAttendance] = useLazyQuery(GET_ATTENDANCE, {
    fetchPolicy: 'network-only'
  });

  const OFFICE_LOCATION = {
    lat: Number(siteConfig.find((c) => c.key === 'OFFICE_LATITUDE')?.value ?? 0),
    lng: Number(siteConfig.find((c) => c.key === 'OFFICE_LONGITUDE')?.value ?? 0)
  };

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoAttendance: AttendanceDTO = ATTENDANCE;
      const { error, data } = await getAttendance({
        variables: {
          id: state.dtoAttendance.id
        }
      });
      if (!error && data) {
        dtoAttendance = data.getAttendance;
      }
      setState({ dtoAttendance: dtoAttendance } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getAttendance, state.dtoAttendance?.id]);

  useEffect(() => {
    if (state.dtoAttendance?.id > 0) {
      getData();
    }
  }, [state.dtoAttendance?.id, getData]);

  const validateName = useCallback(async () => {
    if (state.dtoAttendance.name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAttendance?.name]);

  const onNameBlur = useCallback(async () => {
    const name = await validateName();
    setState({ errorMessages: { ...state.errorMessages, name: name } } as StateType);
  }, [validateName, state.errorMessages]);

  const validateRemark = useCallback(async () => {
    if (state.dtoAttendance.remarks.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAttendance.remarks]);

  const onRemarkBlur = useCallback(async () => {
    const remarks = await validateRemark();
    setState({ errorMessages: { ...state.errorMessages, remarks: remarks } } as StateType);
  }, [validateRemark, state.errorMessages]);

  const validateAttendanceTime = useCallback(async () => {
    const time = state.dtoAttendance.attendance_time;
    if (!time || isNaN(new Date(time).getTime())) {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAttendance?.attendance_time]);

  const onAttendanceTimeBlur = useCallback(async () => {
    const attendance_time = await validateAttendanceTime();
    setState({ errorMessages: { ...state.errorMessages, attendance_time: attendance_time } } as StateType);
  }, [validateAttendanceTime, state.errorMessages]);

  const validateType = useCallback(async () => {
    if (state.dtoAttendance?.entry_type.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoAttendance?.entry_type]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoAttendance: {
          ...state.dtoAttendance,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoAttendance]
  );

  const onDateChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const localDateTime = new Date(event.target.value); // This is treated as local
      const utcDateTime = new Date(localDateTime.getTime() - localDateTime.getTimezoneOffset() * 60000);
      setState({
        ...state,
        dtoAttendance: {
          ...state.dtoAttendance,
          [event.target.name]: utcDateTime.toISOString() // Store as UTC string
        }
      });
    },
    [state]
  );

  const onTypeChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoAttendance: {
          ...state.dtoAttendance,
          entry_type: (value as LookupDTO).text ?? ''
        }
      } as StateType);
    },
    [state.dtoAttendance]
  );

  const onTypeBlur = useCallback(async () => {
    const entry_type = await validateType();
    setState({ errorMessages: { ...state.errorMessages, entry_type: entry_type } } as StateType);
  }, [validateType, state.errorMessages]);

  function formatDateTimePreserveUTC(dateInput: string | Date): string {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    // Extract the UTC parts
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.entry_type = await validateType();
    if (errorMessages.entry_type) {
      isFormValid = false;
    }
    errorMessages.name = await validateName();
    if (errorMessages.name) {
      isFormValid = false;
    }
    errorMessages.attendance_time = await validateAttendanceTime();
    if (errorMessages.attendance_time) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateType, validateName, validateAttendanceTime]);

  // BLOCK FOR GETTING LOCATION
  const getLocation = () => {
    setLoading(true);
    setError(null);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLoading(false);
        },
        (error) => {
          let errorMessage = 'Unable to fetch location.';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location permission denied. Please allow access.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information is unavailable.';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out.';
              break;
            default:
              errorMessage = 'An unknown error occurred.';
          }
          setError(errorMessage);
          setLoading(false);
        },
        {
          enableHighAccuracy: true, // 🔍 Use GPS if available
          timeout: 10000, // wait max 10 seconds
          maximumAge: 0 // do not use cached location
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  function getDistanceFromLatLonInMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371000; // Radius of the Earth in meters
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  const handleMarkAttendance = async (e: React.MouseEvent<HTMLElement>) => {
    if (!location) {
      setError('Location not available.');
      return;
    }
    const distance = getDistanceFromLatLonInMeters(location.lat, location.lng, OFFICE_LOCATION.lat, OFFICE_LOCATION.lng);
    const maxAllowedDistance = Number(siteConfig.find((c) => c.key === 'MAX_ALLOWED_DISTANCE')?.value) || 0;
    const isOfficelocation = distance <= maxAllowedDistance;
    const isOnCampusAttendance = siteConfig.find((c) => c.key === 'IS_ON_CAMPUS')?.value?.toLowerCase() === 'true';

    if (isOnCampusAttendance && !isOfficelocation) {
      setError(`You are ${Math.round(distance)}m away from office. Attendance not allowed beyond ${maxAllowedDistance}m.`);
      return;
    }
    state.dtoAttendance.name = state.dtoAttendance.name;
    // state.dtoAttendance.attendance_time = new Date(dayjs().format('YYYY-MM-DDTHH:mm'));
    state.dtoAttendance.attendance_time = state.dtoAttendance.attendance_time;
    state.dtoAttendance.latitude = location.lat;
    state.dtoAttendance.longitude = location.lng;
    state.dtoAttendance.distance_from_office = distance;
    state.dtoAttendance.is_on_campus = isOnCampusAttendance;
    state.dtoAttendance.device_info = window.navigator.userAgent;
    state.dtoAttendance.ip_address = state.dtoAttendance.ip_address;
    // state.dtoAttendance.remarks = formData.remarks;
    state.dtoAttendance.remarks = state.dtoAttendance.remarks;
    await onSaveClick(e);
  };
  // END BLOCK LOCATION **********************************

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (saving) return; // prevent multiple clicks while saving
      setSaving(true);
      try {
        if (await validateForm()) {
          if (state.dtoAttendance.id === 0) {
            const { data } = await addAttendance({
              variables: { ...state.dtoAttendance }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_INSERT_RECORD, 'success');
              router.push(`/${Constants.ADMIN_EMP_DASHBOARD}/review-attendance/list`);
            }
          } else {
            const { data } = await updateAttendance({
              variables: {
                //  ...state.dtoAttendance
                id: state.dtoAttendance.id,
                name: state.dtoAttendance.name,
                attendance_time: state.dtoAttendance.attendance_time,
                entry_type: state.dtoAttendance.entry_type,
                remarks: state.dtoAttendance.remarks
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_UPDATE_RECORD, 'success');
              router.push(`/${Constants.ADMIN_EMP_DASHBOARD}/review-attendance/list`);
            }
          }
        }
      } catch (error: any) {
        console.error('Error while saving attendance:', error);
        showSnackbar(gMessageConstants.SNACKBAR_UPDATE_FAILED, 'error');
      } finally {
        setSaving(false); // ensure this always runs
      }
    },
    [addAttendance, state.dtoAttendance, updateAttendance, router, validateForm]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/${Constants.ADMIN_EMP_DASHBOARD}/review-attendance/list`);
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
    handleMarkAttendance,
    error,
    loading,
    onCancelClick,
    setOpen1,
    setClose1,
    onTypeBlur,
    onTypeChange,
    saving,
    onNameBlur,
    onAttendanceTimeBlur,
    onInputChange,
    onDateChange,
    onRemarkBlur,
    formatDateTimePreserveUTC
  };
};

export default useAttendanceEntry;
