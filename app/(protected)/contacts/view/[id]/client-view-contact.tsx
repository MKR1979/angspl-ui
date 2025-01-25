'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewContact from './useViewContact';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import ContactDTO from '@/app/types/ContactDTO';
import MyTabs from '@/app/custom-components/MyTabs';
import MyTab from '@/app/custom-components/MyTab';
import MyTabPanel from '@/app/custom-components/MyTabPanel';
import MyDescriptionTwoToneIcon from '@/app/custom-components/MyDescriptionTwoToneIcon';
import MyHistoryIcon from '@/app/custom-components/MyHistoryIcon';
import { textToHTML } from '@/app/common/Configuration';
import MyTimestamp from '@/app/custom-components/MyTimestamp';

type Props = {
  dtoContact: ContactDTO;
};

const ClientViewContact = ({ dtoContact }: Props) => {
  const { state, onEditClick, onCancelClick, handleTabChange } = useViewContact({ dtoContact });

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
                <MyTypography variant="subtitle2">First Name:</MyTypography>
                <MyTypography>{state.dtoContact.first_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Last Name:</MyTypography>
                <MyTypography>{state.dtoContact.last_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Office Phone #:</MyTypography>
                <MyTypography>{state.dtoContact.office_phone_no}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Mobile #:</MyTypography>
                <MyTypography>{state.dtoContact.mobile_no}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">E-Mail:</MyTypography>
                <MyTypography>{state.dtoContact.email}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Fax #:</MyTypography>
                <MyTypography>{state.dtoContact.fax_no}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Job Title:</MyTypography>
                <MyTypography>{state.dtoContact.job_title_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Department:</MyTypography>
                <MyTypography>{state.dtoContact.department_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Account Name:</MyTypography>
                <MyTypography>{state.dtoContact.account_name}</MyTypography>
              </MyGrid>

              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Assigned To:</MyTypography>
                <MyTypography>{state.dtoContact.assigned_to_user_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Lead Source:</MyTypography>
                <MyTypography>{state.dtoContact.lead_source_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Reports To:</MyTypography>
                <MyTypography>{state.dtoContact.reports_to_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Description:</MyTypography>
                <MyTypography component="div">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: textToHTML(state.dtoContact.description)
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
                      __html: textToHTML(state.dtoContact.primary_address)
                    }}
                  ></div>
                </MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">City:</MyTypography>
                <MyTypography>{state.dtoContact.primary_city_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">State:</MyTypography>
                <MyTypography>{state.dtoContact.primary_state_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Country:</MyTypography>
                <MyTypography>{state.dtoContact.primary_country_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Zip Code:</MyTypography>
                <MyTypography>{state.dtoContact.primary_zip_code}</MyTypography>
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
                      __html: textToHTML(state.dtoContact.other_address)
                    }}
                  ></div>
                </MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">City:</MyTypography>
                <MyTypography>{state.dtoContact.other_city_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">State:</MyTypography>
                <MyTypography>{state.dtoContact.other_state_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Country:</MyTypography>
                <MyTypography>{state.dtoContact.other_country_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Zip Code:</MyTypography>
                <MyTypography>{state.dtoContact.other_zip_code}</MyTypography>
              </MyGrid>
            </MyGrid>
          </MyTabPanel>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoContact.created_by_user_name}
          createdAt={state.dtoContact.created_at}
          modifiedBy={state.dtoContact.modified_by_user_name}
          modifiedAt={state.dtoContact.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          <MyButton onClick={onEditClick}>Edit</MyButton>
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewContact, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
