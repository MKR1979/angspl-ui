import gql from 'graphql-tag';
export const ADD_MEETING = gql`
  mutation addMeeting(
    $subject: String
    $start_date_time: Date
    $end_date_time: Date
    $location_id: Int
    $reminder: String
    $description: String
    $parent_type: String
    $parent_type_id: Int
    $assigned_to: Int
    $status: String
  ) {
    addMeeting(
      addMeetingInput: {
        subject: $subject
        start_date_time: $start_date_time
        end_date_time: $end_date_time
        location_id: $location_id
        reminder: $reminder
        description: $description
        parent_type: $parent_type
        parent_type_id: $parent_type_id
        assigned_to: $assigned_to
        status: $status
      }
    )
  }
`;

export const UPDATE_MEETING = gql`
  mutation updateMeeting(
    $id: Int!
    $subject: String
    $start_date_time: Date
    $end_date_time: Date
    $location_id: Int
    $reminder: String
    $description: String
    $parent_type: String
    $parent_type_id: Int
    $assigned_to: Int
    $status: String
  ) {
    updateMeeting(
      updateMeetingInput: {
        id: $id
        subject: $subject
        start_date_time: $start_date_time
        end_date_time: $end_date_time
        location_id: $location_id
        reminder: $reminder
        description: $description
        parent_type: $parent_type
        parent_type_id: $parent_type_id
        assigned_to: $assigned_to
        status: $status
      }
    )
  }
`;

export const DELETE_MEETING = gql`
  mutation deleteMeeting($ids: [Int]!) {
    deleteMeeting(deleteMeetingInput: { ids: $ids })
  }
`;

export const MEETING_LOOKUP = gql`
  query getMeetingLookup {
    getMeetingLookup {
      id
      text
    }
  }
`;

export const MEETING_LIST = gql`
  query getMeetingList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getMeetingList(
      getMeetingListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      meetings {
        id
        subject
        start_date_time
        end_date_time
        location_id
        location_name
        reminder
        description
        parent_type
        parent_type_id
        parent_type_name
        assigned_to
        assigned_to_user_name
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

export const MEETING_LIST_ALL = gql`
  query getMeetingListAll {
    getMeetingListAll {
      id
      title
      start
      end
    }
  }
`;

export const GET_MEETING = gql`
  query getMeeting($id: Int!) {
    getMeeting(getMeetingInput: { id: $id }) {
      id
      subject
      start_date_time
      end_date_time
      location_id
      location_name
      reminder
      description
      parent_type
      parent_type_id
      parent_type_name
      assigned_to
      assigned_to_user_name
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
