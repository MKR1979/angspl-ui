import { Metadata } from 'next';
import ClientEditEmployee from './client-edit-employee';
import { GET_EMPLOYEE } from '@/app/graphql/EmpMaster';
import { createServerApolloClient } from '@/app/common/utility';
import EmpMasterDTO, { EMP_MASTER } from '@/app/types/EmpMasterDTO';

export const metadata: Metadata = {
  title: 'Edit Employee '
};
export const revalidate = 0;
type Props = { params: Promise<{ id: string }> };

export default async function EditEmployeePage({ params }: Props) {
  const { id } = await params;
  let dtoEmpMaster: EmpMasterDTO = EMP_MASTER;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_EMPLOYEE,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getEmployee) {
      dtoEmpMaster = { ...results[0].data.getEmployee };
    } else {
      console.warn('[DEBUG] No admission data found for id:', id);
    }
  } catch (error) {
    console.error('[DEBUG] Error in EditAdmissionPage:', error);
  }
  return <ClientEditEmployee dtoEmpMaster={dtoEmpMaster} />;
}
