import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import LocationDTO, { LOCATION } from '@/app/types/LocationDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_LOCATION } from '@/app/graphql/Location';
import EventDTO from '@/app/types/EventDTO';
import { defaultPageSize, SortDirectionType } from '@/app/common/Configuration';
import { GridFilterModel, GridInitialState, GridSortModel } from '@mui/x-data-grid';
import { EVENT_LIST_BY_LOCATION_ID } from '@/app/graphql/Event';
import * as gMessageConstants from '../../../../constants/messages-constants';
import { useSnackbar } from '@/app/custom-components/SnackbarProvider';
type StateType = {
  dtoLocation: LocationDTO;
  tabIndex: number;
  isLoading: boolean;
  arrEventDTO: EventDTO[];
  total_records: number;
  filter_text: string;
  sort_field: string;
  sort_direction: SortDirectionType;
  initialState: GridInitialState;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoLocation: LocationDTO;
};

const useViewLocation = ({ dtoLocation }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoLocation: dtoLocation,
    tabIndex: 0,
    isLoading: false,
    arrEventDTO: [],
    total_records: 0,
    filter_text: '',
    sort_field: 'id',
    sort_direction: 'desc',
    initialState: {
      columns: {
        columnVisibilityModel: { id: false }
      }
    },
    breadcrumbsItems: [{ label: 'Locations', href: '/locations/list' }, { label: 'View Location' }]
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
  const showSnackbar = useSnackbar();
  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: defaultPageSize
  });

  const [getLocation] = useLazyQuery(GET_LOCATION, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getEventListByLocationId] = useLazyQuery(EVENT_LIST_BY_LOCATION_ID, {
    fetchPolicy: 'network-only', // Doesn't check cache before making a network request
    variables: {
      filter_text: state.filter_text,
      sort_field: state.sort_field,
      sort_direction: state.sort_direction,
      offset: paginationModel.page * paginationModel.pageSize,
      limit: paginationModel.pageSize,
      location_id: state.dtoLocation.id
    }
  });

  const getData = useCallback(async (): Promise<void> => {
    try {
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
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getLocation, state.dtoLocation.id]);

  const getEvents = useCallback(async (): Promise<void> => {
    setState({ isLoading: true } as StateType);
    let arrEventDTO: EventDTO[] = [];
    let total_records: number = 0;
    const { error, data } = await getEventListByLocationId();
    if (!error && data?.getEventListByLocationId?.events) {
      arrEventDTO = data.getEventListByLocationId.events;
      if (data?.getEventListByLocationId?.total_records) {
        total_records = data.getEventListByLocationId.total_records;
      }
    }
    setState({
      arrEventDTO: arrEventDTO,
      total_records: total_records,
      isLoading: false
    } as StateType);
  }, [getEventListByLocationId]);

  useEffect(() => {
    if (state.dtoLocation.id > 0) {
      getData();
    }
  }, []);

  useEffect(() => {
    if (state.dtoLocation.id > 0) {
      getEvents();
    }
  }, [state.filter_text, state.sort_field, state.sort_direction, paginationModel]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/locations/edit/' + state.dtoLocation.id);
    },
    [router, state.dtoLocation.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/locations/list');
    },
    [router]
  );

  const handleTabChange = useCallback(async (event: React.SyntheticEvent<Element, Event>, newValue: number): Promise<void> => {
    setState({ tabIndex: newValue } as StateType);
  }, []);

  const onSortChange = useCallback(
    async (model: GridSortModel): Promise<void> => {
      if (model.length > 0) {
        setState({ sort_field: model[0].field, sort_direction: model[0].sort?.toString() as SortDirectionType } as StateType);
      } else {
        setState({ sort_field: state.sort_field, sort_direction: 'asc' } as StateType);
      }
      setPaginationModel({ ...paginationModel, page: 0 });
    },
    [state.sort_field, paginationModel]
  );

  const onFilterModelChange = useCallback(
    async (newFilterModel: GridFilterModel): Promise<void> => {
      let filterText = '';
      if (newFilterModel.quickFilterValues) {
        filterText = newFilterModel.quickFilterValues[0] ?? '';
      }
      setState({ filter_text: filterText } as StateType);
      setPaginationModel({ ...paginationModel, page: 0 });
    },
    [paginationModel]
  );

  return {
    state,
    onEditClick,
    onCancelClick,
    handleTabChange,
    paginationModel,
    setPaginationModel,
    onSortChange,
    onFilterModelChange
  };
};

export default useViewLocation;
