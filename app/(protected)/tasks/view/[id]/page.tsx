import { Metadata } from 'next';
import ClientViewTask from './client-view-task';
import { GET_TASK } from '@/app/graphql/Task';
import { createServerApolloClient } from '@/app/common/utility';
import TaskDTO, { TASK } from '@/app/types/TaskDTO';

export const metadata: Metadata = {
  title: 'View Task'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewTaskPage({ params }: Props) {
  const { id } = await params;
  let dtoTask: TaskDTO = TASK;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_TASK,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getTask) {
      dtoTask = results[0].data.getTask;
    }
  } catch (err) {
    console.log(JSON.stringify(err));
  }
  return <ClientViewTask dtoTask={dtoTask}></ClientViewTask>;
}
