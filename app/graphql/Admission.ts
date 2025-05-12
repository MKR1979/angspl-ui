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


export const ADD_ADMISSION = gql`
  mutation addAdmission(
    $course_id: Int,
    $admission_date: Date,
    $first_name: String,
    $last_name: String,
    $dob: Date,
    $gender: String,
    $email: String,
    $phone_no: String,
    $address: String,
    $city_name: String,
    $state_id: Int, 
    $country_id: Int,  
    $zip_code: String,
    $highschoolname: String,
    $highschoolpercentage: Int,
    $highersschoolname: String,
    $highersschoolpercentage: Int,
    $graduationname: String,
    $graduationpercentage: Int,
    $tenthproof: Upload,
    $twelthproof: Upload,  
    $graduationproof: Upload,
    $photoidproof: Upload,
    $photo: Upload,
    $status: String 
  ) {
    addAdmission(
      addAdmissionInput: {
        course_id: $course_id
        admission_date: $admission_date
        first_name: $first_name
        last_name: $last_name
        dob: $dob
        gender: $gender
        email: $email
        phone_no: $phone_no
        address: $address
        city_name: $city_name
        state_id: $state_id 
        country_id: $country_id
        zip_code: $zip_code
        highschoolname: $highschoolname
        highschoolpercentage: $highschoolpercentage
        highersschoolname: $highersschoolname
        highersschoolpercentage: $highersschoolpercentage
        graduationname: $graduationname
        graduationpercentage: $graduationpercentage
        tenthproof: $tenthproof
        twelthproof: $twelthproof  
        graduationproof: $graduationproof
        photoidproof: $photoidproof
        photo: $photo
        status: $status        
      }
    )
  }
`;


export const UPDATE_ADMISSION = gql`
  mutation updateAdmission(
    $id: Int!
    $course_id: Int!
    $admission_date: Date
    $first_name: String!
    $last_name: String
    $dob: Date!
    $gender: String
    $email: String!
    $phone_no: String!
    $address: String!
    $city_name: String!
    $state_id: Int 
    $country_id: Int  
    $zip_code: String
    $highschoolname: String,
    $highschoolpercentage: Int,
    $highersschoolname: String,
    $highersschoolpercentage: Int,
    $graduationname: String,
    $graduationpercentage: Int,
    $tenthproof: Upload
    $twelthproof: Upload  
    $graduationproof: Upload
    $photoidproof: Upload
    $photo: Upload
    $status: String 
  ) {
    updateAdmission(
     updateAdmissionInput: {
        id: $id
        course_id: $course_id
        admission_date: $admission_date
        first_name: $first_name
        last_name: $last_name
        dob: $dob
        gender: $gender
        email: $email
        phone_no: $phone_no
        address: $address
        city_name: $city_name
        state_id: $state_id 
        country_id: $country_id
        zip_code: $zip_code
        highschoolname: $highschoolname
        highschoolpercentage: $highschoolpercentage
        highersschoolname: $highersschoolname
        highersschoolpercentage: $highersschoolpercentage
        graduationname: $graduationname
        graduationpercentage: $graduationpercentage
        tenthproof: $tenthproof
        twelthproof: $twelthproof  
        graduationproof: $graduationproof
        photoidproof: $photoidproof
        photo: $photo
        status: $status
      }
    )
  }
`;

export const DELETE_ADMISSION = gql`
  mutation deleteAdmission($ids: [Int]!) {
    deleteAdmission(deleteAdmissionInput: { ids: $ids })
  }
`;

export const GET_ADMISSION_EMAIL_EXIST = gql`
  query getAdmissionEMailExist($id: Int!, $email: String!) {
    getAdmissionEMailExist(id: $id, email: $email)
  }
`;

export const GET_ADMISSION_PHONE_NO_EXIST = gql`
  query getAdmissionPhoneNoExist($id: Int!, $phone_no: String!) {
    getAdmissionPhoneNoExist(id: $id, phone_no: $phone_no)
  }
`;

// export const UPLOAD_ADMISSION_IMAGE = gql`
//   mutation singleUpload($files: [Upload]!) {
//     singleUpload(files: $files) {
//       filename
//       mimetype
//       encoding
//     }
//   }
// `;

export const GET_LAST_ADMISSION = gql`
  query getLastAdmission {
    getLastAdmission {
        id  
    }
  }
`;

export const ADMISSION_SHORTLIST = gql`
  query getAdmissionList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getAdmissionList(
      getAdmissionListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
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
      status
      }
    }
  }
`;

export const GET_ADMISSION = gql`
  query getAdmission($id: Int!) {
    getAdmission(getAdmissionInput: { id: $id }) {
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
export const GET_ADMISSION_LIST = gql`
  query getAdmissionList( $filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getAdmissionList(
      getAdmissionListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
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

export const GET_ADMISSION_ALL = gql`
  query getAdmissionAll {
    getAdmissionAll {
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
      status
    }
  }
`;