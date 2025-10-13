'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import AttendanceEntry from '../attendance';
import { ATTENDANCE } from '@/app/types/AttendanceDTO';
import useAddAttendance from './useAddAttendance';
const ClientAddAttendance = () => {
  const { state } = useAddAttendance();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <AttendanceEntry dtoAttendance={ATTENDANCE} />
    </>
  );
};

export default memo(ClientAddAttendance, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
