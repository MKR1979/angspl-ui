import gql from 'graphql-tag';
export const ADD_COURSE = gql`
  mutation addCourse(
    $course_name: String!
    $course_code: String
    $price: Float
    $reg_fee: Float
    $duration: Int
    $duration_unit: String
    $course_type_id: Int
    $logo_url: String
    $thumbnail: Upload
    $documents_path: String
    $documents: Upload
    $status: String
    $prev_class_marksheet: Boolean
    $is10threq: Boolean
    $is12threq: Boolean
    $isdiplomareq: Boolean
    $isgradreq: Boolean
    $ispgreq: Boolean
    $isphotoidreq: Boolean
    $is_aadhar_req: Boolean
    $is_birth_certi_req: Boolean
    $is_tc_req: Boolean
    $is_samagraid_req: Boolean
    $is_paid: Boolean
  ) {
    addCourse(
      addCourseInput: {
        course_name: $course_name
        course_code: $course_code
        price: $price
        reg_fee: $reg_fee
        duration: $duration
        duration_unit: $duration_unit
        course_type_id: $course_type_id
        logo_url: $logo_url
        documents_path: $documents_path
        documents: $documents
        thumbnail: $thumbnail
        status: $status
        prev_class_marksheet: $prev_class_marksheet
        is10threq: $is10threq
        is12threq: $is12threq
        isdiplomareq: $isdiplomareq
        isgradreq: $isgradreq
        ispgreq: $ispgreq
        isphotoidreq: $isphotoidreq
        is_aadhar_req: $is_aadhar_req
        is_birth_certi_req: $is_birth_certi_req
        is_tc_req: $is_tc_req
        is_samagraid_req: $is_samagraid_req
        is_paid: $is_paid
      }
    )
  }
`;

export const UPDATE_COURSE = gql`
  mutation updateCourse(
    $id: Int!
    $course_name: String!
    $course_code: String
    $price: Float
    $reg_fee: Float
    $duration: Int
    $duration_unit: String
    $course_type_id: Int
    $logo_url: String
    $documents_path: String
    $thumbnail: Upload
    $documents: Upload
    $status: String
    $prev_class_marksheet: Boolean
    $is10threq: Boolean
    $is12threq: Boolean
    $isdiplomareq: Boolean
    $isgradreq: Boolean
    $ispgreq: Boolean
    $isphotoidreq: Boolean
    $is_aadhar_req: Boolean
    $is_birth_certi_req: Boolean
    $is_tc_req: Boolean
    $is_samagraid_req: Boolean
    $is_paid: Boolean
  ) {
    updateCourse(
      updateCourseInput: {
        id: $id
        course_name: $course_name
        course_code: $course_code
        price: $price
        reg_fee: $reg_fee
        duration: $duration
        duration_unit: $duration_unit
        course_type_id: $course_type_id
        logo_url: $logo_url
        documents_path: $documents_path
        documents: $documents
        thumbnail: $thumbnail
        status: $status
        prev_class_marksheet: $prev_class_marksheet
        is10threq: $is10threq
        is12threq: $is12threq
        isdiplomareq: $isdiplomareq
        isgradreq: $isgradreq
        ispgreq: $ispgreq
        isphotoidreq: $isphotoidreq
        is_aadhar_req: $is_aadhar_req
        is_birth_certi_req: $is_birth_certi_req
        is_tc_req: $is_tc_req
        is_samagraid_req: $is_samagraid_req
        is_paid: $is_paid
      }
    )
  }
`;

export const DELETE_COURSE = gql`
  mutation deleteCourse($ids: [Int]!) {
    deleteCourse(deleteCourseInput: { ids: $ids })
  }
`;

export const COURSE_LOOKUP = gql`
  query getCourseLookup($group_name: String) {
    getCourseLookup(group_name: $group_name) {
      id
      text
    }
  }
`;

export const COURSE_LOOKUP_BY_USER_ID = gql`
  query getCourseByUserIdLookup($user_id: Int!, $group_name: String, $source_flag: String) {
    getCourseByUserIdLookup(getCourseByUserIdLookupInput: { user_id: $user_id, group_name: $group_name, source_flag: $source_flag }) {
      id
      text
    }
    }
`;

export const COURSE_LIST_ALL = gql`
  query getCourseListAll {
    getCourseListAll {
      id
      course_name
      course_code
      price
      reg_fee
      group_name
      duration
      duration_unit
      course_type_id
      course_type_name
      logo_url
      documents_path
      documents
      thumbnail
      status
      prev_class_marksheet
      is10threq
      is12threq
      isdiplomareq
      isgradreq
      ispgreq
      isphotoidreq
      is_aadhar_req
      is_birth_certi_req
      is_tc_req
      is_samagraid_req
      is_paid
      is_video
      is_notes
      is_code_project
      is_exam
    }
  }
`;

export const COURSE_LIST = gql`
  query getCourseList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getCourseList(
      getCourseListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      courses {
        id
        course_name
        course_code
        price
        reg_fee
        group_name
        duration
        duration_unit
        course_type_id
        course_type_name
        logo_url
        documents_path
        documents
        thumbnail
        status
        prev_class_marksheet
        is10threq
        is12threq
        isdiplomareq
        isgradreq
        ispgreq
        isphotoidreq
        is_aadhar_req
        is_birth_certi_req
        is_tc_req
        is_samagraid_req
        is_paid
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

export const COURSE_TYPE_LOOKUP = gql`
  query getCourseTypeLookup {
    getCourseTypeLookup {
      id
      text
    }
  }
`;

export const GET_COURSE = gql`
  query getCourse($id: Int!) {
    getCourse(getCourseInput: { id: $id }) {
      id
      course_name
      course_code
      price
      reg_fee
      group_name
      duration
      duration_unit
      course_type_id
      course_type_name
      logo_url
      thumbnail
      documents_path
      documents
      status
      prev_class_marksheet
      is10threq
      is12threq
      isdiplomareq
      isgradreq
      ispgreq
      isphotoidreq
      is_aadhar_req
      is_birth_certi_req
      is_tc_req
      is_samagraid_req
      is_paid
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

export const GET_COURSE_BY_USER_ID = gql`
  query getCourseByUserId($user_id: Int!) {
    getCourseByUserId(user_id: $user_id)
    { 
     id
      course_name
      course_code
      price
      reg_fee
      group_name
      duration
      duration_unit
      course_type_id
      course_type_name
      logo_url
      thumbnail
      documents_path
      documents
      status
      prev_class_marksheet
      is10threq
      is12threq
      isdiplomareq
      isgradreq
      ispgreq
      isphotoidreq
      is_aadhar_req
      is_birth_certi_req
      is_tc_req
      is_samagraid_req
      is_paid
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

export const UPLOAD_COURSE_IMAGE = gql`
  mutation singleUpload($files: [Upload]!) {
    singleUpload(files: $files) {
      filename
      mimetype
      encoding
    }
  }
`;
