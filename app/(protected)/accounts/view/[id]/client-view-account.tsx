'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewAccount from './useViewAccount';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import AccountDTO from '@/app/types/AccountDTO';
import MyTabs from '@/app/custom-components/MyTabs';
import MyTab from '@/app/custom-components/MyTab';
import MyTabPanel from '@/app/custom-components/MyTabPanel';
import MyDescriptionTwoToneIcon from '@/app/custom-components/MyDescriptionTwoToneIcon';
import MyHistoryIcon from '@/app/custom-components/MyHistoryIcon';
import { textToHTML } from '@/app/common/Configuration';
import MyTimestamp from '@/app/custom-components/MyTimestamp';

type Props = {
  dtoAccount: AccountDTO;
};

const ClientViewAccount = ({ dtoAccount }: Props) => {
  const { state, onEditClick, onCancelClick, handleTabChange } = useViewAccount({ dtoAccount });

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyTabs value={state.tabIndex} onChange={handleTabChange}>
            <MyTab icon={<MyDescriptionTwoToneIcon />} label="Primary Information" />
            <MyTab icon={<MyHistoryIcon />} label="Billing Address" />
            <MyTab icon={<MyHistoryIcon />} label="Shipping Address" />
          </MyTabs>
          <MyTabPanel value={state.tabIndex} index={0}>
            <MyGrid container spacing={2}>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Account Name:</MyTypography>
                <MyTypography>{state.dtoAccount.account_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Website:</MyTypography>
                <MyTypography>{state.dtoAccount.website}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">E-Mail:</MyTypography>
                <MyTypography>{state.dtoAccount.email}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Phone #:</MyTypography>
                <MyTypography>{state.dtoAccount.phone_no}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Fax #:</MyTypography>
                <MyTypography>{state.dtoAccount.fax_no}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Assigned To:</MyTypography>
                <MyTypography>{state.dtoAccount.assigned_to_user_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Account Type:</MyTypography>
                <MyTypography>{state.dtoAccount.account_type_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Industry:</MyTypography>
                <MyTypography>{state.dtoAccount.industry_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Annual Revenue:</MyTypography>
                <MyTypography>{state.dtoAccount.annual_revenue ? Number(state.dtoAccount.annual_revenue) : ''}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Head Count:</MyTypography>
                <MyTypography>{state.dtoAccount.head_count ? Number(state.dtoAccount.head_count) : ''}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Description:</MyTypography>
                <MyTypography component="div">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: textToHTML(state.dtoAccount.description)
                    }}
                  ></div>
                </MyTypography>
              </MyGrid>
            </MyGrid>
          </MyTabPanel>
          <MyTabPanel value={state.tabIndex} index={1}>
            <MyGrid container spacing={2}>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Address:</MyTypography>
                <MyTypography component="div">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: textToHTML(state.dtoAccount.billing_address)
                    }}
                  ></div>
                </MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">City:</MyTypography>
                <MyTypography>{state.dtoAccount.billing_city_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">State:</MyTypography>
                <MyTypography>{state.dtoAccount.billing_state_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Country:</MyTypography>
                <MyTypography>{state.dtoAccount.billing_country_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Zip Code:</MyTypography>
                <MyTypography>{state.dtoAccount.billing_zip_code}</MyTypography>
              </MyGrid>
            </MyGrid>
          </MyTabPanel>
          <MyTabPanel value={state.tabIndex} index={2}>
            <MyGrid container spacing={2}>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Address:</MyTypography>
                <MyTypography component="div">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: textToHTML(state.dtoAccount.shipping_address)
                    }}
                  ></div>
                </MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">City:</MyTypography>
                <MyTypography>{state.dtoAccount.shipping_city_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">State:</MyTypography>
                <MyTypography>{state.dtoAccount.shipping_state_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Country:</MyTypography>
                <MyTypography>{state.dtoAccount.shipping_country_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Zip Code:</MyTypography>
                <MyTypography>{state.dtoAccount.shipping_zip_code}</MyTypography>
              </MyGrid>
            </MyGrid>
          </MyTabPanel>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoAccount.created_by_user_name}
          createdAt={state.dtoAccount.created_at}
          modifiedBy={state.dtoAccount.modified_by_user_name}
          modifiedAt={state.dtoAccount.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          <MyButton onClick={onEditClick}>Edit</MyButton>
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewAccount, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
