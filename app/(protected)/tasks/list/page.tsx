import { Metadata } from 'next';
import ClientTaskList from './client-task-list';
import { TASK_LIST } from '@/app/graphql/Task';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import TaskDTO from '@/app/types/TaskDTO';
export const metadata: Metadata = {
  title: 'Opportunities'
};

export const revalidate = 0;

export default async function TaskListPage() {
  let arrTaskDTO: TaskDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: TASK_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getTaskList?.tasks) {
      arrTaskDTO = results[0].data.getTaskList.tasks;
    }
    if (results[0]?.data?.getTaskList?.total_records) {
      total_records = results[0].data.getTaskList.total_records;
    }
  } catch {}
  return <ClientTaskList arrTaskDTO={arrTaskDTO} total_records={total_records}></ClientTaskList>;
}
