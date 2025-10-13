import gql from 'graphql-tag';
export const ADD_FEE_PAYMENT = gql`
  mutation addFeePayment(
    $learner_id: Int
    $start_date: String
    $course_id: Int!
    $total_amount: Float
    $discount: Float
    $fine_amount: Float
    $status: String
  ) {
    addFeePayment(
      addFeePaymentInput: {
        learner_id: $learner_id
        start_date: $start_date
        course_id: $course_id
        total_amount: $total_amount
        discount: $discount
        fine_amount: $fine_amount
        status: $status
      }
    )
  }
`;

export const ADD_FEE_PLAN = gql`
  mutation addFeePlan(
    $course_id: Int!
    $learner_id: Int!
    $payment_frequency: String
    $start_date: String
    $discount: Float
    $fine_amount: Float
    $total_amount: Float
    $net_amount: Float
    $status: String
  ) {
    addFeePlan(
      addFeePlanInput: {
        course_id: $course_id
        learner_id: $learner_id
        payment_frequency: $payment_frequency
        start_date: $start_date
        discount: $discount
        fine_amount: $fine_amount
        total_amount: $total_amount
        net_amount: $net_amount
        status: $status
      }
    )
  }
`;

export const UPDATE_FEE_PLAN = gql`
  mutation updateFeePlan(
    $id: Int!
    $course_id: Int!
    $learner_id: Int!
    $payment_frequency: String
    $start_date: String
    $discount: Float
    $fine_amount: Float
    $total_amount: Float
    $net_amount: Float
    $status: String
  ) {
    updateFeePlan(
      updateFeePlanInput: {
        id: $id
        course_id: $course_id
        learner_id: $learner_id
        payment_frequency: $payment_frequency
        start_date: $start_date
        discount: $discount
        fine_amount: $fine_amount
        total_amount: $total_amount
        net_amount: $net_amount
        status: $status
      }
    )
  }
`;

export const GET_FEE_PLAN_REVIEW_LIST = gql`
  query getFeePlanReviewList(
    $filter_text: String
    $sort_direction: String
    $sort_field: String
    $offset: Int
    $limit: Int
    $from_date: Date
    $to_date: Date
    $course_id: Int
    $learner_id: Int
  ) {
    getFeePlanReviewList(
      getFeePlanReviewListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
        from_date: $from_date
        to_date: $to_date
        course_id: $course_id
        learner_id: $learner_id
      }
    ) {
      total_records
      feePlans {
        id
        course_id
        course_name
        learner_id
        student_name
        payment_frequency
        start_date
        discount
        fine_amount
        total_amount
        net_amount
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

export const GET_FEE_PLAN = gql`
  query getFeePlan($id: Int!) {
    getFeePlan(getFeePlanInput: { id: $id }) {
      id
      course_id
      course_name
      learner_id
      student_name
      payment_frequency
      start_date
      discount
      fine_amount
      total_amount
      net_amount
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

export const DELETE_FEE_PLAN = gql`
  mutation deleteFeePlan($ids: [Int]!) {
    deleteFeePlan(deleteFeePlanInput: { ids: $ids })
  }
`;

export const GET_FEE_PLAN_BREAKUP = gql`
  query getFeePlanBreakup($fee_plan_id: Int!) {
    getFeePlanBreakup(getFeePlanBreakupInput: { fee_plan_id: $fee_plan_id }) {
      id
      course_id
      course_name
      learner_id
      student_name
      payment_frequency
      fee_cycle_code
      fee_year
      fee_amount
      is_paid
      payment_mode
      receipt_number
      due_date
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

export const GET_FEE_PAY_BREAKUP = gql`
  query getFeePlanBreakup($learner_id: Int!) {
    getFeePlanBreakup(getFeePlanBreakupInput: { learner_id: $learner_id }) {
      id
      course_id
      course_name
      learner_id
      student_name
      payment_frequency
      fee_cycle_code
      fee_year
      fee_amount
      is_paid
      payment_mode
      receipt_number
      due_date
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

export const GET_FEE_PAID_LIST = gql`
  query getFeePaidList($learner_id: Int!) {
    getFeePaidList(getFeePaidInput: { learner_id: $learner_id }) {
      id
      course_id
      course_name
      learner_id
      student_name
      payment_date
      payment_frequency
      fee_cycle_code
      fee_year
      fee_amount
      is_paid
      payment_mode
      receipt_number
      due_date
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

export const GET_DUE_PAY_LIST = gql`
  query getDuePayList($learner_id: Int!) {
    getDuePayList(getDuePayInput: { learner_id: $learner_id }) {
      id
      course_id
      course_name
      learner_id
      student_name
      payment_frequency
      fee_cycle_code
      fee_year
      fee_amount
      is_paid
      payment_mode
      receipt_number
      due_date
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

export const GET_FEE_PAYMENT_REVIEW_LIST = gql`
  query getFeePaymentReviewList(
    $filter_text: String
    $sort_direction: String
    $sort_field: String
    $offset: Int
    $limit: Int
    $from_date: Date
    $to_date: Date
    $course_id: Int
    $learner_id: Int
  ) {
    getFeePaymentReviewList(
      getFeePaymentReviewListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
        from_date: $from_date
        to_date: $to_date
        course_id: $course_id
        learner_id: $learner_id
      }
    ) {
      total_records
      feePayments {
        id
        payment_id
        admission_id
        student_name
        learner_id
        user_name
        course_id
        course_name
        start_date
        total_amount
        status
        payment_date
        transaction_id
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

export const FEE_PAYMENT_LIST = gql`
  query getFeePaymentList($id: Int!) {
    getFeePaymentList(getFeePaymentListInput: { id: $id }) {
      id
      payment_id
      admission_id
      student_name
      course_id
      course_name
      learner_id
      user_name
      start_date
      total_amount
      status
      payment_date
      transaction_id
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

export const GET_FEE_PAYMENT = gql`
  query getFeePayment($id: Int!) {
    getFeePayment(getFeePaymentInput: { id: $id }) {
      id
      payment_id
      admission_id
      student_name
      course_id
      course_name
      learner_id
      user_name
      start_date
      total_amount
      status
      payment_date
      transaction_id
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

export const GET_DUE_PAYMENT = gql`
  query getDuePaymentsList($admission_id: Int!) {
    getDuePaymentsList(getDuePaymentsInput: { admission_id: $admission_id }) {
      id
      course_id
      course_name
      fee_frequency
      fee_month
      fee_year
      fee_amount
      is_paid
      due_date
    }
  }
`;
