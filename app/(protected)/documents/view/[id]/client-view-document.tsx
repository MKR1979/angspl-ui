'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewDocument from './useViewDocument';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import DocumentDTO from '@/app/types/DocumentDTO';
import { getLocalTime, textToHTML } from '@/app/common/Configuration';
import MyTimestamp from '@/app/custom-components/MyTimestamp';
import dayjs from 'dayjs';

type Props = {
  dtoDocument: DocumentDTO;
};

const ClientViewDocument = ({ dtoDocument }: Props) => {
  const { state, onEditClick, onCancelClick } = useViewDocument({ dtoDocument });

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Document Name:</MyTypography>
              <MyTypography>{state.dtoDocument.document_name}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Revision:</MyTypography>
              <MyTypography>{state.dtoDocument.revision}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Document Type:</MyTypography>
              <MyTypography>{state.dtoDocument.document_type_name}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Template?:</MyTypography>
              <MyTypography>{state.dtoDocument.is_template ? 'Yes' : 'No'}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Publish Date:</MyTypography>
              <MyTypography>
                {dayjs(getLocalTime(state.dtoDocument.publish_date)).format('MM/DD/YYYY') == '12/31/1899'
                  ? ''
                  : dayjs(getLocalTime(state.dtoDocument.publish_date)).format('MM/DD/YYYY')}
              </MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Expiration Date:</MyTypography>
              <MyTypography>
                {dayjs(getLocalTime(state.dtoDocument.expiration_date)).format('MM/DD/YYYY') == '12/31/1899'
                  ? ''
                  : dayjs(getLocalTime(state.dtoDocument.expiration_date)).format('MM/DD/YYYY')}
              </MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Document Category:</MyTypography>
              <MyTypography>{state.dtoDocument.document_category_name}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Document Subcategory:</MyTypography>
              <MyTypography>{state.dtoDocument.document_subcategory_name}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Related Document:</MyTypography>
              <MyTypography>{state.dtoDocument.related_document_name}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Assigned To:</MyTypography>
              <MyTypography>{state.dtoDocument.assigned_to_user_name}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">File Name:</MyTypography>
              <MyTypography>
                {state.dtoDocument.file_name?.trim() != '' && (
                  <a
                    download
                    target="_blank"
                    href={
                      state.dtoDocument.file_name?.trim() == ''
                        ? ''
                        : process.env.NEXT_PUBLIC_API_ROOT_URL + '/uploads/' + state.dtoDocument.file_name
                    }
                  >
                    {state.dtoDocument.file_name}
                  </a>
                )}
              </MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Status:</MyTypography>
              <MyTypography>{state.dtoDocument.status}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 12 }}>
              <MyTypography variant="subtitle2">Description:</MyTypography>
              <MyTypography component="div">
                <div
                  dangerouslySetInnerHTML={{
                    __html: textToHTML(state.dtoDocument.description)
                  }}
                ></div>
              </MyTypography>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoDocument.created_by_user_name}
          createdAt={state.dtoDocument.created_at}
          modifiedBy={state.dtoDocument.modified_by_user_name}
          modifiedAt={state.dtoDocument.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          <MyButton onClick={onEditClick}>Edit</MyButton>
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewDocument, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
