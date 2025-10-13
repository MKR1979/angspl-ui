// 'use client';
// import { memo, useCallback } from 'react';
// import eq from 'lodash/eq';
// import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
// import MyDataGrid from '@/app/custom-components/MyDataGrid';
// import MyCardContent from '@/app/custom-components/MyCardContent';
// import MyTypography from '@/app/custom-components/MyTypography';
// import EmailIcon from '@mui/icons-material/Email';
// import MyMenu from '@/app/custom-components/MyMenu';
// import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
// import MyCard from '@/app/custom-components/MyCard';
// import useUserList from './useUserList';
// import SendEmailDTO from '@/app/types/SendEmailDTO';
// import MyAvatar from '@/app/custom-components/MyAvatar';
// import { useSelector, RootState } from '../../../store';
// import { findPermission } from '../../../common/utility-permission';
// import MyButton from '@/app/custom-components/MyButton';
// import MyLocalizationProvider from '@/app/custom-components/MyLocalizationProvider';
// import MyBox from '@/app/custom-components/MyBox';
// import MyGrid from '@/app/custom-components/MyGrid';
// import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
// import MyTextField from '@/app/custom-components/MyTextField';

// type Props = {
//   arrSendEmailDTO: SendEmailDTO[];
//   total_records: number;
// };
// const ClientUserList = ({ arrSendEmailDTO, total_records }: Props) => {
//   const {
//     state,
//     apiRef,
//     paginationModel,
//     setPaginationModel,
//     onCheckChange,
//     onSortChange,
//     handleContextMenu,
//     handleClose,
//     onContextMenu,
//     onFilterModelChange,
//     onSendEmail,
//     setOpen1,
//     setClose1,
//     setOpen2,
//     setClose2,
//     setOpen3,
//     setClose3,
//     onTypeChange,
//     onRoleNameChange,
//     onEmailTemplateNameBlur,
//     onEmailTemplateNameChange
//   } = useUserList({ arrSendEmailDTO, total_records });
//   function stringToColor(string: string) {
//     let hash = 0;
//     let i;

//     /* eslint-disable no-bitwise */
//     for (i = 0; i < string.length; i += 1) {
//       hash = string.charCodeAt(i) + ((hash << 5) - hash);
//     }

//     let color = '#';

//     for (i = 0; i < 3; i += 1) {
//       const value = (hash >> (i * 8)) & 0xff;
//       color += `00${value.toString(16)}`.slice(-2);
//     }
//     /* eslint-enable no-bitwise */

//     return color;
//   }

//   function stringAvatar(name: string) {
//     return {
//       sx: {
//         bgcolor: stringToColor(name),
//         width: 32,
//         height: 32,
//         fontSize: 14
//       },
//       children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
//     };
//   }

//   const userPermissions = useSelector((state: RootState) => state.siteConfigState.userPermission);
//   const columns: GridColDef[] = [
//     {
//       field: 'id',
//       headerName: 'Id',
//       flex: 1,
//       minWidth: 150
//     },
//     {
//       field: 'image_url',
//       headerName: 'Photo',
//       flex: 1,
//       minWidth: 100,
//       width: 50,
//       sortable: false,
//       renderCell: useCallback(
//         (params: GridRenderCellParams) => (
//           <MyAvatar
//             {...stringAvatar(params.row.first_name + ' ' + params.row.last_name)}
//             src={process.env.NEXT_PUBLIC_API_ROOT_URL + '/uploads/' + params.row.image_url}
//           ></MyAvatar>
//         ),
//         [stringAvatar]
//       )
//     },
//     {
//       field: 'first_name',
//       headerName: 'First Name',
//       flex: 1,
//       minWidth: 150,
//     },
//     {
//       field: 'user_name',
//       headerName: 'Username',
//       flex: 1,
//       minWidth: 150
//     },
//     {
//       field: 'email',
//       headerName: 'E-Mail',
//       flex: 1,
//       minWidth: 150
//     },
//     {
//       field: 'mobile_no',
//       headerName: 'Mobile #',
//       flex: 1,
//       minWidth: 150
//     },
//     {
//       field: 'role_name',
//       headerName: 'Role',
//       flex: 1,
//       minWidth: 150
//     },
//     {
//       field: 'type_name',
//       headerName: 'Type',
//       flex: 1,
//       minWidth: 150
//     },
//   ];

