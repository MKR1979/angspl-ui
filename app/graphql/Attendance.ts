import gql from 'graphql-tag';
export const ADD_ATTENDANCE = gql`
  mutation addAttendance(
    $device_id: String
    $name: String
    $entry_type: String
    $attendance_time: Date
    $latitude: Float
    $longitude: Float
    $distance_from_office: Float
    $is_on_campus: Boolean
    $device_info: String
    $ip_address: String
    $remarks: String
  ) {
    addAttendance(
      addAttendanceInput: {
        device_id: $device_id
        name: $name
        entry_type: $entry_type
        attendance_time: $attendance_time
        latitude: $latitude
        longitude: $longitude
        distance_from_office: $distance_from_office
        is_on_campus: $is_on_campus
        device_info: $device_info
        ip_address: $ip_address
        remarks: $remarks
      }
    )
  }
`;
export const UPDATE_ATTENDANCE = gql`
  mutation updateAttendance(
    $id: Int!
    $name: String
    $entry_type: String
    $attendance_time: Date
    $latitude: Float
    $longitude: Float
    $distance_from_office: Float
    $is_on_campus: Boolean
    $device_info: String
    $ip_address: String
    $remarks: String
  ) {
    updateAttendance(
      updateAttendanceInput: {
        id: $id
        name: $name
        entry_type: $entry_type
        attendance_time: $attendance_time
        latitude: $latitude
        longitude: $longitude
        distance_from_office: $distance_from_office
        is_on_campus: $is_on_campus
        device_info: $device_info
        ip_address: $ip_address
        remarks: $remarks
      }
    )
  }
`;

export const DELETE_ATTENDANCE = gql`
  mutation deleteAttendance($ids: [Int]!) {
    deleteAttendance(deleteAttendanceInput: { ids: $ids })
  }
`;

export const VERIFY_ATTENDANCE = gql`
  mutation verifyAttendance($ids: [Int]!) {
    verifyAttendance(verifyAttendanceInput: { ids: $ids })
  }
`;

export const ATTENDANCE_LIST_ALL = gql`
  query getAttendanceListAll {
    getAttendanceListAll {
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
    }
  }
`;

export const ATTENDANCE_LIST = gql`
  query getAttendanceList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getAttendanceList(
      getAttendanceListInput: {
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

export const GET_ATTENDANCE = gql`
  query getAttendance($id: Int!) {
    getAttendance(getAttendanceInput: { id: $id }) {
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
`;

export const GET_ATTENDANCE_SUMMARY = gql`
  query getAttendanceSummary($from_date: Date, $to_date: Date, $user_id: Int) {
    getAttendanceSummary(getAttendanceSummaryInput: { from_date: $from_date, to_date: $to_date, user_id: $user_id }) {
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

export const GET_PRESENCE_SUMMARY = gql`
  query getPresenceSummary($from_date: Date, $to_date: Date, $user_id: Int, $report_type: String) {
    getPresenceSummary(
      getPresenceSummaryInput: {
        from_date: $from_date
        to_date: $to_date
        user_id: $user_id
        report_type: $report_type
      }
    ) {
      user_id
      user_name
      attendance_time
      time_in
      time_out
      total_hours
      report_type
    }
  }
`;

export const GET_ATTENDANCE_EXISTS = gql`
  query getAttendanceExist($attendance_time: Date, $entry_type: String) {
    getAttendanceExist(attendance_time: $attendance_time, entry_type: $entry_type)
  }
`;
