import gql from 'graphql-tag';

export const GET_ADMISSION_SUMMARY = gql`
  query getAdmissionSummary($id: Int!, $source_flag: String!) {
    getAdmissionSummary(getAdmissionSummaryInput: { id: $id, source_flag: $source_flag }) {
      id
      course_id
      course_name
      admission_date
      first_name
      last_name
      dob
      gender
      email
      phone_no
      address
      city_name
      state_id
      state_name
      country_id
      country_name
      zip_code
      aadhaar_no
      father_name
      father_phone_no
      mother_name
      mother_phone_no
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

export const GET_ADMISSION_SUMMARY_LIST = gql`
  query getAdmissionSummaryList(
    $filter_text: String
    $sort_direction: String
    $sort_field: String
    $offset: Int
    $limit: Int
    $source_flag: String!
    $from_date: Date
    $to_date: Date
    $user_id: Int
    $course_id: Int
  ) {
    getAdmissionSummaryList(
      getAdmissionSummaryListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
        source_flag: $source_flag
        from_date: $from_date
        to_date: $to_date
        user_id: $user_id
        course_id: $course_id
      }
    ) {
      total_records
      admissionSummaries {
        id
        course_id
        course_name
        admission_date
        first_name
        last_name
        dob
        gender
        email
        phone_no
        address
        city_name
        state_id
        state_name
        country_id
        country_name
        zip_code
        aadhaar_no
        father_name
        father_phone_no
        mother_name
        mother_phone_no
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
