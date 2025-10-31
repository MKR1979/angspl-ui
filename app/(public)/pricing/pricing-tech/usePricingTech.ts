import { useCallback, useReducer } from 'react';
import { useRouter } from 'next/navigation';

type StateType = {
  tabIndex: number;
  expandedRows: Record<string, boolean>;
};

const usePricingTech = () => {
  const INITIAL_STATE: StateType = Object.freeze({
    tabIndex: 0,
    expandedRows: {}
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
  const router = useRouter();
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

  const goToCompanyModule = (companyType: string, planType: string, paymentType: string, amount: number) => {
    router.push(
      `/company?company_type=${companyType}&plan_type=${planType}&payment_type=${paymentType}&payment_amount=${amount}`
    );
  };

  return {
    state,
    goToCompanyModule,
    handleTabChange,
    toggleRowExpansion
  };
};

export default usePricingTech;
