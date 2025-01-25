import gql from 'graphql-tag';
export const ADD_STAGE = gql`
  mutation addStage($stage_name: String!) {
    addStage(addStageInput: { stage_name: $stage_name })
  }
`;

export const UPDATE_STAGE = gql`
  mutation updateStage($id: Int!, $stage_name: String!) {
    updateStage(updateStageInput: { id: $id, stage_name: $stage_name })
  }
`;

export const DELETE_STAGE = gql`
  mutation deleteStage($ids: [Int]!) {
    deleteStage(deleteStageInput: { ids: $ids })
  }
`;

export const STAGE_LOOKUP = gql`
  query getStageLookup {
    getStageLookup {
      id
      text
    }
  }
`;

export const STAGE_LIST = gql`
  query getStageList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getStageList(
      getStageListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      stages {
        id
        stage_name
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

export const GET_STAGE = gql`
  query getStage($id: Int!) {
    getStage(getStageInput: { id: $id }) {
      id
      stage_name
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

export const GET_STAGE_STAGE_NAME_EXIST = gql`
  query getStageStageNameExist($id: Int!, $stage_name: String!) {
    getStageStageNameExist(id: $id, stage_name: $stage_name)
  }
`;
