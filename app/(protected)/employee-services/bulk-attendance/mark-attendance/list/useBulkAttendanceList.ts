import { useCallback, useEffect, useReducer, useState } from 'react';
// import { useRouter } from 'next/navigation';
import { useMutation, useLazyQuery } from '@apollo/client';
import { GridFilterModel, GridRowSelectionModel, GridSortModel, useGridApiRef, GridInitialState } from '@mui/x-data-grid';
import { SortDirectionType, ContextMenuType, getLocalTime } from '../../../../../common/Configuration';
import BulkAttendanceDTO, { BULK_ATTENDANCE } from '@/app/types/BulkAttendanceDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import LookupDTO from '@/app/types/LookupDTO';
import { ADD_ATTENDANCE_BULK, GET_ATTENDANCE_BULK } from '@/app/graphql/BulkAttendance';
import { getDeviceFingerprint } from '../../../../../common/utility-fingerprint';
import * as gConstants from '../../../../../constants/constants';
// import * as Constants from '../../../../constants/constants';
import * as gMessageConstants from '../../../../../constants/messages-constants';
import { useSelector } from '../../../../../store';
import dayjs from 'dayjs';
import { useSnackbar } from '../../../../../custom-components/SnackbarProvider';
import { USER_LOOKUP } from '@/app/graphql/User';

interface Props {
  arrBulkAttendanceDTO: BulkAttendanceDTO[];
  total_records: number;
}

interface visibleDialog1Type {
  id: string;
  visibility: boolean;
}

type ErrorMessageType = {
  user_id: number | null;
  user_name: Date | null;
  from_date: Date | null;
  to_date: Date | null;
  time: string | null;
  time_in: string | null;
  time_out: string | null;
  device_id: string | null;
  latitude: number | null;
  longitude: number | null;
  distance_from_office: number | null;
  is_on_campus: boolean | null;
  device_info: string | null;
  ip_address: string | null;
  remarks: string | null;
  is_locked: boolean | null;
  isSelected: boolean | null;
};

interface StateType {
  user_id: number;
  isLoading: boolean;
  open1: boolean;
  arrBulkAttendanceDTO: BulkAttendanceDTO[];
  arrUserLookup: LookupDTO[];
  dtoBulkAttendance: BulkAttendanceDTO;
  total_records: number;
  filter_text: string;
  sort_field: string;
  sort_direction: SortDirectionType;
  visibleDialog: boolean;
  visibleDialog1: visibleDialog1Type;
  selectedRow: string;
  arrSelectedId: string[];
  contextMenu: ContextMenuType | null;
  initialState: GridInitialState;
  breadcrumbsItems: BreadcrumbsItem[];
  userMap: Record<number, string>;
  errorMessages: ErrorMessageType;
}

const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
  user_id: null,
  user_name: null,
  from_date: null,
  to_date: null,
  time: null,
  time_in: null,
  time_out: null,
  device_id: null,
  latitude: null,
  longitude: null,
  distance_from_office: null,
  is_on_campus: null,
  device_info: null,
  ip_address: null,
  remarks: null,
  is_locked: null,
  isSelected: null
} as ErrorMessageType);

