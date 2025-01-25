import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import TaskDTO from '@/app/types/TaskDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_TASK } from '@/app/graphql/Task';
type StateType = {
  dtoTask: TaskDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoTask: TaskDTO;
};

const useViewTask = ({ dtoTask }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoTask: dtoTask,
    breadcrumbsItems: [{ label: 'Tasks', href: '/tasks/list' }, { label: 'View Task' }]
  } as StateType);

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [getTask] = useLazyQuery(GET_TASK, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoTask: TaskDTO = {} as TaskDTO;
    const { error, data } = await getTask({
      variables: {
        id: state.dtoTask.id
      }
    });
    if (!error && data?.getTask) {
      dtoTask = data.getTask;
    }
    setState({ dtoTask: dtoTask } as StateType);
  }, [getTask, state.dtoTask.id]);

  useEffect(() => {
    if (state.dtoTask.id > 0) {
      getData();
    }
  }, [state.dtoTask.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/tasks/edit/' + state.dtoTask.id);
    },
    [router, state.dtoTask.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/tasks/list');
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewTask;