//   return (
//     <>
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
//         <MyBreadcrumbs items={state.breadcrumbsItems} />
//         {findPermission(userPermissions, 131) && (
//           <MyButton
//             onClick={onSendEmail}
//             startIcon={<EmailIcon />}
//             disabled={state.arrSelectedId.length === 0}
//             variant="contained"
//             color="primary"
//             sx={{
//               textTransform: 'uppercase',
//               fontWeight: 'bold',
//               backgroundColor: state.arrSelectedId.length > 0 ? 'primary.main' : 'grey.300',
//               color: state.arrSelectedId.length > 0 ? 'white' : 'grey.600',
//               minWidth: { xs: '100px', sm: '170px' },
//               fontSize: { xs: '0.60rem', sm: '0.800rem' },
//               padding: { xs: '3px 6px', sm: '4px 8px' },
//               mt: { xs: 4, sm: 4 },
//               ':hover': {
//                 backgroundColor: state.arrSelectedId.length > 0 ? 'primary.dark' : 'grey.300'
//               }
//             }}
//           >
//             Send Email
//           </MyButton>
//         )}
//       </div>
//       <MyLocalizationProvider>
//         <MyBox sx={{ mb: '10px' }}>
//           <MyGrid container spacing={2} style={{ border: '3px solid rgb(238, 242, 246)', padding: '1rem' }}>
//             <MyGrid size={{ xs: 12, sm: 6 }}>
//               <MyAutocomplete
//                 open={state.open3}
//                 onOpen={setOpen3}
//                 onClose={setClose3}
//                 value={{ text: state.dtoSendEmail.email_template_name }}
//                 getOptionLabel={(option: any) => option.text}
//                 firstitem={{ id: 0, text: '' }}
//                 options={state.arrEmailTemplateLookup}
//                 onChange={onEmailTemplateNameChange}
//                 onBlur={onEmailTemplateNameBlur}
//                 filterOptions={(options, state) => {
//                   // searchable Lookup
//                   const searchTerm = state.inputValue.toLowerCase();
//                   return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
//                 }}
//                 renderInput={(params) => (
//                   <MyTextField
//                     {...params}
//                     label="E-Mail Template"
//                     placeholder='Select E-Mail Template'
//                     slotProps={{
//                       inputLabel: { shrink: true }
//                     }}
//                     onBlur={onEmailTemplateNameBlur}
//                     error={state.errorMessages.email_template_name ? true : false}
//                   />
//                 )}
//               />
//               <MyTypography className="error">{state.errorMessages.email_template_name}</MyTypography>
//             </MyGrid>
//             <MyGrid size={{ xs: 12, sm: 3 }}>
//               <MyAutocomplete
//                 open={state.open2}
//                 onOpen={setOpen2}
//                 onClose={setClose2}

