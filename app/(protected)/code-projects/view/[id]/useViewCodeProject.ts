import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import CodeProjectDTO from '@/app/types/CodeProjectDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_CODE_PROJECT } from '@/app/graphql/CodeProject';
type StateType = {
  dtoCodeProject: CodeProjectDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoCodeProject: CodeProjectDTO;
};

const useViewCodeProject = ({ dtoCodeProject }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoCodeProject: dtoCodeProject,
    breadcrumbsItems: [{ label: 'Code Project', href: '/code-projects/list' }, { label: 'View Code Project' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [getCodeProject] = useLazyQuery(GET_CODE_PROJECT, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getData = useCallback(async (): Promise<void> => {
    let dtoCodeProject: CodeProjectDTO = {} as CodeProjectDTO;
    const { error, data } = await getCodeProject({
      variables: {
        id: state.dtoCodeProject.id
      }
    });
    if (!error && data) {
      dtoCodeProject = data.getCodeProject;
    }
    setState({ dtoCodeProject: dtoCodeProject } as StateType);
  }, [getCodeProject, state.dtoCodeProject.id]);

  useEffect(() => {
    if (state.dtoCodeProject.id > 0) {
      getData();
    }
  }, [state.dtoCodeProject.id, getData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/code-projects/edit/' + state.dtoCodeProject.id);
    },
    [router, state.dtoCodeProject.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/code-projects/list');
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewCodeProject;