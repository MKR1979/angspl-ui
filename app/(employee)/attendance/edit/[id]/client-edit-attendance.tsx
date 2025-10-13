'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import AttendanceEntry from '../../attendance';
import useEditAttendance from './useEditAttendance';
import AttendanceDTO from '@/app/types/AttendanceDTO';

type Props = { dtoAttendance: AttendanceDTO };

const ClientEditAttendance = ({ dtoAttendance }: Props) => {
  const { state } = useEditAttendance();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <AttendanceEntry dtoAttendance={dtoAttendance} />
    </>
  );
};

export default memo(ClientEditAttendance, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
