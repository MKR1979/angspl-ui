import { useCallback, useReducer } from 'react';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';

type StateType = {
  breadcrumbsItems: BreadcrumbsItem[];
  tabIndex: number;
  expandedRows: Record<string, boolean>;
};

const usePricingSch = () => {
  const INITIAL_STATE: StateType = Object.freeze({
    breadcrumbsItems: [{ label: 'Terms', href: '/terms/list' }, { label: 'Add Term' }],
    tabIndex: 0,
    expandedRows: {}
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const toggleRowExpansion = useCallback(
    (rowKey: string) => {
      const currentExpanded = state.expandedRows?.[rowKey] ?? false;
      const updatedExpandedRows = {
        ...state.expandedRows,
        [rowKey]: !currentExpanded
      };
      setState({
        ...state,
        expandedRows: updatedExpandedRows
      });
    },
    [state]
  );

  const handleTabChange = useCallback(async (event: React.SyntheticEvent<Element, Event>, newValue: number): Promise<void> => {
    setState({ tabIndex: newValue } as StateType);
  }, []);
  return {
    state,
    handleTabChange,
    toggleRowExpansion
  };
};

export default usePricingSch;
