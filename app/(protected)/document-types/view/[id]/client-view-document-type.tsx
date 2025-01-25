'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewDocumentType from './useViewDocumentType';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import DocumentTypeDTO from '@/app/types/DocumentTypeDTO';
import MyTimestamp from '@/app/custom-components/MyTimestamp';

type Props = {
  dtoDocumentType: DocumentTypeDTO;
};

const ClientViewDocumentType = ({ dtoDocumentType }: Props) => {
  const { state, onEditClick, onCancelClick } = useViewDocumentType({ dtoDocumentType });

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Document Type Name:</MyTypography>
              <MyTypography>{state.dtoDocumentType.document_type_name}</MyTypography>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoDocumentType.created_by_user_name}
          createdAt={state.dtoDocumentType.created_at}
          modifiedBy={state.dtoDocumentType.modified_by_user_name}
          modifiedAt={state.dtoDocumentType.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          <MyButton onClick={onEditClick}>Edit</MyButton>
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewDocumentType, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
