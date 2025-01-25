import { Metadata } from 'next';
import ClientAddTask from './client-add-task';
import LookupDTO from '@/app/types/LookupDTO';
import { createServerApolloClient } from '@/app/common/utility';
import { GET_USER_MY_PROFILE, USER_LOOKUP } from '@/app/graphql/User';
import UserDTO, { USER } from '@/app/types/UserDTO';
import TaskDTO, { TASK } from '@/app/types/TaskDTO';
import { CONTACT_LOOKUP1 } from '@/app/graphql/Contact';

export const metadata: Metadata = {
  title: 'Add Task'
};

export const revalidate = 0;

export default async function AddTaskPage() {
  let arrContactLookup: LookupDTO[] = [];
  let arrAssignedToLookup: LookupDTO[] = [];
  let dtoUser: UserDTO = USER;
  const dtoTask: TaskDTO = { ...TASK };
  try {
    const apolloClient = await createServerApolloClient();

    const result = apolloClient.query({
      query: CONTACT_LOOKUP1
    });
    const result1 = apolloClient.query({
      query: USER_LOOKUP
    });
    const result2 = apolloClient.query({
      query: GET_USER_MY_PROFILE
    });
    const results = await Promise.all([result, result1, result2]);

    if (results[0]?.data?.getContactLookup1) {
      arrContactLookup = results[0].data.getContactLookup1;
    }
    if (results[1]?.data?.getUserLookup) {
      arrAssignedToLookup = results[1].data.getUserLookup;
    }
    if (results[2]?.data?.getUserMyProfile) {
      dtoUser = results[2].data.getUserMyProfile;
      dtoTask.assigned_to = dtoUser.id;
      dtoTask.assigned_to_user_name = dtoUser.user_name;
    }
  } catch (e) {
    console.log('test', JSON.stringify(e));
  }
  return <ClientAddTask dtoTask={dtoTask} arrContactLookup={arrContactLookup} arrAssignedToLookup={arrAssignedToLookup}></ClientAddTask>;
}
