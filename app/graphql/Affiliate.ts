import gql from 'graphql-tag';

export const ADD_AFFILIATE = gql`
  mutation addAffiliate(
    $first_name: String,
    $last_name: String,
    $email: String,
    $phone_no: String,
    $user_name: String,
    $password: String,
    $address: String,
    $city_name: String,
    $state_id: Int, 
    $country_id: Int,  
    $zip_code: String,
    $status: String,
    $photo_id_url: String
  ) {
    addAffiliate(
      addAffiliateInput: {
        first_name: $first_name
        last_name: $last_name
        email: $email
        phone_no: $phone_no
        user_name: $user_name
        password: $password
        address: $address
        city_name: $city_name
        state_id: $state_id       
        country_id: $country_id       
        zip_code: $zip_code
        status: $status
        photo_id_url: $photo_id_url
      }
    )
  }
`;

export const GET_AFFILIATE_EMAIL_EXIST = gql`
  query getAffiliateEMailExist($id: Int!, $email: String!) {
    getAffiliateEMailExist(id: $id, email: $email)
  }
`;

export const GET_AFFILIATE_USER_NAME_EXIST = gql`
  query getAffiliateUserNameExist($id: Int!, $user_name: String!) {
    getAffiliateUserNameExist(id: $id, user_name: $user_name)
  }
`;

export const GET_AFFILIATE_PHONE_NO_EXIST = gql`
  query getAffiliatePhoneNoExist($id: Int!, $phone_no: String!) {
    getAffiliatePhoneNoExist(id: $id, phone_no: $phone_no)
  }
`;

export const VALIDATE_AFFILIATE_PASSWORD = gql`
  query validateAffiliatePassword($password: String!) {
    validateAffiliatePassword(password: $password)
  }
`;

export const UPLOAD_AFFILIATE_IMAGE = gql`
  mutation singleUpload($files: [Upload]!) {
    singleUpload(files: $files) {
      filename
      mimetype
      encoding
    }
  }
`;

export const GET_AFFILIATE = gql`
  query getUser($id: Int!) {
    getUser(getUserInput: { id: $id }) {
      id
      first_name
      last_name
      email
      phone_no
      user_name
      password
      address
      city_name
      state_id
      state_name
      country_id
      country_name
      zip_code
      status
      photo_id_url
      created_at
    }
  }
`;
