import gql from 'graphql-tag';

export const ADD_AFFILIATE = gql`
  mutation addAffiliate(
    $first_name: String
    $last_name: String
    $email: String
    $phone_no: String
    $user_name: String
    $password: String
    $address: String
    $city_name: String
    $district_id: Int
    $state_id: Int
    $country_id: Int
    $zip_code: String
    $status: String
    $photo_id_url: String
    $role_id: Int
    $conversion_rate: Float
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
        district_id: $district_id
        state_id: $state_id
        country_id: $country_id
        zip_code: $zip_code
        status: $status
        photo_id_url: $photo_id_url
        role_id: $role_id
        conversion_rate: $conversion_rate
      }
    )
  }
`;

export const UPDATE_AFFILIATE = gql`
  mutation updateAffiliate(
    $id: Int!
    $first_name: String
    $last_name: String
    $email: String
    $phone_no: String
    $user_name: String
    $password: String
    $address: String
    $city_name: String
    $district_id: Int
    $state_id: Int
    $country_id: Int
    $zip_code: String
    $status: String
    $photo_id_url: String
    $role_id: Int
    $conversion_rate: Float
  ) {
    updateAffiliate(
      updateAffiliateInput: {
        id: $id
        first_name: $first_name
        last_name: $last_name
        email: $email
        phone_no: $phone_no
        user_name: $user_name
        password: $password
        address: $address
        city_name: $city_name
        district_id: $district_id
        state_id: $state_id
        country_id: $country_id
        zip_code: $zip_code
        status: $status
        photo_id_url: $photo_id_url
        role_id: $role_id
        conversion_rate: $conversion_rate
      }
    )
  }
`;

export const DELETE_AFFILIATE = gql`
  mutation deleteAffiliate($ids: [Int]!) {
    deleteAffiliate(deleteAffiliateInput: { ids: $ids })
  }
`;

export const CALCULATE_AFFILIATE_PAYMENT = gql`
  mutation calculateAffiliatePayment($affiliate_id: Int!) {
    calculateAffiliatePayment(calculateAffiliatePaymentInput: { affiliate_id: $affiliate_id })
  }
`;

export const AFFILIATE_LIST = gql`
  query getAffiliateList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getAffiliateList(
      getAffiliateListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      affiliates {
        id
        first_name
        last_name
        email
        phone_no
        user_name
        password
        address
        city_name
        district_id
        district_name
        state_id
        state_name
        country_id
        country_name
        zip_code
        status
        photo_id_url
        role_id
        conversion_rate
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

export const AFFILIATE_REVIEW_LIST = gql`
  query getAffiliateReviewList(
    $filter_text: String
    $sort_direction: String
    $sort_field: String
    $offset: Int
    $limit: Int
    $from_date: Date
    $to_date: Date
    $user_id: Int
  ) {
    getAffiliateReviewList(
      getAffiliateReviewListInput: {
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
      affiliates {
        id
        first_name
        last_name
        email
        phone_no
        user_name
        password
        address
        city_name
        district_id
        district_name
        state_id
        state_name
        country_id
        country_name
        zip_code
        status
        photo_id_url
        role_id
        conversion_rate
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
  query getAffiliate($id: Int!) {
    getAffiliate(getAffiliateInput: { id: $id }) {
      id
      first_name
      last_name
      email
      phone_no
      user_name
      password
      address
      city_name
      district_id
      district_name
      state_id
      state_name
      country_id
      country_name
      zip_code
      status
      photo_id_url
      role_id
      conversion_rate
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

export const GET_AFFILIATE_SUMMARY = gql`
  query GetAffiliateSummary($affiliate_id: Int!) {
    getAffiliateSummary(getAffiliateSummaryInput: { affiliate_id: $affiliate_id }) {
    total_referrals
    total_earning
    conversion_rate
    pending_payout
    incentive_given
    last_payment_date
    last_payment_amount
    }
  }
`;
