import React, { ChangeEvent, useCallback, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import ContactUsDTO, { CONTACT_US } from '@/app/types/ContactUsDTO';
import {
  ADD_CONTACT_US,
} from '@/app/graphql/ContactUs';
import { regExEMail } from '@/app/common/Configuration';
import { isValidPhoneNumber } from 'libphonenumber-js';
import toast from 'react-hot-toast';
type ErrorMessageType = {
  contact_name: string | null;
  email: string | null;
  phone_no: string | null;
  category_name: string | null;
  subject: string | null;
  message: string | null;
};

type StateType = {
  dtoContactPoint: ContactUsDTO;
  open1: boolean;
  saveDisabled: boolean;
  errorMessages: ErrorMessageType;
};


const useContactUs = () => {
  const router = useRouter();
  const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
    contact_name: null,
    email: null,
    phone_no: null,
    category_name: null,
    subject: null,
    message: null
  });

  const INITIAL_STATE: StateType = Object.freeze({
    dtoContactPoint: CONTACT_US,
    open1: false,
    saveDisabled: false,
    errorMessages: { ...ERROR_MESSAGES }
  });

  const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
    return { ...state, ...action };
  };

  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const [addContactUs] = useMutation(ADD_CONTACT_US, {});
 
  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoContactPoint: {
          ...state.dtoContactPoint,
          [event.target.name]: event.target.value
        }
      } as StateType);
    },
    [state.dtoContactPoint]
  );

  const onPhoneNoChange = useCallback(
    async (value: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setState({
        dtoContactPoint: {
          ...state.dtoContactPoint,
          phone_no: value
        }
      } as StateType);
    },
    [state.dtoContactPoint]
  );

  const validateContactName = useCallback(async () => {
    if (state.dtoContactPoint.contact_name.trim() === '') {
      return 'Contact Name is required';
    } else {
      return null;
    }
  }, [state.dtoContactPoint.contact_name]);

  const validateEMailId = useCallback(async () => {
    if (state.dtoContactPoint.email.trim() === '') {
      return 'E-Mail is required';
    } else if (!state.dtoContactPoint.email.trim().match(regExEMail)) {
      return 'E-Mail is invalid';
    } else {
      return null;
    }
  }, [state.dtoContactPoint.email]);

  const validatePhoneNo = useCallback(async () => {
    if (!isValidPhoneNumber(state.dtoContactPoint.phone_no.trim())) {
      return 'Phone # is invalid';
    } else {
      return null;
    }
  }, [state.dtoContactPoint.phone_no]);  

  const onContactNameBlur = useCallback(async () =>
    {
      const contact_name = await validateContactName();
      setState({ errorMessages: { ...state.errorMessages, contact_name: contact_name } } as StateType);
    }, [validateContactName, state.errorMessages]);

  const onEMailIdBlur = useCallback(async () =>
     {
      const email = await validateEMailId();
      setState({ errorMessages: { ...state.errorMessages, email: email } } as StateType);
    }, [validateEMailId, state.errorMessages]);

  const onPhoneNoBlur = useCallback(async () =>
    {
      const phone_no = await validatePhoneNo();
      setState({ errorMessages: { ...state.errorMessages, phone_no: phone_no } } as StateType);
    }, [validatePhoneNo, state.errorMessages]);

  
  const validateForm = useCallback(async () => {
    let isFormValid = true;
    const errorMessages: ErrorMessageType = { ...ERROR_MESSAGES };
    errorMessages.contact_name = await validateContactName();
    if (errorMessages.contact_name) {
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
    
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [
    ERROR_MESSAGES,
    validateContactName,
    validateEMailId,
    validatePhoneNo,
  ]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      try {
        setState({ saveDisabled: true } as StateType);
        event.preventDefault();       
        if (await validateForm()) {      
            const { data } = await addContactUs({
              variables: {
                contact_name: state.dtoContactPoint.contact_name,              
                email: state.dtoContactPoint.email,
                phone_no: state.dtoContactPoint.phone_no,
                category_name: state.dtoContactPoint.category_name,
                subject: state.dtoContactPoint.subject,
                message: state.dtoContactPoint.message,                
              }
            });
            if (data?.addContactUs) {
              toast.success('Thank you for your message. We will get back to you soon!');
              router.push('/thankyou')
            } else {
              toast.error('Failed to save the record');
            }
          }        
      } catch {
        toast.error('Failed to save the record');
      } finally {
        setState({ saveDisabled: false } as StateType);
      }
    },
    [validateForm, addContactUs, state.dtoContactPoint, router]
  );
  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push('/contactpoints/list');
    },
    [router]
  );
  return {
    state,
    onInputChange,
    onPhoneNoChange,
    onContactNameBlur,
    onEMailIdBlur,
    onPhoneNoBlur,
    onSaveClick,
    onCancelClick,
  };
};

export default useContactUs;
