import gql from 'graphql-tag';

export const UPDATE_USER_DEVICE = gql`
  mutation updateUserDevice($id: Int!, $user_id: Int, $status: String, $remarks: String) {
    updateUserDevice(updateUserDeviceInput: { id: $id, user_id: $user_id, status: $status, remarks: $remarks })
  }
`;

export const GET_USER_DEVICE = gql`
  query getUserDevice($id: Int!) {
    getUserDevice(getUserDeviceInput: { id: $id }) {
      id
      user_id
      name
      device_id
      device_info
      status
      remarks
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

export const DELETE_USER_DEVICE = gql`
  mutation deleteUserDevice($ids: [Int]!) {
    deleteUserDevice(deleteUserDeviceInput: { ids: $ids })
  }
`;

export const USER_DEVICE_LIST = gql`
  query getUserDeviceList(
    $filter_text: String
    $sort_direction: String
    $sort_field: String
    $offset: Int
    $limit: Int
    $from_date: Date
    $to_date: Date
    $user_id: Int
  ) {
    getUserDeviceList(
      getUserDeviceListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
        from_date: $from_date
        to_date: $to_date
        user_id: $user_id
      }
    ) {
      total_records
      userDevices {
        id
        user_id
        name
        device_id
        device_info
        status
        remarks
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
