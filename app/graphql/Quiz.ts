import gql from 'graphql-tag';
export const ADD_QUIZ = gql`
  mutation addQuiz(
  $course_id: Int, 
  $quiz_name: String!, 
  $quiz_code: String, 
  $status: String
  ) 
  {
  addQuiz(addQuizInput: { 
    course_id: $course_id,
    quiz_name: $quiz_name, 
    quiz_code: $quiz_code, 
    status: $status 
   }
  )
  }
`;

export const UPDATE_QUIZ = gql`
  mutation updateQuiz(
    $id: Int!,
    $course_id: Int,
    $quiz_name: String!, 
    $quiz_code: String, 
    $status: String) {
    updateQuiz(
    updateQuizInput: { 
      id: $id, 
      course_id: $course_id,
      quiz_name: $quiz_name, 
      quiz_code: $quiz_code, 
      status: $status 
      }
    )
  }
`;

export const DELETE_QUIZ = gql`
  mutation deleteQuiz($ids: [Int]!) {
    deleteQuiz(deleteQuizInput: { ids: $ids})
  }
`;

export const QUIZ_LOOKUP = gql`
  query getQuizLookup {
    getQuizLookup {
      id
      text
    }
  }
`;

export const QUIZ_LIST = gql`
  query getQuizList(
    $filter_text: String, 
    $sort_direction: String, 
    $sort_field: String, 
    $offset: Int, 
    $limit: Int
    ) 
    {
    getQuizList(
      getQuizListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) 
    {
      total_records
      quizzes {
        id
        course_id
        course_name
        quiz_name
        quiz_code
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

export const QUIZ_SHORTLIST = gql`
  query getQuizList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getQuizList(
      getQuizListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      quizzes {
        id
        course_id
        course_name
        quiz_name
        quiz_code
      }
    }
  }
`;
export const GET_QUIZ = gql`
  query getQuiz($id: Int!) {
    getQuiz(getQuizInput: { id: $id }) {
      id
      course_id
      course_name
      quiz_name
      quiz_code
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

export const GET_QUIZ_QUIZ_NAME_EXIST = gql`
  query getQuizQuizNameExist($id: Int!, $quiz_name: String!) {
    getQuizQuizNameExist(id: $id, quiz_name: $quiz_name)
  }
`;