const useBulkAttendanceList = ({ arrBulkAttendanceDTO, total_records }: Props) => {
  // const router = useRouter();
  const apiRef = useGridApiRef();

  const INITIAL_STATE: StateType = {
    user_id: 0,
    dtoBulkAttendance: { ...BULK_ATTENDANCE },
    errorMessages: { ...ERROR_MESSAGES },
    arrUserLookup: [] as LookupDTO[],
    open1: false,
    isLoading: false,
    arrBulkAttendanceDTO: arrBulkAttendanceDTO,
    total_records: total_records,
    filter_text: '',
    sort_field: 'id',
    sort_direction: 'desc',
    visibleDialog: false,
    visibleDialog1: { id: '', visibility: false },
    selectedRow: '',
    arrSelectedId: [],
    contextMenu: null,
    initialState: {
      pagination: {
        paginationModel: { pageSize: 100, page: 0 }
      },
      columns: {
        columnVisibilityModel: { id: false }
      }
    },
    breadcrumbsItems: [{ label: 'Mark Attendance' }],
    userMap: {}
  };

  const reducer = (state: StateType, action: Partial<StateType>): StateType => {
    return { ...state, ...action };
  };

  const showSnackbar = useSnackbar();
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [ipAddress, setIpAddress] = useState<string>('');
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const { siteConfig } = useSelector((state) => state.siteConfigState);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [addAttendanceBulk] = useMutation(ADD_ATTENDANCE_BULK);
  console.log(addAttendanceBulk);
  const [getAttendanceBulk] = useLazyQuery(GET_ATTENDANCE_BULK, { fetchPolicy: 'network-only' });
  const [getUserLookup] = useLazyQuery(USER_LOOKUP, { fetchPolicy: 'network-only' });
  const [showSaveButton, setShowSaveButton] = useState(false);
  const OFFICE_LOCATION = {
    lat: Number(siteConfig.find((c) => c.key === 'OFFICE_LATITUDE')?.value ?? 0),
    lng: Number(siteConfig.find((c) => c.key === 'OFFICE_LONGITUDE')?.value ?? 0)
  };

  const getUserList = useCallback(async (): Promise<void> => {
    try {
      let arrUserLookup: LookupDTO[] = [];
      const { error, data } = await getUserLookup({
        variables: {
          type_name: gMessageConstants.EMPLOYEE_TYPE_NAME
        }
      });
      if (!error && data?.getUserLookup) {
        arrUserLookup = [{ id: -1, text: 'All Users' }, ...data.getUserLookup];
      }
      setState({ arrUserLookup: arrUserLookup } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getUserLookup]);

  useEffect(() => {
    getUserList();
  }, [getUserList]);

  const getData = useCallback(async (): Promise<void> => {
    try {
      setState({ isLoading: true } as StateType);
      let arrAttendanceDTO: BulkAttendanceDTO[] = [];

      const { error, data } = await getAttendanceBulk({
        variables: {
          from_date: state.dtoBulkAttendance.from_date,
          to_date: state.dtoBulkAttendance.to_date,
          user_id: state.dtoBulkAttendance.user_id !== -1 ? state.dtoBulkAttendance.user_id : null,
          source_flag: state.dtoBulkAttendance.source_flag || 'MARK'

        }
      });

      if (!error && Array.isArray(data.getAttendanceBulk)) {
        arrAttendanceDTO = data.getAttendanceBulk.map((item: BulkAttendanceDTO, index: number) => ({
          ...item,
          id: item.id != null ? parseInt(item.id.toString()) : Date.now() + index
        }));
      }

      setState({
        arrBulkAttendanceDTO: arrAttendanceDTO,
        isLoading: false,
        arrSelectedId: []
      } as unknown as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getAttendanceBulk, state.dtoBulkAttendance]);

  useEffect(() => {
    getData();
  }, [getData]);

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
          timeout: gConstants.LOCATION_TIMEOUT, // wait max 30 seconds
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


  const validTimeIn = useCallback(() => {
  if (!state.dtoBulkAttendance.time_in || 
      dayjs(getLocalTime(state.dtoBulkAttendance.time_in)).format('HH:mm') === '00:00') {
    return gMessageConstants.REQUIRED_FIELD;
  }
  return null;
}, [state.dtoBulkAttendance.time_in]);

const validTimeOut = useCallback(() => {
  if (!state.dtoBulkAttendance.time_out || 
      dayjs(getLocalTime(state.dtoBulkAttendance.time_out)).format('HH:mm') === '00:00') {
    return gMessageConstants.REQUIRED_FIELD;
  }
  return null;
}, [state.dtoBulkAttendance.time_out]);

const onTimeBlur = useCallback(() => {
  const timeInError = validTimeIn();
  const timeOutError = validTimeOut();
  setState({
    ...state,
    errorMessages: { 
      ...state.errorMessages, 
      time_in: timeInError, 
      time_out: timeOutError 
    }
  });
}, [validTimeIn, validTimeOut, state]);


const validateForm = useCallback(async () => {
  let isFormValid = true;
  const errorMessages: ErrorMessageType = { ...ERROR_MESSAGES };

  const timeInError = await validTimeIn();
  const timeOutError = await validTimeOut();

  // condition: dono empty hai to invalid
  if (timeInError && timeOutError) {
    errorMessages.time_in = gMessageConstants.REQUIRED_FIELD;
    errorMessages.time_out = gMessageConstants.REQUIRED_FIELD;
    isFormValid = false;
  } else {
    // agar ek fill hai to error clear ho jaye
    errorMessages.time_in = null;
    errorMessages.time_out = null;
  }

  setState({ errorMessages } as StateType);
  return isFormValid;
}, [ERROR_MESSAGES, validTimeIn, validTimeOut]);




  const onSaveDraftClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
          const isFormValid = await validateForm();
    if (!isFormValid) {
      showSnackbar('Please enter at least Time In or Time Out', 'error');
      return;
    }
      event.preventDefault();
      const selectedIds = state.arrSelectedId.map((id) => Number(id));
      const updatedRows = state.arrBulkAttendanceDTO.map((row) => {
        if (row.id && selectedIds.includes(row.id)) {
          const fromDate = dayjs(state.dtoBulkAttendance.from_date);
          const to_date = dayjs(state.dtoBulkAttendance.to_date);
          const timeIn = dayjs(state.dtoBulkAttendance.time_in);
          const timeOut = dayjs(state.dtoBulkAttendance.time_out);
          const diffInMinutes = timeOut.diff(timeIn, 'minute');
          const hours = Math.floor(diffInMinutes / 60);
          const minutes = diffInMinutes % 60;
          return {
            ...row,
            from_date: fromDate.format('YYYY-MM-DD'),
            to_date: to_date.format('YYYY-MM-DD'),
            // attendance_time: (fromDate).format('YYYY-MM-DD'),
            time_in: timeIn.format('HH:mm:ss'),
            time_out: timeOut.format('HH:mm:ss'),
            total_hours: `${hours}h ${minutes}m`,
            isSelected: true
          };
        }
        return row;
      });
      setState({
        arrBulkAttendanceDTO: updatedRows,
        arrSelectedId: []
      } as unknown as StateType);
      showSnackbar('Draft saved successfully', 'success');
      setShowSaveButton(true);
    },
    [state.arrBulkAttendanceDTO, state.arrSelectedId, state.dtoBulkAttendance]
  );
  const onMarkAttendance = useCallback(
  async (isLocked: boolean) => {
    // ✅ Form validation
    const isFormValid = await validateForm();
    if (!isFormValid) {
      showSnackbar('Please enter at least Time In or Time Out', 'error');
      return;
    }

    if (state.arrSelectedId.length === 0) {
      showSnackbar('No changes to save', 'warning');
      return;
    }

    if (!location) {
      setError('Location not available.');
      return;
    }

    const distance = getDistanceFromLatLonInMeters(
      location.lat,
      location.lng,
      OFFICE_LOCATION.lat,
      OFFICE_LOCATION.lng
    );
    const maxAllowedDistance =
      Number(siteConfig.find((c) => c.key === 'MAX_ALLOWED_DISTANCE')?.value) || 0;
    const isOfficelocation = distance <= maxAllowedDistance;
    const isOnCampusAttendance =
      siteConfig.find((c) => c.key === 'IS_ON_CAMPUS')?.value?.toLowerCase() === 'true';

    if (isOnCampusAttendance && !isOfficelocation) {
      setError(
        `You are ${Math.round(
          distance
        )}m away from office. Attendance not allowed beyond ${maxAllowedDistance}m.`
      );
      return;
    }

    const selectedArrBulkAttendanceDTO = state.arrBulkAttendanceDTO
      .filter((item) => item.isSelected === true)
      .map((item) => ({ ...item }));

    const deviceInfo = window.navigator.userAgent;

    const { data } = await addAttendanceBulk({
      variables: {
        latitude: location.lat,
        longitude: location.lng,
        distance_from_office: distance,
        is_on_campus: isOnCampusAttendance,
        device_id: deviceId,
        ip_address: ipAddress,
        device_info: deviceInfo,
        remarks: '',
        is_locked: isLocked,
        rawJson: JSON.stringify(selectedArrBulkAttendanceDTO),
      },
    });

    if (data) {
      showSnackbar(gMessageConstants.SNACKBAR_INSERT_RECORD, 'success');
      getData();
      setShowSaveButton(false);
    }
  },
  [addAttendanceBulk, state.arrSelectedId, getData, validateForm, location, siteConfig]
);

  const onUserNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoBulkAttendance: {
          ...state.dtoBulkAttendance,
          user_name: (value as LookupDTO).text,
          user_id: (value as LookupDTO).id
        }
      } as StateType);
    },
    [state.dtoBulkAttendance]
  );

  const onFromDateChange = useCallback(
    async (value: any): Promise<void> => {
      setState({ dtoBulkAttendance: { ...state.dtoBulkAttendance, from_date: value } } as StateType);
    },
    [state.dtoBulkAttendance]
  );

  const onToDateChange = useCallback(
    async (value: any): Promise<void> => {
      setState({ dtoBulkAttendance: { ...state.dtoBulkAttendance, to_date: value } } as StateType);
    },
    [state.dtoBulkAttendance]
  );

  useEffect(() => {
    const fetchFingerprint = async () => {
      const id = await getDeviceFingerprint();
      setDeviceId(id);
    };
    fetchFingerprint();
  }, []);

  return {
    state,
    apiRef,
    onCheckChange: (model: GridRowSelectionModel) => setState({ arrSelectedId: model as string[] }),
    onSortChange: (model: GridSortModel) => {
      const sortField = model[0]?.field || 'id';
      const sortDirection = model[0]?.sort || 'asc';
      setState({ sort_field: sortField, sort_direction: sortDirection });
    },
    onTimeInChange: (value: any) => setState({ dtoBulkAttendance: { ...state.dtoBulkAttendance, time_in: value } }),

    onTimeOutChange: (value: any) => setState({ dtoBulkAttendance: { ...state.dtoBulkAttendance, time_out: value } }),

  //  onRowDoubleClick: (params: any) => router.push(`/${Constants.ADMIN_EMP_DASHBOARD}/bulk-attendance/edit/${params.row.id}`),
    onContextMenu: (event: any) => {
      event.preventDefault();
      setState({ contextMenu: null });
    },
    handleContextMenu: (event: any) => {
      event.preventDefault();
      setState({
        selectedRow: event.currentTarget.getAttribute('data-id') || '',
        contextMenu: { mouseX: event.clientX - 2, mouseY: event.clientY - 4 }
      });
    },
    handleClose: () => setState({ contextMenu: null }),
    onFilterModelChange: (filterModel: GridFilterModel) => {
      const text = filterModel.quickFilterValues?.[0] || '';
      setState({ filter_text: text });
    },
    setOpen1: () => setState({ open1: true }),
    setClose1: () => setState({ open1: false }),
    onMarkAttendance,
    onSaveDraftClick,
    error,
    loading,
    onUserNameChange,
    onFromDateChange,
    onToDateChange,
     onTimeBlur,
    showSaveButton
  };
};

export default useBulkAttendanceList;
