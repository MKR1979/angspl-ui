import gql from 'graphql-tag';

export const SEND_EMAIL = gql`
  mutation sendEmail($to: String!, $subject: String!, $body: String!, $otp: String) {
    sendEmail(sendEmailInput: { to: $to, subject: $subject, body: $body, otp: $otp })
  }
`;

export const EMAIL_LIST = gql`
  query getEmailList($filter_text: String, $sort_field: String, $sort_direction: String, $offset: Int, $limit: Int) {
    getEmailList(
      getEmailListInput: {
        filter_text: $filter_text
        sort_field: $sort_field
        sort_direction: $sort_direction
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      emails {
        id
        to
        subject
        body
        otp
        sent_at
      }
    }
  }
`;

export const DELETE_EMAIL = gql`
  mutation deleteEmail($ids: [Int]!) {
    deleteEmail(deleteEmailInput: { ids: $ids })
  }
`;

export const GET_EMAIL_LIST = gql`
  query getEmailList(
    $filter_text: String
    $sort_direction: String
    $sort_field: String
    $offset: Int
    $limit: Int
    $from_date: Date
    $to_date: Date
  ) {
    getEmailList(
      getEmailListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
        from_date: $from_date
        to_date: $to_date
      }
    ) {
      total_records
      emails {
        id
        to_address
        subject
        body
        template_name
        attachment_path
        status
        retry_count
        sent_at
        created_at
      }
    }
  }
`;

export const GET_EMAIL = gql`
  query getEmail($id: Int!) {
    getEmail(getEmailInput: { id: $id }) {
      id
      to_address
      subject
      body
      template_name
      attachment_path
      status
      retry_count
      sent_at
      created_at
    }
  }
`;

export const ADD_EMAIL = gql`
  mutation addEmail( $addEmailInput: addEmailInput!, $emailConfigInput: emailConfigInput! ) {
    addEmail(addEmailInput: $addEmailInput, emailConfigInput: $emailConfigInput)
  }
`;

export const SEND_OTP = gql`
  mutation sendOtp($sendOtpInput: sendOtpInput, $emailConfigInput: emailConfigInput!) {
    sendOtp(sendOtpInput: $sendOtpInput, emailConfigInput: $emailConfigInput)
  }
`;

export const RESEND_OTP = gql`
  mutation resendOtp($resendOtpInput: resendOtpInput!, $emailConfigInput: emailConfigInput!) {
    resendOtp(resendOtpInput: $resendOtpInput, emailConfigInput: $emailConfigInput)
  }
`;

export const VERIFY_OTP = gql`
  mutation verifyOtp($verifyOtpInput: verifyOtpInput!, $emailConfigInput: emailConfigInput!) {
    verifyOtp(verifyOtpInput: $verifyOtpInput, emailConfigInput: $emailConfigInput)
  }
`;
