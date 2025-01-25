'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useTaxEntry from './useTaxEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import TaxDTO from '@/app/types/TaxDTO';
import MyNumericFormat from '@/app/custom-components/MyNumericFormat';

type TaxEntryProps = {
  dtoTax: TaxDTO;
};

const TaxEntry = (props: TaxEntryProps) => {
  const { state, onInputChange, onTaxDescriptionBlur, onTaxPercentageBlur, onSaveClick, onCancelClick } = useTaxEntry(props);

  return (
    <MyCard>
      <MyCardContent>
        <MyGrid container spacing={2}>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Tax Description"
              name="tax_description"
              value={state.dtoTax.tax_description}
              onChange={onInputChange}
              onBlur={onTaxDescriptionBlur}
              error={state.errorMessages.tax_description ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.tax_description}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Tax Percentage"
              name="tax_percentage"
              value={state.dtoTax.tax_percentage}
              onChange={onInputChange}
              onBlur={onTaxPercentageBlur}
              slotProps={{
                input: {
                  inputComponent: MyNumericFormat as any,
                  inputProps: {
                    suffix: '%'
                    //onBlur: onTaxPercentageBlur
                  }
                }
              }}
              error={state.errorMessages.tax_percentage ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.tax_percentage}</MyTypography>
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
  );
};

export default memo(TaxEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
