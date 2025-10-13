import gql from 'graphql-tag';
export const ADD_EVENT = gql`
  mutation addEvent(
    $event_name: String
    $start_date_time: Date
    $end_date_time: Date
    $currency_id: Int
    $budget: Float
    $description: String
    $location_id: Int
    $email_template_id: Int
    $assigned_to: Int
    $status: String
  ) {
    addEvent(
      addEventInput: {
        event_name: $event_name
        start_date_time: $start_date_time
        end_date_time: $end_date_time
        currency_id: $currency_id
        budget: $budget
        description: $description
        location_id: $location_id
        email_template_id: $email_template_id
        assigned_to: $assigned_to
        status: $status
      }
    )
  }
`;

export const UPDATE_EVENT = gql`
  mutation updateEvent(
    $id: Int!
    $event_name: String
    $start_date_time: Date
    $end_date_time: Date
    $currency_id: Int
    $budget: Float
    $description: String
    $location_id: Int
    $email_template_id: Int
    $assigned_to: Int
     $status: String
  ) {
    updateEvent(
      updateEventInput: {
        id: $id
        event_name: $event_name
        start_date_time: $start_date_time
        end_date_time: $end_date_time
        currency_id: $currency_id
        budget: $budget
        description: $description
        location_id: $location_id
        email_template_id: $email_template_id
        assigned_to: $assigned_to
         status: $status
      }
    )
  }
`;

export const DELETE_EVENT = gql`
  mutation deleteEvent($ids: [Int]!) {
    deleteEvent(deleteEventInput: { ids: $ids })
  }
`;

export const EVENT_LOOKUP = gql`
  query getEventLookup {
    getEventLookup {
      id
      text
    }
  }
`;

export const EVENT_LIST = gql`
  query getEventList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getEventList(
      getEventListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      events {
        id
        event_name
        start_date_time
        end_date_time
        currency_id
        currency_name
        currency_symbol
        budget
        description
        location_id
        location_name
        email_template_id
        email_template_name
        assigned_to
        status
        assigned_to_user_name
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

export const EVENT_LIST_BY_LOCATION_ID = gql`
  query getEventListByLocationId(
    $filter_text: String
    $sort_direction: String
    $sort_field: String
    $offset: Int
    $limit: Int
    $location_id: Int
  ) {
    getEventListByLocationId(
      getEventListByLocationIdInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
        location_id: $location_id
      }
    ) {
      total_records
      events {
        id
        event_name
        start_date_time
        end_date_time
        currency_id
        currency_name
        currency_symbol
        budget
        description
        location_id
        location_name
        email_template_id
        email_template_name
        assigned_to
        status
        assigned_to_user_name
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

export const EVENT_LIST_ALL = gql`
  query getEventListAll {
    getEventListAll {
      id
      title
      start
      end
    }
  }
`;


export const GET_EVENT = gql`
  query getEvent($id: Int!) {
    getEvent(getEventInput: { id: $id }) {
      id
      event_name
      start_date_time
      end_date_time
      currency_id
      currency_name
      currency_symbol
      budget
      description
      location_id
      location_name
      email_template_id
      email_template_name
      assigned_to
      status
      assigned_to_user_name
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
