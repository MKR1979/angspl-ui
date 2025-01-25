import { Metadata } from 'next';
import ClientAddStage from './client-add-stage';

export const metadata: Metadata = {
  title: 'Add Stage'
};

export const revalidate = 0;

export default async function AddStagePage() {
  return <ClientAddStage></ClientAddStage>;
}
