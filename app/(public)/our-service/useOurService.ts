import { useCallback, useReducer } from 'react';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';

type StateType = {
  breadcrumbsItems: BreadcrumbsItem[];
  tabIndex: number;
};

const useOurService = () => {
  const INITIAL_STATE: StateType = Object.freeze({
    breadcrumbsItems: [{ label: 'Our Services', href: '/Our-service/list' }, { label: 'Our Service' }],
    tabIndex: 0
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const handleTabChange = useCallback(async (event: React.SyntheticEvent<Element, Event>, newValue: number): Promise<void> => {
    setState({ tabIndex: newValue } as StateType);
  }, []);
  return {
    state,
    handleTabChange
  };
};

export default useOurService;
