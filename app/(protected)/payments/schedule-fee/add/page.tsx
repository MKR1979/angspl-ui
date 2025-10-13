import { Metadata } from 'next';
import ClientAddScheduleFee from './client-add-schedule-fee';
import ScheduleFeeDTO, { SCHEDULE_FEE } from '@/app/types/ScheduleFeeDTO';

export const metadata: Metadata = {
  title: 'Schedule Payment'
};

export const revalidate = 0;

export default function AddScheduleFeePage() {
  const dtoScheduleFee: ScheduleFeeDTO = { ...SCHEDULE_FEE };

  return <ClientAddScheduleFee dtoScheduleFee={dtoScheduleFee} />;
}
