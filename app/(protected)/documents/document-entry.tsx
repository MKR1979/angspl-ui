'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useDocumentEntry from './useDocumentEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import DocumentDTO from '@/app/types/DocumentDTO';
import { getLocalTime } from '@/app/common/Configuration';
import LookupDTO from '@/app/types/LookupDTO';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import MyCheckbox from '@/app/custom-components/MyCheckbox';
import MyDatePicker from '@/app/custom-components/MyDatePicker';
import dayjs from 'dayjs';
import MyLocalizationProvider from '@/app/custom-components/MyLocalizationProvider';

type DocumentEntryProps = {
  dtoDocument: DocumentDTO;
  arrDocumentTypeLookup: LookupDTO[];
  arrDocumentCategoryLookup: LookupDTO[];
  arrDocumentLookup: LookupDTO[];
  arrAssignedToLookup: LookupDTO[];
};

const DocumentEntry = (props: DocumentEntryProps) => {
  const {
    state,
    onInputChange,
    onDocumentTypeNameChange,
    onPublishDateChange,
    onExpirationDateChange,
    onDocumentCategoryNameChange,
    onDocumentSubcategoryNameChange,
    onRelatedDocumentNameChange,
    onAssignedToNameChange,
    onStatusChange,
    onDocumentNameBlur,
    onRevisionBlur,
    onPublishDateBlur,
    onAssignedToNameBlur,
    onStatusBlur,
    onSaveClick,
    onCancelClick,
    UploadFile,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    setOpen3,
    setClose3,
    setOpen4,
    setClose4,
    setOpen5,
    setClose5,
    setOpen6,
    setClose6
  } = useDocumentEntry(props);

  return (
    <MyLocalizationProvider>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="Document Name"
                name="document_name"
                value={state.dtoDocument.document_name}
                onChange={onInputChange}
                onBlur={onDocumentNameBlur}
                error={state.errorMessages.document_name ? true : false}
              />
              <MyTypography className="error"> {state.errorMessages.document_name}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="Revision"
                name="revision"
                value={state.dtoDocument.revision}
                onChange={onInputChange}
                onBlur={onRevisionBlur}
                error={state.errorMessages.revision ? true : false}
              />
              <MyTypography className="error"> {state.errorMessages.revision}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open1}
                onOpen={setOpen1}
                onClose={setClose1}
                value={{ id: state.dtoDocument.document_type_id, text: state.dtoDocument.document_type_name }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrDocumentTypeLookup}
                onChange={onDocumentTypeNameChange}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Document Type"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                  />
                )}
              />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyCheckbox label="Template?" name="is_template" checked={state.dtoDocument.is_template} onChange={onInputChange} />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyDatePicker
                label="Publish Date"
                onChange={onPublishDateChange}
                onBlur={onPublishDateBlur}
                value={
                  dayjs(getLocalTime(state.dtoDocument.publish_date)).format('MM/DD/YYYY') === '12/31/1899'
                    ? null
                    : dayjs(getLocalTime(state.dtoDocument.publish_date)).toDate()
                }
                error={state.errorMessages.publish_date ? true : false}
              ></MyDatePicker>
              <MyTypography className="error"> {state.errorMessages.publish_date}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyDatePicker
                label="Expiration Date"
                onChange={onExpirationDateChange}
                value={
                  dayjs(getLocalTime(state.dtoDocument.expiration_date)).format('MM/DD/YYYY') === '12/31/1899'
                    ? null
                    : dayjs(getLocalTime(state.dtoDocument.expiration_date)).toDate()
                }
              ></MyDatePicker>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open2}
                onOpen={setOpen2}
                onClose={setClose2}
                value={{ id: state.dtoDocument.document_category_id, text: state.dtoDocument.document_category_name }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrDocumentCategoryLookup}
                onChange={onDocumentCategoryNameChange}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Document Category"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                  />
                )}
              />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open3}
                onOpen={setOpen3}
                onClose={setClose3}
                value={{ id: state.dtoDocument.document_subcategory_id, text: state.dtoDocument.document_subcategory_name }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrDocumentSubcategoryLookup}
                onChange={onDocumentSubcategoryNameChange}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Document Subcategory"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                  />
                )}
              />
            </MyGrid>

            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open4}
                onOpen={setOpen4}
                onClose={setClose4}
                value={{ id: state.dtoDocument.related_document_id, text: state.dtoDocument.related_document_name }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ text: '' }}
                options={state.arrDocumentLookup}
                onChange={onRelatedDocumentNameChange}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Related Document"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                  />
                )}
              />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open5}
                onOpen={setOpen5}
                onClose={setClose5}
                value={{ id: state.dtoDocument.assigned_to, text: state.dtoDocument.assigned_to_user_name }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrAssignedToLookup}
                onChange={onAssignedToNameChange}
                onBlur={onAssignedToNameBlur}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Assigned To"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                    onBlur={onAssignedToNameBlur}
                    error={state.errorMessages.assigned_to ? true : false}
                  />
                )}
              />
              <MyTypography className="error"> {state.errorMessages.assigned_to}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyButton variant="contained" component="label">
                File Name
                <input id="file_name" type="file" hidden onChange={UploadFile} />
              </MyButton>
              {state.dtoDocument.file_name?.trim() != '' && (
                <a
                  download
                  target="_blank"
                  href={
                    state.dtoDocument.file_name?.trim() == ''
                      ? ''
                      : process.env.NEXT_PUBLIC_API_ROOT_URL + '/uploads/' + state.dtoDocument.file_name
                  }
                >
                  {' '}
                  {state.dtoDocument.file_name}
                </a>
              )}
              <MyTypography className="error"> {state.errorMessages.file_name}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open6}
                onOpen={setOpen6}
                onClose={setClose6}
                value={{ text: state.dtoDocument.status }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrDocumentStatusLookup}
                onChange={onStatusChange}
                onBlur={onStatusBlur}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Status"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                    onBlur={onStatusBlur}
                    error={state.errorMessages.status ? true : false}
                  />
                )}
              />
              <MyTypography className="error"> {state.errorMessages.status}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 12 }}>
              <MyTextField
                label="Description"
                name="description"
                value={state.dtoDocument.description}
                onChange={onInputChange}
                multiline
                rows={5}
              />
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider></MyDivider>
        <MyCardActions>
          <MyButton onClick={onSaveClick} disabled={state.saveDisabled}>
            Save
          </MyButton>
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </MyLocalizationProvider>
  );
};

export default memo(DocumentEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
