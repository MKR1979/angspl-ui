'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useEmailTemplateEntry from './useEmailTemplateEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import EmailTemplateDTO from '@/app/types/EmailTemplateDTO';
import * as Constants from '../constants/constants';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';

type TypeEntryProps = {
  dtoEmailTemplate: EmailTemplateDTO;
};

const EmailTemplateEntry = (props: TypeEntryProps) => {
  const {
    state,
    onInputChange,
    onEmailTemplateNameBlur,
    onEmailTemplateBodyNameBlur,
    onSaveClick,
    onClearClick,
    onCancelClick,
    saving,
    setOpen1,
    setClose1,
    onTemplateNameChange,
    onEmailTemplateStatusChange,
    onStatusBlur,
    onEmailTemplateSubNameBlur
  } = useEmailTemplateEntry(props);

  return (
    <MyCard>
      <MyCardContent>
        <MyGrid container spacing={2}>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Template Name"
              name="email_template_name"
              value={state.dtoEmailTemplate.email_template_name}
              onChange={onTemplateNameChange}
              placeholder="Enter Email Template Type..."
              inputProps={{
                maxLength: Constants.TYPE_NAME_LENGTH,
                pattern: '[A-Za-z]'
              }}
              onBlur={onEmailTemplateNameBlur}
              error={state.errorMessages.email_template_name ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.email_template_name}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open1}
              onOpen={setOpen1}
              onClose={setClose1}
              value={{ text: state.dtoEmailTemplate.status }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrEmailTemplateStatusLookup}
              onChange={onEmailTemplateStatusChange}
              onBlur={onStatusBlur}
              filterOptions={(options, state) => {
                // searchable Lookup
                const searchTerm = state.inputValue.toLowerCase();
                return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
              }}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Status"
                  placeholder="Select status"
                  slotProps={{
                    inputLabel: { shrink: true }
                  }}
                  onBlur={onStatusBlur}
                  error={state.errorMessages.status ? true : false}
                />
              )}
            />
            <MyTypography className="error">{state.errorMessages.status}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 12 }}>
            <MyTextField
              label="Template Subject"
              name="email_template_sub"
              value={state.dtoEmailTemplate.email_template_sub}
              onChange={onInputChange}
              placeholder="Enter Email Template subject Type"
              onBlur={onEmailTemplateSubNameBlur}
              error={state.errorMessages.email_template_sub ? true : false}
              multiline
              minRows={1}
              maxRows={16}
              fullWidth
              inputProps={{ maxLength: 500 }} 
            />
            <MyTypography className="error">{state.errorMessages.email_template_sub}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 12 }}>
            <MyTextField
              label="Template Body"
              name="email_template_body"
              value={state.dtoEmailTemplate.email_template_body}
              onChange={onInputChange}
              placeholder="Enter Email Template Body Type"
              onBlur={onEmailTemplateBodyNameBlur}
              error={state.errorMessages.email_template_body ? true : false}
              multiline
              minRows={3}
              maxRows={16}
              fullWidth
              inputProps={{ maxLength: 2000 }} 
            />
            <MyTypography className="error">{state.errorMessages.email_template_body}</MyTypography>
          </MyGrid>
        </MyGrid>
      </MyCardContent>
      <MyDivider></MyDivider>
      <MyCardActions>
        <MyButton onClick={onSaveClick} disabled={saving}>
          {saving ? 'Saving...' : 'Save'}
        </MyButton>
        <MyButton onClick={onClearClick}>Clear</MyButton>
        <MyButton onClick={onCancelClick}>Cancel</MyButton>
      </MyCardActions>
    </MyCard>
  );
};

export default memo(EmailTemplateEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
