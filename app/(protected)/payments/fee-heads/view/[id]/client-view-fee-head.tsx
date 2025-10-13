'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import MyBox from '@/app/custom-components/MyBox';
import FeeHeadDTO from '@/app/types/FeeHeadDTO';
import useViewFeeHead from './useViewFeeHead';
import MyDivider from '@/app/custom-components/MyDivider';
import MyTimestamp from '@/app/custom-components/MyTimestamp';

type Props = {
  dtoFeeHead: FeeHeadDTO;
}
const ClientViewFeeHead = ({ dtoFeeHead }: Props) => {
  const {
    state,
    onCancelClick,
    onEditClick,
  } = useViewFeeHead({ dtoFeeHead });

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography> Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoFeeHead.name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography>Category:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoFeeHead.category_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography>Code:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoFeeHead.code}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography>description:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoFeeHead.description}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography>is_mandatory</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoFeeHead.is_mandatory ? 'True' : 'False'}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography>Base Amount:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoFeeHead.base_amount}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography>Status:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoFeeHead.status}</MyTypography>
              </MyBox>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
          <MyDivider />
        <MyTimestamp
          createdBy={state.dtoFeeHead.created_by_user_name}
          createdAt={state.dtoFeeHead.created_at}
          modifiedBy={state.dtoFeeHead.modified_by_user_name}
          modifiedAt={state.dtoFeeHead.modified_at}
        />
                  <MyCardActions>
            {<MyButton onClick={onEditClick}>Edit</MyButton>}
            <MyButton onClick={onCancelClick}>Cancel</MyButton>
          </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewFeeHead, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});


