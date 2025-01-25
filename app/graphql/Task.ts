import gql from 'graphql-tag';
export const ADD_TASK = gql`
  mutation addTask(
    $subject: String
    $status: String
    $start_date: Date
    $parent_type: String
    $parent_type_id: Int
    $due_date: Date
    $contact_id: Int
    $priority: String
    $description: String
    $assigned_to: Int
  ) {
    addTask(
      addTaskInput: {
        subject: $subject
        status: $status
        start_date: $start_date
        parent_type: $parent_type
        parent_type_id: $parent_type_id
        due_date: $due_date
        contact_id: $contact_id
        priority: $priority
        description: $description
        assigned_to: $assigned_to
      }
    )
  }
`;

export const UPDATE_TASK = gql`
  mutation updateTask(
    $id: Int!
    $subject: String
    $status: String
    $start_date: Date
    $parent_type: String
    $parent_type_id: Int
    $due_date: Date
    $contact_id: Int
    $priority: String
    $description: String
    $assigned_to: Int
  ) {
    updateTask(
      updateTaskInput: {
        id: $id
        subject: $subject
        status: $status
        start_date: $start_date
        parent_type: $parent_type
        parent_type_id: $parent_type_id
        due_date: $due_date
        contact_id: $contact_id
        priority: $priority
        description: $description
        assigned_to: $assigned_to
      }
    )
  }
`;

export const DELETE_TASK = gql`
  mutation deleteTask($ids: [Int]!) {
    deleteTask(deleteTaskInput: { ids: $ids })
  }
`;

export const TASK_LOOKUP = gql`
  query getTaskLookup {
    getTaskLookup {
      id
      text
    }
  }
`;

export const TASK_LIST = gql`
  query getTaskList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getTaskList(
      getTaskListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      tasks {
        id
        subject
        status
        start_date
        parent_type
        parent_type_id
        parent_type_name
        due_date
        contact_id
        contact_name
        priority
        description
        assigned_to
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

export const GET_TASK = gql`
  query getTask($id: Int!) {
    getTask(getTaskInput: { id: $id }) {
      id
      subject
      status
      start_date
      parent_type
      parent_type_id
      parent_type_name
      due_date
      contact_id
      contact_name
      priority
      description
      assigned_to
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
