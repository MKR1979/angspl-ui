'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewCourseType from './useViewCourseType';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import MyBox from '@/app/custom-components/MyBox';
import CourseTypeDTO from '@/app/types/CourseTypeDTO';
import MyTimestamp from '@/app/custom-components/MyTimestamp';
import { useSelector, RootState } from '../../../../../store';
import { findPermission } from '../../../../../common/utility-permission';

type Props = {
  dtoCourseType: CourseTypeDTO;
};

const ClientViewCourseType = ({ dtoCourseType }: Props) => {
  const { state, onEditClick, onCancelClick } = useViewCourseType({ dtoCourseType });
  const userPermissions = useSelector((state: RootState) => state.siteConfigState.userPermission);

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography>Course_Type Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoCourseType.course_type_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography>Code:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoCourseType.code}</MyTypography>
              </MyBox>
            </MyGrid>
             <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography>Group_Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoCourseType.group_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography>Status:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoCourseType.status}</MyTypography>
              </MyBox>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoCourseType.created_by_user_name}
          createdAt={state.dtoCourseType.created_at}
          modifiedBy={state.dtoCourseType.modified_by_user_name}
          modifiedAt={state.dtoCourseType.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          {findPermission(userPermissions, 88) && <MyButton onClick={onEditClick}>Edit</MyButton>}
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewCourseType, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
