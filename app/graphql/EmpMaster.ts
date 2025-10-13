import gql from 'graphql-tag';

export const UPLOAD_EMPLOYEE_IMAGE = gql`
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

export const ADD_EMPLOYEE = gql`
  mutation addEmployee(
    $first_name: String!
    $last_name: String!
    $user_name: String!
    $emp_code: String!
    $joining_date: Date
    $department_type: String
    $qualification: String
    $experience: Float
    $designation: String
    $salary: Float
    $dob: Date
    $gender: String
    $email: String!
    $phone_no: String!
    $marital_status: String
    $father_name: String
    $mother_name: String
    $husband_wife_name: String
    $address: String
    $aadhaar_no: String
    $pan_card: String
    $status: String
    $photo: Upload
    $photoidproof: Upload
  ) {
    addEmployee(
      addEmployeeInput: {
        first_name: $first_name
        last_name: $last_name
        user_name: $user_name
        emp_code: $emp_code
        joining_date: $joining_date
        department_type: $department_type
        qualification: $qualification
        experience: $experience
        designation: $designation
        salary: $salary
        dob: $dob
        gender: $gender
        email: $email
        phone_no: $phone_no
        marital_status: $marital_status
        father_name: $father_name
        mother_name: $mother_name
        husband_wife_name: $husband_wife_name
        address: $address
        aadhaar_no: $aadhaar_no
        pan_card: $pan_card
        status: $status
        photo: $photo
        photoidproof: $photoidproof
      }
    )
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation updateEmployee(
    $id: Int!
    $first_name: String
    $last_name: String
    $user_name: String
    $emp_code: String
    $joining_date: Date
    $department_type: String
    $qualification: String
    $experience: Float
    $designation: String
    $salary: Float
    $dob: Date
    $gender: String
    $email: String
    $phone_no: String
    $marital_status: String
    $father_name: String
    $mother_name: String
    $husband_wife_name: String
    $address: String
    $aadhaar_no: String
    $pan_card: String
    $status: String
    $photo: Upload
    $photoidproof: Upload
  ) {
    updateEmployee(
      updateEmployeeInput: {
        id: $id
        first_name: $first_name
        last_name: $last_name
        user_name: $user_name
        emp_code: $emp_code
        joining_date: $joining_date
        department_type: $department_type
        qualification: $qualification
        experience: $experience
        designation: $designation
        salary: $salary
        dob: $dob
        gender: $gender
        email: $email
        phone_no: $phone_no
        marital_status: $marital_status
        father_name: $father_name
        mother_name: $mother_name
        husband_wife_name: $husband_wife_name
        address: $address
        aadhaar_no: $aadhaar_no
        pan_card: $pan_card
        status: $status
        photo: $photo
        photoidproof: $photoidproof
      }
    )
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation deleteEmployee($ids: [Int]!) {
    deleteEmployee(deleteEmployeeInput: { ids: $ids })
  }
`;

export const GET_EMPLOYEE_EMAIL_EXIST = gql`
  query getEmployeeEMailExist($id: Int!, $email: String!) {
    getEmployeeEMailExist(id: $id, email: $email)
  }
`;

export const GET_EMPLOYEE_PHONE_NO_EXIST = gql`
  query getEmployeePhoneNoExist($id: Int!, $phone_no: String!) {
    getEmployeePhoneNoExist(id: $id, phone_no: $phone_no)
  }
`;

export const GET_EMPLOYEE_PAN_NO_EXIST = gql`
  query getEmployeePanNoExist($id: Int!, $pan_card: String!) {
    getEmployeePanNoExist(id: $id, pan_card: $pan_card)
  }
`;

export const GET_EMPLOYEE_AADHAAR_NO_EXIST = gql`
  query getEmployeeAadhaarNoExist($id: Int!, $aadhaar_no: String!) {
    getEmployeeAadhaarNoExist(id: $id, aadhaar_no: $aadhaar_no)
  }
`;

export const GET_EMPLOYEE_USER_NAME_EXIST = gql`
  query getEmployeeUserNameExist($id: Int!, $user_name: String!) {
    getEmployeeUserNameExist(id: $id, user_name: $user_name)
  }
`;

export const GET_LAST_EMPLOYEE = gql`
  query getLastEmployee {
    getLastEmployee {
      id
    }
  }
`;

export const GET_EMPLOYEE = gql`
  query getEmployee($id: Int!) {
    getEmployee(getEmployeeInput: { id: $id }) {
      id
      first_name
      last_name
      user_name
      emp_code
      joining_date
      department_type
      qualification
      experience
      designation
      salary
      dob
      gender
      email
      phone_no
      marital_status
      father_name
      mother_name
      husband_wife_name
      address
      aadhaar_no
      pan_card
      status
      photo
      photoidproof
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
export const GET_EMPLOYEE_LIST = gql`
  query getEmployeeList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getEmployeeList(
      getEmployeeListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      employees {
        id
        first_name
        last_name
        user_name
        emp_code
        joining_date
        department_type
        qualification
        experience
        designation
        salary
        dob
        gender
        email
        phone_no
        marital_status
        father_name
        mother_name
        husband_wife_name
        address
        aadhaar_no
        pan_card
        status
        photo
        photoidproof
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

export const GET_EMPLOYEE_ALL = gql`
  query getEmployeeAll {
    getEmployeeAll {
      id
      first_name
      last_name
      user_name
      emp_code
      joining_date
      department_type
      qualification
      experience
      designation
      salary
      dob
      gender
      email
      phone_no
      marital_status
      father_name
      mother_name
      husband_wife_name
      address
      aadhaar_no
      pan_card
      status
      photo
      photoidproof
    }
  }
`;
