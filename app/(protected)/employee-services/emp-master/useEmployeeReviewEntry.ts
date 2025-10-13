import React, { ChangeEvent, useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import EmpMasterDTO, { EMP_MASTER } from '@/app/types/EmpMasterDTO';
import {
  ADD_EMPLOYEE,
  GET_EMPLOYEE,
  UPDATE_EMPLOYEE,
  GET_EMPLOYEE_EMAIL_EXIST,
  GET_EMPLOYEE_PHONE_NO_EXIST,
  GET_EMPLOYEE_AADHAAR_NO_EXIST,
  GET_EMPLOYEE_PAN_NO_EXIST
} from '@/app/graphql/EmpMaster';
import { regExEMail, capitalizeWords } from '@/app/common/Configuration';
import { SelectChangeEvent } from '@mui/material/Select';
import LookupDTO from '@/app/types/LookupDTO';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { getLocalTime, arrGenderType, arrModulesStatus, arrMaritalStatusType } from '@/app/common/Configuration';
import dayjs from 'dayjs';
import { useSelector } from '../../../store';
import * as gConstants from '../../../constants/constants';
import * as Constants from '../../constants/constants';
import * as gMessageConstants from '../../../constants/messages-constants';
import { useSnackbar } from '../../../custom-components/SnackbarProvider';
import { validateDate } from '../../../common/validationDate';

type ErrorMessageType = {
  first_name: string | null;
  last_name: string | null;
  user_name: string | null;
  emp_code: string | null;
  joining_date: string | null;
  department_type: string | null;
  qualification: string | null;
  experience: number | null;
  designation: string | null;
  salary: number | null;
  dob: string | null;
  gender: string | null;
  email: string | null;
  phone_no: string | null;
  marital_status: string | null;
  father_name: string | null;
  mother_name: string | null;
  husband_wife_name: string | null;
  address: string | null;
  aadhaar_no: string | null;
  pan_card: string | null;
  status: string | null;
  photo: string | null;
  photoidproof: string | null;
};

type StateType = {
  dtoEmpMaster: EmpMasterDTO;
  arrGenderTypeLookup: LookupDTO[];
  arrMaritalStatusLookup: LookupDTO[];
  arrModulesStatusLookup: LookupDTO[];
  open1: boolean;
  open2: boolean;
  open3: boolean;
  isEditMode: boolean;
  errorMessages: ErrorMessageType;
};

type Props = {
  dtoEmpMaster: EmpMasterDTO;
};

const useEmployeeReviewEntry = ({ dtoEmpMaster }: Props) => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    first_name: null,
    last_name: null,
    user_name: null,
    emp_code: null,
    joining_date: null,
    department_type: null,
    qualification: null,
    experience: null,
    designation: null,
    salary: null,
    dob: null,
    gender: null,
    email: null,
    phone_no: null,
    marital_status: null,
    father_name: null,
    mother_name: null,
    husband_wife_name: null,
    address: null,
    aadhaar_no: null,
    pan_card: null,
    status: null,
    photo: null,
    photoidproof: null
  });

  const INITIAL_STATE: StateType = Object.freeze({
    dtoEmpMaster: dtoEmpMaster,
    arrGenderTypeLookup: arrGenderType,
    arrMaritalStatusLookup: arrMaritalStatusType,
    arrModulesStatusLookup: arrModulesStatus,
    open1: false,
    open2: false,
    open3: false,
    isEditMode: false,
    errorMessages: { ...ERROR_MESSAGES }
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };
  const showSnackbar = useSnackbar();
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [saving, setSaving] = useState(false);
  const [emailCopy, setEmailCopy] = useState('');
  const [phoneCopy, setPhoneCopy] = useState('');
  const { isEditMode } = useSelector((state) => state.siteConfigState);
  const [addEmployee] = useMutation(ADD_EMPLOYEE, {});
  const [getEmployeeEMailExist] = useLazyQuery(GET_EMPLOYEE_EMAIL_EXIST, { fetchPolicy: 'network-only' });
  const [getEmployeePhoneNoExist] = useLazyQuery(GET_EMPLOYEE_PHONE_NO_EXIST, { fetchPolicy: 'network-only' });
  const [getEmployeePanNoExist] = useLazyQuery(GET_EMPLOYEE_PAN_NO_EXIST, { fetchPolicy: 'network-only' });
  const [getEmployeeAadhaarNoExist] = useLazyQuery(GET_EMPLOYEE_AADHAAR_NO_EXIST, { fetchPolicy: 'network-only' });
  const [getEmployee] = useLazyQuery(GET_EMPLOYEE, { fetchPolicy: 'network-only' });
  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {});

  useEffect(() => {
    if (
      state.arrModulesStatusLookup.length > 0 &&
      !state.dtoEmpMaster.status
    ) {
      const firstItem = state.arrModulesStatusLookup[0];
      setState({
        ...state,
        dtoEmpMaster: {
          ...state.dtoEmpMaster,
          status: firstItem.text, // or firstItem.id if you store status by id
        }
      });
    }
  }, [state.arrModulesStatusLookup]);

  const getData = useCallback(async (): Promise<void> => {
    try {
      let dtoEmpMaster: EmpMasterDTO = EMP_MASTER;
      const { error, data } = await getEmployee({
        variables: {
          id: state.dtoEmpMaster.id
        }
      });
      if (!error && data) {
        dtoEmpMaster = data.getEmployee;
      }
      setEmailCopy(data.getEmployee.email);
      setPhoneCopy(data.getEmployee.phone_no);
      setState({ dtoEmpMaster: dtoEmpMaster } as StateType);
    } catch (err) {
      console.error('Error loading quiz question:', err);
      showSnackbar(gMessageConstants.SNACKBAR_DATA_FETCH_ERROR, 'error');
    }
  }, [getEmployee, state.dtoEmpMaster.id]);

  useEffect(() => {
    if (state.dtoEmpMaster.id > 0) {
      getData();
    }
  }, [state.dtoEmpMaster.id, getData]);

  const IsEMailExist = useCallback(async (): Promise<boolean> => {
    if (isEditMode && emailCopy.trim() === state.dtoEmpMaster.email.trim()) {
      return false;
    }
    let exist: boolean = false;
    const { error, data } = await getEmployeeEMailExist({
      variables: {
        id: state.dtoEmpMaster.id,
        email: state.dtoEmpMaster.email
      }
    });
    if (!error && data) {
      exist = data.getEmployeeEMailExist;
    }
    return exist;
  }, [getEmployeeEMailExist, state.dtoEmpMaster.id, state.dtoEmpMaster.email, isEditMode, emailCopy]);

  const IsPhoneNoExist = useCallback(async (): Promise<boolean> => {
    if (isEditMode && phoneCopy.trim() === state.dtoEmpMaster.phone_no.trim()) {
      return false;
    }
    let exist: boolean = false;
    const { error, data } = await getEmployeePhoneNoExist({
      variables: {
        id: state.dtoEmpMaster.id,
        phone_no: state.dtoEmpMaster.phone_no
      }
    });
    if (!error && data) {
      exist = data.getEmployeePhoneNoExist;
    }
    return exist;
  }, [getEmployeePhoneNoExist, state.dtoEmpMaster.id, state.dtoEmpMaster.phone_no, isEditMode, phoneCopy]);

  // ***THIS CODE WILL BE USED IN FUTURE 
  // const IsUserNameExist = useCallback(async (): Promise<boolean> => {
  //   if (isEditMode && userNameCopy.trim() === state.dtoEmpMaster.user_name.trim()) {
  //     return false;
  //   }
  //   let exist: boolean = false;
  //   const { error, data } = await getEmployeeUserNameExist({
  //     variables: {
  //       id: state.dtoEmpMaster.id,
  //       user_name: state.dtoEmpMaster.user_name
  //     }
  //   });
  //   if (!error && data) {
  //     exist = data.getEmployeeUserNameExist;
  //   }
  //   return exist;
  // }, [getEmployeeUserNameExist, state.dtoEmpMaster.id, state.dtoEmpMaster.user_name, isEditMode, userNameCopy]);

  const isPanNoExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getEmployeePanNoExist({
      variables: {
        id: state.dtoEmpMaster.id,
        pan_card: state.dtoEmpMaster.pan_card
      }
    });
    if (!error && data) {
      exist = data.getEmployeePanNoExist;
    }
    return exist;
  }, [getEmployeePanNoExist, state.dtoEmpMaster.id, state.dtoEmpMaster.pan_card]);

  const isAadhaarNoExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const { error, data } = await getEmployeeAadhaarNoExist({
      variables: {
        id: state.dtoEmpMaster.id,
        email: state.dtoEmpMaster.aadhaar_no
      }
    });
    if (!error && data) {
      exist = data.getEmployeeAadhaarNoExist;
    }
    return exist;
  }, [getEmployeeAadhaarNoExist, state.dtoEmpMaster.id, state.dtoEmpMaster.aadhaar_no]);

  const onEmployeeStatusChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoEmpMaster: {
          ...state.dtoEmpMaster,
          status: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoEmpMaster]
  );

  const onCodeChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value.toUpperCase();
      value = value.replace(/[^A-Z0-9]/g, "");
      setState({
        dtoEmpMaster: {
          ...state.dtoEmpMaster,
          emp_code: value,
        },
      } as StateType);
    },
    [state.dtoEmpMaster]
  );

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const capitalizedValue = capitalizeWords(value);
      setState({
        dtoEmpMaster: {
          ...state.dtoEmpMaster,
          [name]: capitalizedValue
        }
      } as StateType);
    },
    [state.dtoEmpMaster]
  );

  const onPanNoInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;

      // Force PAN number to uppercase only
      const updatedValue =
        name === 'pan_card' ? value.toUpperCase() : capitalizeWords(value);

      setState({
        dtoEmpMaster: {
          ...state.dtoEmpMaster,
          [name]: updatedValue
        }
      } as StateType);
    },
    [state.dtoEmpMaster]
  );

  const onNormalizedInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const formattedValue = value.replace(/\s+/g, '').toLowerCase();
      setState({
        dtoEmpMaster: {
          ...state.dtoEmpMaster,
          [name]: formattedValue
        }
      } as StateType);
    },
    [state.dtoEmpMaster]
  );

  const onSelectChange = useCallback(
    async (event: SelectChangeEvent<unknown>) => {
      setState({
        dtoEmpMaster: {
          ...state.dtoEmpMaster,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoEmpMaster]
  );

  const validateFirstName = useCallback(async () => {
    if (state.dtoEmpMaster.first_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoEmpMaster.first_name]);

  const onFirstNameBlur = useCallback(async () => {
    const first_name = await validateFirstName();
    setState({ errorMessages: { ...state.errorMessages, first_name: first_name } } as StateType);
  }, [validateFirstName, state.errorMessages]);

  const validateLastName = useCallback(async () => {
    if (state.dtoEmpMaster.last_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoEmpMaster.last_name]);

  const onLastNameBlur = useCallback(async () => {
    const last_name = await validateLastName();
    setState({ errorMessages: { ...state.errorMessages, last_name: last_name } } as StateType);
  }, [validateLastName, state.errorMessages]);

  // const validateUserName = useCallback(async () => {
  //   if (state.dtoEmpMaster.user_name.trim() === '') {
  //     return gMessageConstants.REQUIRED_FIELD;
  //   } else if (await IsUserNameExist()) {
  //     return 'User name already exists';
  //   } else {
  //     return null;
  //   }
  // }, [state.dtoEmpMaster.user_name, IsUserNameExist]);

  // const onUserNameBlur = useCallback(async () => {
  //   const user_name = await validateUserName();
  //   setState({ errorMessages: { ...state.errorMessages, user_name: user_name } } as StateType);
  // }, [validateUserName, state.errorMessages]);

  const validateEmpCode = useCallback(async () => {
    if (state.dtoEmpMaster.emp_code.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoEmpMaster.emp_code]);

  const onEmpCodeBlur = useCallback(async () => {
    const emp_code = await validateEmpCode();
    setState({ errorMessages: { ...state.errorMessages, emp_code: emp_code } } as StateType);
  }, [validateEmpCode, state.errorMessages]);

  const validateJoiningDate = useCallback(async () => {
    if (
      state.dtoEmpMaster.joining_date == null ||
      dayjs(getLocalTime(state.dtoEmpMaster.joining_date)).format('MM/DD/YYYY') === '12/31/1899'
    ) {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoEmpMaster.joining_date]);

  const onJoiningDateBlur = useCallback(async () => {
    const joining_date = await validateJoiningDate();
    setState({ errorMessages: { ...state.errorMessages, joining_date: joining_date } } as StateType);
  }, [validateJoiningDate, state.errorMessages]);

  const validateDeptType = useCallback(async () => {
    if (state.dtoEmpMaster.department_type.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoEmpMaster.department_type]);

  const onDeptTypeBlur = useCallback(async () => {
    const department_type = await validateDeptType();
    setState({ errorMessages: { ...state.errorMessages, department_type: department_type } } as StateType);
  }, [validateDeptType, state.errorMessages]);

  const validateQualification = useCallback(async () => {
    if (state.dtoEmpMaster.qualification.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoEmpMaster.qualification]);

  const onQualificationBlur = useCallback(async () => {
    const qualification = await validateQualification();
    setState({ errorMessages: { ...state.errorMessages, qualification: qualification } } as StateType);
  }, [validateQualification, state.errorMessages]);

  const validateExperience = useCallback(async () => {
    const exp = state.dtoEmpMaster.experience;
    if (isNaN(Number(exp)) || exp === null || exp === undefined) {
      return gMessageConstants.REQUIRED_FIELD;
    }
    return null;
  }, [state.dtoEmpMaster.experience]);

  const onExperienceBlur = useCallback(async () => {
    const experience = await validateExperience();
    setState({ errorMessages: { ...state.errorMessages, experience: experience } } as StateType);
  }, [validateExperience, state.errorMessages]);

  const validateDesignation = useCallback(async () => {
    if (state.dtoEmpMaster.designation.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoEmpMaster.designation]);

  const onDesignationBlur = useCallback(async () => {
    const designation = await validateDesignation();
    setState({ errorMessages: { ...state.errorMessages, designation: designation } } as StateType);
  }, [validateDesignation, state.errorMessages]);

  const validateSalary = useCallback(async () => {
    if (state.dtoEmpMaster.salary == 0) {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoEmpMaster.salary]);

  const onSalaryBlur = useCallback(async () => {
    const salary = await validateSalary();
    setState({ errorMessages: { ...state.errorMessages, salary: salary } } as StateType);
  }, [validateSalary, state.errorMessages]);

  const validateDob = useCallback(() => {
    return validateDate({
      value: state.dtoEmpMaster.dob,
    });
  }, [state.dtoEmpMaster.dob]);

  const onDobBlur = useCallback(async () => {
    const dob = await validateDob();
    setState({ errorMessages: { ...state.errorMessages, dob: dob } } as StateType);
  }, [validateDob, state.errorMessages]);

  const validateGender = useCallback(async () => {
    if (state.dtoEmpMaster.gender.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoEmpMaster.gender]);

  const onGenderBlur = useCallback(async () => {
    const gender = await validateGender();
    setState({ errorMessages: { ...state.errorMessages, gender: gender } } as StateType);
  }, [validateGender, state.errorMessages]);

  const validateEMailId = useCallback(async () => {
    if (state.dtoEmpMaster.email.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else if (!state.dtoEmpMaster.email.trim().match(regExEMail)) {
      return gMessageConstants.INVALID;
    } else if (await IsEMailExist()) {
      return 'E-Mail already exists';
    } else {
      return null;
    }
  }, [state.dtoEmpMaster.email, IsEMailExist]);

  const onEMailIdBlur = useCallback(async () => {
    const email = await validateEMailId();
    setState({ errorMessages: { ...state.errorMessages, email: email } } as StateType);
  }, [validateEMailId, state.errorMessages]);

  const validatePhoneNo = useCallback(async () => {
    if (!isValidPhoneNumber(state.dtoEmpMaster.phone_no.trim())) {
      return 'Phone # is invalid';
    } else if (await IsPhoneNoExist()) {
      return 'Phone No. already exists';
    } else {
      return null;
    }
  }, [state.dtoEmpMaster.phone_no, IsPhoneNoExist]);

  const onPhoneNoBlur = useCallback(async () => {
    const phone_no = await validatePhoneNo();
    setState({ errorMessages: { ...state.errorMessages, phone_no: phone_no } } as StateType);
  }, [validatePhoneNo, state.errorMessages]);

  const validateFatherName = useCallback(async () => {
    if (state.dtoEmpMaster.father_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoEmpMaster.father_name]);

  const onFatherNameBlur = useCallback(async () => {
    const father_name = await validateFatherName();
    setState({ errorMessages: { ...state.errorMessages, father_name: father_name } } as StateType);
  }, [validateFatherName, state.errorMessages]);

  const validateMotherName = useCallback(async () => {
    if (state.dtoEmpMaster.mother_name.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoEmpMaster.mother_name]);

  const onMotherNameBlur = useCallback(async () => {
    const mother_name = await validateMotherName();
    setState({ errorMessages: { ...state.errorMessages, mother_name: mother_name } } as StateType);
  }, [validateMotherName, state.errorMessages]);

  const validateAddress = useCallback(async () => {
    if (state.dtoEmpMaster.address.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoEmpMaster.address]);

  const onAddressBlur = useCallback(async () => {
    const address = await validateAddress();
    setState({ errorMessages: { ...state.errorMessages, address: address } } as StateType);
  }, [validateAddress, state.errorMessages]);

  const validateAadhaarNo = useCallback(async () => {
    const aadhaar = state.dtoEmpMaster.aadhaar_no.trim();
    if (aadhaar === '') {
      return gMessageConstants.REQUIRED_FIELD;
    }
    if (!/^\d{12}$/.test(aadhaar)) {
      return gMessageConstants.INVALID;
    }
    if (/^(\d)\1{11}$/.test(aadhaar)) {
      return gMessageConstants.INVALID;
    }
    if (await isAadhaarNoExist()) {
      return 'Aadhaar No. Already Exist';
    }
    return null;
  }, [state.dtoEmpMaster.aadhaar_no, isAadhaarNoExist]);

  const onAadhaarNoBlur = useCallback(async () => {
    const aadhaar_no = await validateAadhaarNo();
    setState({ errorMessages: { ...state.errorMessages, aadhaar_no: aadhaar_no } } as StateType);
  }, [validateAadhaarNo, state.errorMessages]);

  const validatePanNo = useCallback(async () => {
    const pan = state.dtoEmpMaster.pan_card.trim();
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/i.test(pan)) {
      return gMessageConstants.INVALID;
    }
    if (/^([A-Z0-9])\1{9}$/i.test(pan)) {
      return gMessageConstants.INVALID;
    }
    if (await isPanNoExist()) {
      return 'Pan No. Already Exist';
    }
    return null;
  }, [state.dtoEmpMaster.pan_card, isPanNoExist]);

  const onPanNoBlur = useCallback(async () => {
    const pan_card = await validatePanNo();
    setState({ errorMessages: { ...state.errorMessages, pan_card: pan_card } } as StateType);
  }, [validatePanNo, state.errorMessages]);

  const validateStatus = useCallback(async () => {
    if (state.dtoEmpMaster.status.trim() === '') {
      return gMessageConstants.REQUIRED_FIELD;
    } else {
      return null;
    }
  }, [state.dtoEmpMaster.status]);

  const onStatusBlur = useCallback(async () => {
    const status = await validateStatus();
    setState({ errorMessages: { ...state.errorMessages, status: status } } as StateType);
  }, [validateStatus, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = { ...ERROR_MESSAGES };
    errorMessages.first_name = await validateFirstName();
    if (errorMessages.first_name) {
      isFormValid = false;
    }
    errorMessages.last_name = await validateLastName();
    if (errorMessages.last_name) {
      isFormValid = false;
    }
    errorMessages.emp_code = await validateEmpCode();
    if (errorMessages.emp_code) {
      isFormValid = false;
    }
    errorMessages.email = await validateEMailId();
    if (errorMessages.email) {
      isFormValid = false;
    }
    errorMessages.phone_no = await validatePhoneNo();
    if (errorMessages.phone_no) {
      isFormValid = false;
    }
    errorMessages.dob = await validateDob();
    if (errorMessages.dob) {
      isFormValid = false;
    }
    errorMessages.gender = await validateGender();
    if (errorMessages.gender) {
      isFormValid = false;
    }
    errorMessages.joining_date = await validateJoiningDate();
    if (errorMessages.joining_date) {
      isFormValid = false;
    }
    errorMessages.pan_card = await validatePanNo();
    if (errorMessages.pan_card) {
      isFormValid = false;
    }
    errorMessages.aadhaar_no = await validateAadhaarNo();
    if (errorMessages.aadhaar_no) {
      isFormValid = false;
    }

    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [
    ERROR_MESSAGES,
    validateEmpCode,
    validateAadhaarNo,
    validatePanNo,
    validateFirstName,
    validateLastName,
    validateEMailId,
    validateDob,
    validateGender,
    validateJoiningDate,
    validatePhoneNo
  ]);

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/${Constants.ADMIN_EMP_DASHBOARD}/emp-master/list`);
    },
    [router]
  );

  const setOpen1 = useCallback(async (): Promise<void> => {
    setState({ open1: true } as StateType);
  }, []);
  const setOpen2 = useCallback(async (): Promise<void> => {
    setState({ open2: true } as StateType);
  }, []);

  const setOpen3 = useCallback(async (): Promise<void> => {
    setState({ open3: true } as StateType);
  }, []);
  const setClose1 = useCallback(async (): Promise<void> => {
    setState({ open1: false } as StateType);
  }, []);

  const setClose2 = useCallback(async (): Promise<void> => {
    setState({ open2: false } as StateType);
  }, []);
  const setClose3 = useCallback(async (): Promise<void> => {
    setState({ open3: false } as StateType);
  }, []);

  const onPhoneNoChange = useCallback(
    async (value: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setState({
        dtoEmpMaster: {
          ...state.dtoEmpMaster,
          phone_no: value
        }
      } as StateType);
    },
    [state.dtoEmpMaster]
  );

  const onDobChange = useCallback(
    async (value: any): Promise<void> => {
      setState({ dtoEmpMaster: { ...state.dtoEmpMaster, dob: value } } as StateType);
    },
    [state.dtoEmpMaster]
  );

  const onJoiningDateChange = useCallback(
    async (value: any): Promise<void> => {
      setState({ dtoEmpMaster: { ...state.dtoEmpMaster, joining_date: value } } as StateType);
    },
    [state.dtoEmpMaster]
  );

  const onGenderChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoEmpMaster: {
          ...state.dtoEmpMaster,
          gender: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoEmpMaster]
  );

  const onMaritalStatusChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoEmpMaster: {
          ...state.dtoEmpMaster,
          marital_status: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoEmpMaster]
  );

  const onAadhaarNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, '');

    if (digitsOnly.length <= gConstants.AADHAAR_NO_LENGTH) {
      onInputChange({
        ...e,
        target: { ...e.target, value: digitsOnly, name: 'aadhaar_no' }
      });
    }
  };

  const onExperienceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/[^0-9.]/g, '');
    value = value.replace(/(\..*?)\..*/g, '$1');
    onInputChange({
      ...e,
      target: { ...e.target, value, name: 'experience' }
    });
  };

  const onSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, '');
    if (digitsOnly.length <= gConstants.ZIP_CODE_LENGTH) {
      onInputChange({
        ...e,
        target: { ...e.target, value: digitsOnly, name: 'salary' }
      });
    }
  };

  const handleDocumentUpload = useCallback(
    async (event: React.ChangeEvent<any>, field: keyof EmpMasterDTO) => {
      const files = event.target.files;
      if (!files || files.length === 0) return;

      try {
        if (gConstants.IS_CLOUD_STORAGE_ENABLED) {
          setState({
            dtoEmpMaster: {
              ...state.dtoEmpMaster,
              [field]: files[0]
            }
          } as StateType);
        } else {
          setState({
            dtoEmpMaster: {
              ...state.dtoEmpMaster,
              [field]: null
            }
          } as StateType);
        }
      } catch (error) {
        console.error('GraphQL upload failed:', error);
      }
    },
    [state, setState]
  );

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (saving) return;
      setSaving(true);
      try {
        if (await validateForm()) {
          if (state.dtoEmpMaster.id === 0) {
            const { data } = await addEmployee({
              variables: {
                first_name: state.dtoEmpMaster.first_name,
                last_name: state.dtoEmpMaster.last_name,
                user_name: state.dtoEmpMaster.user_name,
                emp_code: state.dtoEmpMaster.emp_code,
                joining_date: state.dtoEmpMaster.joining_date,
                department_type: state.dtoEmpMaster.department_type,
                qualification: state.dtoEmpMaster.qualification,
                experience: Number(state.dtoEmpMaster.experience),
                designation: state.dtoEmpMaster.designation,
                salary: Number(state.dtoEmpMaster.salary),
                dob: state.dtoEmpMaster.dob,
                gender: state.dtoEmpMaster.gender,
                email: state.dtoEmpMaster.email,
                phone_no: state.dtoEmpMaster.phone_no,
                marital_status: state.dtoEmpMaster.marital_status,
                father_name: state.dtoEmpMaster.father_name,
                mother_name: state.dtoEmpMaster.mother_name,
                husband_wife_name: state.dtoEmpMaster.husband_wife_name,
                address: state.dtoEmpMaster.address,
                aadhaar_no: state.dtoEmpMaster.aadhaar_no,
                pan_card: state.dtoEmpMaster.pan_card,
                status: state.dtoEmpMaster.status,
                photo: state.dtoEmpMaster.photo,
                photoidproof: state.dtoEmpMaster.photoidproof
              }
            });
            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_INSERT_RECORD, 'success');
              router.push(`/${Constants.ADMIN_EMP_DASHBOARD}/emp-master/list`);
            }
          } else {
            const { data } = await updateEmployee({
              variables: {
                id: state.dtoEmpMaster.id,
                first_name: state.dtoEmpMaster.first_name,
                last_name: state.dtoEmpMaster.last_name,
                user_name: state.dtoEmpMaster.user_name,
                emp_code: state.dtoEmpMaster.emp_code,
                joining_date: state.dtoEmpMaster.joining_date,
                department_type: state.dtoEmpMaster.department_type,
                qualification: state.dtoEmpMaster.qualification,
                experience: Number(state.dtoEmpMaster.experience),
                designation: state.dtoEmpMaster.designation,
                salary: Number(state.dtoEmpMaster.salary),
                dob: state.dtoEmpMaster.dob,
                gender: state.dtoEmpMaster.gender,
                email: state.dtoEmpMaster.email,
                phone_no: state.dtoEmpMaster.phone_no,
                marital_status: state.dtoEmpMaster.marital_status,
                father_name: state.dtoEmpMaster.father_name,
                mother_name: state.dtoEmpMaster.mother_name,
                husband_wife_name: state.dtoEmpMaster.husband_wife_name,
                address: state.dtoEmpMaster.address,
                aadhaar_no: state.dtoEmpMaster.aadhaar_no,
                pan_card: state.dtoEmpMaster.pan_card,
                status: state.dtoEmpMaster.status,
                photo: state.dtoEmpMaster.photo,
                photoidproof: state.dtoEmpMaster.photoidproof
              }
            });

            if (data) {
              showSnackbar(gMessageConstants.SNACKBAR_UPDATE_RECORD, 'success');
              router.push(`/${Constants.ADMIN_EMP_DASHBOARD}/emp-master/list`);
            }
          }
        }
      } catch (error: any) {
        console.error('Error while saving profile:', error);
        showSnackbar(gMessageConstants.SNACKBAR_INSERT_FAILED, 'error');
      } finally {
        setSaving(false);
      }
    },
    [validateForm, addEmployee, state.dtoEmpMaster, router, updateEmployee]
  );

  const onClearClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setState({ dtoEmpMaster: { ...EMP_MASTER, id: state.dtoEmpMaster.id }, errorMessages: { ...ERROR_MESSAGES } } as StateType);
    },
    [state.dtoEmpMaster.id, ERROR_MESSAGES]
  );

  return {
    state,
    saving,
    onClearClick,
    onEMailIdBlur,
    onLastNameBlur,
    onFirstNameBlur,
    onDobBlur,
    onJoiningDateBlur,
    onGenderBlur,
    onStatusBlur,
    onSelectChange,
    onInputChange,
    onPanNoInputChange,
    onNormalizedInputChange,
    onDobChange,
    onJoiningDateChange,
    onGenderChange,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    setOpen3,
    setClose3,
    onPhoneNoChange,
    onPhoneNoBlur,
    handleDocumentUpload,
    onSaveClick,
    onCancelClick,
    onEmployeeStatusChange,
    onAadhaarNoBlur,
    onAadhaarNoChange,
    onMotherNameBlur,
    onFatherNameBlur,
    onEmpCodeBlur,
    onCodeChange,
    onDeptTypeBlur,
    onQualificationBlur,
    onExperienceBlur,
    onDesignationBlur,
    onSalaryBlur,
    onAddressBlur,
    onPanNoBlur,
    onExperienceChange,
    onSalaryChange,
    onMaritalStatusChange
  };
};
export default useEmployeeReviewEntry;
