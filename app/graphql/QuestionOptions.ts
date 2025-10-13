import gql from 'graphql-tag';
export const ADD_QUESTION_OPTIONS = gql`
  mutation addQuestionOptions($quiz_id: Int!, $question_id: Int, $option_text: String, $explanation: String, $is_correct: Boolean) {
    addQuestionOptions(
      addQuestionOptionsInput: {
        quiz_id: $quiz_id
        question_id: $question_id
        option_text: $option_text
        explanation: $explanation
        is_correct: $is_correct
      }
    )
  }
`;

export const UPDATE_QUESTION_OPTIONS = gql`
  mutation updateQuestionOptions(
    $id: Int!
    $quiz_id: Int!
    $question_id: Int
    $option_text: String
    $explanation: String
    $is_correct: Boolean
  ) {
    updateQuestionOptions(
      updateQuestionOptionsInput: {
        id: $id
        quiz_id: $quiz_id
        question_id: $question_id
        option_text: $option_text
        explanation: $explanation
        is_correct: $is_correct
      }
    )
  }
`;

export const DELETE_QUESTION_OPTIONS = gql`
  mutation deleteQuestionOptions($ids: [Int]!) {
    deleteQuestionOptions(deleteQuestionOptionsInput: { ids: $ids })
  }
`;

export const QUESTION_OPTIONS_LOOKUP = gql`
  query getQuestionOptionsLookup($question_id: Int!) {
    getQuestionOptionsLookup(question_id: $question_id) {
      id
      text
    }
  }
`;

export const QUESTION_OPTIONS_LIST = gql`
  query getQuestionOptionsList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getQuestionOptionsList(
      getQuestionOptionsListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      questionOptions {
        id
        quiz_id
        quiz_name
        question_id
        question
        option_text
        explanation
        is_correct
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

export const QUESTION_OPTIONS_SHORTLIST = gql`
  query getQuestionOptionsList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getQuestionOptionsList(
      getQuestionOptionsListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      questionOptions {
        id
        quiz_id
        quiz_name
        question_id
        question
        option_text
        explanation
        is_correct
      }
    }
  }
`;
export const GET_QUESTION_OPTIONS = gql`
  query getQuestionOptions($id: Int!) {
    getQuestionOptions(getQuestionOptionsInput: { id: $id }) {
      id
      quiz_id
      quiz_name
      question_id
      question
      option_text
      explanation
      is_correct
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
