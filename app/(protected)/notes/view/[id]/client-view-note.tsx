'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewNote from './useViewNote';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import NoteDTO from '@/app/types/NoteDTO';
import { textToHTML } from '@/app/common/Configuration';
import MyTimestamp from '@/app/custom-components/MyTimestamp';

type Props = {
  dtoNote: NoteDTO;
};

const ClientViewNote = ({ dtoNote }: Props) => {
  const { state, onEditClick, onCancelClick } = useViewNote({ dtoNote });

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Subject:</MyTypography>
              <MyTypography>{state.dtoNote.subject}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Contact:</MyTypography>
              <MyTypography>{state.dtoNote.contact_name}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Related To:</MyTypography>
              <MyTypography>{state.dtoNote.parent_type}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Related To Option:</MyTypography>
              <MyTypography>{state.dtoNote.parent_type_name}</MyTypography>
            </MyGrid>

            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Attachment:</MyTypography>
              <MyTypography>
                {state.dtoNote.file_name?.trim() != '' && (
                  <a
                    download
                    target="_blank"
                    href={
                      state.dtoNote.file_name?.trim() == ''
                        ? ''
                        : process.env.NEXT_PUBLIC_API_ROOT_URL + '/uploads/' + state.dtoNote.file_name
                    }
                  >
                    {state.dtoNote.file_name}
                  </a>
                )}
              </MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Assigned To:</MyTypography>
              <MyTypography>{state.dtoNote.assigned_to_user_name}</MyTypography>
            </MyGrid>

            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Note:</MyTypography>
              <MyTypography component="div">
                <div
                  dangerouslySetInnerHTML={{
                    __html: textToHTML(state.dtoNote.note)
                  }}
                ></div>
              </MyTypography>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoNote.created_by_user_name}
          createdAt={state.dtoNote.created_at}
          modifiedBy={state.dtoNote.modified_by_user_name}
          modifiedAt={state.dtoNote.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          <MyButton onClick={onEditClick}>Edit</MyButton>
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewNote, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
