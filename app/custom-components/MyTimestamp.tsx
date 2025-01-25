import { memo } from 'react';
import eq from 'lodash/eq';
import MyGrid from './MyGrid';
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
            <MyTypography variant="subtitle2">Created By:</MyTypography>
            <MyTypography>{createdBy}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, md: 6 }}>
            <MyTypography variant="subtitle2">Created At:</MyTypography>
            <MyTypography>
              {dayjs(getLocalTime(createdAt)).format('MM/DD/YYYY') != '12/31/1899'
                ? dayjs(getLocalTime(createdAt)).format('MM/DD/YYYY hh:mm:ss A')
                : ''}
            </MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, md: 6 }}>
            <MyTypography variant="subtitle2">Last Modified By:</MyTypography>
            <MyTypography>{modifiedBy}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, md: 6 }}>
            <MyTypography variant="subtitle2">Last Modified At:</MyTypography>
            <MyTypography>
              {dayjs(getLocalTime(modifiedAt)).format('MM/DD/YYYY') != '12/31/1899'
                ? dayjs(getLocalTime(modifiedAt)).format('MM/DD/YYYY hh:mm:ss A')
                : ''}
            </MyTypography>
          </MyGrid>
        </MyGrid>
      </MyCardContent>
    </MyCard>
  );
};

export default memo(MyTimeStamp, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
