import { Metadata } from 'next';
import ClientEditAdmission from './client-edit-admission';
import { GET_ADMISSION } from '@/app/graphql/Admission';
import { createServerApolloClient } from '@/app/common/utility';
import AdmissionDTO, { ADMISSION } from '@/app/types/AdmissionDTO';
// import stateEntry from '@/app/(protected)/states/state-entry';

export const metadata: Metadata = {
  title: 'Edit Admission '
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditAdmissionPage({ params }: Props) {
  console.log('[DEBUG] Entered EditAdmissionPage');  // Debug 1

  const { id } = await params;
  console.log('[DEBUG] Params received:', params);  // Debug 2
  console.log('[DEBUG] Extracted id:', id);        // Debug 3

  let dtoAdmission: AdmissionDTO = ADMISSION;

  try {
    console.log('[DEBUG] Creating Apollo client...');  // Debug 4
    const apolloClient = await createServerApolloClient();
    console.log('[DEBUG] Apollo client created');     // Debug 5

    console.log('[DEBUG] Sending GET_ADMISSION query with id:', parseInt(id));  // Debug 6
    const result = apolloClient.query({
      query: GET_ADMISSION,
      variables: {
        id: parseInt(id)        
      }
    });

    const results = await Promise.all([result]);
    console.log('[DEBUG] GraphQL query results:', results);  // Debug 7

    if (results[0]?.data?.getAdmission) {
      console.log('[DEBUG] Found admission data:', results[0].data.getAdmission);  // Debug 8
      dtoAdmission = { ...results[0].data.getAdmission };
    } else {
      console.warn('[DEBUG] No admission data found for id:', id);  // Debug 9
    }
  } catch (error) {
    console.error('[DEBUG] Error in EditAdmissionPage:', error);  // Debug 10
  }

  console.log('[DEBUG] Final dtoAdmission object:', dtoAdmission);  // Debug 11
  return <ClientEditAdmission dtoAdmission={dtoAdmission} />;
}





// import { Metadata } from 'next';
// import ClientEditAdmission from './client-edit-admission';
// import { GET_ADMISSION } from '@/app/graphql/Admission';
// import { createServerApolloClient } from '@/app/common/utility';
// import AdmissionDTO, { ADMISSION } from '@/app/types/AdmissionDTO';


// export const metadata: Metadata = {
//   title: 'Edit Admission '
// };

// export const revalidate = 0;

// type Props = { params: Promise<{ id: string }> };

// export default async function EditAdmissionPage({ params }: Props) {
//   const { id } = await params;
//   console.log('Result*********',  params)
//   let dtoAdmission: AdmissionDTO = ADMISSION;
//   try {
//     const apolloClient = await createServerApolloClient();
//     const result = apolloClient.query({
//       query: GET_ADMISSION,
//       variables: {
//         id: parseInt(id)
//       }
//     });
//     const results = await Promise.all([result]);
//     console.log('Result*********', results)
//     if (results[0]?.data?.getAdmission) {
//       dtoAdmission = { ...results[0].data.getAdmission };
     
//     }
//   } catch {}
//   return <ClientEditAdmission dtoAdmission={dtoAdmission} />;
// }