//                 value={
//                   state.dtoSendEmail.role_id === null
//                     ? { id: 'ALL', text: 'All type ' }
//                     : { id: state.dtoSendEmail.type_id, text: state.dtoSendEmail.type_name || '' }
//                 }
//                 getOptionLabel={(option: any) => option.text || ''}
//                 firstitem={{ id: 0, text: '' }}
//                 options={state.arrTypeLookup}
//                 onChange={onTypeChange}
//                 filterOptions={(options, state) => {
//                   // searchable Lookup
//                   const searchTerm = state.inputValue.toLowerCase();
//                   return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
//                 }}
//                 renderInput={(params) => (
//                   <MyTextField
//                     {...params}
//                     label="Type"
//                     slotProps={{
//                       inputLabel: { shrink: true }
//                     }}
//                     // onBlur={onTypeBlur}
//                     error={state.errorMessages.type_name ? true : false}
//                   />
//                 )}
//               />
//               <MyTypography className="error"> {state.errorMessages.type_name}</MyTypography>
//             </MyGrid>
//             <MyGrid size={{ xs: 12, sm: 3 }}>
//               <MyAutocomplete
//                 open={state.open1}
//                 onOpen={setOpen1}
//                 onClose={setClose1}
//                 value={
//                   state.dtoSendEmail.role_id === null
//                     ? { id: 'ALL', text: 'All Role' }
//                     : { id: state.dtoSendEmail.role_id, text: state.dtoSendEmail.role_name || '' }
//                 }
//                 getOptionLabel={(option: any) => option.text || ''}
//                 firstitem={{ id: 0, text: '' }}
//                 options={state.arrRoleLookup}
//                 onChange={onRoleNameChange}
//                 filterOptions={(options, state) => {
//                   // searchable Lookup
//                   const searchTerm = state.inputValue.toLowerCase();
//                   return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
//                 }}
//                 renderInput={(params) => (
//                   <MyTextField
//                     {...params}
//                     label="Role"
//                     slotProps={{
//                       inputLabel: { shrink: true }
//                     }}
//                     // onBlur={onRoleBlur}
//                     error={state.errorMessages.role_name ? true : false}
//                   />
//                 )}
//               />
//               <MyTypography className="error"> {state.errorMessages.role_name}</MyTypography>
//             </MyGrid>
//           </MyGrid>
//         </MyBox>
//       </MyLocalizationProvider>
//       <MyCard>
//         <MyCardContent sx={{ overflowX: 'auto' }}>
//           {/* <div style={{ minWidth: 800 }}> */}
//           <div style={{ minWidth: `${columns.length * 150}px` }}>
//             <MyDataGrid
//               apiRef={apiRef}
//               rowSelectionModel={state.arrSelectedId}
//               initialStateModel={state.initialState}
//               sortModel={[{ field: state.sort_field, sort: state.sort_direction }]}
//               onSortModelChange={onSortChange}
//               onRowSelectionModelChange={onCheckChange}
//               rows={state.arrSendEmailDTO}
//               rowCount={state.total_records}
//               columns={columns}
//               loading={state.isLoading}
//               handleContextMenu={handleContextMenu}
//               showExportButton={true}
//               onFilterModelChange={onFilterModelChange}
//               paginationModel={paginationModel}
//               onPaginationModelChange={setPaginationModel}
//             />
//           </div>
//           {(findPermission(userPermissions, 193) || findPermission(userPermissions, 192)) && (
//             <MyMenu
//               open={state.contextMenu !== null}
//               onClose={handleClose}
//               anchorReference="anchorPosition"
//               anchorPosition={
//                 state.contextMenu !== null
//                   ? {
//                     top: state.contextMenu.mouseY,
//                     left: state.contextMenu.mouseX
//                   }
//                   : undefined
//               }
//               slotProps={{
//                 root: {
//                   onContextMenu: onContextMenu
//                 }
//               }}
//             >

//             </MyMenu>
//           )}
//         </MyCardContent>
//       </MyCard>
//     </>
//   );
// };

// export default memo(ClientUserList, (prevProps, nextProps) => {
//   return eq(prevProps, nextProps); // Don't re-render!
// });

'use client';
import { memo, useCallback } from 'react';
import eq from 'lodash/eq';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import MyDataGrid from '@/app/custom-components/MyDataGrid';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyTypography from '@/app/custom-components/MyTypography';
import EmailIcon from '@mui/icons-material/Email';
// import MyMenu from '@/app/custom-components/MyMenu';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import useUserList from './useUserList';
import SendEmailDTO from '@/app/types/SendEmailDTO';
import MyAvatar from '@/app/custom-components/MyAvatar';
import { useSelector, RootState } from '../../../store';
import { findPermission } from '../../../common/utility-permission';
import MyButton from '@/app/custom-components/MyButton';
import MyLocalizationProvider from '@/app/custom-components/MyLocalizationProvider';
import MyBox from '@/app/custom-components/MyBox';
import MyGrid from '@/app/custom-components/MyGrid';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import MyTextField from '@/app/custom-components/MyTextField';
import MyCheckbox from '@/app/custom-components/MyCheckbox';

type Props = {
  arrSendEmailDTO: SendEmailDTO[];
  total_records: number;
};

