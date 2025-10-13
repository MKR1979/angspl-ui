import { Metadata } from 'next';
import ClientAddFeeHead from './client-add-fee-head';
import FeeHeadDTO, { FEE_HEAD } from '@/app/types/FeeHeadDTO';

export const metadata: Metadata = {
  title: 'Add Fee Head'
};

export const revalidate = 0;

export default function AddFeeHeadPage() {
  const dtoFeeHead: FeeHeadDTO = { ...FEE_HEAD };

  return <ClientAddFeeHead dtoFeeHead={dtoFeeHead} />;
}

