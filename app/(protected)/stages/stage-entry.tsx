'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useStageEntry from './useStageEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import StageDTO from '@/app/types/StageDTO';

type StageEntryProps = {
  dtoStage: StageDTO;
};

const StageEntry = (props: StageEntryProps) => {
  const { state, onInputChange, onStageNameBlur, onSaveClick, onCancelClick } = useStageEntry(props);

  return (
    <MyCard>
      <MyCardContent>
        <MyGrid container spacing={2}>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Stage Name"
              name="stage_name"
              value={state.dtoStage.stage_name}
              onChange={onInputChange}
              onBlur={onStageNameBlur}
              error={state.errorMessages.stage_name ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.stage_name}</MyTypography>
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

export default memo(StageEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