const ClientUserList = ({ arrSendEmailDTO, total_records }: Props) => {
  const {
    state,
    apiRef,
    paginationModel,
    setPaginationModel,
    onCheckChange,
    onSortChange,
    onEmailNameBlur,
    // handleContextMenu,
    // handleClose,
    // onContextMenu,
    onFilterModelChange,
    onSendEmail,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    setOpen3,
    setClose3,
    onTypeChange,
    onRoleNameChange,
    onEmailTemplateNameBlur,
    onEmailTemplateNameChange,
    handleCheckbox, // ✅ added
    isExternalEmail,
    isSending,    // ✅ added
    onExternalEmailChange // ✅ added
  } = useUserList({ arrSendEmailDTO, total_records });

  function stringToColor(string: string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: 32,
        height: 32,
        fontSize: 14
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
    };
  }

  const userPermissions = useSelector((state: RootState) => state.siteConfigState.userPermission);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', flex: 1, minWidth: 150 },
    {
      field: 'image_url',
      headerName: 'Photo',
      flex: 1,
      minWidth: 100,
      width: 50,
      sortable: false,
      renderCell: useCallback(
        (params: GridRenderCellParams) => (
          <MyAvatar
            {...stringAvatar(params.row.first_name + ' ' + params.row.last_name)}
            src={process.env.NEXT_PUBLIC_API_ROOT_URL + '/uploads/' + params.row.image_url}
          ></MyAvatar>
        ),
        [stringAvatar]
      )
    },
    { field: 'first_name', headerName: 'First Name', flex: 1, minWidth: 150 },
    { field: 'user_name', headerName: 'Username', flex: 1, minWidth: 150 },
    { field: 'email', headerName: 'E-Mail', flex: 1, minWidth: 150 },
    { field: 'mobile_no', headerName: 'Mobile #', flex: 1, minWidth: 150 },
    { field: 'role_name', headerName: 'Role', flex: 1, minWidth: 150 },
    { field: 'type_name', headerName: 'Type', flex: 1, minWidth: 150 },
  ];

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginBottom: '0.5rem',
          gap: '1rem',
        }}
      >
        {/* Left: Breadcrumbs */}
        <div style={{ flex: 1, minWidth: '200px' }}>
          <MyBreadcrumbs items={state.breadcrumbsItems} />
        </div>

        {/* Right: Checkbox + Button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            flexShrink: 0,
          }}
        >
          {/* External Emails Checkbox */}
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              cursor: 'pointer',
            }}
          >
            <MyCheckbox sx={{ ml: 1 }} checked={isExternalEmail} onChange={handleCheckbox} />     
            <span style={{ fontSize: '0.9rem', color: '#333' }}>External Emails</span>
          </label>

          {/* Send Email Button */}
          {findPermission(userPermissions, 131) && (
            <MyButton
              onClick={onSendEmail}
              startIcon={<EmailIcon />}
               disabled={
           (state.arrSelectedId.length === 0 && !isExternalEmail) || isSending
          }
              variant="contained"
              color="primary"
              sx={{
                textTransform: 'uppercase',
                fontWeight: 'bold',
                backgroundColor:
                  state.arrSelectedId.length > 0 || isExternalEmail
                    ? 'primary.main'
                    : 'grey.300',
                color:
                  state.arrSelectedId.length > 0 || isExternalEmail
                    ? 'white'
                    : 'grey.600',
                minWidth: { xs: '100px', sm: '170px' },
                fontSize: { xs: '0.7rem', sm: '0.8rem' },
                padding: { xs: '4px 8px', sm: '6px 10px' },
                ':hover': {
                  backgroundColor:
                    state.arrSelectedId.length > 0 || isExternalEmail
                      ? 'primary.dark'
                      : 'grey.300',
                },
              }}
            >
               {isSending ? 'Sending...' : 'Send Email'}
            </MyButton>
          )}
        </div>
      </div>


      <MyLocalizationProvider>
        <MyBox sx={{ mb: '10px' }}>
          <MyGrid container spacing={2} style={{ border: '3px solid rgb(238, 242, 246)', padding: '1rem' }}>
            {/* Email Template */}
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open3}
                onOpen={setOpen3}
                onClose={setClose3}
                value={{ text: state.dtoSendEmail.email_template_name }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrEmailTemplateLookup}
                onChange={onEmailTemplateNameChange}
                onBlur={onEmailTemplateNameBlur}
                filterOptions={(options, state) => {
                  const searchTerm = state.inputValue.toLowerCase();
                  return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                }}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="E-Mail Template"
                    placeholder='Select E-Mail Template'
                    slotProps={{ inputLabel: { shrink: true } }}
                    onBlur={onEmailTemplateNameBlur}
                    error={state.errorMessages.email_template_name ? true : false}
                  />
                )}
              />
              <MyTypography className="error">{state.errorMessages.email_template_name}</MyTypography>
            </MyGrid>

            {/* Conditional Rendering */}
            {!isExternalEmail ? (
              <>
                {/* Type */}
                <MyGrid size={{ xs: 12, sm: 3 }}>
                  <MyAutocomplete
                    open={state.open2}
                    onOpen={setOpen2}
                    onClose={setClose2}
                    value={
                      state.dtoSendEmail.type_id === null
                        ? { id: 'ALL', text: 'All type ' }
                        : { id: state.dtoSendEmail.type_id, text: state.dtoSendEmail.type_name || '' }
                    }
                    getOptionLabel={(option: any) => option.text || '' }
                    firstitem={{ id: 0, text: '' }}
                    options={state.arrTypeLookup}
                    onChange={onTypeChange}
                    filterOptions={(options, state) => {
                      const searchTerm = state.inputValue.toLowerCase();
                      return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                    }}
                    renderInput={(params) => (
                      <MyTextField
                        {...params}
                        label="Type"
                        slotProps={{ inputLabel: { shrink: true } }}
                        error={state.errorMessages.type_name ? true : false}
                      />
                    )}
                  />
                  <MyTypography className="error"> {state.errorMessages.type_name}</MyTypography>
                </MyGrid>

                {/* Role */}
                <MyGrid size={{ xs: 12, sm: 3 }}>
                  <MyAutocomplete
                    open={state.open1}
                    onOpen={setOpen1}
                    onClose={setClose1}
                    value={
                      state.dtoSendEmail.role_id === null
                        ? { id: 'ALL', text: 'All Role' }
                        : { id: state.dtoSendEmail.role_id, text: state.dtoSendEmail.role_name || '' }
                    }
                    getOptionLabel={(option: any) => option.text || '' }
                    firstitem={{ id: 0, text: '' }}
                    options={state.arrRoleLookup}
                    onChange={onRoleNameChange}
                    filterOptions={(options, state) => {
                      const searchTerm = state.inputValue.toLowerCase();
                      return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                    }}
                    renderInput={(params) => (
                      <MyTextField
                        {...params}
                        label="Role"
                        slotProps={{ inputLabel: { shrink: true } }}
                        error={state.errorMessages.role_name ? true : false}
                      />
                    )}
                  />
                  <MyTypography className="error"> {state.errorMessages.role_name}</MyTypography>
                </MyGrid>
              </>
            ) : (
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyTextField
                  label="External Email Addresses"
                  name="external_emails"
                  value={state.dtoSendEmail.external_emails}
                  onChange={onExternalEmailChange}
                  placeholder="Enter Email Template subject Type"
                  onBlur={onEmailNameBlur}
                  error={state.errorMessages.external_emails ? true : false}
                  
                  multiline
                  minRows={1}
                  maxRows={16}
                  fullWidth
                  inputProps={{ maxLength: 500, pattern: '^[a-zA-Z0-9]{1,2}$' }}
                />
                <MyTypography className="error">{state.errorMessages.external_emails}</MyTypography>
              </MyGrid>
            )}
          </MyGrid>
        </MyBox>
      </MyLocalizationProvider>
      <MyCard>
        <MyCardContent sx={{ overflowX: 'auto' }}>
          <div style={{ minWidth: `${columns.length * 150}px` }}>
            <MyDataGrid
              apiRef={apiRef}
              rowSelectionModel={state.arrSelectedId}
              initialStateModel={state.initialState}
              sortModel={[{ field: state.sort_field, sort: state.sort_direction }]}
              onSortModelChange={onSortChange}
              onRowSelectionModelChange={onCheckChange}
              rows={state.arrSendEmailDTO}
              rowCount={state.total_records}
              columns={columns}
              loading={state.isLoading}
              // handleContextMenu={handleContextMenu}
              showExportButton={true}
              onFilterModelChange={onFilterModelChange}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
            />
          </div>
        </MyCardContent>
      </MyCard>
    </>
  );
};

export default memo(ClientUserList, (prevProps, nextProps) => eq(prevProps, nextProps));
