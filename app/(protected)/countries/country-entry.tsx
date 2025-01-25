'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useCountryEntry from './useCountryEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import CountryDTO from '@/app/types/CountryDTO';

type CountryEntryProps = {
  dtoCountry: CountryDTO;
};

const CountryEntry = (props: CountryEntryProps) => {
  const { state, onInputChange, onCountryNameBlur, onSaveClick, onCancelClick } = useCountryEntry(props);

  return (
    <MyCard>
      <MyCardContent>
        <MyGrid container spacing={2}>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Country Name"
              name="country_name"
              value={state.dtoCountry.country_name}
              onChange={onInputChange}
              onBlur={onCountryNameBlur}
              error={state.errorMessages.country_name ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.country_name}</MyTypography>
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

export default memo(CountryEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
