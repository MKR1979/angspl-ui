'use client';
import { useCallback, useEffect, useReducer, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import AttendanceDTO, { ATTENDANCE } from '@/app/types/AttendanceDTO';
import { ADD_ATTENDANCE, GET_ATTENDANCE, GET_ATTENDANCE_EXISTS } from '@/app/graphql/Attendance';
import { useRouter } from 'next/navigation';
import { useSelector } from '../../store';
import dayjs from 'dayjs';
import { arrAttendanceType } from '@/app/common/Configuration';
import LookupDTO from '@/app/types/LookupDTO';
import { getDeviceFingerprint } from '../../common/utility-fingerprint';
import * as gConstants from '../../constants/constants';
import * as Sentry from '@sentry/nextjs';
import { useSnackbar } from '../../custom-components/SnackbarProvider';
import * as gMessageConstants from '../../constants/messages-constants';

type ErrorMessageType = {
  user_id: number | null;
  device_id: string | null;
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
  arrAttendanceTypeLookup: LookupDTO[];
  open1: boolean;
  dtoAttendance: AttendanceDTO;
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
    device_id: null,
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

  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [ipAddress, setIpAddress] = useState<string>('');
  const showSnackbar = useSnackbar();
  const [saving, setSaving] = useState(false);
  const [addAttendance] = useMutation(ADD_ATTENDANCE);
  const { loginUser,  loginUser_id } = useSelector((state) => state.loginState);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const { siteConfig } = useSelector((state) => state.siteConfigState);
  const isSentryEnabled = siteConfig.find((c) => c.key === 'IS_SENTRY_ENABLE')?.value?.toLowerCase() === 'true';
// const [locationAccuracy, setLocationAccuracy] = useState<number>(0);


  const [getAttendance] = useLazyQuery(GET_ATTENDANCE, { fetchPolicy: 'network-only' });
  const [getAttendanceExist] = useLazyQuery(GET_ATTENDANCE_EXISTS, { fetchPolicy: 'network-only' });

  const OFFICE_LOCATION = {
    lat: Number(siteConfig.find((c) => c.key === 'OFFICE_LATITUDE')?.value ?? 0),
    lng: Number(siteConfig.find((c) => c.key === 'OFFICE_LONGITUDE')?.value ?? 0)
  };

  const [formData, setFormData] = useState({
    name: `${loginUser} (${loginUser_id})`,
    entry_type: '',
    attendance_time: dayjs().format('YYYY-MM-DDTHH:mm'),
    remarks: ''
  });

  const IsAttendanceExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getAttendanceExist({
      variables: {
        attendance_time: state.dtoAttendance.attendance_time,
        entry_type: state.dtoAttendance.entry_type
      }
    });
    if (!error && data) {
      exist = data.getAttendanceExist;
    }
    return exist;
  }, [getAttendanceExist, state.dtoAttendance.attendance_time, state.dtoAttendance.entry_type]);

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
  }, [getAttendance, state.dtoAttendance.id]);

  useEffect(() => {
    if (state.dtoAttendance.id > 0) {
      getData();
    }
  }, [state.dtoAttendance.id, getData]);

  const fetchIPAddress = async (): Promise<string> => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip; // e.g., "123.45.67.89"
    } catch (error) {
      console.error('Failed to fetch IP address:', error);
      return '';
    }
  };

  useEffect(() => {
    const getIP = async () => {
      const ip = await fetchIPAddress();
      setIpAddress(ip);
    };
    getIP();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onTypeChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoAttendance: {
          ...state.dtoAttendance,
          entry_type: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoAttendance]
  );

  const validateType = useCallback(async () => {
    if (state.dtoAttendance.entry_type.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else if (await IsAttendanceExist()) {
      return 'Attendance already marked';
    } else {
      return null;
    }
  }, [state.dtoAttendance.entry_type, IsAttendanceExist]);

  const onTypeBlur = useCallback(async () => {
    const entry_type = await validateType();
    setState({ errorMessages: { ...state.errorMessages, entry_type: entry_type } } as StateType);
  }, [validateType, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.entry_type = await validateType();
    if (errorMessages.entry_type) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateType]);

  const formatDateTimeString = (dateInput: string | Date, withSeconds = false): string => {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    if (!(date instanceof Date) || isNaN(date.getTime())) return '';
    const pad = (n: number) => n.toString().padStart(2, '0');
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    return withSeconds ? `${year}-${month}-${day}T${hours}:${minutes}:${seconds}` : `${year}-${month}-${day}T${hours}:${minutes}`;
  };

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
          //  setLocationAccuracy(position.coords.accuracy); 
          setLoading(false);
          console.log('📍 Device Location: latitude', (position.coords.latitude));
          console.log('📍 Device Location: longitude', (position.coords.longitude));
          console.log('📍 Accuracy in meters:', position.coords.accuracy);
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
          enableHighAccuracy: true, 
          timeout: gConstants.LOCATION_TIMEOUT,
          maximumAge: 0
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

//   const handleMarkAttendance = async (e: React.MouseEvent<HTMLElement>) => {
//   if (!location) {
//     setError('Location not available.');
//     return;
//   }

//   // Get device accuracy (meters)
//   const gpsAccuracy = (navigator.geolocation && locationAccuracy) || 0; 
//   // locationAccuracy should be set in getLocation() when fetching device coords
//   console.log('📍 Using Device Location:', location);
//   console.log('🏢 Office Location:', OFFICE_LOCATION);
//   console.log('📏 Device Accuracy (meters):', gpsAccuracy);

//   const distance = getDistanceFromLatLonInMeters(
//     location.lat,
//     location.lng,
//     OFFICE_LOCATION.lat,
//     OFFICE_LOCATION.lng
//   );
//   console.log('📏 Distance from office (meters):', distance);

//   const maxAllowedDistance = Number(
//     siteConfig.find((c) => c.key === 'MAX_ALLOWED_DISTANCE')?.value
//   ) || 0;
// console.log('max allowed distance ', maxAllowedDistance);
//   // Incorporate GPS accuracy as a buffer
//   const isOfficelocation = distance <= (maxAllowedDistance + gpsAccuracy);

//   const isOnCampusAttendance =
//     siteConfig.find((c) => c.key === 'IS_ON_CAMPUS')?.value?.toLowerCase() === 'true';

//   if (isOnCampusAttendance && !isOfficelocation) {
//     setError(
//       `You are ${Math.round(distance)}m away from office. Attendance not allowed beyond ${maxAllowedDistance}m (GPS accuracy ±${Math.round(
//         gpsAccuracy
//       )}m).`
//     );
//     return;
//   }

//   // Populate attendance DTO
//   state.dtoAttendance.device_id = deviceId || '';
//   state.dtoAttendance.name = loginUser;
//   state.dtoAttendance.attendance_time = new Date(formData.attendance_time);
//   state.dtoAttendance.latitude = location.lat;
//   state.dtoAttendance.longitude = location.lng;
//   state.dtoAttendance.distance_from_office = distance;
//   state.dtoAttendance.is_on_campus = isOnCampusAttendance;
//   state.dtoAttendance.device_info = window.navigator.userAgent;
//   state.dtoAttendance.ip_address = ipAddress;
//   state.dtoAttendance.remarks = formData.remarks;

//   await onSaveClick(e);
// };


  const handleMarkAttendance = async (e: React.MouseEvent<HTMLElement>) => {
    if (!location) {
      setError('Location not available.');
      return;
    }
    console.log('📍 Using Device Location:', location);
    console.log('🏢 Office Location:', OFFICE_LOCATION);
    const distance = getDistanceFromLatLonInMeters(location.lat, location.lng, OFFICE_LOCATION.lat, OFFICE_LOCATION.lng);
    console.log('📏 Distance from office (meters):', distance);
    const maxAllowedDistance = Number(siteConfig.find((c) => c.key === 'MAX_ALLOWED_DISTANCE')?.value) || 0;
    const isOfficelocation = distance <= maxAllowedDistance;
    const isOnCampusAttendance = siteConfig.find((c) => c.key === 'IS_ON_CAMPUS')?.value?.toLowerCase() === 'true';

    if (isOnCampusAttendance && !isOfficelocation) {
      setError(`You are ${Math.round(distance)}m away from office. Attendance not allowed beyond ${maxAllowedDistance}m.`);
      return;
    }
    state.dtoAttendance.device_id = deviceId || '';
    state.dtoAttendance.name = loginUser;
    state.dtoAttendance.attendance_time = new Date(formData.attendance_time);
    //state.dtoAttendance.attendance_time = state.dtoAttendance.attendance_time;
    state.dtoAttendance.latitude = location.lat;
    state.dtoAttendance.longitude = location.lng;
    state.dtoAttendance.distance_from_office = distance;
    state.dtoAttendance.is_on_campus = isOnCampusAttendance;
    state.dtoAttendance.device_info = window.navigator.userAgent;
    state.dtoAttendance.ip_address = ipAddress;
    state.dtoAttendance.remarks = formData.remarks;
    await onSaveClick(e);
  };
  // END BLOCK LOCATION **********************************

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (saving) return; // Prevent multiple clicks while saving
      setSaving(true);
      try {
        const isValid = await validateForm();
        if (!isValid) {
          showSnackbar('Validation failed. Please correct the form and try again.', 'error');
          return;
        }
        if (state.dtoAttendance.id === 0) {
          const response = await addAttendance({
            variables: {
              // ...state.dtoAttendance
              device_id: state.dtoAttendance.device_id,
              entry_type: state.dtoAttendance.entry_type,
              attendance_time: state.dtoAttendance.attendance_time,
              latitude: state.dtoAttendance.latitude,
              longitude: state.dtoAttendance.longitude,
              distance_from_office: state.dtoAttendance.distance_from_office,
              is_on_campus: state.dtoAttendance.is_on_campus,
              device_info: state.dtoAttendance.device_info,
              ip_address: state.dtoAttendance.ip_address,
              remarks: state.dtoAttendance.remarks
            }
          });
          const errors = response?.errors;
          const data = response?.data;

          if (errors?.length) {
            const errorMessage = errors[0]?.message || 'An unknown error occurred.';
            setError(errorMessage);
            return;
          }
          if (data) {
            showSnackbar('Attendance Marked Successfully!', 'success');
            router.push('/attendance/list');
          } else {
            showSnackbar('Error in Marking Attendance, Try Again!', 'error');
            setError('No data returned from server.');
          }
        }
      } catch (error: any) {
        const gqlError = error?.graphQLErrors?.[0];
        const errorCode = gqlError?.extensions?.code;
        const errorMessage = gqlError?.extensions?.error || error.message || 'An unexpected error occurred.';
        setError(errorMessage);
        showSnackbar('Error !', 'error');
        // Block to record Sentry Logsin Marking Attendance, Try Again
        if (isSentryEnabled) {
          Sentry.captureMessage(
            `Attendance Submission Failed: deviceId=${state.dtoAttendance.device_id}, userName=${loginUser}, userId=${loginUser_id} - ${gqlError?.extensions?.error || error.message}`,
            'error'
          );
        }
        if (errorCode === 'UNAUTHENTICATED') {
          router.push('/login'); // or show login dialog
        }
        // END  Sentry Logs
      } finally {
        setSaving(false);
      }
    },
    [addAttendance, state.dtoAttendance, router, validateForm, saving]
  );
  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/attendance/list');
    },
    [router]
  );

  const setOpen1 = useCallback(async (): Promise<void> => {
    setState({ open1: true } as StateType);
  }, []);
  const setClose1 = useCallback(async (): Promise<void> => {
    setState({ open1: false } as StateType);
  }, []);

  useEffect(() => {
    const fetchFingerprint = async () => {
      const id = await getDeviceFingerprint();
      setDeviceId(id);
    };
    fetchFingerprint();
  }, []);

//   useEffect(() => {
//   const handleContextMenu = (e: MouseEvent) => e.preventDefault();
//   const handleKeyDown = (e: KeyboardEvent) => {
//     if (
//       e.key === "F12" || // F12
//       (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") || // Ctrl+Shift+I
//       (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "j") || // Ctrl+Shift+J
//       (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "c") || // Ctrl+Shift+C
//       (e.ctrlKey && e.key.toLowerCase() === "u") // Ctrl+U
//     ) {
//       e.preventDefault();
//       alert("Inspect / View Source is disabled!");
//     }
//   };
//   document.addEventListener("contextmenu", handleContextMenu);
//   document.addEventListener("keydown", handleKeyDown);
//   return () => {
//     document.removeEventListener("contextmenu", handleContextMenu);
//     document.removeEventListener("keydown", handleKeyDown);
//   };
// }, []);


  return {
    state,
    deviceId,
    handleMarkAttendance,
    handleChange,
    error,
    loading,
    formData,
    onCancelClick,
    setOpen1,
    setClose1,
    onTypeBlur,
    onTypeChange,
    saving,
    formatDateTimeString,getLocation
  };
};

export default useAttendanceEntry;
