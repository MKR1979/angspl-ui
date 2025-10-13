import { useCallback, useEffect, useReducer, useState } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import { GridFilterModel, GridSortModel, useGridApiRef, GridInitialState, GridRowSelectionModel } from '@mui/x-data-grid';
import { SortDirectionType, ContextMenuType } from '../../../../common/Configuration';
import StudentAttendanceDTO, { STUDENT_ATTENDANCE } from '@/app/types/StudentAttendanceDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import LookupDTO from '@/app/types/LookupDTO';
import { GET_ATTENDANCE_LEARNER, ADD_ATTENDANCE_LEARNER_BULK } from '@/app/graphql/StudentAttendance';
import { getDeviceFingerprint } from '../../../../common/utility-fingerprint';
import * as gConstants from '../../../../constants/constants';
import * as gMessageConstants from '../../../../constants/messages-constants';
import { useSelector } from '../../../../store';
import dayjs from 'dayjs';
import { useSnackbar } from '../../../../custom-components/SnackbarProvider';
import { USER_LOOKUP } from '@/app/graphql/User';
import { COURSE_LOOKUP } from '@/app/graphql/Course';
import { arrPresenceLookup } from '@/app/common/Configuration';

interface Props {
  arrStudentAttendanceDTO: StudentAttendanceDTO[];
  total_records: number;
}

interface visibleDialog1Type {
  id: string;
  visibility: boolean;
}

type ErrorMessageType = {
  user_id: number | null;
  course_id: number | null;
  user_name: string | null;
  presence: string | null;
  remarks: string | null;
  attendance_time: string | null;

};

interface StateType {
  user_id: number;
  isLoading: boolean;
  open1: boolean;
  open2: boolean;
  open3: boolean;
  arrStudentAttendanceDTO: StudentAttendanceDTO[];
  arrPresenceLookup: LookupDTO[];
  arrUserLookup: LookupDTO[];
  arrCourseLookup: LookupDTO[];
  dtoStudentAttendance: StudentAttendanceDTO;
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
  course_id: null,
  presence: null,
  remarks: null,
  attendance_time: null,
} as ErrorMessageType);

