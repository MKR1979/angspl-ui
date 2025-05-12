import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import VideoUploadsDTO from '@/app/types/VideoUploadsDTO';
import { BreadcrumbsItem } from '@/app/custom-components/MyBreadcrumbs';
import { GET_VIDEO_UPLOADS } from '@/app/graphql/VideoUploads';
type StateType = {
  dtoVideoUploads: VideoUploadsDTO;
  breadcrumbsItems: BreadcrumbsItem[];
};

type Props = {
  dtoVideoUploads: VideoUploadsDTO;
};

const useViewVideoUploads = ({ dtoVideoUploads }: Props) => {
  const router = useRouter();
  const INITIAL_STATE: StateType = Object.freeze({
    dtoVideoUploads: dtoVideoUploads,
    breadcrumbsItems: [{ label: 'video-uploads', href: '/video-uploads/list' }, { label: 'View Video Uploads' }]
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [getVideoUploads] = useLazyQuery(GET_VIDEO_UPLOADS, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getVideoUploadsData = useCallback(async (): Promise<void> => {
    let dtoVideoUploads: VideoUploadsDTO = {} as VideoUploadsDTO;
    const { error, data } = await getVideoUploads({
      variables: {
        id: state.dtoVideoUploads.id
      }
    });
    if (!error && data) {
      dtoVideoUploads = data.getVideoUploads;
    }
    setState({ dtoVideoUploads: dtoVideoUploads } as StateType);
  }, [getVideoUploads, state.dtoVideoUploads.id]);

  useEffect(() => {
    if (state.dtoVideoUploads.id > 0) {
      getVideoUploadsData();
    }
  }, [state.dtoVideoUploads.id, getVideoUploadsData]);

  const onEditClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/video-uploads/edit/' + state.dtoVideoUploads.id);
    },
    [router, state.dtoVideoUploads.id]
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/video-uploads/list');
    },
    [router]
  );

  return {
    state,
    onEditClick,
    onCancelClick
  };
};

export default useViewVideoUploads;
