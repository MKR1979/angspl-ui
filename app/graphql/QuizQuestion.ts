import gql from 'graphql-tag';
export const ADD_QUIZ_QUESTION = gql`
  mutation addQuizQuestion($quiz_id: Int, $question: String!, $status: String) {
    addQuizQuestion(addQuizQuestionInput: {quiz_id: $quiz_id, question: $question, status: $status })
  }
`;

export const UPDATE_QUIZ_QUESTION = gql`
  mutation updateQuizQuestion($id: Int!, $quiz_id: Int, $question: String!, $status: String) {
    updateQuizQuestion(
      updateQuizQuestionInput: { id: $id, quiz_id: $quiz_id, question: $question, status: $status }
    )
  }
`;

export const DELETE_QUIZ_QUESTION = gql`
  mutation deleteQuizQuestion($ids: [Int]!) {
    deleteQuizQuestion(deleteQuizQuestionInput: { ids: $ids })
  }
`;

export const QUESTION_LOOKUP = gql`
  query getQuizQuestionLookup($quiz_id: Int!) {
    getQuizQuestionLookup(quiz_id: $quiz_id) {
      id
      text
    }
  }
`;

export const QUIZ_QUESTION_LIST_ALL = gql`
  query getQuizQuestionListAll {
    getQuizQuestionListAll {
      id
      quiz_id
      quiz_name
      question
      status
    }
  }
`;

export const QUIZ_QUESTION_LIST = gql`
  query getQuizQuestionList(
    $filter_text: String
    $sort_direction: String
    $sort_field: String
    $offset: Int
    $limit: Int
  ) {
    getQuizQuestionList(
      getQuizQuestionListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      quizQuestions {
        id
        quiz_id
        quiz_name
        question
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

export const QUIZ_QUESTION_SHORTLIST = gql`
  query getQuizQuestionList(
    $filter_text: String
    $sort_direction: String
    $sort_field: String
    $offset: Int
    $limit: Int
  ) {
    getQuizQuestionList(
      getQuizQuestionListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      quizQuestions {
        id
        quiz_id
        quiz_name
        question
        status
      }
    }
  }
`;
export const GET_QUIZ_QUESTION = gql`
  query getQuizQuestion($id: Int!) {
    getQuizQuestion(getQuizQuestionInput: { id: $id}) {
      id
      quiz_id
      quiz_name
      question
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
