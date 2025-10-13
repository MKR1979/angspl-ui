import gql from 'graphql-tag';
export const ADD_QUIZ = gql`
  mutation addQuiz($course_id: Int, $quiz_name: String!, $quiz_code: String, $quiz_type: String, $exam_duration: Int, $status: String) {
    addQuiz(
      addQuizInput: {
        course_id: $course_id
        quiz_name: $quiz_name
        quiz_code: $quiz_code
        quiz_type: $quiz_type
        exam_duration: $exam_duration
        status: $status
      }
    )
  }
`;

export const ADD_QUIZ_DATA = gql`
  mutation addQuizData(
    $course_id: Int
    $quiz_name: String!
    $quiz_code: String
    $quiz_type: String
    $exam_duration: Int
    $status: String
    $rawJson: String!
  ) {
    addQuizData(
      addQuizDataInput: {
        course_id: $course_id
        quiz_name: $quiz_name
        quiz_code: $quiz_code
        quiz_type: $quiz_type
        exam_duration: $exam_duration
        status: $status
        rawJson: $rawJson
      }
    )
  }
`;

export const ADD_QUIZ_RESULT = gql`
  mutation addQuizResult(
    $student_id: Int
    $course_id: Int
    $quiz_id: Int
    $total_questions: Int
    $attempted_questions: Int
    $unattempted_questions: Int
    $correct_answers: Int
    $wrong_answers: Int
    $percentage: Float
    $time_taken_seconds: Int
    $passed: Boolean
  ) {
    addQuizResult(
      addQuizResultInput: {
        student_id: $student_id
        course_id: $course_id
        quiz_id: $quiz_id
        total_questions: $total_questions
        attempted_questions: $attempted_questions
        unattempted_questions: $unattempted_questions
        correct_answers: $correct_answers
        wrong_answers: $wrong_answers
        percentage: $percentage
        time_taken_seconds: $time_taken_seconds
        passed: $passed
      }
    )
  }
`;

export const UPDATE_QUIZ = gql`
  mutation updateQuiz(
    $id: Int!
    $course_id: Int
    $quiz_name: String!
    $quiz_code: String
    $quiz_type: String
    $exam_duration: Int
    $status: String
  ) {
    updateQuiz(
      updateQuizInput: {
        id: $id
        course_id: $course_id
        quiz_name: $quiz_name
        quiz_code: $quiz_code
        quiz_type: $quiz_type
        exam_duration: $exam_duration
        status: $status
      }
    )
  }
`;

export const DELETE_QUIZ = gql`
  mutation deleteQuiz($ids: [Int]!) {
    deleteQuiz(deleteQuizInput: { ids: $ids })
  }
`;

export const QUIZ_LOOKUP = gql`
  query getQuizLookup($course_id: Int) {
    getQuizLookup(getQuizLookupInput: { course_id: $course_id }) {
      id
      text
    }
  }
`;

export const QUIZ_LIST = gql`
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
        quiz_type
        exam_duration
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

export const GET_QUIZ = gql`
  query getQuiz($id: Int!) {
    getQuiz(getQuizInput: { id: $id }) {
      id
      course_id
      course_name
      quiz_name
      quiz_code
      quiz_type
      exam_duration
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
export const QUIZ_DATALIST = gql`
  query getQuizData($id: Int!) {
    getQuizData(getQuizDataInput: { id: $id }) {
      quizData {
        id
        quiz_name
        quiz_code
        quiz_type
        exam_duration
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

export const DELETE_QUIZ_RESULT = gql`
  mutation deleteQuizResult($ids: [Int]!) {
    deleteQuizResult(deleteQuizResultInput: { ids: $ids })
  }
`;

export const QUIZ_RESULT_REVIEW_LIST = gql`
  query getQuizResultReviewList(
    $filter_text: String
    $sort_direction: String
    $sort_field: String
    $offset: Int
    $limit: Int
    $from_date: Date
    $to_date: Date
    $user_id: Int
  ) {
    getQuizResultReviewList(
      getQuizResultReviewListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
        from_date: $from_date
        to_date: $to_date
        user_id: $user_id
      }
    ) {
      total_records
      quizResults {
        id
        user_name
        course_name
        quiz_name
        quiz_code
        quiz_type
        exam_duration
        total_questions
        attempted_questions
        unattempted_questions
        correct_answers
        wrong_answers
        percentage
        time_taken_seconds
        passed
        attempt_timestamp
        created_by
        created_by_first_name
        created_by_last_name
        created_by_user_name
        created_at
      }
    }
  }
`;

export const GET_QUIZ_RESULT = gql`
  query getQuizResult($id: Int!) {
    getQuizResult(getQuizResultInput: { id: $id }) {
      id
      user_name
      course_name
      quiz_name
      quiz_code
      quiz_type
      exam_duration
      total_questions
      attempted_questions
      unattempted_questions
      correct_answers
      wrong_answers
      percentage
      time_taken_seconds
      passed
      attempt_timestamp
      created_by
      created_by_first_name
      created_by_last_name
      created_by_user_name
      created_at
    }
  }
`;
