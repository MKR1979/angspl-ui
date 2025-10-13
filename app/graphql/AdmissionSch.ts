import gql from 'graphql-tag';

export const UPLOAD_STUDENT_IMAGE = gql`
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

export const ADD_ADMISSION_SCH = gql`
  mutation addAdmissionSch(
    $data: jsonb!
    $photo: Upload
    $aadhaar_card: Upload
    $birth_certificate: Upload
    $other_certificate: Upload
    $father_aadhaar: Upload
    $mother_aadhaar: Upload
    $samagra_id: Upload
    $transfer_certificate: Upload
    $prev_class_marksheet: Upload
    $father_photo: Upload
    $mother_photo: Upload
  ) {
    addAdmissionSch(
      addAdmissionSchInput: {
        data: $data
        photo: $photo
        aadhaar_card: $aadhaar_card
        birth_certificate: $birth_certificate
        other_certificate: $other_certificate
        father_aadhaar: $father_aadhaar
        mother_aadhaar: $mother_aadhaar
        samagra_id: $samagra_id
        transfer_certificate: $transfer_certificate
        prev_class_marksheet: $prev_class_marksheet
        father_photo: $father_photo
        mother_photo: $mother_photo
      }
    )
  }
`;

export const ADD_ADMISSION_RETURN_USERID = gql`
  mutation addAdmissionReturnUserId(
    $data: jsonb!
    $photo: Upload
    $aadhaar_card: Upload
    $birth_certificate: Upload
    $other_certificate: Upload
    $father_aadhaar: Upload
    $mother_aadhaar: Upload
    $samagra_id: Upload
    $transfer_certificate: Upload
    $prev_class_marksheet: Upload
    $father_photo: Upload
    $mother_photo: Upload
  ) {
    addAdmissionReturnUserId(
      addAdmissionSchInput: {
        data: $data
        photo: $photo
        aadhaar_card: $aadhaar_card
        birth_certificate: $birth_certificate
        other_certificate: $other_certificate
        father_aadhaar: $father_aadhaar
        mother_aadhaar: $mother_aadhaar
        samagra_id: $samagra_id
        transfer_certificate: $transfer_certificate
        prev_class_marksheet: $prev_class_marksheet
        father_photo: $father_photo
        mother_photo: $mother_photo
      }
    )
  }
`;

export const UPDATE_ADMISSION_SCH = gql`
  mutation updateAdmissionSch(
    $id: Int!
    $data: jsonb!
    $photo: Upload
    $aadhaar_card: Upload
    $birth_certificate: Upload
    $other_certificate: Upload
    $father_aadhaar: Upload
    $mother_aadhaar: Upload
    $samagra_id: Upload
    $transfer_certificate: Upload
    $prev_class_marksheet: Upload
    $father_photo: Upload
    $mother_photo: Upload
  ) {
    updateAdmissionSch(
      updateAdmissionSchInput: {
        id: $id
        data: $data
        photo: $photo
        aadhaar_card: $aadhaar_card
        birth_certificate: $birth_certificate
        other_certificate: $other_certificate
        father_aadhaar: $father_aadhaar
        mother_aadhaar: $mother_aadhaar
        samagra_id: $samagra_id
        transfer_certificate: $transfer_certificate
        prev_class_marksheet: $prev_class_marksheet
        father_photo: $father_photo
        mother_photo: $mother_photo
      }
    )
  }
`;

export const DELETE_ADMISSION_SCH = gql`
  mutation deleteAdmissionSch($ids: [Int]!) {
    deleteAdmissionSch(deleteAdmissionSchInput: { ids: $ids })
  }
`;

export const GET_ADMISSION_SCH_EMAIL_EXIST = gql`
  query getAdmissionSchEMailExist($id: Int!, $email: String!) {
    getAdmissionSchEMailExist(id: $id, email: $email)
  }
`;

export const GET_ADMISSION_SCH_PHONE_NO_EXIST = gql`
  query getAdmissionSchPhoneNoExist($id: Int!, $phone_no: String!) {
    getAdmissionSchPhoneNoExist(id: $id, phone_no: $phone_no)
  }
