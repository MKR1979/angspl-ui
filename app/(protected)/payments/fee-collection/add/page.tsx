import { Metadata } from 'next';
import ClientAddFeeCollection from './client-add-fee-collection';
import FeeCollectionDTO, { FEE_COLLECTION } from '@/app/types/FeeCollectionDTO';

export const metadata: Metadata = {
  title: 'Add Fee Collection'
};

export const revalidate = 0;

export default function AddFeeCollectionPage() {
  const dtoFeeCollection: FeeCollectionDTO = { ...FEE_COLLECTION };

  return <ClientAddFeeCollection dtoFeeCollection={dtoFeeCollection} />;
}
