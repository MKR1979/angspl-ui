'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewLead from './useViewLead';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import LeadDTO from '@/app/types/LeadDTO';
import MyTabs from '@/app/custom-components/MyTabs';
import MyTab from '@/app/custom-components/MyTab';
import MyTabPanel from '@/app/custom-components/MyTabPanel';
import MyDescriptionTwoToneIcon from '@/app/custom-components/MyDescriptionTwoToneIcon';
import MyHistoryIcon from '@/app/custom-components/MyHistoryIcon';
import { textToHTML } from '@/app/common/Configuration';
import MyTimestamp from '@/app/custom-components/MyTimestamp';

type Props = {
  dtoLead: LeadDTO;
};

const ClientViewLead = ({ dtoLead }: Props) => {
  const { state, onEditClick, onCancelClick, handleTabChange } = useViewLead({ dtoLead });

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
                <MyTypography>{state.dtoLead.first_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Last Name:</MyTypography>
                <MyTypography>{state.dtoLead.last_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Job Title:</MyTypography>
                <MyTypography>{state.dtoLead.job_title_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Department:</MyTypography>
                <MyTypography>{state.dtoLead.department_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Account Name:</MyTypography>
                <MyTypography>{state.dtoLead.account_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Office Phone #:</MyTypography>
                <MyTypography>{state.dtoLead.office_phone_no}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Mobile #:</MyTypography>
                <MyTypography>{state.dtoLead.mobile_no}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Fax #:</MyTypography>
                <MyTypography>{state.dtoLead.fax_no}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Website:</MyTypography>
                <MyTypography>{state.dtoLead.website}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">E-Mail:</MyTypography>
                <MyTypography>{state.dtoLead.email}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Description:</MyTypography>
                <MyTypography component="div">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: textToHTML(state.dtoLead.description)
                    }}
                  ></div>
                </MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Assigned To:</MyTypography>
                <MyTypography>{state.dtoLead.assigned_to_user_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Status:</MyTypography>
                <MyTypography>{state.dtoLead.status}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Lead Source:</MyTypography>
                <MyTypography>{state.dtoLead.lead_source_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Status Description:</MyTypography>
                <MyTypography component="div">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: textToHTML(state.dtoLead.status_description)
                    }}
                  ></div>
                </MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Lead Source Description:</MyTypography>
                <MyTypography component="div">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: textToHTML(state.dtoLead.lead_source_description)
                    }}
                  ></div>
                </MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Amount:</MyTypography>
                <MyTypography>{state.dtoLead.amount}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Referred By:</MyTypography>
                <MyTypography>{state.dtoLead.referred_by}</MyTypography>
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
                      __html: textToHTML(state.dtoLead.primary_address)
                    }}
                  ></div>
                </MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">City:</MyTypography>
                <MyTypography>{state.dtoLead.primary_city_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">State:</MyTypography>
                <MyTypography>{state.dtoLead.primary_state_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Country:</MyTypography>
                <MyTypography>{state.dtoLead.primary_country_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Zip Code:</MyTypography>
                <MyTypography>{state.dtoLead.primary_zip_code}</MyTypography>
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
                      __html: textToHTML(state.dtoLead.other_address)
                    }}
                  ></div>
                </MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">City:</MyTypography>
                <MyTypography>{state.dtoLead.other_city_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">State:</MyTypography>
                <MyTypography>{state.dtoLead.other_state_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Country:</MyTypography>
                <MyTypography>{state.dtoLead.other_country_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}></MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyTypography variant="subtitle2">Zip Code:</MyTypography>
                <MyTypography>{state.dtoLead.other_zip_code}</MyTypography>
              </MyGrid>
            </MyGrid>
          </MyTabPanel>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoLead.created_by_user_name}
          createdAt={state.dtoLead.created_at}
          modifiedBy={state.dtoLead.modified_by_user_name}
          modifiedAt={state.dtoLead.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          <MyButton onClick={onEditClick}>Edit</MyButton>
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewLead, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
