import gql from 'graphql-tag';
export const ADD_INTERVIEW_QUESTIONS = gql`
  mutation addInterviewQuestions($course_id: Int, $title: String!, $description: jsonb, $status: String) {
    addInterviewQuestions(
      addInterviewQuestionsInput: {course_id: $course_id, title: $title, description: $description, status: $status }
    )
  }
`;

export const UPDATE_INTERVIEW_QUESTIONS = gql`
  mutation updateInterviewQuestions($id: Int!, $course_id: Int, $title: String!, $description: jsonb, $status: String) {
    updateInterviewQuestions(updateInterviewQuestionsInput: { id: $id, course_id: $course_id, title: $title, description: $description, status: $status })
  }
`;

export const DELETE_INTERVIEW_QUESTIONS = gql`
  mutation deleteInterviewQuestions($ids: [Int]!) {
    deleteInterviewQuestions(deleteInterviewQuestionsInput: { ids: $ids })
  }
`;

export const INTERVIEW_QUESTIONS_LIST_ALL = gql`
  query getInterviewQuestionsListAll {
    getInterviewQuestionsListAll {
      id
      course_id
      course_name
      title
      description
      status
    }
  }
`;

export const INTERVIEW_QUESTIONS_LIST = gql`
  query getInterviewQuestionsList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getInterviewQuestionsList(
      getInterviewQuestionsListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      InterviewQuestions {
        id
        course_id
        course_name
        title
        description
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

export const INTERVIEW_QUESTIONS_SHORTLIST = gql`
  query getInterviewQuestionsList( $filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getInterviewQuestionsList(
      getInterviewQuestionsListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
        InterviewQuestions {
        id
        course_id
        course_name
        title
        description
        status
      }
    }
  }
`;
export const GET_INTERVIEW_QUESTIONS = gql`
  query getInterviewQuestions($id: Int!) {
    getInterviewQuestions(getInterviewQuestionsInput: { id: $id }) {
      id
      course_id
      course_name
      title
      description
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

export const GET_INTERVIEW_QUESTIONS_ALL = gql`
  query getInterviewQuestionsAll {
    getInterviewQuestionsAll {
      id
      course_id
      course_name
      title
      description
      status
    }
  }
`;
