import gql from 'graphql-tag';
export const ADD_EMAIL_TEMPLATE = gql`
  mutation addEmailTemplate(
    $email_template_name: String!
    $email_template_body: String!
    $email_template_sub: String
    $status: String
  ) {
    addEmailTemplate(
      addEmailTemplateInput: {
        email_template_name: $email_template_name
        email_template_body: $email_template_body
        email_template_sub: $email_template_sub
        status: $status
      }
    )
  }
`;

export const EMAIL_TEMPLATE_LOOKUP = gql`
  query getEmailTemplateLookup {
    getEmailTemplateLookup {
      id
      text
    }
  }
`;

export const UPDATE_EMAIL_TEMPLATE = gql`
  mutation updateEmailTemplate(
    $id: Int!
    $email_template_name: String!
    $email_template_body: String!
    $email_template_sub: String
    $status: String
  ) {
    updateEmailTemplate(
      updateEmailTemplateInput: {
        id: $id
        email_template_name: $email_template_name
        email_template_body: $email_template_body
        email_template_sub: $email_template_sub
        status: $status
      }
    )
  }
`;

export const DELETE_EMAIL_TEMPLATE = gql`
  mutation deleteEmailTemplate($ids: [Int]!) {
    deleteEmailTemplate(deleteEmailTemplateInput: { ids: $ids })
  }
`;

export const EMAIL_TEMPLATE_LIST = gql`
  query getEmailTemplateList(
    $filter_text: String
    $sort_direction: String
    $sort_field: String
    $offset: Int
    $limit: Int
  ) {
    getEmailTemplateList(
      getEmailTemplateListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      email_templates {
        id
        email_template_name
        email_template_body
        email_template_sub
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

export const GET_EMAIL_TEMPLATE = gql`
  query getEmailTemplate($id: Int!) {
    getEmailTemplate(getEmailTemplateInput: { id: $id }) {
      id
      email_template_name
      email_template_body
      email_template_sub
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

export const GET_EMAIL_TEMPLATE_NAME_EXIST = gql`
  query getEmailTemplateNameExist($id: Int!, $email_template_name: String!) {
    getEmailTemplateNameExist(id: $id, email_template_name: $email_template_name)
  }
`;

// export const SEND_NOTIFICATION = gql`
//   mutation sendNotification($ids: [Int]!) {
//     sendNotification(sendNotificationInput: { ids: $ids })
//   }
// `;