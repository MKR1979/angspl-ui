import gql from 'graphql-tag';
export const ADD_FORGOT_PASSWORD = gql`
  mutation addForgotPassword(
    $email: String!
    $user_name: String!
    $new_password: String!
    $confirm_password: String!
  ) {
    addForgotPassword(
      addForgotPasswordInput: {
        email: $email
        user_name: $user_name
        new_password: $new_password
        confirm_password: $confirm_password
      }
    )
  }
`;

export const GET_FORGOT_PASSWORD= gql`
  query getForgotPassword($id: Int!) {
    getForgotPassword(getForgotPasswordInput: { id: $id}) {
      id
      email
      user_name
      new_password
      confirm_password
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

export const GET_FORGOT_PASSWORD_EMAIL_EXIST = gql`
  query getForgotPasswordEMailExist($id: Int!, $email: String!) {
    getForgotPasswordEMailExist(id: $id, email: $email)
  }
`;

export const GET_FORGOT_PASSWORD_USER_NAME_EXIST = gql`
  query getForgotPasswordUserNameExist($id: Int!, $user_name: String!) {
    getForgotPasswordUserNameExist(id: $id, user_name: $user_name)
  }
`;


export const VALIDATE_FORGOT_PASSWORD_PASSWORD = gql`
  query validateForgotPasswordPassword($new_password: String!) {
    validateForgotPasswordPassword(new_password: $new_password)
  }
`;

export const UPDATE_FORGOT_PASSWORD_PASSWORD = gql`
  mutation updateForgotPasswordPassword($old_password: String!, $new_password: String!) {
    updateForgotPasswordPassword(updateForgotPasswordPasswordInput: {old_password: $old_password, new_password: $new_password })
  }
`;

