import gql from 'graphql-tag';
export const ADD_QUIZ_DATA = gql`
  mutation addQuizData($rawJson: String!) {
    addQuizData(addQuizDataInput: {
      rawJson: $rawJson
    })
  }
`;


export const UPDATE_QUIZ_DATA = gql`
  mutation updateQuizData($id: Int! $quiz_name: String!, $quiz_code: String, $question_id: Int, $question: String, $option_id: Int, $option_text: String, $is_correct: Boolean, $explanation: String, $status: String) {
    updateQuizData(updateQuizDataInput: { id: $id
        quiz_name: $quiz_name
        quiz_code: $quiz_code
        question_id: $question_id
        question: $question
        option_id: $option_id 
        option_text: $option_text
        is_correct: $is_correct 
        explanation: $explanation
        status: $status})
  }
`;

export const DELETE_QUIZ_DATA = gql`
  mutation deleteQuizData($ids: [Int]!) {
    deleteQuizData(deleteQuizDataInput: { ids: $ids})
  }
`;
export const QUIZ_DATA_LOOKUP = gql`
  query getQuizDataLookup {
    getQuizDataLookup {
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


export const QUIZ_DATA_LIST_ALL = gql`
  query getQuizDataListAll {
    getQuizDataListAll {
      id
      quiz_name
      quiz_code
      question_id
      question
      option_id
      option_text
      is_correct
      explanation
      status 
    }
  }
`;

export const QUIZ_DATALIST = gql`
  query getQuizData($id: Int!) {
    getQuizData(
      getQuizDataInput: {
        id: $id
      }
    ) {      
      quizData {
        id
        quiz_name
        quiz_code
        question_id
        question
        option_id
        option_text
        is_correct
        explanation
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

export const QUIZ_DATA_LIST = gql`
  query getQuizDataList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getQuizDataList(
      getQuizDataListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      quizData {
        id
        quiz_name
        quiz_code
        question_id
        question
        option_id
        option_text
        is_correct
        explanation
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

export const QUIZ_DATA_SHORTLIST = gql`
  query getQuizDataList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getQuizDataList(
      getQuizDataListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      quizData {
        id
        quiz_name
        quiz_code
        question_id
        question
        option_id
        option_text
        is_correct
        explanation
        status   
      }
    }
  }
`;
