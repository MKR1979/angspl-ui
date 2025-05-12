import { memo } from 'react';
import eq from 'lodash/eq';
import MyGrid from './MyGrid';
import MyBox from './MyBox';
import MyTypography from './MyTypography';
import { getLocalTime } from '../common/Configuration';
import dayjs from 'dayjs';
import MyCard from './MyCard';
import MyCardContent from './MyCardContent';

interface MyTimeStampProps {
  createdBy: string;
  createdAt: Date;
  modifiedBy: string;
  modifiedAt: Date;
}

const MyTimeStamp = ({ createdBy, createdAt, modifiedBy, modifiedAt }: MyTimeStampProps) => {
  console.log('MyTimeStamp rendered');
  return (
    <MyCard>
      <MyCardContent>
        <MyGrid container spacing={2}>
          <MyGrid size={{ xs: 12, md: 6 }}>
            <MyBox sx={{ mb: 0 }}>
              <MyTypography>Created By:</MyTypography>
              <MyTypography variant="subtitle2">{createdBy}</MyTypography>
            </MyBox>
          </MyGrid>
          <MyGrid size={{ xs: 12, md: 6 }}>
            <MyBox sx={{ mb: 0 }}>
              <MyTypography>Created At:</MyTypography>
              <MyTypography variant="subtitle2">
                {dayjs(getLocalTime(createdAt)).format('MM/DD/YYYY') != '12/31/1899'
                  ? dayjs(getLocalTime(createdAt)).format('MM/DD/YYYY hh:mm:ss A')
                  : ''}
              </MyTypography>
            </MyBox>
          </MyGrid>
          <MyGrid size={{ xs: 12, md: 6 }}>
            <MyBox sx={{ mb: 0 }}>
              <MyTypography>Last Modified By:</MyTypography>
              <MyTypography variant="subtitle2">{modifiedBy}</MyTypography>
            </MyBox>
          </MyGrid>
          <MyGrid size={{ xs: 12, md: 6 }}>
            <MyBox sx={{ mb: 0 }}>
              <MyTypography>Last Modified At:</MyTypography>
              <MyTypography variant="subtitle2">
                {dayjs(getLocalTime(modifiedAt)).format('MM/DD/YYYY') != '12/31/1899'
                  ? dayjs(getLocalTime(modifiedAt)).format('MM/DD/YYYY hh:mm:ss A')
                  : ''}
              </MyTypography>
            </MyBox>
          </MyGrid>
        </MyGrid>
      </MyCardContent>
    </MyCard>
  );
};

export default memo(MyTimeStamp, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
