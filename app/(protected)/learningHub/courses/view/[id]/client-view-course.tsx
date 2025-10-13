'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewCourse from './useViewcourse';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import MyBox from '@/app/custom-components/MyBox';
import courseDTO from '@/app/types/CourseDTO';
import MyTimestamp from '@/app/custom-components/MyTimestamp';
import { useSelector, RootState } from '../../../../../store';
import { findPermission } from '../../../../../common/utility-permission';
import * as Constants from '../../../../constants/constants';

type Props = {
  dtoCourse: courseDTO;
};

const ClientViewCourse = ({ dtoCourse }: Props) => {
  const { state, onEditClick, onCancelClick } = useViewCourse({ dtoCourse });
  const userPermissions = useSelector((state: RootState) => state.siteConfigState.userPermission);
  const { companyInfo } = useSelector((state) => state.globalState);
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Course Title:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoCourse.course_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Course Code:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoCourse.course_code}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Admission/Registration Fee:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoCourse.reg_fee}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Course Price:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoCourse.price}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Course Duration:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoCourse.duration}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Duration Unit:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoCourse.duration_unit}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Course Category:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoCourse.course_type_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Course Thumbnail:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoCourse.logo_url}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Supporting Documents:</MyTypography>
                <MyTypography variant="subtitle2">
                  {typeof state.dtoCourse.documents_path === 'string' ? (
                    <a href={state.dtoCourse.documents_path} target="_blank" rel="noopener noreferrer">
                      View Supporting Document
                    </a>
                  ) : (
                    'File not available'
                  )}
                </MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography>Course Status:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoCourse.status}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography>Paid Course:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoCourse.is_paid ? 'Yes' : 'No'}</MyTypography>
              </MyBox>
            </MyGrid>
            {companyInfo?.company_type === Constants.COMPANY_TYPE_COLLEGE && (
              <>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyBox sx={{ mb: 0 }}>
                    <MyTypography>10th Required:</MyTypography>
                    <MyTypography variant="subtitle2">{state.dtoCourse.is10threq ? 'Yes' : 'No'}</MyTypography>
                  </MyBox>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyBox sx={{ mb: 0 }}>
                    <MyTypography>12th Required:</MyTypography>
                    <MyTypography variant="subtitle2">{state.dtoCourse.is12threq ? 'Yes' : 'No'}</MyTypography>
                  </MyBox>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyBox sx={{ mb: 0 }}>
                    <MyTypography>Diploma Required:</MyTypography>
                    <MyTypography variant="subtitle2">{state.dtoCourse.isdiplomareq ? 'Yes' : 'No'}</MyTypography>
                  </MyBox>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyBox sx={{ mb: 0 }}>
                    <MyTypography>UG Required:</MyTypography>
                    <MyTypography variant="subtitle2">{state.dtoCourse.isgradreq ? 'Yes' : 'No'}</MyTypography>
                  </MyBox>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyBox sx={{ mb: 0 }}>
                    <MyTypography>PG Required:</MyTypography>
                    <MyTypography variant="subtitle2">{state.dtoCourse.ispgreq ? 'Yes' : 'No'}</MyTypography>
                  </MyBox>
                </MyGrid>
              </>
            )}
            {companyInfo?.company_type === Constants.COMPANY_TYPE_SCHOOL && (
              <>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyBox sx={{ mb: 0 }}>
                    <MyTypography>Previous Class Marksheet Required:</MyTypography>
                    <MyTypography variant="subtitle2">{state.dtoCourse.prev_class_marksheet ? 'Yes' : 'No'}</MyTypography>
                  </MyBox>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyBox sx={{ mb: 0 }}>
                    <MyTypography>Birth Certificate Required:</MyTypography>
                    <MyTypography variant="subtitle2">{state.dtoCourse.is_birth_certi_req ? 'Yes' : 'No'}</MyTypography>
                  </MyBox>
                </MyGrid>
              </>
            )}
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography>Photo Id Required:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoCourse.isphotoidreq ? 'Yes' : 'No'}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography>Is Aadhaar Required:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoCourse.is_aadhar_req ? 'Yes' : 'No'}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography>Transfer Certificate Required:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoCourse.is_tc_req ? 'Yes' : 'No'}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography>Samagra Id Required:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoCourse.is_samagraid_req ? 'Yes' : 'No'}</MyTypography>
              </MyBox>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoCourse.created_by_user_name}
          createdAt={state.dtoCourse.created_at}
          modifiedBy={state.dtoCourse.modified_by_user_name}
          modifiedAt={state.dtoCourse.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          {findPermission(userPermissions, 53) && <MyButton onClick={onEditClick}>Edit</MyButton>}
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewCourse, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
