import { Metadata } from 'next';
import ClientEmployeeList from './client-employee-list';
import {  GET_EMPLOYEE_LIST } from '@/app/graphql/EmpMaster';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import EmpMasterDTO from '@/app/types/EmpMasterDTO';

export const metadata: Metadata = {
  title: 'Employee'
};

export const revalidate = 0;

export default async function EmployeeListPage() {
  let arrEmpMasterDTO: EmpMasterDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_EMPLOYEE_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getEmployeeList?.employees) {
      arrEmpMasterDTO = results[0].data.getEmployeeList.employees;
    }
    if (results[0]?.data?.getEmployeeList?.total_records) {
      total_records = results[0].data.getEmployeeList.total_records;
    }
  } catch {}
  return <ClientEmployeeList arrEmpMasterDTO={arrEmpMasterDTO} total_records={total_records}></ClientEmployeeList>;
}
