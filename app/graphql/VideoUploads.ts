import gql from 'graphql-tag';
export const ADD_VIDEO_UPLOADS = gql`
  mutation addVideoUploads(
    $course_id: Int
    $title: String
    $video_source: String
    $description: String
    $tags: String
    $status: String
  ) {
    addVideoUploads(
      addVideoUploadsInput: {
        course_id: $course_id
        title: $title
        video_source: $video_source
        description: $description
        tags: $tags
        status: $status
      }
    )
  }
`;

export const UPDATE_VIDEO_UPLOADS = gql`
  mutation updateVideoUploads(
    $id: Int!
    $course_id: Int
    $title: String
    $video_source: String
    $description: String
    $tags: String
    $status: String
  ) {
    updateVideoUploads(
      updateVideoUploadsInput: {
        id: $id
        course_id: $course_id
        title: $title
        video_source: $video_source
        description: $description
        tags: $tags
        status: $status
      }
    )
  }
`;

export const DELETE_VIDEO_UPLOADS = gql`
  mutation deleteVideoUploads($ids: [Int]!) {
    deleteVideoUploads(deleteVideoUploadsInput: { ids: $ids })
  }
`;
export const VIDEO_UPLOADS_LOOKUP = gql`
  query getVideoUploadsLookup {
    getVideoUploadsLookup {
      id
      text
    }
  }
`;

export const VIDEO_UPLOADS_LIST_ALL = gql`
  query getVideoUploadsListAll {
    getVideoUploadsListAll {
      id
      course_id
      course_name
      title
      video_source
      description
      tags
      status
    }
  }
`;

export const VIDEO_UPLOADS_LIST = gql`
  query getVideoUploadsList(
    $filter_text: String
    $sort_direction: String
    $sort_field: String
    $offset: Int
    $limit: Int
  ) {
    getVideoUploadsList(
      getVideoUploadsListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      videoUploads {
        id
        course_id
        course_name
        title
        video_source
        description
        tags
        status
        created_by
        created_by_first_name
        created_by_last_name
        created_by_user_name
        created_at
        modified_by
        modified_by_first_name
        modified_by_last_name
        modified_by_user_name
        modified_at
      }
    }
  }
`;

export const VIDEO_UPLOADS_SHORTLIST = gql`
  query getVideoUploadsList(
    $filter_text: String
    $sort_direction: String
    $sort_field: String
    $offset: Int
    $limit: Int
  ) {
    getVideoUploadsList(
      getVideoUploadsListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      videoUploads {
        id
        course_id
        course_name
        title
        video_source
        description
        tags
        status
      }
    }
  }
`;
export const GET_VIDEO_UPLOADS = gql`
  query getVideoUploads($id: Int!) {
    getVideoUploads(getVideoUploadsInput: { id: $id }) {
      id
      course_id
      course_name
      title
      video_source
      description
      tags
      status
      created_by
      created_by_first_name
      created_by_last_name
      created_by_user_name
      created_at
      modified_by
      modified_by_first_name
      modified_by_last_name
      modified_by_user_name
      modified_at
    }
  }
`;

export const GET_VIDEO_UPLOADS_ALL = gql`
  query getVideoUploadsAll {
    getVideoUploadsAll {
      id
      course_id
      course_name
      title
      video_source
      description
      tags
      status
    }
  }
`;
