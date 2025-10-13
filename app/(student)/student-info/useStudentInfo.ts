import { useCallback, useEffect, useReducer, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_ADMISSION_TECH, ADD_ADMISSION_TECH } from '@/app/graphql/AdmissionTech';
import AdmissionDTO, { ADMISSION_TECH } from '@/app/types/AdmissionTechDTO';
import { useSelector } from '../../store';

type ErrorMessageType = {
  course_id: string | null;
  course_name: string | null;
  admission_date: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone_no: string | null;
  dob: string | null;
  gender: string | null;
  address: string | null;
  city_name: string | null;
  state_id: number | null;
  state_name: string | null;
  country_id: string | null;
  country_name: string | null;
  zip_code: string | null;
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
  arrAdmission: AdmissionDTO[];
  errorMessages: ErrorMessageType;
};

const ERROR_MESSAGES: ErrorMessageType = {
  course_id: null,
  course_name: null,
  admission_date: null,
  first_name: null,
  last_name: null,
  email: null,
  phone_no: null,
  dob: null,
  gender: null,
  address: null,
  city_name: null,
  state_id: null,
  state_name: null,
  country_id: null,
  country_name: null,
  zip_code: null,
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
  photo: null
};

const INITIAL_STATE: StateType = {
  arrAdmission: [],
  dtoAdmission: ADMISSION_TECH,
  errorMessages: { ...ERROR_MESSAGES }
};

// Reducer function
const reducer = (state: StateType, action: Partial<StateType>): StateType => {
  return { ...state, ...action };
};

const useStudentInfo = () => {
  const [state, setState] = useReducer(reducer, INITIAL_STATE);
  const [singleUpload] = useMutation(ADD_ADMISSION_TECH, {});
  const { admission_id } = useSelector((state) => state.loginState);
    // ✅ Ensure type-dependent values don’t mismatch server/client
  const [tenthProofType, setTenthProofType] = useState<string>('N/A');
  const [twelfthProofType, setTwelfthProofType] = useState<string>('N/A');
  const [getAdmissionTech] = useLazyQuery(GET_ADMISSION_TECH, { fetchPolicy: 'network-only' });

  const getAdmissions = useCallback(async (): Promise<void> => {
    const { error, data } = await getAdmissionTech({
      variables: {
        id: Number(admission_id)
      }
    });
    if (!error && data?.getAdmissionTech) {
      const dto: AdmissionDTO = data.getAdmissionTech; // use object directly
      setState({
        dtoAdmission: dto,
        arrAdmission: [dto] // optional, if you want to keep it
      } as StateType);
    }
  }, [getAdmissionTech]);

  const onImageError = useCallback(
    async (event: any) => {
      console.log(event);
      setState({ dtoAdmission: { ...state.dtoAdmission, photo: null } } as StateType);
    },
    [state.dtoAdmission]
  );
  const onImageClick = useCallback(async () => {
    document.getElementById('Document_image')!.click();
  }, []);

 // Safe formatter to avoid hydration mismatch
  const formatDate = (date?: string | Date | null): string => {
  if (!date) return 'N/A';

  try {
    const parsedDate = typeof date === 'string' ? new Date(date) : date;
    if (!parsedDate || isNaN(parsedDate.getTime())) return 'N/A';

    return new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(parsedDate);
  } catch {
    return 'N/A';
  }
};

  const UploadImage = useCallback(async () => {
    const files = (document.getElementById('Document_image') as any)!.files;
    console.log(files);
    if (files.length == 0) {
      return;
    }
    const { data } = await singleUpload({
      variables: {
        files: files
      }
    });
    if (data) {
      setState({ dtoAdmission: { ...state.dtoAdmission, photo: data.singleUpload[0].filename } } as StateType);
    }
  }, [singleUpload, state.dtoAdmission]);

  useEffect(() => {
    getAdmissions();
  }, [getAdmissions]);
    useEffect(() => {
    setTenthProofType(typeof state.dtoAdmission.tenthproof);
    setTwelfthProofType(typeof state.dtoAdmission.twelthproof);
  }, [state.dtoAdmission.tenthproof, state.dtoAdmission.twelthproof]);

  return { state, onImageError, onImageClick, UploadImage,formatDate, twelfthProofType, tenthProofType };
};

export default useStudentInfo;
