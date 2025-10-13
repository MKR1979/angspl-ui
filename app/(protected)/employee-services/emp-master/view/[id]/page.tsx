import { Metadata } from 'next';
import ClientViewEmployee from './client-view-employee';
import { GET_EMPLOYEE } from '@/app/graphql/EmpMaster';
import { createServerApolloClient } from '@/app/common/utility';
import EmpMasterDTO, { EMP_MASTER } from '@/app/types/EmpMasterDTO';

export const metadata: Metadata = {
  title: 'View Employee'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewEmployeePage({ params }: Props) {
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
      dtoEmpMaster = results[0].data.getEmployee;
    }
  } catch (err) {
    console.log(JSON.stringify(err));
  }
  return <ClientViewEmployee dtoEmpMaster={dtoEmpMaster}></ClientViewEmployee>;
}
