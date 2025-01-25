'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useTaskEntry from './useTaskEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import TaskDTO from '@/app/types/TaskDTO';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import LookupDTO from '@/app/types/LookupDTO';
import MyDatePicker from '@/app/custom-components/MyDatePicker';
import dayjs from 'dayjs';
import MyLocalizationProvider from '@/app/custom-components/MyLocalizationProvider';
import { getLocalTime } from '@/app/common/Configuration';

type TaskEntryProps = {
  dtoTask: TaskDTO;
  arrContactLookup: LookupDTO[];
  arrAssignedToLookup: LookupDTO[];
};

const TaskEntry = (props: TaskEntryProps) => {
  const {
    state,
    onInputChange,
    onTaskStatusChange,
    onParentTypeChange,
    onParentTypeNameChange,
    onContactNameChange,
    onPriorityChange,
    onPriorityBlur,
    onAssignedToNameChange,
    onStartDateChange,
    onDueDateChange,
    onSubjectBlur,
    onStatusBlur,
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
    setOpen5,
    setClose5,
    setOpen6,
    setClose6
  } = useTaskEntry(props);

  return (
    <MyLocalizationProvider>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="Subject"
                name="subject"
                value={state.dtoTask.subject}
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
                value={{ text: state.dtoTask.status }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrTaskStausLookup}
                onChange={onTaskStatusChange}
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
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyDatePicker
                label="Start Date"
                onChange={onStartDateChange}
                value={
                  dayjs(getLocalTime(state.dtoTask.start_date)).format('MM/DD/YYYY') === '12/31/1899'
                    ? null
                    : dayjs(getLocalTime(state.dtoTask.start_date)).toDate()
                }
              ></MyDatePicker>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyDatePicker
                label="Due Date"
                onChange={onDueDateChange}
                value={
                  dayjs(getLocalTime(state.dtoTask.due_date)).format('MM/DD/YYYY') === '12/31/1899'
                    ? null
                    : dayjs(getLocalTime(state.dtoTask.due_date)).toDate()
                }
              ></MyDatePicker>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open2}
                onOpen={setOpen2}
                onClose={setClose2}
                value={{ id: state.dtoTask.parent_type, text: state.dtoTask.parent_type }}
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
                value={{ id: state.dtoTask.parent_type_id, text: state.dtoTask.parent_type_name }}
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
              <MyAutocomplete
                open={state.open4}
                onOpen={setOpen4}
                onClose={setClose4}
                value={{ id: state.dtoTask.contact_id, text: state.dtoTask.contact_name }}
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
                open={state.open5}
                onOpen={setOpen5}
                onClose={setClose5}
                value={{ id: state.dtoTask.priority, text: state.dtoTask.priority }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrPriorityLookup}
                onChange={onPriorityChange}
                onBlur={onPriorityBlur}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Priority"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                    onBlur={onPriorityBlur}
                    error={state.errorMessages.priority ? true : false}
                  />
                )}
              />
              <MyTypography className="error"> {state.errorMessages.priority}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                multiline
                rows={5}
                label="Description"
                name="description"
                value={state.dtoTask.description}
                onChange={onInputChange}
              />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open6}
                onOpen={setOpen6}
                onClose={setClose6}
                value={{ id: state.dtoTask.assigned_to, text: state.dtoTask.assigned_to_user_name }}
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

export default memo(TaskEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
