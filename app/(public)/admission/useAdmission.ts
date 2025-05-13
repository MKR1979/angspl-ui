import React, { ChangeEvent, useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import AdmissionDTO, { ADMISSION } from '@/app/types/AdmissionDTO';
import { COUNTRY_LOOKUP } from '@/app/graphql/Country';
import { STATE_LOOKUP } from '@/app/graphql/state';
import CourseAllDTO from '@/app/types/CourseAllDTO';
import { COURSE_LOOKUP,COURSE_LIST_ALL } from '@/app/graphql/Course';
import {
  ADD_ADMISSION,
  GET_LAST_ADMISSION
  // GET_ADMISSION_EMAIL_EXIST,  
  // GET_ADMISSION_PHONE_NO_EXIST,
 } from '@/app/graphql/Admission';
import { ADD_PAYMENT } from "@/app/graphql/Payment";
import { regExEMail } from '@/app/common/Configuration';
import { SelectChangeEvent } from '@mui/material/Select';
import LookupDTO from '@/app/types/LookupDTO';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { getLocalTime } from '@/app/common/Configuration';
import {arrGenderType} from '@/app/common/Configuration';
import accounting from 'accounting';
import dayjs from 'dayjs';
import * as constants from '../constants/constants'
import PaymentDTO, { PAYMENT } from "@/app/types/PaymentDTO";
import * as gConstants from '../../constants/constants';

type ErrorMessageType = {
  course_id: string | null;
  course_name: string | null;
  admission_date:string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone_no: string | null;
  dob: string | null;
  gender: string | null;
  address: string | null;
  city_name : string | null;
  state_id : number | null;
  state_name : string | null;
  country_id: string | null;
  country_name: string | null;
  zip_code : string | null;
  highschoolname: string | null;
  highschoolpercentage: number | null;
  highersschoolname: string | null;
  highersschoolpercentage: number | null;
  graduationname: string | null;
  graduationpercentage: number | null; 
  tenthproof: string | null;
  twelthproof: string | null;
  graduationproof: string | null;
  photoidproof: string | null;
  photo: string | null;
};

type StateType = {
  dtoAdmission: AdmissionDTO;
  arrStateLookup: LookupDTO[];
  arrCountryLookup: LookupDTO[];
  arrCourseLookup: LookupDTO[];
  arrCourseListAll: CourseAllDTO[];
  arrGenderTypeLookup: LookupDTO[];
    dtoPayment: PaymentDTO;
  open1: boolean;
  open2: boolean;
  open3: boolean;
  open4: boolean;
  errorMessages: ErrorMessageType;
};

const useAdmission = () => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    course_id: null,
    course_name: null,
    admission_date: null,
    first_name:  null,
    last_name: null,
    email:  null,
    phone_no: null,
    dob: null,
    gender: null,
    address: null,
    city_name : null,
    state_id : null,
    state_name : null,
    country_id: null,
    country_name: null,
    zip_code : null,
    highschoolname: null,
    highschoolpercentage: null,
    highersschoolname: null,
    highersschoolpercentage: null, 
    graduationname: null,
    graduationpercentage: null,
    tenthproof: null,
    twelthproof: null,
    graduationproof: null,
    photoidproof: null,
    photo: null,
  });

  const INITIAL_STATE: StateType = Object.freeze({
    dtoAdmission: ADMISSION,
    arrStateLookup: [] as LookupDTO[],
    arrCountryLookup: [] as LookupDTO[],
    arrCourseLookup: [] as LookupDTO[],
    arrCourseListAll: [] as CourseAllDTO[],
    arrGenderTypeLookup: arrGenderType,
    dtoPayment: PAYMENT,
    open1: false,
    open2: false,
    open3: false,
    open4: false,
    errorMessages: { ...ERROR_MESSAGES }
  });
  const [submitted, setSubmitted] = useState(false);
  const [selectedCoursePrice, setSelectedCoursePrice] = useState(0);
  
  const [is10threq, setIs10thReq] = useState<boolean>(false);;
  const [is12threq, setIs12thReq] = useState<boolean>(false);;
  const [isgradreq, setIsGradReq] = useState<boolean>(false);;
  const [ispgreq, setIsPGReq] = useState<boolean>(false);;
  const [isphotoidreq, setIsPhotoIdReq] = useState<boolean>(false);;
  const [admissionNumber, setAdmissionNumber] = useState<string | null>(null);
  
  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

   useEffect(() => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => console.log("Razorpay script loaded successfully.");
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }, []);
    const [addPayment] = useMutation(ADD_PAYMENT);
    const addPaymentDetails = useCallback(async ( response: any, price: number) => {
        try {
          await addPayment({
            variables: {
              user_id: 1,
              payee_name: `${state.dtoAdmission.first_name}+" "+${state.dtoAdmission.last_name}`,
              amount: price,
              currency: constants.CURRENCY,
              receipt:'',
              payment_method:'',
              transaction_id:'', 
              is_captured: false,
              status: "",
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature        
            },
          });
        } catch (error) {
          console.error("Error adding payment:", error);
        }
      }, [state, addPayment]);

      
    const handlePayNow = (course: string, fee: number) => {
      if (!(window as any).Razorpay) {
        console.error("Razorpay SDK not loaded properly.");
        return;
      }
  
      const options = {
        key: "rzp_live_vTH9iKzUiECb9F", // Replace with your Razorpay key
        amount: fee * 100, // Razorpay amount should be in paise
        currency: "INR",
        name: "Adhyayan Programming Institute",
        description: `Payment for ${course}`,
        handler: async (response: any) => {
          await addPaymentDetails(response, fee);
          router.push("/receipt");
        },
        prefill: {
          name: name,
          email: "aitm.help@gmail.com", // Fetch student email dynamically
          contact: "8750779557", // Fetch dynamically
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    };
  //

  const [addAdmission] = useMutation(ADD_ADMISSION, {});
//----------------------this code will be used by other time------------------------------
  // const [getAdmissionEMailExist] = useLazyQuery(GET_ADMISSION_EMAIL_EXIST, {
  //   fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  // });

  // const [getAdmissionPhoneNoExist] = useLazyQuery(GET_ADMISSION_PHONE_NO_EXIST, {
  //   fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  // });

  // const IsEMailExist = useCallback(async (): Promise<boolean> => {
  //   let exist: boolean = false;
  //   const { error, data } = await getAdmissionEMailExist({
  //     variables: {
  //       id: state.dtoAdmission.id,
  //       email: state.dtoAdmission.email
  //     }
  //   });
  //   if (!error && data) {
  //     exist = data.getAdmissionEMailExist;
  //   }
  //   return exist;
  // }, [getAdmissionEMailExist, state.dtoAdmission.id, state.dtoAdmission.email]);
  
  const [getCourseLookup] = useLazyQuery(COURSE_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });
   const [getCountryLookup] = useLazyQuery(COUNTRY_LOOKUP, {
     fetchPolicy: 'network-only' // Doesn't check cache before making a network request
   });
   const [getStateLookup] = useLazyQuery(STATE_LOOKUP, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const [getLastAdmission] = useLazyQuery(GET_LAST_ADMISSION, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  });

  const getLastAdmissionId = useCallback(async (): Promise<void> => {
    try {
      const { error, data } = await getLastAdmission();
      
      if (error) {
        console.error("GraphQL error:", error);
        return;
      }
  
      const admissionId = Number(data?.getLastAdmission?.id ?? 0)+1;
      
      setAdmissionNumber(constants.ADMISSION_PREFIX+admissionId);
    } catch (err) {
      console.error("Error fetching last admission ID:", err);
    }
  }, [getLastAdmission]);

  //----------all courses---------  
  const [getCourseListAll] = useLazyQuery(COURSE_LIST_ALL, {
    fetchPolicy: 'network-only' // Doesn't check cache before making a network request
  }); 
  //  const getCourses = useCallback(async (): Promise<void> => {
  //   //setState({ isLoading: true } as StateType);
  //   let arrCourseAllDTO: CourseAllDTO[] = [];
  //   const { error, data } = await getCourseListAll();
  //   if (!error && data?.getCourseListAll) {
  //     arrCourseAllDTO = data.getCourseListAll.map((item: CourseAllDTO) => {
  //       return { ...item, id: parseInt(item.id.toString()), course_name:item.course_name, course_code:item.course_code,price: item.price };
  //     });
  //   }
  //   setState({
  //     arrCourseListAll: arrCourseAllDTO} as StateType);
  // }, [getCourseListAll]);

  const getCourses = useCallback(async (): Promise<void> => {
    let arrCourseAllDTO: CourseAllDTO[] = [];
  
    const { error, data } = await getCourseListAll();
  
    if (!error && data?.getCourseListAll) {
      arrCourseAllDTO = data.getCourseListAll.map((item: CourseAllDTO, index: number) => {
        return {
          ...item,
          id: item.id ? parseInt(item.id.toString()) : index, // Ensure ID is numeric and fallback to index
          course_name: item.course_name,
          course_code: item.course_code,
          price: item.price
        };
      });
    }
  
    setState({
      arrCourseListAll: arrCourseAllDTO
    } as StateType);
  }, [getCourseListAll]);
  

  //#----------Lookups---------
  const getCourseList = useCallback(async (): Promise<void> => {
    let arrCourseLookup: LookupDTO[] = [];
    const { error, data } = await getCourseLookup();
      if (!error && data) {
      arrCourseLookup = data.getCourseLookup;     
    }
    setState({ arrCourseLookup: arrCourseLookup } as StateType);
  }, [getCourseLookup]);

  const getCountryList = useCallback(async (): Promise<void> => {
      let arrCountryLookup: LookupDTO[] = [];
      const { error, data } = await getCountryLookup();
      if (!error && data) {
        arrCountryLookup = data.getCountryLookup;
      }
      setState({ arrCountryLookup: arrCountryLookup } as StateType);
    }, [getCountryLookup]);
  
    const getStateList = useCallback(async (): Promise<void> => {
        let arrStateLookup: LookupDTO[] = [];
        const { error, data } = await getStateLookup({
          variables: {
            country_id: state.dtoAdmission.country_id
          }
        });
        if (!error && data) {
          arrStateLookup = data.getStateLookup;
        }
        setState({ arrStateLookup: arrStateLookup } as StateType);
      }, [getStateLookup, state.dtoAdmission.country_id]);

  const isValidPercentage = (value: string | number): boolean => {
    const num = typeof value === "string" ? parseFloat(value) : value;
    return !isNaN(num) && num >= gConstants.PERCENTAGE_LOWER && num <= gConstants.PERCENTAGE_HIGHEST;
  };

  
  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
  
      // Step 1: Update error if percentage field
      if (
        name === "highschoolpercentage" ||
        name === "highersschoolpercentage" ||
        name === "graduationpercentage"
      ) {
        const valid = isValidPercentage(value);
        setState({
          dtoAdmission: {
            ...state.dtoAdmission,
          },
          errorMessages: {
            ...state.errorMessages,
            [name]: valid ? "" : "Percentage must be between 33 and 99",
          },
        } as StateType);
      }
  
      // Step 2: Original state logic (no removal, just added before switch)
      setState({
        dtoAdmission: {
          ...state.dtoAdmission,
          [name]:
            name === "highschoolpercentage" ||
            name === "highersschoolpercentage" ||
            name === "graduationpercentage"
              ? Number(value)
              : value,
        },
      } as StateType);
  
      switch (name) {
        case "highschoolpercentage":
          setState({
            dtoAdmission: {
              ...state.dtoAdmission,
              [name]: parseFloat(accounting.toFixed(parseFloat(value), 2)),
            },
          } as StateType);
          break;
  
        case "highersschoolpercentage":
        case "graduationpercentage":
          setState({
            dtoAdmission: {
              ...state.dtoAdmission,
              [name]: parseInt(value),
            },
          } as StateType);
          break;
  
        default:
          setState({
            dtoAdmission: {
              ...state.dtoAdmission,
              [name]: value,
            },
          } as StateType);
      }
    },
    [state.dtoAdmission,state.errorMessages]
  );
  
  
 const onSelectChange = useCallback(
    async (event: SelectChangeEvent<unknown>) => {
      setState({
        dtoAdmission: {
          ...state.dtoAdmission,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoAdmission]
  );

  const validateCourseId = useCallback(async () => {
    if (state.dtoAdmission.course_id === 0) {
      return 'Course ID is required';
    } else {
      return null;
    }
  }, [state.dtoAdmission.course_id]);

  const validateCountryId = useCallback(async () => {
    if (state.dtoAdmission.country_id === 0) {
      return 'Country ID is required';
    } else {
      return null;
    }
  }, [state.dtoAdmission.country_id]);

  const validateFirstName = useCallback(async () => {
    if (state.dtoAdmission.first_name.trim() === '') {
      return 'First Name is required';
    } else {
      return null;
    }
  }, [state.dtoAdmission.first_name]);

  const validateLastName = useCallback(async () => {
    if (state.dtoAdmission.last_name.trim() === '') {
      return 'Last Name is required';
    } else {
      return null;
    }
  }, [state.dtoAdmission.last_name]);

  const validateEMailId = useCallback(async () => {
    if (state.dtoAdmission.email.trim() === '') {
      return 'E-Mail is required';
    } else if (!state.dtoAdmission.email.trim().match(regExEMail)) {
      return 'E-Mail is invalid';
    } 
    // else if (await IsEMailExist()) {
    //   return 'E-Mail already exists';
    // }
     else {
      return null;
    }
  }, [state.dtoAdmission.email]);

  const validatePhoneNo = useCallback(async () => {
    if (!isValidPhoneNumber(state.dtoAdmission.phone_no.trim())) {
      return 'Phone # is invalid';
    }
    // if (state.dtoAdmission.phone_no.trim() === '') {
    //   return 'phone is required';
    // }
    else {
      return null;
    }
  }, [state.dtoAdmission.phone_no]); 

  const validateDob = useCallback(async () => {
    if (state.dtoAdmission.dob == null || dayjs(getLocalTime(state.dtoAdmission.dob)).format('MM/DD/YYYY') === '12/31/1899') {
      return 'Dob is required';
    } else {
      return null;
    }
  }, [state.dtoAdmission.dob]);
  const validateGender = useCallback(async () => {
    if (state.dtoAdmission.gender.trim() === '') {
      return 'Gender is required';
    } else {
      return null;
    }
  }, [state.dtoAdmission.gender]);

  const validateAdmissionDate = useCallback(async () => {
    if (state.dtoAdmission.admission_date == null || dayjs(getLocalTime(state.dtoAdmission.admission_date)).format('MM/DD/YYYY') === '12/31/1899') {
      return 'Admission date is required';
    } else {
      return null;
    }
  }, [state.dtoAdmission.admission_date]);

  const onCourseIdBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const course_id = await validateCourseId();
      setState({ errorMessages: { ...state.errorMessages, course_id: course_id } } as StateType);
    }, [validateCourseId, state.errorMessages]);

    const onCountryIdBlur = useCallback(async () =>
      //event: React.FocusEvent<HTMLInputElement>
      {
        const country_id = await validateCountryId();
        setState({ errorMessages: { ...state.errorMessages, country_id: country_id } } as StateType);
      }, [validateCountryId, state.errorMessages]);

  const onFirstNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const first_name = await validateFirstName();
      setState({ errorMessages: { ...state.errorMessages, first_name: first_name } } as StateType);
    }, [validateFirstName, state.errorMessages]);

  const onLastNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const last_name = await validateLastName();
      setState({ errorMessages: { ...state.errorMessages, last_name: last_name } } as StateType);
    }, [validateLastName, state.errorMessages]);

  const onEMailIdBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const email = await validateEMailId();
      setState({ errorMessages: { ...state.errorMessages, email: email } } as StateType);
    }, [validateEMailId, state.errorMessages]);

    const onPhoneNoBlur = useCallback(async () =>
      {
        const phone_no = await validatePhoneNo();
        setState({ errorMessages: { ...state.errorMessages, phone_no: phone_no } } as StateType);
      }, [validatePhoneNo, state.errorMessages]);

    const onDobBlur = useCallback(async () =>
      //event: React.FocusEvent<HTMLInputElement>
      {
        const dob = await validateDob();
        setState({ errorMessages: { ...state.errorMessages, dob: dob } } as StateType);
      }, [validateDob, state.errorMessages]);

      const onAdmissionDateBlur = useCallback(async () =>
        //event: React.FocusEvent<HTMLInputElement>
        {
          const admission_date = await validateAdmissionDate();
          setState({ errorMessages: { ...state.errorMessages, admission_date: admission_date} } as StateType);
        }, [validateAdmissionDate, state.errorMessages]);

      const onGenderBlur = useCallback(async () =>
        //event: React.FocusEvent<HTMLInputElement>
        {
          const gender = await validateGender();
          setState({ errorMessages: { ...state.errorMessages, gender: gender } } as StateType);
        }, [validateGender, state.errorMessages]);
  
  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = { ...ERROR_MESSAGES };
    errorMessages.course_id = await validateCourseId();
    if (errorMessages.course_id) {
      isFormValid = false;
    }
    errorMessages.country_id = await validateCountryId();
    if (errorMessages.country_id) {
      isFormValid = false;
    }
    errorMessages.first_name = await validateFirstName();
    if (errorMessages.first_name) {
      isFormValid = false;
    }
    errorMessages.last_name = await validateLastName();
    if (errorMessages.last_name) {
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
    errorMessages.admission_date = await validateAdmissionDate();
    if (errorMessages.admission_date) {
      isFormValid = false;
    }
    
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [
    ERROR_MESSAGES,
    validateFirstName,
    validateLastName,
    validateEMailId,
    validateDob,
    validateGender,
    validateAdmissionDate,
    validatePhoneNo,
    validateCourseId,
    validateCountryId
  ]);

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/');
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
    setState({ open3:  true } as StateType);
  }, []);
  const setOpen4 = useCallback(async (): Promise<void> => {
    setState({ open4:  true } as StateType);
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
  const setClose4 = useCallback(async (): Promise<void> => {
    setState({ open4: false } as StateType);
  }, []);


  const onPhoneNoChange = useCallback(
      async (value: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setState({
          dtoAdmission: {
            ...state.dtoAdmission,
            phone_no: value
          }
        } as StateType);
      },
      [state.dtoAdmission]
    );

    const onCourseNameChange = useCallback(
      async (event: any, value: unknown) => {
        const selectedCourse = value as LookupDTO;
    
        const selectedCourseData = state.arrCourseListAll.find(
          (course) => course.id === selectedCourse.id
        );
    
        setState({
          ...state,
          dtoAdmission: {
            ...state.dtoAdmission,
            course_id: selectedCourse.id,
            course_name: selectedCourse.text
          }
        } as StateType);
    
        setSelectedCoursePrice(selectedCourseData?.price || 0); // ✅ number
        setIs10thReq(selectedCourseData?.is10threq || false); // ✅ boolean
        setIs12thReq(selectedCourseData?.is12threq || false);
        setIsGradReq(selectedCourseData?.isgradreq || false);
        setIsPGReq(selectedCourseData?.ispgreq || false);
        setIsPhotoIdReq(selectedCourseData?.isphotoidreq || false);
      },
      [state]
    );
    
  
  const onCountryNameChange = useCallback(
      async (event: any, value: unknown) => {
        setState({
          dtoAdmission: { ...state.dtoAdmission, country_id: (value as LookupDTO).id, country_name: (value as LookupDTO).text }
        } as StateType);
      },
      [state.dtoAdmission]
    );
  
    const onStateNameChange = useCallback(
      async (event: any, value: unknown) => {
        setState({
          dtoAdmission: { ...state.dtoAdmission, state_id: (value as LookupDTO).id, state_name: (value as LookupDTO).text }
        } as StateType);
      },
      [state.dtoAdmission]
    );

  const onDobChange = useCallback(
    async (value: any): Promise<void> => {
      setState({ dtoAdmission: { ...state.dtoAdmission, dob: value } } as StateType);
    },
    [state.dtoAdmission]
  );
  const onAdmissionDateChange = useCallback(
    async (value: any): Promise<void> => {
      setState({ dtoAdmission: { ...state.dtoAdmission, admission_date: value } } as StateType);
    },
    [state.dtoAdmission]
  );

  const onGenderChange = useCallback(
    async (event: any, value: unknown) => {
      setState({
        dtoAdmission: {
          ...state.dtoAdmission,
          gender: (value as LookupDTO).text
        }
      } as StateType);
    },
    [state.dtoAdmission]
  )
 
  const handleDocumentUpload = useCallback(
    async (
      event: React.ChangeEvent<any>,
      field: keyof AdmissionDTO
    ) => {
      const files = event.target.files;
      if (!files || files.length === 0) return;
  
      try {
          if(gConstants.IS_CLOUD_STORAGE_ENABLED)
          {
            setState({
              dtoAdmission: {
                ...state.dtoAdmission, [field]: files[0],
              },
            } as StateType);
          }
          else
          {
            setState({
              dtoAdmission: {
                ...state.dtoAdmission, [field]: null,
              },
            } as StateType);
          }
        } 
      catch (error) {
        console.error("GraphQL upload failed:", error);
      }
    },
    [ state, setState]
  );
  

   const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (await validateForm()) {
        if (state.dtoAdmission.id === 0) {
          const { data } = await addAdmission({
            variables: {
              course_id: state.dtoAdmission.course_id,
              admission_date: state.dtoAdmission.admission_date,
              first_name: state.dtoAdmission.first_name,
              last_name: state.dtoAdmission.last_name,
              dob: state.dtoAdmission.dob,
              gender: state.dtoAdmission.gender,
              email: state.dtoAdmission.email,
              phone_no: state.dtoAdmission.phone_no,            
              address: state.dtoAdmission.address,
              city_name : state.dtoAdmission.city_name,
              state_id : state.dtoAdmission.state_id,             
              country_id: state.dtoAdmission.country_id,
              zip_code : state.dtoAdmission.zip_code,
              highschoolname: state.dtoAdmission.highschoolname,
              highschoolpercentage: state.dtoAdmission.highschoolpercentage,
              highersschoolname: state.dtoAdmission.highersschoolname,
              highersschoolpercentage: state.dtoAdmission.highersschoolpercentage,
              graduationname: state.dtoAdmission.graduationname,
              graduationpercentage: state.dtoAdmission.graduationpercentage,              
              tenthproof: state.dtoAdmission.tenthproof,
              twelthproof: state.dtoAdmission.twelthproof,
              graduationproof: state.dtoAdmission.graduationproof,
              photoidproof: state.dtoAdmission.photoidproof,
              photo: state.dtoAdmission.photo,
              status: "Submitted",
            }
          });
          if (data) {
            setSubmitted(true)
          }
        } 
      }
    },
    [validateForm, addAdmission, state.dtoAdmission ]
  );
  
  useEffect(() => {
    getLastAdmissionId();
  },[getLastAdmissionId]);

  useEffect(() => {
     getCourses();
  },[getCourses]);

  useEffect(() => {
    getCourseList();
  },[getCourseList]);

  useEffect(() => {
    getCountryList();
  },[getCountryList]);

  useEffect(() => {
    getStateList();
  },[getStateList,state.dtoAdmission.country_id]);   

  return {
    state,is10threq,is12threq,isgradreq,ispgreq,isphotoidreq,
    onEMailIdBlur,
    onLastNameBlur,
    onFirstNameBlur,
    onDobBlur,
    onAdmissionDateBlur,
    onGenderBlur,
    onCourseIdBlur,   
    onSelectChange,
    onInputChange,
    onCountryNameChange,
    onStateNameChange,
    onCourseNameChange,
    onDobChange,
    onAdmissionDateChange,
     onGenderChange,
     onCountryIdBlur,
    setOpen1,admissionNumber,
    submitted,selectedCoursePrice,
    setClose1,
    setOpen2,
    setClose2,
    setOpen3,
    setClose3,
    setOpen4,
    setClose4,
    onPhoneNoChange,
    onPhoneNoBlur,
    onSaveClick,
    onCancelClick,
    handleDocumentUpload,
    handlePayNow    
  };
}
export default useAdmission;
