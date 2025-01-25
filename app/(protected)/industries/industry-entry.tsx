'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useIndustryEntry from './useIndustryEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import IndustryDTO from '@/app/types/IndustryDTO';

type IndustryEntryProps = {
  dtoIndustry: IndustryDTO;
};

const IndustryEntry = (props: IndustryEntryProps) => {
  const { state, onInputChange, onIndustryNameBlur, onSaveClick, onCancelClick } = useIndustryEntry(props);

  return (
    <MyCard>
      <MyCardContent>
        <MyGrid container spacing={2}>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Industry Name"
              name="industry_name"
              value={state.dtoIndustry.industry_name}
              onChange={onInputChange}
              onBlur={onIndustryNameBlur}
              error={state.errorMessages.industry_name ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.industry_name}</MyTypography>
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

export default memo(IndustryEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
