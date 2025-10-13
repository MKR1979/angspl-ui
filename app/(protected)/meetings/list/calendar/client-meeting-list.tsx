'use client';
import eq from 'lodash/eq';
import React, { memo } from 'react';
import { Calendar, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import useMeetingList from './useMeetingList';
import MeetingCalendarDTO from '@/app/types/MeetingCalendarDTO';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyButton from '@/app/custom-components/MyButton';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyConfirmDialog from '@/app/custom-components/MyConfirmDialog';
import MyTypography from '@/app/custom-components/MyTypography';
import MyDialog from '@/app/custom-components/MyDialog';
import MyDialogTitle from '@/app/custom-components/MyDialogTitle';
import MyIconButton from '@/app/custom-components/MyIconButton';
import MyCloseIcon from '@/app/custom-components/MyCloseIcon';
import MyDialogContent from '@/app/custom-components/MyDialogContent';
import MyDialogActions from '@/app/custom-components/MyDialogActions';
import MyGrid from '@/app/custom-components/MyGrid';
import MyTextField from '@/app/custom-components/MyTextField';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import MyDateTimePicker from '@/app/custom-components/MyDateTimePicker';
import dayjs from 'dayjs';
import MyLocalizationProvider from '@/app/custom-components/MyLocalizationProvider';
import 'react-contexify/ReactContexify.css';
import MyMenu from '@/app/custom-components/MyMenu';
import MyMenuItem from '@/app/custom-components/MyMenuItem';
import MyEditIcon from '@/app/custom-components/MyEditIcon';
import MyClearIcon from '@/app/custom-components/MyClearIcon';

type Props = {
  arrMeetingCalendarDTO: MeetingCalendarDTO[];
};
const ClientMeetingList = ({ arrMeetingCalendarDTO }: Props) => {
  const {
    state,
    DeleteSingle,
    onDeleteSingleClose,
    onGridViewClick,
    onSelectSlot,
    onClosePopup,
    onClose,
    onInputChange,
    onMeetingStatusChange,
    onParentTypeChange,
    onParentTypeNameChange,
    onLocationNameChange,
    onReminderChange,
    onAssignedToNameChange,
    onStartDateTimeChange,
    onEndDateTimeChange,
    onSubjectBlur,
    onStartDateTimeBlur,
    onEndDateTimeBlur,
    onLocationNameBlur,
    onStatusBlur,
    //onParentTypeBlur,
    //onParentTypeNameBlur,
    onReminderBlur,
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
    setClose6,
    handleClose,
    onContextMenu,
    onEditClick,
    onDeleteClick,
    handleContextMenu,
    onDoubleClick,
    localizer
  } = useMeetingList({
    arrMeetingCalendarDTO
  });

  return (
    <>
      <MyBreadcrumbs
        items={state.breadcrumbsItems}
        secondary={
          <MyButton variant="outlined" sx={{ backgroundColor: '#fff', color: '#000' }} onClick={onGridViewClick}>
            List View
          </MyButton>
        }
      ></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <div>
            <Calendar
              //dayLayoutAlgorithm={'no-overlap' as any}
              defaultDate={new Date()}
              defaultView={Views.WEEK}
              events={state.arrMeetingCalendarDTO}
              localizer={localizer}
              components={{
                eventWrapper: ({ event, children }: any) => {
                  //setSelectedId(event.id)
                  return (
                    <div
                      onContextMenu={
                        (e) => handleContextMenu(e, event)
                        // e => {
                        //   alert(`${event.title} is clicked.`);
                        //   e.preventDefault();
                        // }
                      }
                    >
                      {children}
                    </div>
                  );
                }
              }}
              onDoubleClickEvent={onDoubleClick}
              onSelectSlot={onSelectSlot}
              selectable
              scrollToTime={new Date(1970, 1, 1, 6)}
            />
          </div>
          <MyMenu
            open={state.contextMenu !== null}
            onClose={handleClose}
            anchorReference="anchorPosition"
            anchorPosition={
              state.contextMenu !== null
                ? {
                    top: state.contextMenu.mouseY,
                    left: state.contextMenu.mouseX
                  }
                : undefined
            }
            slotProps={{
              root: {
                onContextMenu: onContextMenu
              }
            }}
          >
            <MyMenuItem onClick={onEditClick}>
              <MyEditIcon />
              Edit
            </MyMenuItem>
            <MyMenuItem onClick={onDeleteClick}>
              <MyClearIcon />
              Delete
            </MyMenuItem>
          </MyMenu>
        </MyCardContent>
      </MyCard>
      <MyDialog
        open={state.openPopup}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onClose={onClose}
        maxWidth="md"
        fullWidth
      >
        <MyDialogTitle> {state.dtoMeeting.id > 0 ? 'Edit' : 'Add'} Meeting</MyDialogTitle>
        <MyIconButton
          aria-label="close"
          onClick={onClosePopup}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <MyCloseIcon />
        </MyIconButton>
        <MyDialogContent style={{ paddingTop: '10px', height: 'auto' }}>
          <MyLocalizationProvider>
            <MyGrid container spacing={2}>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyTextField
                  label="Subject"
                  name="subject"
                  value={state.dtoMeeting.subject}
                  onChange={onInputChange}
                  onBlur={onSubjectBlur}
                  error={state.errorMessages.subject ? true : false}
                />
                <MyTypography className="error"> {state.errorMessages.subject}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyDateTimePicker
                  label="Start Date"
                  onChange={onStartDateTimeChange}
                  onBlur={onStartDateTimeBlur}
                  value={
                    dayjs(state.dtoMeeting.start_date_time).format('MM/DD/YYYY') === '12/31/1899' ? null : state.dtoMeeting.start_date_time
                  }
                  error={state.errorMessages.start_date_time ? true : false}
                ></MyDateTimePicker>
                <MyTypography className="error"> {state.errorMessages.start_date_time}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyDateTimePicker
                  label="End Date"
                  onChange={onEndDateTimeChange}
                  onBlur={onEndDateTimeBlur}
                  value={
                    dayjs(state.dtoMeeting.end_date_time).format('MM/DD/YYYY') === '12/31/1899' ? null : state.dtoMeeting.end_date_time
                  }
                  error={state.errorMessages.end_date_time ? true : false}
                ></MyDateTimePicker>
                <MyTypography className="error"> {state.errorMessages.end_date_time}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyAutocomplete
                  open={state.open1}
                  onOpen={setOpen1}
                  onClose={setClose1}
                  value={{ id: state.dtoMeeting.location_id, text: state.dtoMeeting.location_name }}
                  getOptionLabel={(option: any) => option.text}
                  firstitem={{ id: 0, text: '' }}
                  options={state.arrLocationLookup}
                  onChange={onLocationNameChange}
                  onBlur={onLocationNameBlur}
                  renderInput={(params) => (
                    <MyTextField
                      {...params}
                      label="Location"
                      slotProps={{
                        inputLabel: { shrink: true }
                      }}
                      onBlur={onLocationNameBlur}
                      error={state.errorMessages.location_id ? true : false}
                    />
                  )}
                />
                <MyTypography className="error"> {state.errorMessages.location_id}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyAutocomplete
                  open={state.open2}
                  onOpen={setOpen2}
                  onClose={setClose2}
                  value={{ text: state.dtoMeeting.reminder }}
                  getOptionLabel={(option: any) => option.text}
                  firstitem={{ id: 0, text: '' }}
                  options={state.arrReminderLookup}
                  onChange={onReminderChange}
                  onBlur={onReminderBlur}
                  renderInput={(params) => (
                    <MyTextField
                      {...params}
                      label="Reminder"
                      slotProps={{
                        inputLabel: { shrink: true }
                      }}
                      onBlur={onReminderBlur}
                      error={state.errorMessages.reminder ? true : false}
                    />
                  )}
                />
                <MyTypography className="error"> {state.errorMessages.reminder}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyAutocomplete
                  open={state.open3}
                  onOpen={setOpen3}
                  onClose={setClose3}
                  value={{ id: state.dtoMeeting.parent_type, text: state.dtoMeeting.parent_type }}
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
                  open={state.open4}
                  onOpen={setOpen4}
                  onClose={setClose4}
                  value={{ id: state.dtoMeeting.parent_type_id, text: state.dtoMeeting.parent_type_name }}
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
                  open={state.open5}
                  onOpen={setOpen5}
                  onClose={setClose5}
                  value={{ id: state.dtoMeeting.assigned_to, text: state.dtoMeeting.assigned_to_user_name }}
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
                <MyAutocomplete
                  open={state.open6}
                  onOpen={setOpen6}
                  onClose={setClose6}
                  value={{ text: state.dtoMeeting.status }}
                  getOptionLabel={(option: any) => option.text}
                  firstitem={{ text: '' }}
                  options={state.arrMeetingStausLookup}
                  onChange={onMeetingStatusChange}
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
                <MyTextField
                  multiline
                  rows={5}
                  label="Description"
                  name="description"
                  value={state.dtoMeeting.description}
                  onChange={onInputChange}
                />
              </MyGrid>
            </MyGrid>
          </MyLocalizationProvider>
        </MyDialogContent>
        <MyDialogActions>
          <MyButton variant="text" onClick={onCancelClick}>
            Cancel
          </MyButton>
          <MyButton onClick={onSaveClick} disabled={state.saveDisabled}>
            OK
          </MyButton>
        </MyDialogActions>
      </MyDialog>
      {state.visibleDialog1.visibility && (
        <MyConfirmDialog
          open={state.visibleDialog1.visibility}
          title="Confirm Meeting Removal"
          onNoClick={onDeleteSingleClose}
          onYesClick={DeleteSingle}
          onClose={onDeleteSingleClose}
        >
          <MyTypography variant="body1">Are you sure you want to delete this item? This cannot be undone.</MyTypography>
        </MyConfirmDialog>
      )}
    </>
  );
};

export default memo(ClientMeetingList, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
