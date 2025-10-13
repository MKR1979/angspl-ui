'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useFeeHeadEntry from './useFeeHeadEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import FeeHeadDTO from '@/app/types/FeeHeadDTO';
import * as gConstants from '../../../constants/constants';
import * as Constants from '../../constants/constants';
import { Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import CancelIcon from '@mui/icons-material/Cancel';
import MyNumericFormat from '@/app/custom-components/MyNumericFormat';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';

type FeePaymentEntryProps = {
  dtoFeeHead: FeeHeadDTO;
};

const FeePaymentEntry = (props: FeePaymentEntryProps) => {
  const {
    state,
    saving,
    onSaveClick,
    onClearClick,
    onCancelClick,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    onCodeBlur,
    onNameBlur,
    onInputChange,
    onPlainInputChange,
    onStatusChange,
    onStatusBlur,
    onAmountBlur,
    onCategoryNameChange,
    onCategoryNameBlur,
  } = useFeeHeadEntry(props);

  return (
    <MyCard>
      <MyCardContent>
        <Typography variant="h6" gutterBottom color="black">
          Fee Head Information
        </Typography>
        <MyGrid container spacing={2}>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label=" Name"
              name="name"
              value={state.dtoFeeHead.name}
              onChange={onPlainInputChange}
              placeholder="Enter course name"
              inputProps={{
                maxLength: Constants.COURSE_NAME_LENGTH,
                pattern: '^[A-Za-z]{1,2}$' 
              }}
              onBlur={onNameBlur}
              error={state.errorMessages.name ? true : false}
            />
            <MyTypography className="error">{state.errorMessages.name}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open1}
              onOpen={setOpen1}
              onClose={setClose1}
              value={{
                id: state.dtoFeeHead.fee_head_category_id,
                text: state.dtoFeeHead.category_name
              }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrFeeHeadCategoryLookup}
              onChange={onCategoryNameChange}
              onBlur={onCategoryNameBlur}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Category "
                  slotProps={{
                    inputLabel: { shrink: true }
                  }}
                  error={state.errorMessages.category_name ? true : false}
                />
              )}
            />
            <MyTypography className="error"> {state.errorMessages.category_name}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label=" Code"
              name="code"
              value={state.dtoFeeHead.code}
              onChange={onPlainInputChange}
              placeholder="Enter course code"
               error={state.errorMessages.code ? true : false}
              inputProps={{
                maxLength: Constants.CODE_LENGTH, 
                pattern: '^[A-Z0-9]+$' 
              }}
              onBlur={onCodeBlur}
            />
            <MyTypography className="error">{state.errorMessages.code}</MyTypography>
          </MyGrid>

          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Description"
              name="description"
              value={state.dtoFeeHead.description}
              onChange={onPlainInputChange}
              error={state.errorMessages.description ? true : false}
              multiline
              minRows={1}
              maxRows={4}
              fullWidth
            />
            <MyTypography className="error">{state.errorMessages.description}</MyTypography>
          </MyGrid>

          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Base Amount"
              name="base_amount"
              value={isNaN(state.dtoFeeHead.base_amount) ? '' : Number(state.dtoFeeHead.base_amount)}
              onChange={onPlainInputChange}
              onBlur={onAmountBlur}
              placeholder="Enter course base_amount"
              slotProps={{
                input: {
                  inputComponent: MyNumericFormat as any,
                  inputProps: {
                    maxLength: gConstants.PEN_NO_LENGTH,
                    pattern: '^[0-9]+(\\.[0-9]{1,2})?$',
                  }
                }
              }}
              error={state.errorMessages.base_amount ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.base_amount}</MyTypography>
          </MyGrid>

          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open2}
              onOpen={setOpen2}
              onClose={setClose2}
              value={{ text: state.dtoFeeHead.status }}
              getOptionLabel={(option: any) => option.text}
              firstitem={{ id: 0, text: '' }}
              options={state.arrCommonStatusLookup}
              onChange={onStatusChange}
              onBlur={onStatusBlur}
              filterOptions={(options, state) => {
                const searchTerm = state.inputValue.toLowerCase();
                return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
              }}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Status"
                  placeholder='Select status...'
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

          <MyGrid size={{ xs: 12, sm: 6 }} style={{ display: 'flex', alignItems: 'center' }}>
            <label className="checkbox-item">
              <input
                type="checkbox"
                name="is_mandatory"
                checked={state.dtoFeeHead.is_mandatory}
                onChange={onInputChange}
                style={{ transform: 'scale(1.2)', marginLeft: '5px' }}
              />
              &nbsp;Is Mandatory
            </label>
          </MyGrid>

        </MyGrid>
        <MyDivider sx={{ my: 2 }} />
        <MyCardActions>
          <MyButton onClick={onSaveClick} disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </MyButton>
          <MyButton onClick={onClearClick} startIcon={<ClearIcon />}>
            Clear
          </MyButton>
          <MyButton onClick={onCancelClick} startIcon={<CancelIcon />}>
            Cancel
          </MyButton>
        </MyCardActions>
      </MyCardContent>
    </MyCard>
  );
};

export default memo(FeePaymentEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
