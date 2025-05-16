'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewCountry from './useViewCountry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import MyBox from '@/app/custom-components/MyBox';
import CountryDTO from '@/app/types/CountryDTO';
import MyTimestamp from '@/app/custom-components/MyTimestamp';

type Props = {
  dtoCountry: CountryDTO;
};

const ClientViewCountry = ({ dtoCountry }: Props) => {
  const { state, onEditClick, onCancelClick } = useViewCountry({ dtoCountry });

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography>Country Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoCountry.country_name}</MyTypography>
              </MyBox>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoCountry.created_by_user_name}
          createdAt={state.dtoCountry.created_at}
          modifiedBy={state.dtoCountry.modified_by_user_name}
          modifiedAt={state.dtoCountry.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          <MyButton onClick={onEditClick}>Edit</MyButton>
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewCountry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
