'use client';
import eq from 'lodash/eq';
import React, { memo } from 'react';
import { Calendar, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import useEventList from './useEventList';
import EventCalendarDTO from '@/app/types/EventCalendarDTO';
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
import MyNumericFormat from '@/app/custom-components/MyNumericFormat';
import MyLocalizationProvider from '@/app/custom-components/MyLocalizationProvider';
import 'react-contexify/ReactContexify.css';
import MyMenu from '@/app/custom-components/MyMenu';
import MyMenuItem from '@/app/custom-components/MyMenuItem';
import MyEditIcon from '@/app/custom-components/MyEditIcon';
import MyClearIcon from '@/app/custom-components/MyClearIcon';

type Props = {
  arrEventCalendarDTO: EventCalendarDTO[];
};
const ClientEventList = ({ arrEventCalendarDTO }: Props) => {
  const {
    state,
    DeleteSingle,
    onDeleteSingleClose,
    onGridViewClick,
    onSelectSlot,
    onClosePopup,
    onClose,
    onInputChange,
    onCurrencyNameChange,
    onLocationNameChange,
    onStartDateTimeChange,
    onEndDateTimeChange,
    onAssignedToNameChange,
    onEventNameBlur,
    onStartDateTimeBlur,
    onEndDateTimeBlur,
    onCurrencyNameBlur,
    onLocationNameBlur,
    onAssignedToNameBlur,
    onSaveClick,
    onCancelClick,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    setOpen3,
    setClose3,
    handleClose,
    onContextMenu,
    onEditClick,
    onDeleteClick,
    handleContextMenu,
    onDoubleClick,
    localizer
  } = useEventList({
    arrEventCalendarDTO
  });

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems} secondary={<MyButton onClick={onGridViewClick}>Grid View</MyButton>}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <div>
            <Calendar
              //dayLayoutAlgorithm={'no-overlap' as any}
              defaultDate={new Date()}
              defaultView={Views.WEEK}
              events={state.arrEventCalendarDTO}
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
        <MyDialogTitle> {state.dtoEvent.id > 0 ? 'Edit' : 'Add'} Event</MyDialogTitle>
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
                  label="Event Name"
                  name="event_name"
                  value={state.dtoEvent.event_name}
                  onChange={onInputChange}
                  onBlur={onEventNameBlur}
                  error={state.errorMessages.event_name ? true : false}
                />
                <MyTypography className="error"> {state.errorMessages.event_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyDateTimePicker
                  label="Start Time"
                  onChange={onStartDateTimeChange}
                  onBlur={onStartDateTimeBlur}
                  value={
                    dayjs(state.dtoEvent.start_date_time).format('MM/DD/YYYY') === '12/31/1899' ? null : state.dtoEvent.start_date_time
                  }
                ></MyDateTimePicker>
                <MyTypography className="error"> {state.errorMessages.start_date_time}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyDateTimePicker
                  label="End Time"
                  onChange={onEndDateTimeChange}
                  onBlur={onEndDateTimeBlur}
                  value={dayjs(state.dtoEvent.end_date_time).format('MM/DD/YYYY') === '12/31/1899' ? null : state.dtoEvent.end_date_time}
                ></MyDateTimePicker>
                <MyTypography className="error"> {state.errorMessages.end_date_time}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyAutocomplete
                  open={state.open1}
                  onOpen={setOpen1}
                  onClose={setClose1}
                  value={{ id: state.dtoEvent.currency_id, text: state.dtoEvent.currency_name }}
                  getOptionLabel={(option: any) => option.text}
                  firstitem={{ id: 0, text: '' }}
                  options={state.arrCurrencyLookup}
                  onChange={onCurrencyNameChange}
                  onBlur={onCurrencyNameBlur}
                  renderInput={(params) => (
                    <MyTextField
                      {...params}
                      label="Currency"
                      slotProps={{
                        inputLabel: { shrink: true }
                      }}
                      onBlur={onCurrencyNameBlur}
                    />
                  )}
                />
                <MyTypography className="error"> {state.errorMessages.currency_id}</MyTypography>
              </MyGrid>

              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyTextField
                  label="Budget"
                  name="budget"
                  value={state.dtoEvent.budget}
                  onChange={onInputChange}
                  slotProps={{
                    input: {
                      inputComponent: MyNumericFormat as any,
                      inputProps: { prefix: state.dtoEvent.currency_symbol }
                    }
                  }}
                />
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyAutocomplete
                  open={state.open2}
                  onOpen={setOpen2}
                  onClose={setClose2}
                  value={{ id: state.dtoEvent.location_id, text: state.dtoEvent.location_name }}
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
                  open={state.open3}
                  onOpen={setOpen3}
                  onClose={setClose3}
                  value={{ id: state.dtoEvent.assigned_to, text: state.dtoEvent.assigned_to_user_name }}
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
                <MyTextField
                  multiline
                  rows={5}
                  label="Description"
                  name="description"
                  value={state.dtoEvent.description}
                  onChange={onInputChange}
                />
              </MyGrid>
              {/* <MyGrid size={{ xs: 12, sm: 6 }}>
                           <MyAutocomplete
                             open={state.open4}
                             onOpen={setOpen4}
                             onClose={setClose4}
                             value={{ id: state.dtoEvent.email_template_id, text: state.dtoEvent.email_template_name }}
                             getOptionLabel={(option: any) => option.text}
                             firstitem={{ id: 0, text: '' }}
                             options={state.arrEmailTemplateLookup}
                             onChange={onEmailTemplateNameChange}
                             onBlur={onEmailTemplateNameBlur}
                             renderInput={(params) => (
                               <MyTextField
                                 {...params}
                                 label="E-Mail Template"
                                 slotProps={{
                                   inputLabel: { shrink: true }
                                 }}
                                 onBlur={onEmailTemplateNameBlur}
                                 error={state.errorMessages.email_template_id ? true : false}
                               />
                             )}
                           />
                           <MyTypography className="error"> {state.errorMessages.email_template_id}</MyTypography>
                         </MyGrid> */}
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
          title="Confirm Event Removal"
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

export default memo(ClientEventList, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
