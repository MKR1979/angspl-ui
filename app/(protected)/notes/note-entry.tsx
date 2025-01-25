'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useNoteEntry from './useNoteEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import NoteDTO from '@/app/types/NoteDTO';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import LookupDTO from '@/app/types/LookupDTO';
import MyLocalizationProvider from '@/app/custom-components/MyLocalizationProvider';

type NoteEntryProps = {
  dtoNote: NoteDTO;
  arrContactLookup: LookupDTO[];
  arrAssignedToLookup: LookupDTO[];
};

const NoteEntry = (props: NoteEntryProps) => {
  const {
    state,
    onInputChange,
    onParentTypeChange,
    onParentTypeNameChange,
    onContactNameChange,
    onAssignedToNameChange,
    onSubjectBlur,
    //onParentTypeBlur,
    //onParentTypeNameBlur,
    onAssignedToNameBlur,
    onSaveClick,
    onCancelClick,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    setOpen3,
    setClose3,
    setOpen4,
    setClose4,
    UploadFile
  } = useNoteEntry(props);

  return (
    <MyLocalizationProvider>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="Subject"
                name="subject"
                value={state.dtoNote.subject}
                onChange={onInputChange}
                onBlur={onSubjectBlur}
                error={state.errorMessages.subject ? true : false}
              />
              <MyTypography className="error"> {state.errorMessages.subject}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open1}
                onOpen={setOpen1}
                onClose={setClose1}
                value={{ id: state.dtoNote.contact_id, text: state.dtoNote.contact_name }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrContactLookup}
                onChange={onContactNameChange}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Contact Name"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                  />
                )}
              />
            </MyGrid>

            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open2}
                onOpen={setOpen2}
                onClose={setClose2}
                value={{ id: state.dtoNote.parent_type, text: state.dtoNote.parent_type }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrParentTypeLookup}
                onChange={onParentTypeChange}
                //onBlur={onParentTypeBlur}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Related To"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                    //onBlur={onParentTypeBlur}
                    //error={state.errorMessages.parent_type ? true : false}
                  />
                )}
              />
              {/* <MyTypography className="error"> {state.errorMessages.parent_type}</MyTypography> */}
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open3}
                onOpen={setOpen3}
                onClose={setClose3}
                value={{ id: state.dtoNote.parent_type_id, text: state.dtoNote.parent_type_name }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrParentTypeNameLookup}
                onChange={onParentTypeNameChange}
                //onBlur={onParentTypeNameBlur}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Related To Option"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                    //onBlur={onParentTypeNameBlur}
                    //error={state.errorMessages.parent_type_id ? true : false}
                  />
                )}
              />
              {/* <MyTypography className="error"> {state.errorMessages.parent_type_id}</MyTypography> */}
            </MyGrid>

            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyButton variant="contained" component="label">
                Attachment
                <input id="note_file" type="file" hidden onChange={UploadFile} />
              </MyButton>
              {state.dtoNote.file_name?.trim() != '' && (
                <a
                  download
                  target="_blank"
                  href={
                    state.dtoNote.file_name?.trim() == ''
                      ? ''
                      : process.env.NEXT_PUBLIC_API_ROOT_URL + '/uploads/' + state.dtoNote.file_name
                  }
                >
                  {' '}
                  {state.dtoNote.file_name}
                </a>
              )}
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open4}
                onOpen={setOpen4}
                onClose={setClose4}
                value={{ id: state.dtoNote.assigned_to, text: state.dtoNote.assigned_to_user_name }}
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
            <MyGrid size={{ xs: 12, sm: 12 }}>
              <MyTextField multiline rows={10} label="Note" name="note" value={state.dtoNote.note} onChange={onInputChange} />
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

export default memo(NoteEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
