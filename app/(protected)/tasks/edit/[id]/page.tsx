import { Metadata } from 'next';
import ClientEditTask from './client-edit-task';
import { GET_TASK } from '@/app/graphql/Task';
import { createServerApolloClient } from '@/app/common/utility';
import TaskDTO, { TASK } from '@/app/types/TaskDTO';
import LookupDTO from '@/app/types/LookupDTO';
import { USER_LOOKUP } from '@/app/graphql/User';
import { CONTACT_LOOKUP1 } from '@/app/graphql/Contact';

export const metadata: Metadata = {
  title: 'Edit Task'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditTaskPage({ params }: Props) {
  const { id } = await params;
  let dtoTask: TaskDTO = TASK;
  let arrContactLookup: LookupDTO[] = [];
  let arrAssignedToLookup: LookupDTO[] = [];
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_TASK,
      variables: {
        id: parseInt(id)
      }
    });
    const result1 = apolloClient.query({
      query: CONTACT_LOOKUP1
    });
    const result2 = apolloClient.query({
      query: USER_LOOKUP
    });
    const results = await Promise.all([result, result1, result2]);
    if (results[0]?.data?.getTask) {
      dtoTask = results[0].data.getTask;
    }
    if (results[1]?.data?.getContactLookup1) {
      arrContactLookup = results[1].data.getContactLookup1;
    }
    if (results[2]?.data?.getUserLookup) {
      arrAssignedToLookup = results[2].data.getUserLookup;
    }
  } catch {}
  return <ClientEditTask dtoTask={dtoTask} arrContactLookup={arrContactLookup} arrAssignedToLookup={arrAssignedToLookup} />;
}
