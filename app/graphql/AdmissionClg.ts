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

export const ADD_ADMISSION_CLG = gql`
  mutation addAdmissionClg(
    $data: jsonb!
    $photo: Upload
    $aadhaar_card: Upload
    $other_certificate: Upload
    $father_aadhaar: Upload
    $mother_aadhaar: Upload
    $samagra_id: Upload
    $transfer_certificate: Upload
    $high_school_marksheet: Upload
    $intermediate_marksheet: Upload
    $diploma_marksheet: Upload
    $ug_marksheet: Upload
    $pg_marksheet: Upload
    $anti_ragging: Upload
    $student_undertaking: Upload
    $parents_undertaking: Upload
    $father_photo: Upload
    $mother_photo: Upload
  ) {
    addAdmissionClg(
      addAdmissionClgInput: {
        data: $data
        photo: $photo
        aadhaar_card: $aadhaar_card
        other_certificate: $other_certificate
        father_aadhaar: $father_aadhaar
        mother_aadhaar: $mother_aadhaar
        samagra_id: $samagra_id
        transfer_certificate: $transfer_certificate
        high_school_marksheet: $high_school_marksheet
        intermediate_marksheet: $intermediate_marksheet
        diploma_marksheet: $diploma_marksheet
        ug_marksheet: $ug_marksheet
        pg_marksheet: $pg_marksheet
        anti_ragging: $anti_ragging
        student_undertaking: $student_undertaking
        parents_undertaking: $parents_undertaking
        father_photo: $father_photo
        mother_photo: $mother_photo
      }
    )
  }
`;

export const ADD_ADMISSION_CLG_RETURN_USERID = gql`
  mutation addAdmissionClgReturnUserId(
    $data: jsonb!
    $photo: Upload
    $aadhaar_card: Upload
    $other_certificate: Upload
    $father_aadhaar: Upload
    $mother_aadhaar: Upload
    $samagra_id: Upload
    $transfer_certificate: Upload
    $high_school_marksheet: Upload
    $intermediate_marksheet: Upload
    $diploma_marksheet: Upload
    $ug_marksheet: Upload
    $pg_marksheet: Upload
    $anti_ragging: Upload
    $student_undertaking: Upload
    $parents_undertaking: Upload
    $father_photo: Upload
    $mother_photo: Upload
  ) {
    addAdmissionClgReturnUserId(
      addAdmissionClgInput: {
        data: $data
        photo: $photo
        aadhaar_card: $aadhaar_card
        other_certificate: $other_certificate
        father_aadhaar: $father_aadhaar
        mother_aadhaar: $mother_aadhaar
        samagra_id: $samagra_id
        transfer_certificate: $transfer_certificate
        high_school_marksheet: $high_school_marksheet
        intermediate_marksheet: $intermediate_marksheet
        diploma_marksheet: $diploma_marksheet
        ug_marksheet: $ug_marksheet
        pg_marksheet: $pg_marksheet
        anti_ragging: $anti_ragging
        student_undertaking: $student_undertaking
        parents_undertaking: $parents_undertaking
        father_photo: $father_photo
        mother_photo: $mother_photo
      }
    )
  }
`;

export const UPDATE_ADMISSION_CLG = gql`
  mutation updateAdmissionClg(
    $id: Int!
    $data: jsonb!
    $photo: Upload
    $aadhaar_card: Upload
    $other_certificate: Upload
    $father_aadhaar: Upload
    $mother_aadhaar: Upload
    $samagra_id: Upload
     $transfer_certificate: Upload
    $high_school_marksheet: Upload
    $intermediate_marksheet: Upload
    $diploma_marksheet: Upload
    $ug_marksheet: Upload
    $pg_marksheet: Upload
    $anti_ragging: Upload
    $student_undertaking: Upload
    $parents_undertaking: Upload
    $father_photo: Upload
    $mother_photo: Upload
  ) {
    updateAdmissionClg(
      updateAdmissionClgInput: {
        id: $id
        data: $data
        photo: $photo
        aadhaar_card: $aadhaar_card
        other_certificate: $other_certificate
        father_aadhaar: $father_aadhaar
        mother_aadhaar: $mother_aadhaar
        samagra_id: $samagra_id
        transfer_certificate: $transfer_certificate
        high_school_marksheet: $high_school_marksheet
        intermediate_marksheet: $intermediate_marksheet
        diploma_marksheet: $diploma_marksheet
        ug_marksheet: $ug_marksheet
        pg_marksheet: $pg_marksheet
        anti_ragging: $anti_ragging
        student_undertaking: $student_undertaking
        parents_undertaking: $parents_undertaking
        father_photo: $father_photo
        mother_photo: $mother_photo
      }
    )
  }
`;

