import gql from 'graphql-tag';

export const UPLOAD_ADMISSION_IMAGE = gql`
  mutation uploadDocument($file: Upload!) {
    uploadDocument(file: $file) {
      originalname
      filename
      mimetype
      encoding
      url
    }
  }
`;

export const ADD_ADMISSION_TECH = gql`
  mutation addAdmissionTech(
    $data: jsonb!
    $tenthproof: Upload
    $twelthproof: Upload
    $graduationproof: Upload
    $photoidproof: Upload
    $photo: Upload
    $is_aadhar_req: Upload
    $is_birth_certi_req: Upload
    $is_tc_req: Upload
    $is_samagraid_req: Upload
  ) {
    addAdmissionTech(
      addAdmissionTechInput: {
        data: $data
        tenthproof: $tenthproof
        twelthproof: $twelthproof
        graduationproof: $graduationproof
        photoidproof: $photoidproof
        photo: $photo
        is_aadhar_req: $is_aadhar_req
        is_birth_certi_req: $is_birth_certi_req
        is_tc_req: $is_tc_req
        is_samagraid_req: $is_samagraid_req
      }
    )
  }
`;

export const ADD_ADMISSION_TECH_RETURN_USERID = gql`
  mutation addAdmissionTechReturnUserId(
    $data: jsonb!
    $tenthproof: Upload
    $twelthproof: Upload
    $graduationproof: Upload
    $photoidproof: Upload
    $photo: Upload
    $is_aadhar_req: Upload
    $is_birth_certi_req: Upload
    $is_tc_req: Upload
    $is_samagraid_req: Upload
  ) {
    addAdmissionTechReturnUserId(
      addAdmissionTechInput: {
        data: $data
        tenthproof: $tenthproof
        twelthproof: $twelthproof
        graduationproof: $graduationproof
        photoidproof: $photoidproof
        photo: $photo
        is_aadhar_req: $is_aadhar_req
        is_birth_certi_req: $is_birth_certi_req
        is_tc_req: $is_tc_req
        is_samagraid_req: $is_samagraid_req
      }
    )
  }
`;

export const UPDATE_ADMISSION_TECH = gql`
  mutation updateAdmissionTech(
    $id: Int!
    $data: jsonb!
    $tenthproof: Upload
    $twelthproof: Upload
    $graduationproof: Upload
    $photoidproof: Upload
    $photo: Upload
    $is_aadhar_req: Upload
    $is_birth_certi_req: Upload
    $is_tc_req: Upload
    $is_samagraid_req: Upload
  ) {
    updateAdmissionTech(
      updateAdmissionTechInput: {
        id: $id
        data: $data
        tenthproof: $tenthproof
        twelthproof: $twelthproof
        graduationproof: $graduationproof
        photoidproof: $photoidproof
        photo: $photo
        is_aadhar_req: $is_aadhar_req
        is_birth_certi_req: $is_birth_certi_req
        is_tc_req: $is_tc_req
        is_samagraid_req: $is_samagraid_req
      }
    )
  }
`;

export const DELETE_ADMISSION_TECH = gql`
  mutation deleteAdmissionTech($ids: [Int]!) {
    deleteAdmissionTech(deleteAdmissionTechInput: { ids: $ids })
  }
`;

export const GET_ADMISSION_TECH_EMAIL_EXIST = gql`
  query getAdmissionTechEMailExist($id: Int!, $email: String!) {
    getAdmissionTechEMailExist(id: $id, email: $email)
  }
`;

export const GET_ADMISSION_TECH_PHONE_NO_EXIST = gql`
  query getAdmissionTechPhoneNoExist($id: Int!, $phone_no: String!) {
    getAdmissionTechPhoneNoExist(id: $id, phone_no: $phone_no)
  }
`;

export const GET_LAST_ADMISSION = gql`
  query getLastAdmission {
    getLastAdmission {
      id
    }
  }
`;

export const GET_ADMISSION_TECH = gql`
  query getAdmissionTech($id: Int!) {
    getAdmissionTech(getAdmissionTechInput: { id: $id }) {
      id
      course_id
      course_name
      admission_date
      first_name
      last_name
      dob
      gender
      email
      phone_no
      address
      city_name
      state_id
      state_name
      country_id
      country_name
      zip_code
      aadhaar_no
      samagra_id
      pen_no
      father_name
      father_occupation
      father_phone_no
      mother_name
      mother_occupation
      mother_phone_no
      highschoolname
      highschoolpercentage
      highersschoolname
      highersschoolpercentage
      graduationname
      graduationpercentage
      undertaking
      status
      paid_amount
      total_fee
      payment_mode
      tenthproof
      twelthproof
      graduationproof
      photoidproof
      photo
      is_aadhar_req
      is_birth_certi_req
      is_tc_req
      is_samagraid_req
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
export const GET_ADMISSION_TECH_LIST = gql`
  query getAdmissionTechList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getAdmissionTechList(
      getAdmissionTechListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      admissionTechs {
        id
        course_id
        course_name
        admission_date
        first_name
        last_name
        dob
        gender
        email
        phone_no
        address
        city_name
        state_id
        state_name
        country_id
        country_name
        zip_code
        aadhaar_no
        samagra_id
        pen_no
        father_name
        father_occupation
        father_phone_no
        mother_name
        mother_occupation
        mother_phone_no
        highschoolname
        highschoolpercentage
        highersschoolname
        highersschoolpercentage
        graduationname
        graduationpercentage
        undertaking
        status
        paid_amount
        total_fee
        payment_mode
        tenthproof
        twelthproof
        graduationproof
        photoidproof
        photo
        is_aadhar_req
        is_birth_certi_req
        is_tc_req
        is_samagraid_req
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

export const CLASS_WISE_ADMISSION = gql`
  query getClassWiseAdmission(
    $filter_text: String
    $sort_direction: String
    $sort_field: String
    $offset: Int
    $limit: Int
    $from_date: Date
    $to_date: Date
    $user_id: Int
  ) {
    getClassWiseAdmission(
      getClassWiseAdmissionInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
        from_date: $from_date
        to_date: $to_date
        course_id: $course_id
      }
    ) {
      total_records
      admissions {
        id
        course_id
        course_name
        admission_date
        first_name
        last_name
        dob
        gender
        email
        phone_no
        address
        city_name
        state_id
        state_name
        country_id
        country_name
        zip_code
        highschoolname
        highschoolpercentage
        highersschoolname
        highersschoolpercentage
        graduationname
        graduationpercentage
        tenthproof
        twelthproof
        graduationproof
        photoidproof
        photo
        is_aadhar_req
        is_birth_certi_req
        is_tc_req
        is_samagraid_req
        status
        paid_amount
        total_fee
        payment_mode
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

export const GET_ADMISSION_TECH_ALL = gql`
  query getAdmissionTechAll {
    getAdmissionTechAll {
      id
      course_id
      course_name
      admission_date
      first_name
      last_name
      dob
      gender
      email
      phone_no
      address
      city_name
      state_id
      state_name
      country_id
      country_name
      zip_code
      aadhaar_no
      samagra_id
      pen_no
      father_name
      father_occupation
      father_phone_no
      mother_name
      mother_occupation
      mother_phone_no
      highschoolname
      highschoolpercentage
      highersschoolname
      highersschoolpercentage
      graduationname
      graduationpercentage
      undertaking
      status
      paid_amount
      total_fee
      payment_mode
      tenthproof
      twelthproof
      graduationproof
      photoidproof
      photo
      is_aadhar_req
      is_birth_certi_req
      is_tc_req
      is_samagraid_req
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
