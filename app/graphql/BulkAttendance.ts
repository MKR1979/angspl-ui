import gql from 'graphql-tag';

export const ADD_ATTENDANCE_BULK = gql`
  mutation addAttendanceBulk(
  $device_id: String,
  $latitude: Float, 
  $longitude: Float, 
  $distance_from_office: Float,  
  $is_on_campus: Boolean, 
  $device_info: String, 
  $ip_address: String, 
  $remarks: String, 
  $is_locked: Boolean,
  $rawJson: String!,
  ) {
    addAttendanceBulk(addAttendanceBulkInput: 
    { 
    device_id: $device_id, 
    latitude: $latitude,
    longitude: $longitude, 
    distance_from_office: $distance_from_office, 
    is_on_campus: $is_on_campus, 
    device_info: $device_info, 
    ip_address: $ip_address, 
    remarks: $remarks, 
    is_locked: $is_locked,
    rawJson: $rawJson
    })
  }
`;

export const LOCK_ATTENDANCE_BULK = gql`
  mutation lockAttendanceBulk($ids: [Int]!, $from_date: Date, $to_date: Date) {
    lockAttendanceBulk(lockAttendanceInput: { ids: $ids, from_date: $from_date, to_date: $to_date })
  }
`;


export const UPDATE_BULK_ATTENDANCE = gql`
  mutation updateBulkAttendance($id: Int!, $user_id: Int, $name: String, $time_in: String, $time_out: String, $attendance_time: Date) {
    updateBulkAttendance(
      updateBulkAttendanceInput: {
        id: $id
        user_id: $user_id
        name: $name
        time_in: $time_in
        time_out: $time_out
        attendance_time: $attendance_time
      }
    )
  }
`;

export const DELETE_BULK_ATTENDANCE = gql`
  mutation deleteAttendance($ids: [Int]!) {
    deleteAttendance(deleteAttendanceInput: { ids: $ids })
  }
`;

export const VERIFY_BULK_ATTENDANCE = gql`
  mutation verifyAttendance($ids: [Int]!) {
    verifyAttendance(verifyAttendanceInput: { ids: $ids })
  }
`;

export const BULK_ATTENDANCE_LIST = gql`
  query getBulkAttendanceList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getBulkAttendanceList(
      getBulkAttendanceListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      attendances {
        id
        user_id
        name
        time_in
        time_out
        attendance_time
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

export const ATTENDANCE_REVIEW_LIST = gql`
  query getAttendanceReviewList(
    $filter_text: String
    $sort_direction: String
    $sort_field: String
    $offset: Int
    $limit: Int
    $from_date: Date
    $to_date: Date
    $user_id: Int
  ) {
    getAttendanceReviewList(
      getAttendanceReviewListInput: {
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
      attendances {
        id
        name
        entry_type
        attendance_time
        latitude
        longitude
        distance_from_office
        is_on_campus
        device_info
        ip_address
        remarks
        is_verified
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

export const GET_BULK_ATTENDANCE = gql`
  query getBulkAttendance($id: Int!) {
    getBulkAttendance(getBulkAttendanceInput: { id: $id }) {
      id
      user_id
      name
      time_in
      time_out
      attendance_time
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

export const BULK_ATTNDANCE_LIST = gql`
  query getBulkAttendanceList(
    $filter_text: String
    $sort_direction: String
    $sort_field: String
    $offset: Int
    $limit: Int
    $from_date: Date
    $to_date: Date
    $user_id: Int
  ) {
    getBulkAttendanceList(
      getBulkAttendanceListInput: {
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
      referrals {
        id
        user_id
        name
        time_in
        time_out
        attendance_time
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


export const GET_ATTENDANCE_BULK = gql`
  query getAttendanceBulk($from_date: Date, $to_date: Date, $user_id: Int, $source_flag: String ) {
    getAttendanceBulk(getAttendanceBulkInput: { from_date: $from_date, to_date: $to_date, user_id: $user_id, source_flag: $source_flag }) {
      attendance_time
      user_id
      user_name
      time_in
      time_out
      total_hours
      distance_from_office 
      device_id
      ip_address
      remarks
    }
  }
`;