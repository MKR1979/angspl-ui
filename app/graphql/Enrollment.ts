import gql from 'graphql-tag';
export const ADD_ENROLLMENT = gql`
  mutation addEnrollment(
    $user_id: Int!
    $course_id: Int!
    $enrollment_date: Date
    $end_date: Date
    $paid_amount: Float
    $status: String

  ) {
    addEnrollment(
      addEnrollmentInput: {
      user_id: $user_id
      course_id: $course_id
      enrollment_date: $enrollment_date
      end_date: $end_date
      paid_amount: $paid_amount
      status: $status
      }
    )
  }
`;

export const UPDATE_ENROLLMENT = gql`
  mutation updateEnrollment(
    $id: Int!
    $user_id: Int!
    $course_id: Int!
    $enrollment_date: Date
    $end_date: Date
    $paid_amount: Float
    $status: String
  ) {
    updateEnrollment(
      updateEnrollmentInput: {
        id: $id
        user_id: $user_id
        course_id: $course_id
        enrollment_date: $enrollment_date
        end_date: $end_date
        paid_amount: $paid_amount
        status: $status

      }
    )
  }
`;

export const DELETE_ENROLLMENT = gql`
  mutation deleteEnrollment($ids: [Int]!) {
    deleteEnrollment(deleteEnrollmentInput: { ids: $ids })
  }
`;

// export const ENROLLMRNT_LOOKUP = gql`
//   query getEnrollmentLookup {
//     getEnrollmentLookup {
//       id
//       text
//     }
//   }
// `;


export const ENROLLMENT_LIST = gql`
  query getEnrollmentList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getEnrollmentList(
      getEnrollmentListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      enrollments {
        id
        user_id
        user_name 
        course_id
        course_name
        enrollment_date
        end_date   
        paid_amount
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

export const GET_ENROLLMENT_LIST = gql`
  query getEnrollmentList(
    $filter_text: String
    $sort_direction: String
    $sort_field: String
    $offset: Int
    $limit: Int
      ) {
    getEnrollmentList(
      getEnrollmentListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
         }
    ) {
      total_records
      enrollments {
        id
        user_id
        user_name
        course_id
        course_name
        enrollment_date
        end_date
        paid_amount
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

export const ENROLLMENT_LIST_ALL = gql`
  query getEnrollmentListAll {
    getEnrollmentListAll {
      id
      title
      start
      end
    }
  }
`;

export const GET_ENROLLMENT = gql`
  query getEnrollment($id: Int!) {
    getEnrollment(getEnrollmentInput: { id: $id }) {
      id
      user_id
      user_name
      course_id
      course_name
      enrollment_date
      end_date
      paid_amount
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
