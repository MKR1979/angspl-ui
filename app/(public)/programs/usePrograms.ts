
import { ChangeEvent, useCallback, useEffect, useReducer, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { COURSE_LIST_ALL } from "@/app/graphql/Course";
import { useRouter } from "next/navigation";
import CourseAllDTO from "@/app/types/CourseAllDTO";
import PaymentDetailsDTO, { PAYMENT_DETAILS } from "@/app/types/PaymentDetailsDTO";
import PaymentDTO, { PAYMENT } from "@/app/types/PaymentDTO";
import { ADD_PAYMENT } from "@/app/graphql/Payment";
import { ADD_USER } from "@/app/graphql/User";
import { isValidPhoneNumber } from "libphonenumber-js";
import { regExEMail } from "@/app/common/Configuration";
import * as constants from "../constants/constants";
import * as gConstants from '../../constants/constants'

type ErrorMessageType = Record<"first_name" | "last_name" | "email" | "mobile_no", string | null>;
type StateType = {
  arrCourseListAll: CourseAllDTO[];
  isLoading: boolean;
  dtoPaymentDetails: PaymentDetailsDTO;
  dtoPayment: PaymentDTO;
  open1: boolean;
  errorMessages: ErrorMessageType;
};

const ERROR_MESSAGES: ErrorMessageType = {
  first_name: null,
  last_name: null,
  email: null,
  mobile_no: null,
};

const usePrograms = () => {
  const router = useRouter();
  const INITIAL_STATE: StateType = {
    arrCourseListAll: [],
    isLoading: false,
    dtoPaymentDetails: PAYMENT_DETAILS,
    dtoPayment: PAYMENT,
    open1: false,
    errorMessages: { ...ERROR_MESSAGES },
  };

  const reducer = (state: StateType, action: Partial<StateType>): StateType => ({ ...state, ...action });
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [submitted, setSubmitted] = useState(false);
  const [selectedPrice, setPrice] = useState(0);
  const [selectedCourse, setCourse] = useState("");
  
  const [addUser] = useMutation(ADD_USER);
  const [addPayment] = useMutation(ADD_PAYMENT);
  const [getCourseListAll] = useLazyQuery(COURSE_LIST_ALL, { fetchPolicy: "network-only" });

  const getCourses = useCallback(async () => {
    const { error, data } = await getCourseListAll();
    if (!error && data?.getCourseListAll) {
      setState({ arrCourseListAll: data.getCourseListAll });
    }
  }, [getCourseListAll]);

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

  useEffect(() => {
    getCourses();
  }, [getCourses]);

  const handlePayNow = (course: string, price: number) => {
    setPrice(price);
    setCourse(course);
    setSubmitted(true);
  };

  const addPaymentDetails = useCallback(async (event: React.MouseEvent<HTMLElement>, response: any, price: number) => {
    event.preventDefault();
    try {
      await addPayment({
        variables: {
          user_id: 1,
          payee_name: `${state.dtoPaymentDetails.first_name} ${state.dtoPaymentDetails.last_name}`,
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

  const onInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setState({ dtoPaymentDetails: { ...state.dtoPaymentDetails, [event.target.name]: event.target.value } });
  }, [state.dtoPaymentDetails]);

   const onMobileNoChange = useCallback(
      async (value: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setState({
          dtoPaymentDetails: {
            ...state.dtoPaymentDetails,
            mobile_no: value
          }
        } as StateType);
      },
      [state.dtoPaymentDetails]
    );

  const validateFirstName = useCallback(async () => {
    if (state.dtoPaymentDetails.first_name.trim() === '') {
      return 'First Name is required';
    } else {
      return null;
    }
  }, [state.dtoPaymentDetails.first_name]);

  const validateLastName = useCallback(async () => {
    if (state.dtoPaymentDetails.last_name.trim() === '') {
      return 'Last Name is required';
    } else {
      return null;
    }
  }, [state.dtoPaymentDetails.last_name]);

    const validateEMailId = useCallback(async () => {
      if (state.dtoPaymentDetails.email.trim() === '') {
        return 'E-Mail is required';
      } else if (!state.dtoPaymentDetails.email.trim().match(regExEMail)) {
        return 'E-Mail is invalid';
      } 
      // else if (await IsEMailExist()) {
      //   return 'E-Mail already exists';
      // }
       else {
        return null;
      }
    }, [state.dtoPaymentDetails.email]);
  
    const validatePhoneNo = useCallback(async () => {
      if (!isValidPhoneNumber(state.dtoPaymentDetails.mobile_no.trim())) {
        return 'Phone # is invalid';
      }
      else {
        return null;
      }
    }, [state.dtoPaymentDetails.mobile_no]); 

  const onFirstNameBlur = useCallback(async () =>
    {
      const first_name = await validateFirstName();
      setState({ errorMessages: { ...state.errorMessages, first_name: first_name } } as StateType);
    }, [validateFirstName, state.errorMessages]);

  const onLastNameBlur = useCallback(async () =>
    {
      const last_name = await validateLastName();
      setState({ errorMessages: { ...state.errorMessages, last_name: last_name } } as StateType);
    }, [validateLastName, state.errorMessages]);

    const onEMailIdBlur = useCallback(async () =>
      {
        const email = await validateEMailId();
        setState({ errorMessages: { ...state.errorMessages, email: email } } as StateType);
      }, [validateEMailId, state.errorMessages]);
  
      const onPhoneNoBlur = useCallback(async () =>
        {
          const mobile_no = await validatePhoneNo();
          setState({ errorMessages: { ...state.errorMessages, mobile_no: mobile_no } } as StateType);
        }, [validatePhoneNo, state.errorMessages]);

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
     errorMessages.email = await validateEMailId();
     if (errorMessages.email) {
       isFormValid = false;
     }
     errorMessages.mobile_no = await validatePhoneNo();
     if (errorMessages.mobile_no) {
       isFormValid = false;
     }
    
     setState({ errorMessages: errorMessages } as StateType);
     return isFormValid;
   }, [
     validateFirstName,
     validateLastName,
     validateEMailId,
     validatePhoneNo,
   ]);
 
  const generateUserName = async (firstName: string): Promise<string> => {
    return new Promise((resolve) => {
      const randomNum = Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit random number
      resolve(`${firstName}${randomNum}`);
    });
  };
  const onSaveClick = useCallback(
    async (
      event: React.MouseEvent<HTMLElement>,
      price: number,
      course: string
    ) => {
      event.preventDefault();
      if (await validateForm()) {
      if (state.dtoPaymentDetails.id === 0) {
        const userName = String(await generateUserName(state.dtoPaymentDetails.first_name));
        const { data } = await addUser({
          variables: {
            first_name: state.dtoPaymentDetails.first_name,
            last_name: state.dtoPaymentDetails.last_name,
            email: state.dtoPaymentDetails.email,
            mobile_no: state.dtoPaymentDetails.mobile_no,
            user_name: userName,
            password: gConstants.PASSWORD,
            status: gConstants.STATUS,
            role_id: gConstants.ROLE_ID,
            image_url: "To be updated",
          },
        });
        if (data) {
          const options = {
            key: gConstants.RAZORPAY_KEY, 
            amount: price * 100, // in paise
            currency: gConstants.CURRENCY,
            name: gConstants.COMPANY,
            description: `Payment for ${selectedCourse}`,
            // The handler is called after successful payment
            handler: async (response: any) => {
              await addPaymentDetails(event, response, price);
              router.push(
                `/payReceipt?courseName=${encodeURIComponent(course)}&studentName=${encodeURIComponent(
                  state.dtoPaymentDetails.first_name + " " + state.dtoPaymentDetails.last_name
                )}&amount=${price}&userName=${encodeURIComponent(userName)}`
              );              
            },
            prefill: {
              name: "Student Name",
              email: gConstants.CONTACT_EMAIL,
              contact: gConstants.CONTACT_PHONE_NO,
            },
            theme: {
              color: "#3399cc",
            },
          };
          const rzp = new (window as any).Razorpay(options);
          rzp.open();
        }
      }
    }
    },
    [state,validateForm, addUser, addPaymentDetails,selectedCourse, router]
  );
  return { state, submitted, selectedCourse, selectedPrice , onInputChange, onMobileNoChange, onSaveClick, handlePayNow, onFirstNameBlur,onLastNameBlur,onPhoneNoBlur,onEMailIdBlur };
};

export default usePrograms;
