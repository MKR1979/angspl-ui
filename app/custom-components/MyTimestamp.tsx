import { memo } from 'react';
import eq from 'lodash/eq';
import MyGrid from './MyGrid';
import MyBox from './MyBox';
import MyTypography from './MyTypography';
import dayjs from 'dayjs';
import MyCard from './MyCard';
import MyCardContent from './MyCardContent';

import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useSelector } from '../store';
dayjs.extend(utc);
dayjs.extend(timezone);

interface MyTimeStampProps {
  createdBy: string;
  createdAt: Date;
  modifiedBy: string;
  modifiedAt: Date;
}

const MyTimeStamp = ({ createdBy, createdAt, modifiedBy, modifiedAt }: MyTimeStampProps) => {
  // console.log('MyTimeStamp rendered');
  const { siteConfig } = useSelector((state: { siteConfigState: any }) => state.siteConfigState);
  const customerTimezone = siteConfig.find((c: { key: string }) => c.key === 'CUSTOMER_TIMEZONE')?.value ?? '';
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
                {dayjs(createdAt).tz(customerTimezone).format('MM/DD/YYYY') != '12/31/1899'
                  ? dayjs(createdAt).tz(customerTimezone).format('DD/MM/YYYY hh:mm A')
                  : 'N/A'}
              </MyTypography>
            </MyBox>
          </MyGrid>
          <MyGrid size={{ xs: 12, md: 6 }}>
            <MyBox sx={{ mb: 0 }}>
              <MyTypography>Last Modified By:</MyTypography>
              {/* <MyTypography variant="subtitle2">{modifiedBy}</MyTypography> */}
              <MyTypography variant="subtitle2">{modifiedBy && modifiedBy.trim() !== '' ? modifiedBy : 'N/A'}</MyTypography>
            </MyBox>
          </MyGrid>
          <MyGrid size={{ xs: 12, md: 6 }}>
            <MyBox sx={{ mb: 0 }}>
              <MyTypography>Last Modified At:</MyTypography>
              <MyTypography variant="subtitle2">
                {dayjs(modifiedAt).tz(customerTimezone).format('MM/DD/YYYY') != '12/31/1899'
                  ? dayjs(modifiedAt).tz(customerTimezone).format('DD/MM/YYYY hh:mm A')
                  : 'N/A'}
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
