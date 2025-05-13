import gql from 'graphql-tag';
export const ADD_USER = gql`
  mutation addUser(
    $first_name: String!
    $last_name: String!
    $email: String!
    $mobile_no: String!
    $user_name: String!
    $password: String!
    $status: String
    $role_id: Int
    $image_url: String
    $admission_id: Int
  ) {
    addUser(
      addUserInput: {
        first_name: $first_name
        last_name: $last_name
        email: $email
        mobile_no: $mobile_no
        user_name: $user_name
        password: $password
        status: $status
        role_id: $role_id
        image_url: $image_url
        admission_id: $admission_id
      }
    )
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $id: Int!
    $first_name: String!
    $last_name: String!
    $email: String!
    $mobile_no: String!
    $user_name: String!
    $password: String!
    $status: String
    $role_id: Int
    $image_url: String
    $admission_id: Int
  ) {
    updateUser(
      updateUserInput: {
        id: $id
        first_name: $first_name
        last_name: $last_name
        email: $email
        mobile_no: $mobile_no
        user_name: $user_name
        password: $password
        status: $status
        role_id: $role_id
        image_url: $image_url
        admission_id: $admission_id
      }
    )
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($ids: [Int]!) {
    deleteUser(deleteUserInput: { ids: $ids})
  }
`;

export const USER_LOOKUP = gql`
  query getUserLookup {
    getUserLookup {
      id
      text
    }
  }
`;

export const USER_LIST = gql`
  query getUserList( $filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getUserList(
      getUserListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      users {
        id
        first_name
        last_name
        email
        mobile_no
        user_name
        status
        role_id
        role_name
        image_url
        admission_id
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

export const GET_USER = gql`
  query getUser($id: Int!) {
    getUser(getUserInput: { id: $id}) {
      id
      first_name
      last_name
      email
      mobile_no
      user_name
      password
      status
      role_id
      role_name
      image_url
      admission_id
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
export const GET_USER_BY_NAME = gql`
  query getUserByName(  $user_name: String!) {
    getUserByName(getUserInput: { user_name: $user_name }) {
      id
      first_name
      last_name
      email
      mobile_no
      user_name
      password
      status
      role_id
      role_name
      image_url
      admission_id
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

export const GET_USER_BY_USER_NAME = gql`
  query getUserByUserName( $user_name: String!) {
    getUserByUserName(getUserByUserNameInput: {user_name: $user_name }) {
      id
      first_name
      last_name
      email
      mobile_no
      user_name
      password
      status
      role_id
      role_name
      image_url
      admission_id
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login( $user_name: String!, $password: String!) {
    login( user_name: $user_name, password: $password)
  }
`;

export const GET_USER_EMAIL_EXIST = gql`
  query getUserEMailExist($id: Int!, $email: String!) {
    getUserEMailExist(id: $id, email: $email)
  }
`;

export const GET_USER_USER_NAME_EXIST = gql`
  query getUserUserNameExist($id: Int!,  $user_name: String!) {
    getUserUserNameExist(id: $id, user_name: $user_name)
  }
`;

export const GET_USER_MOBILE_NO_EXIST = gql`
  query getUserMobileNoExist($id: Int!, $mobile_no: String!) {
    getUserMobileNoExist(id: $id,  mobile_no: $mobile_no)
  }
`;

export const GET_USER_MY_PROFILE = gql`
  query getUserMyProfile {
    getUserMyProfile {
      id
      first_name
      last_name
      email
      mobile_no
      user_name
      password
      status
      role_id
      role_name
      image_url
      admission_id
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

export const VALIDATE_USER_PASSWORD = gql`
  query validateUserPassword($password: String!) {
    validateUserPassword(password: $password)
  }
`;

export const UPDATE_USER_PROFILE = gql`
  mutation updateUserProfile(
    $first_name: String!
    $last_name: String!
    $email: String!
    $mobile_no: String!
    $status: String
    $image_url: String
    $admission_id: Int
  ) {
    updateUserProfile(
      updateUserProfileInput: {
        first_name: $first_name
        last_name: $last_name
        email: $email
        mobile_no: $mobile_no
        status: $status
        image_url: $image_url
        admission_id: $admission_id
      }
    )
  }
`;

export const UPDATE_USER_PASSWORD = gql`
  mutation updateUserPassword( $old_password: String!, $password: String!) {
    updateUserPassword(updateUserPasswordInput: { old_password: $old_password, password: $password })
  }
`;

export const FORGET_USER_PASSWORD = gql`
  mutation forgetUserPassword( $user_name: String!, $email: String!, $password: String!) {
    forgetUserPassword(forgetUserPasswordInput: { user_name: $user_name, email: $email, password: $password })
  }
`;

export const UPLOAD_USER_IMAGE = gql`
  mutation singleUpload($files: [Upload]!) {
    singleUpload(files: $files) {
      filename
      mimetype
      encoding
    }
  }
`;