export const DELETE_ADMISSION_CLG = gql`
  mutation deleteAdmissionClg($ids: [Int]!) {
    deleteAdmissionClg(deleteAdmissionClgInput: { ids: $ids })
  }
`;

export const GET_LAST_ADMISSION_CLG = gql`
  query getLastAdmissionClg {
    getLastAdmissionClg {
      id
    }
  }
`;

export const GET_ADMISSION_CLG_EMAIL_EXIST = gql`
  query getAdmissionClgEMailExist($id: Int!, $email: String!) {
    getAdmissionClgEMailExist(id: $id, email: $email)
  }
`;

export const GET_ADMISSION_CLG = gql`
  query getAdmissionClg($id: Int!) {
    getAdmissionClg(getAdmissionClgInput: { id: $id }) {
      id
      course_id
      course_name
      admission_date
      course_type_id
      course_type_name
      entry_type
      gender
      first_name
      last_name
      user_name
      father_name
      mother_name
      dob
      category
      address
      district_id
      district_name
      state_id
      state_name
      country_id
      country_name
      city_name
      zip_code
      corr_address
      corr_district_id
      corr_district_name
      corr_state_id
      corr_state_name
      corr_country_id
      corr_country_name
      corr_city_name
      corr_zip_code
      email
      phone_no
      religion
      blood_group
      medium
      father_qualification
      father_occupation
      father_organisation
      father_designation
      father_phone_no
      father_email
      father_aadhaar_no
      mother_qualification
      mother_occupation
      mother_organisation
      mother_designation
      mother_phone_no
      mother_email
      mother_aadhaar_no
      student_aadhaar_no
      samagra_id_no
      staff_child
      sibling_in_college
      parents_ex_college
      guardian_name
      guardian_phone_no
      high_school_board
      high_school_year
      high_school_roll_no
      high_school_percentage
      intermediate_board
      intermediate_year
      intermediate_roll_no
      intermediate_stream
      intermediate_percentage
      diploma_college
      diploma_university
      diploma_registration_no
      diploma_course_id
      diploma_course_name
      diploma_passing_year
      diploma_cgpa
      ug_college
      ug_university
      ug_registration_no
      ug_course_id
      ug_course_name
      ug_passing_year
      ug_cgpa
      pg_college
      pg_university
      pg_registration_no
      pg_course_id
      pg_course_name
      pg_passing_year
      pg_cgpa
      undertaking
      transport_facility
      transport_route
      hostel_facility
      hostel_occupancy
      scholarship_student
      family_samagra_id
      student_pen_no
      photo
      aadhaar_card
      other_certificate
      father_aadhaar
      mother_aadhaar
      samagra_id
      transfer_certificate
      high_school_marksheet
      intermediate_marksheet
      diploma_marksheet
      ug_marksheet
      pg_marksheet
      anti_ragging
      student_undertaking
      parents_undertaking
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

export const GET_ADMISSION_CLG_LIST = gql`
  query getAdmissionClgList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getAdmissionClgList(
      getAdmissionClgListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      admissionClgs {
        id
        course_id
        course_name
        admission_date
        course_type_id
        course_type_name
        entry_type
        gender
        first_name
        last_name
        user_name
        father_name
        mother_name
        dob
        category
        address
        district_id
        district_name
        state_id
        state_name
        country_id
        country_name
        city_name
        zip_code
        corr_address
        corr_district_id
        corr_district_name
        corr_state_id
        corr_state_name
        corr_country_id
        corr_country_name
        corr_city_name
        corr_zip_code
        email
        phone_no
        religion
        blood_group
        medium
        father_qualification
        father_occupation
        father_organisation
        father_designation
        father_phone_no
        father_email
        father_aadhaar_no
        mother_qualification
        mother_occupation
        mother_organisation
        mother_designation
        mother_phone_no
        mother_email
        mother_aadhaar_no
        student_aadhaar_no
        samagra_id_no
        staff_child
        sibling_in_college
        parents_ex_college
        guardian_name
        guardian_phone_no
        high_school_board
        high_school_year
        high_school_roll_no
        high_school_percentage
        intermediate_board
        intermediate_year
        intermediate_roll_no
        intermediate_stream
        intermediate_percentage
        diploma_college
        diploma_university
        diploma_registration_no
        diploma_course_id
        diploma_course_name
        diploma_passing_year
        diploma_cgpa
        ug_college
        ug_university
        ug_registration_no
        ug_course_id
        ug_course_name
        ug_passing_year
        ug_cgpa
        pg_college
        pg_university
        pg_registration_no
        pg_course_id
        pg_course_name
        pg_passing_year
        pg_cgpa
        undertaking
        transport_facility
        transport_route
        hostel_facility
        hostel_occupancy
        scholarship_student
        family_samagra_id
        student_pen_no
        photo
        aadhaar_card
        other_certificate
        father_aadhaar
        mother_aadhaar
        samagra_id
        transfer_certificate
        high_school_marksheet
        intermediate_marksheet
        diploma_marksheet
        ug_marksheet
        pg_marksheet
        anti_ragging
        student_undertaking
        parents_undertaking
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

export const GET_ADMISSION_CLG_ALL = gql`
  query getAdmissionClgAll {
    getAdmissionClgAll {
      id
      course_id
      course_name
      admission_date
      course_type_id
      course_type_name
      entry_type
      gender
      first_name
      last_name
      user_name
      father_name
      mother_name
      dob
      category
      address
      district_id
      district_name
      state_id
      state_name
      country_id
      country_name
      city_name
      zip_code
      corr_address
      corr_district_id
      corr_district_name
      corr_state_id
      corr_state_name
      corr_country_id
      corr_country_name
      corr_city_name
      corr_zip_code
      email
      phone_no
      religion
      blood_group
      medium
      father_qualification
      father_occupation
      father_organisation
      father_designation
      father_phone_no
      father_email
      father_aadhaar_no
      mother_qualification
      mother_occupation
      mother_organisation
      mother_designation
      mother_phone_no
      mother_email
      mother_aadhaar_no
      student_aadhaar_no
      samagra_id_no
      staff_child
      sibling_in_college
      parents_ex_college
      guardian_name
      guardian_phone_no
      high_school_board
      high_school_year
      high_school_roll_no
      high_school_percentage
      intermediate_board
      intermediate_year
      intermediate_roll_no
      intermediate_stream
      intermediate_percentage
      diploma_college
      diploma_university
      diploma_registration_no
      diploma_course_id
      diploma_course_name
      diploma_passing_year
      diploma_cgpa
      ug_college
      ug_university
      ug_registration_no
      ug_course_id
      ug_course_name
      ug_passing_year
      ug_cgpa
      pg_college
      pg_university
      pg_registration_no
      pg_course_id
      pg_course_name
      pg_passing_year
      pg_cgpa
      undertaking
      transport_facility
      transport_route
      hostel_facility
      hostel_occupancy
      scholarship_student
      family_samagra_id
      student_pen_no
      photo
      aadhaar_card
      other_certificate
      father_aadhaar
      mother_aadhaar
      samagra_id
      transfer_certificate
      high_school_marksheet
      intermediate_marksheet
      diploma_marksheet
      ug_marksheet
      pg_marksheet
      anti_ragging
      student_undertaking
      parents_undertaking
      father_photo
      mother_photo
      status
    }
  }
`;
