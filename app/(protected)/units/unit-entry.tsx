'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useUnitEntry from './useUnitEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import UnitDTO from '@/app/types/UnitDTO';

type UnitEntryProps = {
  dtoUnit: UnitDTO;
};

const UnitEntry = (props: UnitEntryProps) => {
  const { state, onInputChange, onUnitNameBlur, onUnitCodeBlur, onSaveClick, onCancelClick } = useUnitEntry(props);

  return (
    <MyCard>
      <MyCardContent>
        <MyGrid container spacing={2}>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Unit Name"
              name="unit_name"
              value={state.dtoUnit.unit_name}
              onChange={onInputChange}
              onBlur={onUnitNameBlur}
              error={state.errorMessages.unit_name ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.unit_name}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Unit Code"
              name="unit_code"
              value={state.dtoUnit.unit_code}
              onChange={onInputChange}
              onBlur={onUnitCodeBlur}
              error={state.errorMessages.unit_code ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.unit_code}</MyTypography>
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

export default memo(UnitEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