`;

export const GET_LAST_ADMISSION_SCH = gql`
  query getLastAdmissionSch {
    getLastAdmissionSch {
      id
    }
  }
`;

export const GET_ADMISSION_SCH = gql`
  query getAdmissionSch($id: Int!) {
    getAdmissionSch(getAdmissionSchInput: { id: $id }) {
      id
      course_id
      course_name
      admission_date
      gender
      first_name
      last_name
      father_name
      mother_name
      dob
      category
      address
      state_id
      state_name
      country_id
      country_name
      city_name
      zip_code
      email
      phone_no
      religion
      blood_group
      boarder_day_scholar
      current_school
      current_board
      medium
      father_qualification
      father_occupation
      father_organisation
      father_designation
      father_phone_no
      father_email
      mother_qualification
      mother_occupation
      mother_organisation
      mother_designation
      mother_phone_no
      mother_email
      student_aadhaar_no
      father_aadhaar_no
      mother_aadhaar_no
      samagra_id_no
      staff_child
      sibling_in_school
      parents_ex_school
      guardian_name
      guardian_phone_no
      undertaking
      iii_language
      ii_language
      stream
      transport_facility
      transport_route
      mess_facility
      family_samagra_id
      student_pen_no
      photo
      aadhaar_card
      birth_certificate
      other_certificate
      father_aadhaar
      mother_aadhaar
      samagra_id
      transfer_certificate
      prev_class_marksheet
      father_photo
      mother_photo
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
export const GET_ADMISSION_SCH_LIST = gql`
  query getAdmissionSchList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getAdmissionSchList(
      getAdmissionSchListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      admissionSchs {
        id
        course_id
        course_name
        admission_date
        gender
        first_name
        last_name
        father_name
        mother_name
        dob
        category
        address
        state_id
        state_name
        country_id
        country_name
        city_name
        zip_code
        email
        phone_no
        religion
        blood_group
        boarder_day_scholar
        current_school
        current_board
        medium
        father_qualification
        father_occupation
        father_organisation
        father_designation
        father_phone_no
        father_email
        mother_qualification
        mother_occupation
        mother_organisation
        mother_designation
        mother_phone_no
        mother_email
        student_aadhaar_no
        father_aadhaar_no
        mother_aadhaar_no
        samagra_id_no
        staff_child
        sibling_in_school
        parents_ex_school
        guardian_name
        guardian_phone_no
        undertaking
        iii_language
        ii_language
        stream
        transport_facility
        transport_route
        mess_facility
        family_samagra_id
        student_pen_no
        photo
        aadhaar_card
        birth_certificate
        other_certificate
        father_aadhaar
        mother_aadhaar
        samagra_id
        transfer_certificate
        prev_class_marksheet
        father_photo
        mother_photo
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

export const GET_ADMISSION_SCH_ALL = gql`
  query getAdmissionSchAll {
    getAdmissionSchAll {
      id
      course_id
      course_name
      admission_date
      gender
      first_name
      last_name
      father_name
      mother_name
      dob
      category
      address
      state_id
      state_name
      country_id
      country_name
      city_name
      zip_code
      email
      phone_no
      religion
      blood_group
      boarder_day_scholar
      current_school
      current_board
      medium
      father_qualification
      father_occupation
      father_organisation
      father_designation
      father_phone_no
      father_email
      mother_qualification
      mother_occupation
      mother_organisation
      mother_designation
      mother_phone_no
      mother_email
      student_aadhaar_no
      father_aadhaar_no
      mother_aadhaar_no
      samagra_id_no
      staff_child
      sibling_in_school
      parents_ex_school
      guardian_name
      guardian_phone_no
      undertaking
      iii_language
      ii_language
      stream
      transport_facility
      transport_route
      mess_facility
      family_samagra_id
      student_pen_no
      photo
      aadhaar_card
      birth_certificate
      other_certificate
      father_aadhaar
      mother_aadhaar
      samagra_id
      transfer_certificate
      prev_class_marksheet
      father_photo
      mother_photo
      status
    }
  }
`;