const useStudentAttendanceList = ({ arrStudentAttendanceDTO, total_records }: Props) => {
  const apiRef = useGridApiRef();

  const INITIAL_STATE: StateType = {
    user_id: 0,
    dtoStudentAttendance: { ...STUDENT_ATTENDANCE },
    errorMessages: { ...ERROR_MESSAGES },
    arrUserLookup: [] as LookupDTO[],
    arrCourseLookup: [] as LookupDTO[],
    open1: false,
    open2: false,
    open3: false,
    isLoading: false,
    arrStudentAttendanceDTO: arrStudentAttendanceDTO,
    arrPresenceLookup: arrPresenceLookup,
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
    breadcrumbsItems: [{ label: 'Student Attendance' }],
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
  const [addAttendanceLearnerBulk] = useMutation(ADD_ATTENDANCE_LEARNER_BULK);
  const [getAttendanceLearnerBulk] = useLazyQuery(GET_ATTENDANCE_LEARNER, { fetchPolicy: 'network-only' });
  const [getUserLookup] = useLazyQuery(USER_LOOKUP, { fetchPolicy: 'network-only' });
  const [getCourseLookup] = useLazyQuery(COURSE_LOOKUP, { fetchPolicy: 'network-only' });
  const [showSaveButton, setShowSaveButton] = useState(false);
  // const apiRow = apiRef.current.getRow(row.id);
  const OFFICE_LOCATION = {
    lat: Number(siteConfig.find((c) => c.key === 'OFFICE_LATITUDE')?.value ?? 0),
    lng: Number(siteConfig.find((c) => c.key === 'OFFICE_LONGITUDE')?.value ?? 0)
  };

  const getUserList = useCallback(async (): Promise<void> => {
    try {
      let arrUserLookup: LookupDTO[] = [];
      const { error, data } = await getUserLookup({
        variables: {
          type_name: gMessageConstants.STUDENT_TYPE_NAME
        }
      });
      if (!error && data?.getUserLookup) {
        arrUserLookup = [{ id: -1, text: 'All Student' }, ...data.getUserLookup];
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

  const getCourseList = useCallback(async (): Promise<void> => {
    let arrCourseLookup: LookupDTO[] = [];
    const { error, data } = await getCourseLookup();
    if (!error && data?.getCourseLookup) {
      arrCourseLookup = [{ id: -1, text: 'All Courses' }, ...data.getCourseLookup];
    }
    setState({ arrCourseLookup: arrCourseLookup } as StateType);
  }, [getCourseLookup]);

  useEffect(() => {
    getCourseList();
    getUserList();
  }, [getCourseList, getUserList]);

  const getData = useCallback(async (): Promise<void> => {
    try {
      setState({ isLoading: true } as StateType);
      let arrStudentAttendanceDTO: StudentAttendanceDTO[] = [];

      const { error, data } = await getAttendanceLearnerBulk({
        variables: {
          from_date: state.dtoStudentAttendance.attendance_time,
          to_date: state.dtoStudentAttendance.attendance_time,
          learner_id: state.dtoStudentAttendance.user_id !== -1 ? state.dtoStudentAttendance.user_id : null,
          course_id: state.dtoStudentAttendance.course_id !== -1 ? state.dtoStudentAttendance.course_id : null,
          presence: state.dtoStudentAttendance.presence =='All'?null:state.dtoStudentAttendance.presence 
        }
      });
      console.log('data is a stop', data)
      if (!error && Array.isArray(data?.getAttendanceLearnerBulk)) {
        console.log('data is run', getAttendanceLearnerBulk)
        arrStudentAttendanceDTO = data.getAttendanceLearnerBulk.map((item: StudentAttendanceDTO, index: number) => ({
          ...item,
          id: item.id != null ? parseInt(item.id.toString()) : Date.now() + index
        }));
      }

      setState({
        arrStudentAttendanceDTO: arrStudentAttendanceDTO,
        isLoading: false,
        arrSelectedId: []
      } as unknown as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getAttendanceLearnerBulk, state.dtoStudentAttendance]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if (
      state.arrPresenceLookup.length > 0 &&
      !state.dtoStudentAttendance.presence
    ) {
      const firstItem = state.arrPresenceLookup[0];
      setState({
        ...state,
        dtoStudentAttendance: {
          ...state.dtoStudentAttendance,
          presence: firstItem.text, // or firstItem.id if you store status by id
        }
      });
    }
  }, [state.arrPresenceLookup]);

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

  const onDateTimeChange = useCallback(
    async (value: any): Promise<void> => {
      setState({ dtoStudentAttendance: { ...state.dtoStudentAttendance, attendance_time: value } } as StateType);
    },
    [state.dtoStudentAttendance]
  );


  const onPresenceChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoStudentAttendance: {
          ...state.dtoStudentAttendance,
          presence: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoStudentAttendance]
  );

  const validateAttendanceTime = useCallback(async () => {
    const time = state.dtoStudentAttendance.attendance_time;
    if (!time || isNaN(new Date(time).getTime())) {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoStudentAttendance?.attendance_time]);

  const onAttendanceTimeBlur = useCallback(async () => {
    const attendance_time = await validateAttendanceTime();
    setState({ errorMessages: { ...state.errorMessages, attendance_time: attendance_time } } as StateType);
  }, [validateAttendanceTime, state.errorMessages]);

  const validatePresence = useCallback(async () => {
    if (state.dtoStudentAttendance.presence.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoStudentAttendance.presence]);

  const onPresenceBlur = useCallback(async () =>
  //event: React.FocusEvent<HTMLInputElement>
  {
    const presence = await validatePresence();
    setState({ errorMessages: { ...state.errorMessages, presence: presence } } as StateType);
  }, [validatePresence, state.errorMessages]);



  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = {} as ErrorMessageType;
    errorMessages.attendance_time = await validateAttendanceTime();
    if (errorMessages.attendance_time) {
      isFormValid = false;
    }

    errorMessages.presence = await validateAttendanceTime();
    if (errorMessages.presence) {
      isFormValid = false;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [validateAttendanceTime]);


  const onSaveDraftClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      const isFormValid = await validateForm();
      if (!isFormValid) {
        showSnackbar(gMessageConstants.SNACKBAR_INSERT_FAILED, 'error');
        return;
      }

      event.preventDefault();

      const selectedIds = state.arrSelectedId.map((id) => Number(id));

      const updatedRows = state.arrStudentAttendanceDTO.map((row) => {
        if (row.id && selectedIds.includes(row.id)) {
          const learner_id = state.dtoStudentAttendance.user_id;
          const learner_name = state.dtoStudentAttendance.user_name;
          const attendance_time = dayjs(state.dtoStudentAttendance.attendance_time);

          // ✅ Get live updated data from grid
          const apiRow = apiRef.current.getRow(row.id);
          const presence = apiRow?.presence ?? (row.presence || 'Present');
          const remarks = apiRow?.remarks ?? row.remarks;

          return {
            ...row,
            user_id: learner_id,
            user_name: learner_name,
            attendance_time: attendance_time,
            presence: presence, // ✅ get from live grid
            remarks: remarks,
            isSelected: true
          };
        }
        return row;
      });

      setState({
        arrStudentAttendanceDTO: updatedRows,
        arrSelectedId: []
      } as unknown as StateType);

      showSnackbar('Draft saved successfully', 'success');
      setShowSaveButton(true);
    },
    [
      state.arrStudentAttendanceDTO,
      state.arrSelectedId,
      state.dtoStudentAttendance,
      validateForm,
      showSnackbar,
      apiRef // ✅ make sure this is in the dependency array
    ]
  );

  const onMarkAttendance = useCallback(
    async (isLocked: boolean) => {
      if (state.arrSelectedId.length === 0) {
        showSnackbar('No changes to save', 'warning');
        return;
      }

      if (!(await validateForm())) return;

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
          `You are ${Math.round(distance)}m away from office. Attendance not allowed beyond ${maxAllowedDistance}m.`
        );
        return;
      }

      // ✅ STEP 1: Build updated rows with latest presence/remarks from DataGrid
      const selectedArrStudentAttendanceDTO = state.arrSelectedId.map((idStr) => {
        const rowId = Number(idStr); // Ensure type match
        const gridRow = apiRef.current.getRow(rowId); // get latest row from DataGrid

        return {
          ...gridRow,
          id: rowId,
          isSelected: true,
         remarks: gridRow.remarks ?? ''
        };
      });

      // ✅ STEP 2: Submit
      const deviceInfo = window.navigator.userAgent;

      const { data } = await addAttendanceLearnerBulk({
        variables: {
          latitude: location.lat,
          longitude: location.lng,
          distance_from_office: distance,
          is_on_campus: isOnCampusAttendance,
          device_id: deviceId,
          ip_address: ipAddress,
          device_info: deviceInfo,
          remarks: state.dtoStudentAttendance.remarks ?? '',
          is_locked: isLocked,
          rawJson: JSON.stringify(selectedArrStudentAttendanceDTO), // ✅ now filled
        },
      });

      if (data) {
        showSnackbar(gMessageConstants.SNACKBAR_INSERT_RECORD, 'success');
        getData();
        setShowSaveButton(false);
      }
    },
    [
      state.arrSelectedId,
      validateForm,
      location,
      siteConfig,
      apiRef,
      addAttendanceLearnerBulk,
      getData,
      showSnackbar,
      deviceId,
      ipAddress,
       state.dtoStudentAttendance.remarks,
    ]
  );

  const onUserNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoStudentAttendance: {
          ...state.dtoStudentAttendance,
          user_name: (value as LookupDTO).text,
          user_id: (value as LookupDTO).id
        }
      } as StateType);
    },
    [state.dtoStudentAttendance]
  );

  const onCourseNameChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoStudentAttendance: {
          ...state.dtoStudentAttendance,
          course_name: (value as LookupDTO).text,
          course_id: (value as LookupDTO).id
        }
      } as StateType);
    },
    [state.dtoStudentAttendance]
  );

  // const onCheckChange = (model: GridRowSelectionModel) => {
  //   const selectedIds = model as string[];
  //   const updatedRows = state.arrStudentAttendanceDTO.map(row => {
  //     // Agar row already presence set hai → overwrite na kare
  //     if (row.presence && row.presence !== '') {
  //       return row;
  //     }

  //     // Otherwise, update based on selection
  //     return {
  //       ...row,
  //       presence: selectedIds.includes(row.id) ? 'Present' : '' , // select → Present, unselect → blank
  //       remarks: row?.remarks ?? ''
  //     };
  //   });

  //   setState({
  //     ...state,
  //     arrSelectedId: selectedIds,
  //     arrStudentAttendanceDTO: updatedRows
  //   });
  // };

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
    onCheckChange: (model: GridRowSelectionModel) => {
      const selectedIds = model as string[];

      const selectedRowsWithPresence = selectedIds.map((id) => {
        const row = apiRef.current.getRow(id); // 🔥 gets full row including 'presence'
        return {
          id,
          presence: row?.presence ?? '',
          remarks: row?.remarks ?? '', // get presence value
        };
      });

      console.log('Selected Rows with Presence:', selectedRowsWithPresence);

      setState({ arrSelectedId: selectedIds });
    },

    onSortChange: (model: GridSortModel) => {
      const sortField = model[0]?.field || 'id';
      const sortDirection = model[0]?.sort || 'asc';
      setState({ sort_field: sortField, sort_direction: sortDirection });
    },

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
    setOpen2: () => setState({ open2: true }),
    setClose2: () => setState({ open2: false }),
    setOpen3: () => setState({ open3: true }),
    setClose3: () => setState({ open3: false }),
    onMarkAttendance,
    onSaveDraftClick,
    error,
    loading,
    onUserNameChange,
    showSaveButton,
    onDateTimeChange,
    onAttendanceTimeBlur,
    onCourseNameChange,
    onPresenceBlur,
    onPresenceChange,
  };
};

export default useStudentAttendanceList;
