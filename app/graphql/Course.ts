import gql from 'graphql-tag';
export const ADD_COURSE = gql`
  mutation addCourse(
  $course_name: String!,
  $course_code: String, 
  $price: Int, 
  $duration: String, 
  $category: String, 
  $logo_url: String,  
  $documents_path: String, 
  $status: String, 
  $is10threq: Boolean, 
  $is12threq: Boolean, 
  $isgradreq: Boolean, 
  $ispgreq: Boolean, 
  $isphotoidreq: Boolean, 
  $is_paid: Boolean
  ) {
    addCourse(addCourseInput: 
    { 
    course_name: $course_name, 
    course_code: $course_code, 
    price: $price, 
    duration: $duration,
    category: $category, 
    logo_url: $logo_url, 
    documents_path: $documents_path, 
    status: $status, 
    is10threq: $is10threq, 
    is12threq: $is12threq, 
    isgradreq: $isgradreq, 
    ispgreq: $ispgreq, 
    isphotoidreq: $isphotoidreq, 
    is_paid: $is_paid 
    })
  }
`;

export const UPDATE_COURSE = gql`
  mutation updateCourse(
  $id: Int!,
  $course_name: String!, 
  $course_code: String, 
  $price: Int, 
  $duration: String, 
  $category: String, 
  $logo_url: String,  
  $documents_path: String, 
  $status: String, 
  $is10threq: Boolean, 
  $is12threq: Boolean, 
  $isgradreq: Boolean, 
  $ispgreq: Boolean, 
  $isphotoidreq: Boolean, 
  $is_paid: Boolean
  ) {
    updateCourse(updateCourseInput: 
    { 
    id: $id,
    course_name: $course_name, 
    course_code: $course_code, 
    price: $price, 
    duration: $duration, 
    category: $category, 
    logo_url: $logo_url, 
    documents_path: $documents_path, 
    status: $status, 
    is10threq: $is10threq, 
    is12threq: $is12threq, 
    isgradreq: $isgradreq, 
    ispgreq: $ispgreq, 
    isphotoidreq: $isphotoidreq, 
    is_paid: $is_paid
     })
  }
`;

export const DELETE_COURSE = gql`
  mutation deleteCourse($ids: [Int]!) {
    deleteCourse(deleteCourseInput: { ids: $ids })
  }
`;
export const COURSE_LOOKUP = gql`
  query getCourseLookup {
    getCourseLookup {
      id
      text
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
export const COURSE_LIST_ALL = gql`
  query getCourseListAll {
    getCourseListAll {
      id
      course_name
      course_code
      price
      duration
      category 
      logo_url 
      documents_path
      status 
      is10threq
      is12threq
      isgradreq
      ispgreq
      isphotoidreq   
      quiz_id 
      quiz_name
      is_paid 
      code_project_id
      code_project_title
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
        duration
        category
        logo_url
        documents_path
        status
        is10threq
        is12threq
        isgradreq
        ispgreq
        isphotoidreq      
        quiz_id 
        quiz_name
        is_paid  
        code_project_id
        code_project_title
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

export const COURSE_SHORTLIST = gql`
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
        duration
        category
        logo_url
        documents_path
        status
        is10threq
        is12threq
        isgradreq
        ispgreq
        isphotoidreq
        quiz_id 
        quiz_name
        is_paid
        code_project_id
        code_project_title   
      }
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
      duration
      category
      logo_url
      documents_path
      status
      is10threq
      is12threq
      isgradreq
      ispgreq
      isphotoidreq
      quiz_id 
      quiz_name
      is_paid 
      code_project_id
      code_project_title 
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
