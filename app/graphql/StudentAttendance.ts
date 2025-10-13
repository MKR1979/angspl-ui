import gql from 'graphql-tag';

export const ADD_ATTENDANCE_LEARNER_BULK = gql`
  mutation addAttendanceLearnerBulk(
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
    addAttendanceLearnerBulk(addAttendanceLearnerBulkInput: 
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

// export const LOCK_ATTENDANCE_BULK = gql`
//   mutation lockAttendanceBulk($ids: [Int]!, $from_date: Date, $to_date: Date) {
//     lockAttendanceBulk(lockAttendanceInput: { ids: $ids, from_date: $from_date, to_date: $to_date })
//   }
// `;


export const UPDATE_ATTENDANCE_LEARNER_BULK = gql`
  mutation updateAttendanceLearnerBulk($id: Int!, $user_id: Int, $user_name: String, $attendance_time: Date, $presence: presence) {
    updateAttendanceLearnerBulk(
      updateAttendanceLearnerBulkInput: {
        id: $id
        learner_id: $learner_id
        learner_name: $learner_name
        course_id: $course_id
        course_name: $course_name        
        attendance_time: $attendance_time
        presence: $presence
      }
    )
  }
`;


export const DELETE_LEARNER_ATTENDANCE = gql`
  mutation deleteAttendance($ids: [Int]!) {
    deleteAttendance(deleteAttendanceInput: { ids: $ids })
  }
`;

export const VERIFY_LEARNER_ATTENDANCE = gql`
  mutation verifyAttendance($ids: [Int]!) {
    verifyAttendance(verifyAttendanceInput: { ids: $ids })
  }
`;

export const ATTENDANCE_LEARNER_LIST = gql`
  query getLearnerAttendanceList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getLearnerAttendanceList(
      getLearnerAttendanceListInput: {
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
        learner_name
        attendance_time
        presence
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


export const STUDENT_ATTENDANCE_LIST_ALL = gql`
  query getStudentAttendanceList(
    $filter_text: String
    $sort_direction: String
    $sort_field: String
    $offset: Int
    $limit: Int
    $attendance_time: Date
    $user_id: Int
  ) {
    getStudentAttendanceList(
      getStudentAttendanceListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
        attendance_time: $attendance_time
        user_id: $user_id
      }
    ) {
      total_records
      referrals {
        id
        user_id
        learner_name
        attendance_time
        presence
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

export const GET_ATTENDANCE_LEARNER = gql`
  query getAttendanceLearnerBulk( $from_date: Date, $to_date: Date, $learner_id: Int, $course_id: Int, $presence: String  ) {
    getAttendanceLearnerBulk(getAttendanceBulkInput: {from_date: $from_date, to_date: $to_date, learner_id: $learner_id, course_id: $course_id, presence: $presence }) {
      id
      learner_id
      learner_name
      course_id
      course_name
      presence
      attendance_time
      latitude
      longitude
      distance_from_office
      is_on_campus
      device_id
      device_info
      ip_address
      remarks
      is_locked
      created_by
      created_at
      modified_by
      modified_at
    }
  }
`;
