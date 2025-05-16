'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewState from './useViewState';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import MyBox from '@/app/custom-components/MyBox';
import StateDTO from '@/app/types/stateDTO';
import MyTimestamp from '@/app/custom-components/MyTimestamp';

type Props = {
  dtoState: StateDTO;
};

const ClientViewState = ({ dtoState }: Props) => {
  const { state, onEditClick, onCancelClick } = useViewState({ dtoState });

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">State Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoState.state_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">State Code:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoState.state_code}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Country Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoState.country_name}</MyTypography>
              </MyBox>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoState.created_by_user_name}
          createdAt={state.dtoState.created_at}
          modifiedBy={state.dtoState.modified_by_user_name}
          modifiedAt={state.dtoState.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          <MyButton onClick={onEditClick}>Edit</MyButton>
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewState, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
